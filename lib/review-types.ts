/**
 * Type contract for a brand-review page.
 *
 * Three hero variants + a menu of body modules — each brand picks the hero
 * that fits its identity and chooses 4–5 modules from the menu. Same data,
 * different shape per brand, which is what stops Google reading the set as
 * cookie-cutter.
 */

export type HeroVariant = "heritage" | "hook" | "experience";

export type ReviewModuleKey =
  | "welcome-offer-math"
  | "game-library-spotlight"
  | "loyalty-deepdive"
  | "mobile-walkthrough"
  | "live-dealer-focus"
  | "withdrawal-experience"
  | "brand-history"
  | "featured-game"
  | "sister-comparison"
  | "expert-verdict";

export type BrandFamily =
  | "bayton-4"
  | "betway"
  | "casino-rewards-7"
  | "independent";

export interface BrandRef {
  /** URL slug under /casinos/ */
  slug: string;
  /** Display name (e.g. "Jackpot City") */
  name: string;
}

export interface BrandReviewData {
  /* Identification */
  slug: string;
  name: string;
  url: string;

  /* Template selection */
  hero: HeroVariant;
  /** Headline for the chosen hero — brand-specific, hand-written */
  heroHeadline: string;
  /** Sub-headline for the chosen hero (1–2 sentences) */
  heroSubhead: string;
  /** Three-sentence editor's take — appears once per brand, hand-written */
  editorsTake: string;

  /* Modules to render (in this order) */
  modules: ReviewModuleKey[];

  /* Family + sisters (used by sister-comparison module) */
  family: BrandFamily;
  sisters?: BrandRef[];
  /** What this brand is best for, in the family context */
  bestFor?: string;

  /* Operator facts */
  operator: string;
  licenseBody: string;
  licenseNumber: string;
  /** e.g. "verified active", "surrendered", "active" */
  licenseStatus?: string;
  yearFounded?: number;

  /* Library / sportsbook */
  softwareProviders?: string[];
  gameCountClaim?: string;

  /* Offer + ongoing */
  welcomeOfferShort: string;
  wageringRequirement?: string;
  minDeposit?: string;

  /* Banking */
  withdrawalTime?: string;
  paymentMethods?: string[];

  /* Experience */
  mobile?: string;
  liveChat?: string;

  /* Trust signals */
  formalAdr?: string;
  trustpilot?: string;
  casinoGuruSafety?: string;

  /* Reputation in practice — written as a single narrative paragraph */
  reputationParagraph: string;

  /**
   * Signed expert verdict from Andre Weston — ~80–120 words, opinion-led,
   * written from operator-side knowledge. Drives the ExpertVerdict module.
   */
  expertVerdict?: string;

  /**
   * Optional path (under /public) to a full-page screenshot of the brand's
   * live site, captured by Dice from the Vancouver VPN. Renders as a
   * "What you'll see when you arrive" snapshot between the editor's take
   * and the module flow.
   */
  screenshotSrc?: string;
  /** Caption shown under the screenshot (date + IP context) */
  screenshotCaption?: string;

  /* CTA */
  ctaLabel?: string;
  ctaHref?: string;
}
