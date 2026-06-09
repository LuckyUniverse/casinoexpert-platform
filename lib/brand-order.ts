/**
 * Canonical brand ordering for casinoexpert.ai (round 1).
 *
 * Source: Ontario brand_position from the casinogpt-platform admin dashboard
 * (table casino_regions, joined to casinos + regions, filtered to region
 * code "ON", deal_live = true, ordered by brand_position asc).
 *
 * This is the commercial-priority order — same priority casinogpt uses for
 * its Ontario surfaces. Reused here so every casinoexpert.ai listing,
 * comparison, and review-roll-out follows the same commercial sequence.
 *
 * Pulled 2026-06-09. Refresh when the casinogpt dashboard order changes.
 *
 * Note: TonyBet is at position 3 in the live dashboard but is not in the
 * casinoexpert.ai round-1 research scope, so it's omitted here. Add it
 * when round-2 research lands.
 *
 * Note: Betway is a single brand_position row in the dashboard (#7); we
 * split it into Betway Casino + Betway Sports as two consecutive review
 * pages on casinoexpert.ai.
 */

import type { BrandFamily } from "./review-types";

export interface BrandRoundOneEntry {
  /** Position in the casinoexpert.ai round-1 build order */
  position: number;
  /** URL slug under /casinos/ */
  slug: string;
  /** Display name */
  name: string;
  /** Affiliate / operator family */
  family: BrandFamily;
}

export const ROUND_ONE_BRAND_ORDER: BrandRoundOneEntry[] = [
  { position: 1, slug: "jackpot-city", name: "Jackpot City", family: "bayton-4" },
  { position: 2, slug: "zodiac", name: "Zodiac Casino", family: "casino-rewards-7" },
  { position: 3, slug: "royal-vegas", name: "Royal Vegas", family: "bayton-4" },
  { position: 4, slug: "ruby-fortune", name: "Ruby Fortune", family: "bayton-4" },
  { position: 5, slug: "yukon-gold", name: "Yukon Gold Casino", family: "casino-rewards-7" },
  { position: 6, slug: "betway-casino", name: "Betway Casino", family: "betway" },
  { position: 7, slug: "betway-sports", name: "Betway Sports", family: "betway" },
  { position: 8, slug: "casino-classic", name: "Casino Classic", family: "casino-rewards-7" },
  { position: 9, slug: "golden-tiger", name: "Golden Tiger Casino", family: "casino-rewards-7" },
  { position: 10, slug: "grand-mondial", name: "Grand Mondial Casino", family: "casino-rewards-7" },
  { position: 11, slug: "luxury-casino", name: "Luxury Casino", family: "casino-rewards-7" },
  { position: 12, slug: "spin-casino", name: "Spin Casino", family: "bayton-4" },
  { position: 13, slug: "captain-cooks", name: "Captain Cooks Casino", family: "casino-rewards-7" },
];

/** Convenience — get the brand entry by slug */
export function brandBySlug(slug: string): BrandRoundOneEntry | undefined {
  return ROUND_ONE_BRAND_ORDER.find((b) => b.slug === slug);
}

/** Convenience — get all brands in a given family, preserving order */
export function brandsByFamily(family: BrandFamily): BrandRoundOneEntry[] {
  return ROUND_ONE_BRAND_ORDER.filter((b) => b.family === family);
}
