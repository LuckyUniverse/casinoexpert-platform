import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { validateAlias, validateEmail, validateFirstName } from "@/lib/auth/validation";
import { verifyTurnstile } from "@/lib/auth/turnstile";
import { generateMagicLink, getBaseUrl } from "@/lib/auth/magic-link";
import { sendVerificationEmail } from "@/lib/email/send";
import { hashIp, overLimit } from "@/lib/auth/rate-limit";

/**
 * POST /api/auth/register
 * Body: { firstName, alias, email, subscribe, turnstileToken?, website?, startedAt? }
 *
 * Mirrors casinogpt's registration with two changes:
 *  - first_name is collected (casinoexpert requirement)
 *  - NO session is issued here. The user must click the verification email
 *    first (/api/auth/verify), which both proves the inbox and signs them in.
 *
 * Bot defenses, layered: honeypot field ("website" - hidden from humans),
 * minimum fill time, Turnstile (when keys are configured), per-IP rate
 * limit, and the email-verification requirement itself.
 */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  const ipHash = hashIp(ip);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { firstName, alias, email, subscribe, turnstileToken, website, startedAt } = body as {
    firstName?: string; alias?: string; email?: string; subscribe?: boolean;
    turnstileToken?: string; website?: string; startedAt?: number;
  };

  // Honeypot: the "website" field is invisible to humans. A filled value is
  // a bot - return a convincing success and do nothing.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ success: true, message: "Check your inbox to verify your email." });
  }

  // Timing: humans don't complete a 4-field form in under 3 seconds.
  if (typeof startedAt === "number" && Date.now() - startedAt < 3000) {
    return NextResponse.json({ error: "Please review the form and try again." }, { status: 400 });
  }

  const firstNameError = validateFirstName(firstName);
  if (firstNameError) return NextResponse.json({ error: firstNameError }, { status: 400 });
  const aliasError = validateAlias(alias);
  if (aliasError) return NextResponse.json({ error: aliasError }, { status: 400 });
  const emailError = validateEmail(email);
  if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });

  const human = await verifyTurnstile(turnstileToken ?? "", ip);
  if (!human) {
    return NextResponse.json({ error: "Bot verification failed. Please try again." }, { status: 403 });
  }

  if (await overLimit(`cex:reg:ip:${ipHash}`, 5, 60 * 60)) {
    return NextResponse.json({ error: "Too many registrations from this connection. Try again later." }, { status: 429 });
  }

  const cleanEmail = email!.toLowerCase().trim();
  const cleanAlias = alias!.trim();
  const cleanFirstName = firstName!.trim();
  const admin = getSupabaseAdmin();

  // Uniqueness (friendly errors; the unique indexes are the real guarantee)
  const { data: existing } = await admin
    .from("cex_users")
    .select("id, email, alias")
    .or(`email.ilike.${cleanEmail},alias.ilike.${cleanAlias}`)
    .limit(1);
  if (existing && existing.length > 0) {
    const clash = existing[0];
    const which = clash.email?.toLowerCase() === cleanEmail ? "email" : "username";
    return NextResponse.json(
      { error: which === "email" ? "That email is already registered. Try signing in instead." : "That username is taken." },
      { status: 409 }
    );
  }

  const { data: user, error: insertError } = await admin
    .from("cex_users")
    .insert({
      email: cleanEmail,
      alias: cleanAlias,
      first_name: cleanFirstName,
      marketing_consent: subscribe === true,
      consent_date: subscribe === true ? new Date().toISOString() : null,
      consent_source: subscribe === true ? "registration" : null,
      signup_ip_hash: ipHash,
    })
    .select("id")
    .single();

  if (insertError) {
    // 23505 = unique violation (race with the check above)
    if (insertError.code === "23505") {
      return NextResponse.json({ error: "That email or username is already registered." }, { status: 409 });
    }
    console.error("Registration insert failed:", insertError);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }

  // Send the verification email. If it fails, the account still exists -
  // the sign-in flow sends a fresh link that also verifies.
  try {
    const url = await generateMagicLink(user.id, "verify", getBaseUrl(req));
    await sendVerificationEmail(cleanEmail, cleanFirstName, url);
  } catch (err) {
    console.error("Verification email failed:", err);
  }

  return NextResponse.json({
    success: true,
    message: "Check your inbox to verify your email.",
  });
}
