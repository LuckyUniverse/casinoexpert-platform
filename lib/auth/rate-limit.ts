import { createHash } from "crypto";
import { Redis } from "@upstash/redis";

/**
 * Redis-backed counters for auth abuse control and the one-free-check gate.
 * Same graceful pattern as lib/chat/question-log.ts: without KV configured
 * everything no-ops open (cookie checks still apply for the free-check gate).
 */

function client(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** sha256 of the IP - we never store raw addresses. */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

/**
 * Sliding-window-ish counter: INCR with TTL set on first hit.
 * Returns true when the caller is OVER the limit (should be blocked).
 */
export async function overLimit(key: string, max: number, windowSeconds: number): Promise<boolean> {
  const redis = client();
  if (!redis) return false;
  try {
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, windowSeconds);
    return count > max;
  } catch {
    return false; // Redis down - fail open
  }
}

/** Has this anon identity already used its free safety check? */
export async function hasUsedFreeCheck(anonId: string, ipHash: string): Promise<boolean> {
  const redis = client();
  if (!redis) return false;
  try {
    const [byAnon, byIp] = await Promise.all([
      redis.get(`cex:freecheck:anon:${anonId}`),
      redis.get(`cex:freecheck:ip:${ipHash}`),
    ]);
    return Boolean(byAnon) || Boolean(byIp);
  } catch {
    return false;
  }
}

/** Record the free check against both the anon cookie id and the IP. */
export async function markFreeCheckUsed(anonId: string, ipHash: string): Promise<void> {
  const redis = client();
  if (!redis) return;
  const TTL = 60 * 60 * 24 * 365;
  try {
    await Promise.all([
      redis.set(`cex:freecheck:anon:${anonId}`, 1, { ex: TTL }),
      redis.set(`cex:freecheck:ip:${ipHash}`, 1, { ex: TTL }),
    ]);
  } catch {
    /* best effort - the cookie is the second layer */
  }
}
