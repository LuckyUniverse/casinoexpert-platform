/**
 * Brand logo helpers for the round-1 thirteen.
 * Sources are square PNGs under /public/logos/ matching our slug convention
 * (no "-casino" / "-square" suffixes — see scripts/extract-brand-assets.js
 * for the rename mapping from the casinogpt source set).
 *
 * To add a brand: drop {slug}.png into public/logos/ and register it below.
 */

const AVAILABLE_SLUGS: ReadonlySet<string> = new Set([
  "betway-casino",
  "betway-sports",
  "captain-cooks",
  "casino-classic",
  "golden-tiger",
  "grand-mondial",
  "jackpot-city",
  "luxury-casino",
  "royal-vegas",
  "ruby-fortune",
  "spin-casino",
  "yukon-gold",
  "zodiac",
]);

export function hasBrandLogo(slug: string): boolean {
  return AVAILABLE_SLUGS.has(slug);
}

export function brandLogoSrc(slug: string): string {
  return `/logos/${slug}.png`;
}

/** Brands whose logos are white-on-transparent and need a dark tile background. */
export const DARK_TILE_BRANDS: ReadonlySet<string> = new Set([]);

/** Brands whose logos are full-bleed badges (their own background built in). */
export const SELF_TILED_BRANDS: ReadonlySet<string> = new Set([]);
