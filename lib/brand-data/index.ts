/**
 * Registry of brand-review data for casinoexpert.ai.
 *
 * Pages at /casinos/[slug] look up their data here. To add a brand:
 *   1. Create lib/brand-data/<slug>.ts exporting a BrandReviewData object
 *   2. Register it in the BRAND_REGISTRY map below
 *   3. The /casinos/<slug> route is generated automatically
 */

import type { BrandReviewData } from "@/lib/review-types";
import { JACKPOT_CITY } from "./jackpot-city";

export const BRAND_REGISTRY: Record<string, BrandReviewData> = {
  [JACKPOT_CITY.slug]: JACKPOT_CITY,
};

export function getBrand(slug: string): BrandReviewData | undefined {
  return BRAND_REGISTRY[slug];
}

export function allBrandSlugs(): string[] {
  return Object.keys(BRAND_REGISTRY);
}
