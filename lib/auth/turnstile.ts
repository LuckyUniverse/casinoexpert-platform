/**
 * Cloudflare Turnstile server-side verification, same graceful pattern as
 * casinogpt: if TURNSTILE_SECRET_KEY isn't configured, skip (the honeypot,
 * timing check, rate limits, and mandatory email verification still stand).
 * To turn it on: create a Turnstile widget for casinoexpert.ai in the
 * Cloudflare dashboard, then set NEXT_PUBLIC_TURNSTILE_SITE_KEY and
 * TURNSTILE_SECRET_KEY in Vercel.
 */
export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true; // not configured - other defenses apply
  if (!token) return false; // configured but no token: reject

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    // Cloudflare unreachable - fail open, rate limits still protect
    return true;
  }
}
