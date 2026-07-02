import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { validateEmail } from "@/lib/auth/validation";
import { verifyTurnstile } from "@/lib/auth/turnstile";
import { generateMagicLink, getBaseUrl } from "@/lib/auth/magic-link";
import { sendLoginEmail } from "@/lib/email/send";
import { hashIp, overLimit } from "@/lib/auth/rate-limit";

/**
 * POST /api/auth/login - passwordless magic-link sign-in, like casinogpt.
 * Always answers with the same generic success so email addresses can't be
 * enumerated. Clicking the link also verifies an unverified account.
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
  const { email, turnstileToken, website } = body as {
    email?: string; turnstileToken?: string; website?: string;
  };

  const generic = { success: true, message: "If that email is registered, a sign-in link is on its way." };

  // Honeypot
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json(generic);
  }

  const emailError = validateEmail(email);
  if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });

  const human = await verifyTurnstile(turnstileToken ?? "", ip);
  if (!human) {
    return NextResponse.json({ error: "Bot verification failed. Please try again." }, { status: 403 });
  }

  const cleanEmail = email!.toLowerCase().trim();

  // Cap link sends per address and per IP
  if (
    (await overLimit(`cex:magic:email:${cleanEmail}`, 3, 60 * 60)) ||
    (await overLimit(`cex:magic:ip:${ipHash}`, 10, 60 * 60))
  ) {
    return NextResponse.json(generic); // silently drop - no oracle for abusers
  }

  const admin = getSupabaseAdmin();
  const { data: user } = await admin
    .from("cex_users")
    .select("id, first_name")
    .ilike("email", cleanEmail)
    .limit(1)
    .single();

  if (user) {
    try {
      const url = await generateMagicLink(user.id, "login", getBaseUrl(req));
      await sendLoginEmail(cleanEmail, user.first_name, url);
    } catch (err) {
      console.error("Login email failed:", err);
    }
  }

  return NextResponse.json(generic);
}
