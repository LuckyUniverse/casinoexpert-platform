import { randomBytes } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Magic-link tokens (cex_magic_links table). Two purposes:
 *  - "verify": sent right after registration; proves the inbox is real.
 *    24h expiry so a delayed signup still completes.
 *  - "login": returning-user passwordless login; 15min expiry like casinogpt.
 * Clicking EITHER kind verifies the email (both prove inbox ownership).
 */

const EXPIRY_MINUTES: Record<Purpose, number> = {
  verify: 60 * 24,
  login: 15,
};

export type Purpose = "verify" | "login";

export async function generateMagicLink(
  userId: string,
  purpose: Purpose,
  baseUrl: string
): Promise<string> {
  const admin = getSupabaseAdmin();
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + EXPIRY_MINUTES[purpose] * 60 * 1000).toISOString();

  const { error } = await admin.from("cex_magic_links").insert({
    user_id: userId,
    token,
    purpose,
    expires_at: expiresAt,
  });
  if (error) throw new Error(`Failed to create magic link: ${error.message}`);

  return `${baseUrl}/api/auth/verify?token=${token}`;
}

/**
 * Consume a token atomically (single conditional UPDATE - two clicks on the
 * same link can't both succeed). Returns the userId and purpose, or null.
 */
export async function consumeMagicLink(
  token: string
): Promise<{ userId: string; purpose: Purpose } | null> {
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from("cex_magic_links")
    .update({ used_at: new Date().toISOString() })
    .eq("token", token)
    .is("used_at", null)
    .gt("expires_at", new Date().toISOString())
    .select("user_id, purpose")
    .single();

  if (error || !data) return null;
  return { userId: data.user_id, purpose: data.purpose as Purpose };
}

/** Base URL for links: explicit env first, then the deployment's own origin. */
export function getBaseUrl(req: Request): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "casinoexpert.ai";
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}
