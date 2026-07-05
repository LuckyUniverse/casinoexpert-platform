import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { RatingResult } from "@/lib/rating/criteria";

/**
 * 6-month report cache backed by the cex_ratings table. A brand looked up
 * for the same market within CACHE_MONTHS is served from here - no API
 * spend, consistent score, and the stored rows build our ratings database.
 */

export const CACHE_MONTHS = 6;

/**
 * Normalize user input to a lookup key: lowercase, strip protocol/www and
 * common TLDs, drop non-alphanumerics. "Betway.com", "betway", and
 * "Betway Casino " all collapse toward comparable keys.
 */
export function normalizeCasinoKey(input: string): string {
  let k = input.toLowerCase().trim();
  k = k.replace(/^https?:\/\//, "").replace(/^www\./, "");
  k = k.replace(/\.(com|ca|net|org|io|bet|casino|co\.uk|uk|ag|lv|eu)(\/.*)?$/, "");
  k = k.replace(/[^a-z0-9]/g, "");
  return k;
}

export interface CachedRating {
  result: RatingResult;
  checkedAt: string;
}

export async function getCachedRating(
  casino: string,
  country: string,
  region: string
): Promise<CachedRating | null> {
  const key = normalizeCasinoKey(casino);
  if (!key) return null;
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - CACHE_MONTHS);

  try {
    const admin = getSupabaseAdmin();
    const { data } = await admin
      .from("cex_ratings")
      .select("result, checked_at")
      .eq("casino_key", key)
      .eq("country", country)
      .eq("region", region ?? "")
      .gte("checked_at", cutoff.toISOString())
      .order("checked_at", { ascending: false })
      .limit(1)
      .single();
    if (!data) return null;
    return { result: data.result as RatingResult, checkedAt: data.checked_at };
  } catch {
    return null; // cache is an optimization - never block a check on it
  }
}

/** Persist a completed live check. Best-effort; never throws. */
export async function storeRating(
  casino: string,
  country: string,
  region: string,
  result: RatingResult,
  usage?: Record<string, number | undefined>
): Promise<void> {
  const key = normalizeCasinoKey(casino);
  if (!key) return;
  try {
    const admin = getSupabaseAdmin();
    await admin.from("cex_ratings").insert({
      casino_key: key,
      country,
      region: region ?? "",
      casino_input: casino.trim().slice(0, 100),
      brand_name: result.resolved?.brandName ?? null,
      result,
      usage: usage ?? null,
    });
  } catch (err) {
    console.error("Failed to store rating:", err);
  }
}

/** Extract the JSON report from the model's raw streamed text. */
export function parseRatingText(text: string): RatingResult | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    const parsed = JSON.parse(text.slice(start, end + 1)) as RatingResult;
    if (!parsed.resolved || !Array.isArray(parsed.criteria) || !parsed.verdict) return null;
    return parsed;
  } catch {
    return null;
  }
}
