/**
 * Registry of CasinoConfig objects for casinoexpert.ai.
 *
 * Add a brand: drop lib/casino-data/<slug>.ts that exports a CasinoConfig,
 * import it here, and push into ALL. The dynamic route at
 * app/casinos/[slug]/page.tsx auto-generates the static page.
 *
 * Round-1 status: all 13 brands fully written (each has full
 * legality/trust/deposits/games/mobile/support/RG/suitability HTML
 * sections, 5–6 hand-written FAQs, badges, answerCapsule, expertVerdict,
 * trustScore, quickFacts).
 */

import type { CasinoConfig } from "@/components/casino/types";
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

const ALL: CasinoConfig[] = [
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

export const CASINO_REGISTRY: Record<string, CasinoConfig> = Object.fromEntries(
  ALL.map((c) => [c.slug, c])
);

export function getCasino(slug: string): CasinoConfig | undefined {
  return CASINO_REGISTRY[slug];
}

export function allCasinoSlugs(): string[] {
  return Object.keys(CASINO_REGISTRY);
}

/** Brands sorted by the casinogpt Ontario brand_position order. */
export function allCasinosInOrder(): CasinoConfig[] {
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
