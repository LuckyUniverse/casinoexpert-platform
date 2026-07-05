import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { SAFETY_CRITERIA, OTHER_RATINGS } from "@/lib/rating/criteria";
import { getUserFromRequest, serializeCookie } from "@/lib/auth/session";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { hashIp, hasUsedFreeCheck, markFreeCheckUsed, overLimit } from "@/lib/auth/rate-limit";
import { getCachedRating, storeRating, parseRatingText } from "@/lib/rating/cache";

/**
 * Live casino safety check (/safety-check).
 *
 * Takes {casino, country, region}, runs Claude with the Anthropic web search
 * server tool against the rubric in lib/rating/criteria.ts, and streams back
 * a single JSON object (text stream). The weighted safety score is computed
 * client-side from the per-criterion scores so the math stays deterministic.
 *
 * A full check runs 6-10 live searches and can take 1-3 minutes, hence the
 * long maxDuration (needs Fluid Compute, which is on for this project).
 */
export const maxDuration = 300;

// Stricter limit than the chat route - each check costs real money
// (Opus + up to 10 web searches). In-memory; resets on deploy.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function getApiKey(): string | undefined {
  return (
    process.env.ANTHROPIC_SECRET ||
    process.env.AI_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    undefined
  );
}

function buildSystemPrompt(): string {
  const safetyRubric = SAFETY_CRITERIA.map(
    (c) =>
      `- key: "${c.key}" | ${c.label} (weight ${c.weight}/100)\n  Scoring: ${c.guidance}`
  ).join("\n");

  const otherRubric = OTHER_RATINGS.map(
    (c) => `- key: "${c.key}" | ${c.label}: ${c.guidance}`
  ).join("\n");

  return `You are the live safety-check engine for CasinoExpert AI. You receive an online casino name plus the market the player is in, and you produce a structured safety assessment based on CURRENT information gathered with web search.

## Method

1. Resolve the brand for THIS market first. Many brands run different sites per market (e.g. a .com offshore site vs a locally licensed .co.uk or .ca site). Assess the site a player in the given market would actually be served. Note the distinction in resolved.marketNote.
2. Verify licensing against primary sources wherever possible: the regulator's own public register (UKGC register, MGA licensee register, iGO/AGCO lists, state regulator sites). Prefer the register over the casino's own footer claims.
3. Check reputation via independent sources: Casino Guru, AskGamblers, Trustpilot (score AND review count), regulator warning lists, reputable industry press. Never treat the casino's own marketing as evidence.
4. Search efficiently - you have a limited number of searches. Good queries: "<brand> <regulator> license register", "<brand> casino complaints casino guru", "<brand> holding company owner", "<brand> withdrawal limit terms".
5. Score every criterion. Where you could not verify something, score conservatively and set confidence to "low" - never invent findings or sources.
6. Findings are player-facing. Never mention your search budget, search limits, tools, or process in any finding, flag, or verdict. When something could not be verified, write it plainly, e.g. "No independent confirmation of X was found in this check" - state what IS known and what is not, not why.

## Safety criteria (score each 0-10)

${safetyRubric}

## Secondary ratings (score each 0-10, independent of safety)

${otherRubric}

## Output

Return ONLY a single JSON object - no markdown fences, no commentary before or after. Schema:

{
  "resolved": {
    "brandName": string,          // e.g. "Betway"
    "siteUrl": string,            // the site serving this market, e.g. "betway.co.uk"
    "operator": string,           // licensed operating company, e.g. "Betway Ltd"
    "holdingCompany": string,     // ultimate owner, e.g. "Super Group (SGHC) Ltd"
    "licenses": string[],         // e.g. ["UKGC #39372", "MGA/B2C/130/2006"]
    "marketNote": string          // 1 sentence on which site/entity was assessed and why
  },
  "licensedForJurisdiction": "yes" | "no" | "no_local_regime",
    // "yes" = holds a license valid for the player's jurisdiction
    // "no" = the jurisdiction HAS a licensing regime but this casino serves it without one
    // "no_local_regime" = no local licensing regime exists for online casino there
  "verdict": string,              // 2-3 plain sentences: is this casino safe for THIS player, and the main reasons
  "criteria": [
    { "key": string, "score": number, "finding": string, "confidence": "high"|"medium"|"low", "sources": [string] }
    // one entry per safety criterion key, in rubric order
    // finding = 1-2 factual sentences; sources = URLs you actually consulted (may be empty)
  ],
  "flags": [
    { "type": "positive"|"caution"|"red", "text": string }
    // 3-7 of the most decision-relevant facts, best first
  ],
  "otherRatings": [
    { "key": string, "score": number, "note": string }
    // one entry per secondary rating key
  ]
}

Writing rules: plain hyphens only (no em or en dashes), no marketing language, cite what you verified.`;
}

export async function POST(req: Request) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Safety check is not configured yet." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const { casino, country, region } = await req.json();

  if (typeof casino !== "string" || !casino.trim() || typeof country !== "string" || !country.trim()) {
    return new Response(
      JSON.stringify({ error: "Casino name and country are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // ---- Registration gate: one free check, then account required. ----
  // Verified account -> unlimited (the per-IP hourly limit above still applies).
  // Registered but unverified -> must click the verification email first.
  // Anonymous -> exactly one check, tracked by httpOnly cookie AND per-IP
  // record in Redis (server-side, so clearing cookies doesn't reset it).
  const setCookies: string[] = [];
  const userId = await getUserFromRequest();
  let allowed = false;
  // Daily quota applies only to live API runs (cache hits are free for us),
  // so it's evaluated after the cache lookup below. Admins are exempt.
  let quotaUserId: string | null = null;
  let quotaExempt = false;

  if (userId) {
    const { data: user } = await getSupabaseAdmin()
      .from("cex_users")
      .select("email_verified_at, is_admin, email")
      .eq("id", userId)
      .single();
    if (user && user.email_verified_at) {
      const adminEmails = (process.env.ADMIN_EMAILS ?? "")
        .toLowerCase()
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);
      quotaExempt = user.is_admin === true || adminEmails.includes(user.email.toLowerCase());
      quotaUserId = userId;
      allowed = true;
    } else if (user) {
      return new Response(
        JSON.stringify({
          error: "Please verify your email to keep running checks.",
          code: "verify_email",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    // Session for a deleted user falls through to the anonymous path.
  }

  if (!allowed) {
    const cookieStore = await cookies();
    const ipHash = hashIp(ip);
    let anonId = cookieStore.get("cex_anon")?.value ?? "";
    if (!/^[a-f0-9-]{36}$/.test(anonId)) {
      anonId = randomUUID();
      setCookies.push(serializeCookie("cex_anon", anonId, { maxAge: 60 * 60 * 24 * 365 }));
    }

    const usedCookie = cookieStore.get("cex_free")?.value === "used";
    const usedServer = await hasUsedFreeCheck(anonId, ipHash);
    if (usedCookie || usedServer) {
      return new Response(
        JSON.stringify({
          error: "Your free check is used. Create a free account for unlimited checks.",
          code: "registration_required",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    await markFreeCheckUsed(anonId, ipHash);
    setCookies.push(serializeCookie("cex_free", "used", { maxAge: 60 * 60 * 24 * 365 }));
  }
  // ---- end gate ----

  // ---- 6-month report cache ----
  // A brand looked up for this market within the window is served from our
  // records: no API spend, stable score, original date stamp preserved.
  const cached = await getCachedRating(casino, country, region ?? "");
  if (cached) {
    const response = new Response(
      JSON.stringify({ cached: true, checkedAt: cached.checkedAt, result: cached.result }),
      { headers: { "Content-Type": "application/json" } }
    );
    for (const cookie of setCookies) response.headers.append("Set-Cookie", cookie);
    return response;
  }

  // Live run from here - this is what actually costs money, so the daily
  // quota bites now (cache hits above are unlimited).
  if (quotaUserId && !quotaExempt && (await overLimit(`cex:checks:user:${quotaUserId}`, 5, 60 * 60 * 24))) {
    return new Response(
      JSON.stringify({
        error: "You've reached your 5 live checks for today. Your allowance resets 24 hours after your first check. Recently checked brands are always available.",
        code: "daily_limit",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const market = [region, country].filter(Boolean).join(", ");
  const anthropic = createAnthropic({ apiKey });

  const result = streamText({
    model: anthropic("claude-opus-4-8"),
    system: buildSystemPrompt(),
    messages: [
      {
        role: "user",
        content: `Casino: ${casino.trim().slice(0, 100)}\nPlayer market: ${market.slice(0, 100)}\n\nRun the live safety check now.`,
      },
    ],
    tools: {
      // 12 searches balances coverage vs cost: the server-side search loop
      // re-reads accumulated context each round, so input cost grows
      // super-linearly with the cap.
      web_search: anthropic.tools.webSearch_20260209({ maxUses: 12 }),
    },
    maxOutputTokens: 8000,
    onFinish: async ({ text, usage }) => {
      // Exact spend per check -> Vercel logs + stored with the report.
      // Opus 4.8: $5/M input, $25/M output (searches billed separately at $10/1k).
      const u = {
        inputTokens: usage?.inputTokens,
        outputTokens: usage?.outputTokens,
        cachedInputTokens: usage?.cachedInputTokens,
        totalTokens: usage?.totalTokens,
      };
      const estUsd =
        ((u.inputTokens ?? 0) * 5 + (u.outputTokens ?? 0) * 25) / 1_000_000;
      console.log(
        JSON.stringify({ tag: "rating-usage", casino: casino.trim(), country, region, ...u, estTokenCostUsd: Number(estUsd.toFixed(3)) })
      );

      // Archive the completed report so the next 6 months of lookups for
      // this brand/market are served from cex_ratings instead of the API.
      const parsed = parseRatingText(text);
      if (parsed) {
        await storeRating(casino, country, region ?? "", parsed, u);
      }
    },
  });

  // Plain text stream (the JSON body as it is generated). The client
  // accumulates it, then parses the completed object.
  const response = result.toTextStreamResponse();
  for (const cookie of setCookies) {
    response.headers.append("Set-Cookie", cookie);
  }
  return response;
}
