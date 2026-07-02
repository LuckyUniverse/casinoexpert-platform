import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * HMAC-signed session tokens in an httpOnly cookie - same design as
 * casinogpt (custom sessions, not Supabase Auth).
 *
 * Token format: "user:<userId>:<expiresUnix>.<hmacSha256Hex>"
 * Secret: USER_SESSION_SECRET (casinoexpert has its own, not shared).
 */

export const USER_COOKIE_NAME = "cex_session";
export const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days

function secret(): string {
  const s = process.env.USER_SESSION_SECRET;
  if (!s) throw new Error("USER_SESSION_SECRET is required");
  return s;
}

function hmacSign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createUserSessionToken(userId: string): string {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL;
  const payload = `user:${userId}:${expires}`;
  return `${payload}.${hmacSign(payload)}`;
}

export function verifyUserSessionToken(token: string): { valid: boolean; userId?: string } {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return { valid: false };
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  const expected = hmacSign(payload);
  if (signature.length !== expected.length) return { valid: false };
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return { valid: false };

  const parts = payload.split(":");
  if (parts.length !== 3 || parts[0] !== "user") return { valid: false };
  const expires = parseInt(parts[2], 10);
  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) return { valid: false };

  return { valid: true, userId: parts[1] };
}

/** userId from the session cookie of the current request, or null. */
export async function getUserFromRequest(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_COOKIE_NAME)?.value;
  if (!token) return null;
  const result = verifyUserSessionToken(token);
  return result.valid ? result.userId! : null;
}

/** Serialize a cookie for manual Set-Cookie headers (streaming responses). */
export function serializeCookie(
  name: string,
  value: string,
  opts: { maxAge?: number; httpOnly?: boolean } = {}
): string {
  const parts = [`${name}=${value}`, "Path=/", "SameSite=Lax"];
  if (opts.httpOnly !== false) parts.push("HttpOnly");
  if (opts.maxAge) parts.push(`Max-Age=${opts.maxAge}`);
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}
