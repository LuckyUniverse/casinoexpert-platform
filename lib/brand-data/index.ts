/**
 * Registry of brand-review data for casinoexpert.ai.
 *
 * Pages at /casinos/[slug] look up their data here. To add a brand:
 *   1. Create lib/brand-data/<slug>.ts exporting a BrandReviewData object
 *   2. Register it in the BRAND_REGISTRY map below
 *   3. The /casinos/<slug> route is generated automatically by
 *      app/casinos/[slug]/page.tsx via generateStaticParams()
 *
 * Order in the registry doesn't drive UI order — that lives in
 * lib/brand-order.ts (the Ontario brand_position sequence from the
 * casinogpt dashboard).
 */

import type { BrandReviewData } from "@/lib/review-types";
import { JACKPOT_CITY } from "./jackpot-city";
import { ZODIAC } from "./zodiac";
import { ROYAL_VEGAS } from "./royal-vegas";
import { RUBY_FORTUNE } from "./ruby-fortune";
import { YUKON_GOLD } from "./yukon-gold";
import { BETWAY_CASINO } from "./betway-casino";
import { BETWAY_SPORTS } from "./betway-sports";
import { CASINO_CLASSIC } from "./casino-classic";
import { GOLDEN_TIGER } from "./golden-tiger";
import { GRAND_MONDIAL } from "./grand-mondial";
import { LUXURY_CASINO } from "./luxury-casino";
import { SPIN_CASINO } from "./spin-casino";
import { CAPTAIN_COOKS } from "./captain-cooks";

const ALL: BrandReviewData[] = [
  JACKPOT_CITY,
  ZODIAC,
  ROYAL_VEGAS,
  RUBY_FORTUNE,
  YUKON_GOLD,
  BETWAY_CASINO,
  BETWAY_SPORTS,
  CASINO_CLASSIC,
  GOLDEN_TIGER,
  GRAND_MONDIAL,
  LUXURY_CASINO,
  SPIN_CASINO,
  CAPTAIN_COOKS,
];

export const BRAND_REGISTRY: Record<string, BrandReviewData> = Object.fromEntries(
  ALL.map((b) => [b.slug, b])
);

export function getBrand(slug: string): BrandReviewData | undefined {
  return BRAND_REGISTRY[slug];
}

export function allBrandSlugs(): string[] {
  return Object.keys(BRAND_REGISTRY);
}
