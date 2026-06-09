/**
 * Author data — Andre Weston.
 *
 * Same person/identity used across the Lucky Universe properties
 * (casinogpt.ai → casinoexpert.ai). The bio below is written specifically
 * for casinoexpert.ai's global/pan-Canadian scope and is independent of
 * the AGCO-Ontario framing used on casinogpt.
 */

export interface AuthorData {
  slug: string;
  name: string;
  /** Short title used on bylines, e.g. "iGaming Industry Consultant" */
  title: string;
  /** Photo path relative to /public */
  photoSrc: string;
  /** Personal website URL */
  websiteUrl: string;
  /** Compact one-line credentials string for the byline strap */
  credentialsLine: string;
  /** Areas of expertise (used as chips on the author page) */
  expertiseTags: string[];
  /** Long-form bio paragraphs (rendered in order on the author page) */
  bioParagraphs: string[];
  /** Areas of expertise with one-line descriptions (grid on the author page) */
  expertiseAreas: Array<{ title: string; description: string }>;
}

export const ANDRE_WESTON: AuthorData = {
  slug: "andre-weston",
  name: "Andre Weston",
  title: "iGaming Industry Consultant",
  photoSrc: "/images/andre-weston.jpg",
  websiteUrl: "https://andreweston.com",
  credentialsLine: "20+ years in iGaming · Canadian and international markets",
  expertiseTags: [
    "Casino Operations",
    "Player Protection",
    "Payment Processing",
    "VIP Management",
    "Responsible Gambling",
  ],
  bioParagraphs: [
    "Andre Weston is an online casino industry expert with more than twenty years of experience across operations, payments, player protection, fraud prevention, VIP management, and platform integrity. His perspective is grounded in real operational experience inside major global online casino environments, combined with active firsthand player experience across dozens of platforms in Canada and abroad.",
    "Having worked across multiple disciplines inside casino operations, Andre has practical knowledge of how the systems function behind the scenes — including withdrawals, payment processing, account restrictions, bonus mechanics, compliance frameworks, and risk-management protocols. That dual perspective of operator-side and player-side experience is what lets him write reviews that are useful rather than promotional, because the texture comes from running the systems, not just touching them as a customer.",
    "Andre has also travelled extensively to major gambling jurisdictions including Las Vegas, attended international iGaming conferences, and worked across multiple regulatory regimes. The breadth helps him compare how operators behave when they're regulated tightly (UK, Malta, Ontario) versus more loosely (Kahnawake, Curaçao), and to translate that into clear guidance for Canadian players choosing where to play.",
  ],
  expertiseAreas: [
    {
      title: "Casino Operations",
      description:
        "Internal operations, platform management, game procurement, provider relationships.",
    },
    {
      title: "Payment Processing",
      description:
        "Deposit and withdrawal systems, KYC procedures, payment method evaluation, Interac integration.",
    },
    {
      title: "Player Protection",
      description:
        "Responsible gambling tools, self-exclusion systems, deposit limits, intervention protocols.",
    },
    {
      title: "Regulatory Familiarity",
      description:
        "UKGC, MGA, Kahnawake, and AGCO frameworks; how licensing affects player rights and recourse.",
    },
    {
      title: "Fraud Prevention",
      description:
        "Anti-fraud systems, identity verification, bonus abuse detection, account security.",
    },
    {
      title: "VIP Management",
      description:
        "Loyalty programs, VIP tiers, player retention strategies, high-roller operations.",
    },
  ],
};
