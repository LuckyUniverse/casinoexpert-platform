/**
 * CasinoConfig - data shape for a brand review page on casinoexpert.ai.
 * Mirrors casinogpt's CasinoConfig but trimmed for ROC scope (no iGO, no
 * Ontario cities, no AGCO-specific fields).
 */
export interface CasinoConfig {
  slug: string;
  name: string;
  /** Short name used in CTAs (e.g. "Jackpot City" → "Jackpot City"). */
  shortName: string;
  operator: string;
  jurisdiction: string;
  regulator: string;
  license: string;
  licenseIssued?: string;
  founded: string;
  registeredCompany?: string;
  registeredAddress?: string;
  currency: string;
  languages: string[];
  minAge: number;

  affiliateUrl: string;
  dealLive: boolean;
  /** True when the brand is part of our Super Partners / Casino Rewards roster. */
  isActive?: boolean;
  themeColor?: "blue" | "purple" | "yellow" | "green" | "red";

  /** 40-60 word AI-citation snippet. */
  answerCapsule?: string;
  /** 2-sentence Andre Weston take. */
  expertVerdict?: string;
  /** 0-100 computed trust score. */
  trustScore?: number;
  trustRating?: string;

  /** Opening paragraph below H1. */
  introduction: string;

  quickFacts: Array<{ label: string; value: string }>;

  aboutContent?: string; // HTML
  keyCharacteristics?: Array<{ title: string; description: string }>;

  legalityContent: string; // HTML
  trustContent: string; // HTML
  depositsContent: string; // HTML
  gamesContent: string; // HTML
  mobileContent: string; // HTML
  supportContent?: string; // HTML
  responsibleGamblingContent: string; // HTML
  suitabilityContent: string; // HTML

  faqs: Array<{ question: string; answer: string }>;

  references?: string; // HTML

  paymentMethods?: string[];

  /** ISO date string for last review (freshness signal). */
  lastReviewed?: string;

  /** Displayed as small chips in the page header. */
  badges?: Array<{ label: string; tone?: "blue" | "green" | "gray" | "amber" }>;
}
