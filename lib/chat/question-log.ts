/**
 * Aggregates the questions users actually ask, so /api/questions can surface the
 * genuinely top-asked ones. Backed by Upstash/Vercel KV (Redis sorted set).
 *
 * Gracefully no-ops when KV isn't configured (no KV_REST_API_* env vars) — the
 * app then falls back to the curated suggested-questions list. So this is safe
 * to deploy before the KV store exists; provisioning it later "just works".
 */
import { Redis } from "@upstash/redis";

const KEY = "cex:questions:v1";

function client(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** Normalize for de-duplication while keeping the question readable. */
function normalize(raw: string): string | null {
  let q = raw.replace(/\s+/g, " ").trim();
  if (q.length < 8 || q.length > 140) return null; // skip noise / overlong
  q = q.charAt(0).toUpperCase() + q.slice(1);
  return q;
}

/** Increment this question's count. No-op without KV; never throws. */
export async function logQuestion(raw: string): Promise<void> {
  const redis = client();
  if (!redis) return;
  const q = normalize(raw);
  if (!q) return;
  try {
    await redis.zincrby(KEY, 1, q);
  } catch {
    /* logging is best-effort — never affect the chat response */
  }
}

/** Most-asked questions, highest first. [] without KV or on error. */
export async function topQuestions(n: number): Promise<string[]> {
  const redis = client();
  if (!redis) return [];
  try {
    const res = await redis.zrange<string[]>(KEY, 0, n - 1, { rev: true });
    return Array.isArray(res) ? res : [];
  } catch {
    return [];
  }
}
