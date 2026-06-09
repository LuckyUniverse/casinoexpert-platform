/**
 * Registry of CasinoConfig objects for casinoexpert.ai.
 *
 * Add a brand: drop lib/casino-data/<slug>.ts that exports a CasinoConfig,
 * import it here, and push into ALL. The dynamic route at
 * app/casinos/[slug]/page.tsx auto-generates the static page.
 *
 * Round-1 status: Jackpot City is the fully-written flagship. The other 12
 * brands are in lib/casino-stubs.ts as minimal configs (header + intro +
 * quick facts) until the editorial voice is locked.
 */

import type { CasinoConfig } from "@/components/casino/types";
import { JACKPOT_CITY } from "./jackpot-city";
import { ALL_STUBS } from "./_stubs";

const ALL: CasinoConfig[] = [JACKPOT_CITY, ...ALL_STUBS];

export const CASINO_REGISTRY: Record<string, CasinoConfig> = Object.fromEntries(
  ALL.map((c) => [c.slug, c])
);

export function getCasino(slug: string): CasinoConfig | undefined {
  return CASINO_REGISTRY[slug];
}

export function allCasinoSlugs(): string[] {
  return Object.keys(CASINO_REGISTRY);
}

/** Brands sorted by the casinogpt Ontario brand_position order (see lib/brand-order.ts). */
export function allCasinosInOrder(): CasinoConfig[] {
  // Order pulled from lib/brand-order.ts — keep in sync if that ever shifts.
  const order = [
    "jackpot-city",
    "zodiac",
    "royal-vegas",
    "ruby-fortune",
    "yukon-gold",
    "betway-casino",
    "betway-sports",
    "casino-classic",
    "golden-tiger",
    "grand-mondial",
    "luxury-casino",
    "spin-casino",
    "captain-cooks",
  ];
  return order.map((s) => CASINO_REGISTRY[s]).filter(Boolean);
}
