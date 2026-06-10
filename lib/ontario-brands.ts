/**
 * Ontario brand directory for casinoexpert.ai.
 *
 * 12 brands we have iGaming Ontario / AGCO deals on, in the same
 * commercial-priority order used on casinogpt's Ontario dashboard.
 * Affiliate URLs are pulled from casinogpt's Supabase (the same tracked
 * links used on casinogpt.ai, Andrew's call).
 *
 * IMPORTANT: This file backs /casinos/ontario, which is the ONLY page on
 * casinoexpert.ai that talks about Ontario. AGCO Standard 2.05 binds the
 * copy on that page, no welcome-offer / bonus / free-spin / jackpot-$ /
 * loyalty-program language. Keep brand descriptions factual + neutral.
 */

export interface OntarioBrand {
  /** URL slug on casinoexpert.ai (when we eventually wire review pages) */
  slug: string;
  /** Display name */
  name: string;
  /** Short name for compact UI */
  shortName: string;
  /** iGO-registered operator entity */
  operator: string;
  /** Year the brand first went online */
  founded: number;
  /** Software / platform powering the brand */
  software: string;
  /** Logo slug matching public/logos/<slug>.png */
  logoSlug: string;
  /** Affiliate URL pulled from casinogpt's Supabase */
  affiliateUrl: string;
  /** 1-line AGCO-safe description (no offers / bonuses / inducement) */
  blurb: string;
}

export const ONTARIO_BRANDS: OntarioBrand[] = [
  {
    slug: "jackpot-city",
    name: "Jackpot City",
    shortName: "Jackpot City",
    operator: "Baytree Interactive Ltd",
    founded: 1998,
    software: "Games Global (Microgaming)",
    logoSlug: "jackpot-city",
    affiliateUrl: "https://jackpotcity.ca/?s=bfp19644&a=spadid228857",
    blurb: "Long-established Ontario operator with a Microgaming-powered library and Evolution live tables.",
  },
  {
    slug: "zodiac",
    name: "Zodiac Casino",
    shortName: "Zodiac",
    operator: "Fresh Horizons Ltd",
    founded: 2001,
    software: "Games Global (Microgaming)",
    logoSlug: "zodiac",
    affiliateUrl: "https://iredirect.net/referral/?site=zc&lang=en&aff_id=aff117127",
    blurb: "Astrology-themed Casino Rewards brand on the Microgaming platform with progressive jackpot integration.",
  },
  {
    slug: "royal-vegas",
    name: "Royal Vegas",
    shortName: "Royal Vegas",
    operator: "Baytree Interactive Ltd",
    founded: 2000,
    software: "Games Global + Evolution Live",
    logoSlug: "royal-vegas",
    affiliateUrl: "https://royalvegas.ca/?s=bfp19644&a=spadid228857",
    blurb: "Table-game-led brand with an Evolution-powered live-dealer floor and a deep Microgaming slot catalogue.",
  },
  {
    slug: "ruby-fortune",
    name: "Ruby Fortune",
    shortName: "Ruby Fortune",
    operator: "CADTREE LIMITED",
    founded: 2003,
    software: "Games Global (Microgaming)",
    logoSlug: "ruby-fortune",
    affiliateUrl: "https://rubyfortune.ca/?s=bfp19644&a=spadid228857",
    blurb: "Curated Microgaming library focused on progressive jackpot titles, on the Bayton-family platform.",
  },
  {
    slug: "yukon-gold",
    name: "Yukon Gold Casino",
    shortName: "Yukon Gold",
    operator: "Fresh Horizons Ltd",
    founded: 2004,
    software: "Games Global (Microgaming)",
    logoSlug: "yukon-gold",
    affiliateUrl: "https://iredirect.net/referral/?site=yg&lang=en&aff_id=aff117127",
    blurb: "Casino Rewards group brand on the Microgaming platform with cross-site loyalty progression.",
  },
  {
    slug: "betway",
    name: "Betway",
    shortName: "Betway",
    operator: "Super Group (SGHC, NYSE)",
    founded: 2006,
    software: "Multi-provider: Games Global, Evolution, NetEnt, Pragmatic, Play'n GO",
    logoSlug: "betway-casino",
    affiliateUrl: "https://www.betway.com/?s=bfp19644&a=spadid228857",
    blurb: "NYSE-listed Super Group operator running both casino and sports products on a single account.",
  },
  {
    slug: "casino-classic",
    name: "Casino Classic",
    shortName: "Casino Classic",
    operator: "Fresh Horizons Ltd",
    founded: 1999,
    software: "Games Global (Microgaming)",
    logoSlug: "casino-classic",
    affiliateUrl: "https://iredirect.net/referral/?site=cc&lang=en&aff_id=aff117127",
    blurb: "Long-running Casino Rewards brand with a verified Microgaming catalogue.",
  },
  {
    slug: "golden-tiger",
    name: "Golden Tiger Casino",
    shortName: "Golden Tiger",
    operator: "Fresh Horizons Ltd",
    founded: 2000,
    software: "Games Global (Microgaming)",
    logoSlug: "golden-tiger",
    affiliateUrl: "https://iredirect.net/referral/?site=gt&lang=en&aff_id=aff117127",
    blurb: "Casino Rewards brand on the Microgaming platform with multi-tier VIP support.",
  },
  {
    slug: "grand-mondial",
    name: "Grand Mondial Casino",
    shortName: "Grand Mondial",
    operator: "Fresh Horizons Ltd",
    founded: 2005,
    software: "Games Global (Microgaming)",
    logoSlug: "grand-mondial",
    affiliateUrl: "https://iredirect.net/referral/?site=gmd&lang=en&aff_id=aff117127",
    blurb: "Casino Rewards group brand advertising one of the larger Microgaming catalogues in the family.",
  },
  {
    slug: "luxury-casino",
    name: "Luxury Casino",
    shortName: "Luxury",
    operator: "Fresh Horizons Ltd",
    founded: 2000,
    software: "Games Global (Microgaming)",
    logoSlug: "luxury-casino",
    affiliateUrl: "https://iredirect.net/referral/?site=lxc&lang=en&aff_id=aff117127",
    blurb: "Premium-positioned Casino Rewards brand on the Microgaming platform.",
  },
  {
    slug: "spin-casino",
    name: "Spin Casino",
    shortName: "Spin Casino",
    operator: "Baytree Interactive Ltd",
    founded: 2001,
    software: "Games Global (Microgaming)",
    logoSlug: "spin-casino",
    affiliateUrl: "https://spincasino.ca/?s=bfp19644&a=spadid228857",
    blurb: "Bayton-family brand with a featured Loyalty Club running across all four sister sites.",
  },
  {
    slug: "captain-cooks",
    name: "Captain Cooks Casino",
    shortName: "Captain Cooks",
    operator: "Fresh Horizons Ltd",
    founded: 2003,
    software: "Games Global (Microgaming)",
    logoSlug: "captain-cooks",
    affiliateUrl: "https://iredirect.net/referral/?site=ccc&lang=en&aff_id=aff117127",
    blurb: "Explorer-themed Casino Rewards brand with cross-site loyalty progression.",
  },
];
