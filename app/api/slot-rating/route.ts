import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { SLOT_CRITERIA, SLOT_OTHER_RATINGS } from "@/lib/rating/slot-criteria";

/**
 * Live slot-game review (/slot-check) - penny-slot-machines.com client demo.
 * Same engine as /api/rating (Claude Opus + live web search) with a
 * slot-specific rubric, plus web_fetch so the model can pull game pages and
 * extract real screenshot/artwork URLs for the results page.
 *
 * DELIBERATELY not behind the registration gate (demo page, will be
 * disabled after the pitch). The per-IP hourly cap still applies.
 */
export const maxDuration = 300;

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
  const rubric = SLOT_CRITERIA.map(
    (c) => `- key: "${c.key}" | ${c.label} (weight ${c.weight}/100)\n  Scoring: ${c.guidance}`
  ).join("\n");
  const otherRubric = SLOT_OTHER_RATINGS.map(
    (c) => `- key: "${c.key}" | ${c.label}: ${c.guidance}`
  ).join("\n");

  return `You are the live slot-review engine for CasinoExpert AI, running a demo for the review site penny-slot-machines.com. You receive a slot game name (and optionally a provider) and produce a structured, factual review based on CURRENT information gathered with web search and page fetches.

## Method

1. Identify the exact game and provider first. Many titles share names or have sequels (e.g. "Book of Dead" vs "Book of Dead 2", multiple "Buffalo" games by different studios) - if the provider was given, match it; otherwise pick the most famous title with that name and say so.
2. Verify hard numbers against the provider's own site or reputable slot databases (SlotCatalog, Bigwinboard, Casino Guru game pages): RTP (and whether MULTIPLE RTP VERSIONS exist - this matters a lot for players), volatility, max win, min/max stake, release date.
3. Check whether penny-slot-machines.com has a review page for this game - their reviews live at https://www.penny-slot-machines.com/games/<slug>.html (search: site:penny-slot-machines.com <game name>, or web_fetch a likely slug URL to confirm it exists). If confirmed, put the URL in resolved.clientReviewUrl; otherwise leave it as an empty string. NEVER include a URL you did not confirm exists.
4. Imagery: ALWAYS fetch the provider's official game page with web_fetch, and the penny-slot-machines.com review page too if it exists, and extract 2-4 direct image URLs showing the game (og:image tags, screenshot galleries, artwork tiles). Only include URLs you actually saw in fetched content or search results - never construct or guess an image URL. Prefer https URLs ending in .jpg/.png/.webp. Also always fill resolved.officialUrl - the results page derives preview imagery from it.
5. Score every criterion. Where you could not verify something, score conservatively and set confidence to "low" - never invent findings or sources.
6. Findings are player-facing. Never mention your search budget, tools, or process. When something could not be verified, state plainly what is and is not known.

## Review criteria (score each 0-10)

${rubric}

## Secondary ratings (score each 0-10, independent of the main score)

${otherRubric}

## Output

Return ONLY a single JSON object - no markdown fences, no commentary before or after. Schema:

{
  "resolved": {
    "gameName": string,          // e.g. "Book of Dead"
    "provider": string,          // e.g. "Play'n GO"
    "releaseYear": string,       // e.g. "2016"
    "volatility": string,        // e.g. "High"
    "rtp": string,               // e.g. "96.21% (94.25% and 91.27% versions also exist)"
    "maxWin": string,            // e.g. "5,000x stake"
    "minStake": string,          // e.g. "$0.01 per spin"
    "officialUrl": string,       // provider's page for the game, or ""
    "clientReviewUrl": string    // penny-slot-machines.com review URL if one exists, else ""
  },
  "authenticity": "official" | "counterfeit_risk" | "unverified",
    // "counterfeit_risk" ONLY when pirated/cloned copies of this title are a known, documented problem
  "verdict": string,             // 2-3 plain sentences: is this slot worth playing and why
  "criteria": [
    { "key": string, "score": number, "finding": string, "confidence": "high"|"medium"|"low", "sources": [string] }
  ],
  "flags": [ { "type": "positive"|"caution"|"red", "text": string } ],  // 3-7, best first
  "otherRatings": [ { "key": string, "score": number, "note": string } ],
  "images": [ { "url": string, "caption": string } ]   // 0-4 real image URLs found during research
}

Writing rules: plain hyphens only (no em or en dashes), no marketing language, cite what you verified.`;
}

export async function POST(req: Request) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Slot check is not configured yet." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { game, provider } = await req.json();
  if (typeof game !== "string" || !game.trim()) {
    return new Response(JSON.stringify({ error: "Slot game name is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const anthropic = createAnthropic({ apiKey });
  const providerLine =
    typeof provider === "string" && provider.trim()
      ? `\nProvider (user-specified): ${provider.trim().slice(0, 60)}`
      : "";

  const result = streamText({
    model: anthropic("claude-opus-4-8"),
    system: buildSystemPrompt(),
    messages: [
      {
        role: "user",
        content: `Slot game: ${game.trim().slice(0, 100)}${providerLine}\n\nRun the live slot review now.`,
      },
    ],
    tools: {
      web_search: anthropic.tools.webSearch_20260209({ maxUses: 12 }),
      web_fetch: anthropic.tools.webFetch_20260209({ maxUses: 6 }),
    },
    maxOutputTokens: 8000,
  });

  return result.toTextStreamResponse();
}
