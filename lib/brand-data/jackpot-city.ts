import type { BrandReviewData } from "@/lib/review-types";

/**
 * Jackpot City — round-1 flagship review.
 *
 * Heritage-lead template. Hand-written hero / editor's take / Eggspert's
 * take / sister best-for framings (consistent across all four Bayton pages).
 * Facts and reputation paragraph ported from
 * docs/casinoexpert-brand-research-round1.md.
 */
export const JACKPOT_CITY: BrandReviewData = {
  /* Identification */
  slug: "jackpot-city",
  name: "Jackpot City",
  url: "https://www.jackpotcitycasino.com/canada/",

  /* Template selection */
  hero: "heritage",
  heroHeadline: "Jackpot City — 28 years online, reviewed for 2026",
  heroSubhead:
    "Since 1998, Jackpot City has been one of the most recognisable names in Canadian online casino. Here's what playing there actually looks like — the C$1,600 welcome offer in plain numbers, the Games Global library, how the brand backs itself up on trust, and where it sits among its three Bayton-family siblings.",
  editorsTake:
    "Jackpot City has been online since 1998 — twenty-eight years makes it the longest-running brand in this comparison and one of the most recognisable names in Canadian online casino. Where it really shines is the everyday experience: the largest welcome package of any Bayton-family site at C$1,600, repeat Interac withdrawals that typically arrive same-day, and a Free Shots draw that quietly attaches a C$1,000,000 jackpot to every login. Worth knowing — first-time payouts wait a couple of days while verification clears, which is standard for the Kahnawake licence but worth budgeting for if you're timing your first cashout.",

  /* Modules — chosen for JC specifically; order matters */
  modules: [
    "brand-history",
    "welcome-offer-math",
    "game-library-spotlight",
    "withdrawal-experience",
    "sister-comparison",
    "expert-verdict",
  ],

  /* Family + sisters */
  family: "bayton-4",
  sisters: [
    { slug: "royal-vegas", name: "Royal Vegas" },
    { slug: "spin-casino", name: "Spin Casino" },
    { slug: "ruby-fortune", name: "Ruby Fortune" },
  ],
  bestFor:
    "leads on welcome offer size (C$1,600), Free Shots draw with a C$1M daily jackpot, and is the only Bayton site advertising crypto deposits",

  /* Operator facts */
  operator: "Baytree Interactive Ltd",
  licenseBody: "Kahnawake Gaming Commission",
  licenseNumber: "#00892",
  licenseStatus: "issued 16 Feb 2022",
  yearFounded: 1998,

  /* Library */
  softwareProviders: [
    "Games Global",
    "On Air Entertainment",
    "Pragmatic Play",
    "Hacksaw Gaming",
    "Blueprint Gaming",
  ],
  gameCountClaim:
    "Headlined by Games Global with four other studio partners, the catalogue spans 3-reel and video slots, table games (blackjack, roulette, baccarat in multiple variants), live dealer rooms, and the progressive jackpot ladder anchored by the Mega Moolah family.",

  /* Offer + ongoing */
  welcomeOfferShort: "C$1,600 over your first 4 deposits + 10 daily Free Shots at a C$1M jackpot",
  wageringRequirement: "35× bonus (group-shared boilerplate, €8 max bet during WR)",
  minDeposit: "C$10",

  /* Banking */
  withdrawalTime:
    "first withdrawal 1–2 days for verification, repeat Interac payouts typically same-day per player reports",
  paymentMethods: ["Interac", "Visa", "Mastercard", "Crypto (advertised on homepage)"],

  /* Experience */
  mobile: "Native Casino App in the top nav alongside mobile-web access.",
  liveChat: "Yes (Help Centre + email)",

  /* Trust signals */
  formalAdr: "eCOGRA Safe & Fair (seal displayed on site)",
  trustpilot: "4.0 / 5 across ~8,020 reviews",
  casinoGuruSafety: "High 8.0",

  /* Reputation in practice — ported verbatim from Dice's research */
  reputationParagraph:
    "Jackpot City has run since 1998 and, in the rest-of-Canada market, operates under Baytree Interactive Ltd on a Kahnawake Gaming Commission licence (number 00892), with the eCOGRA \"Safe & Fair\" seal displayed on the live Canadian site and Gambling Therapy named as the responsible-gambling partner in the footer. Casino.Guru rates it a High 8.0 Safety Index, crediting its scale (revenue over C$1 billion), a low complaint-to-player ratio, and a clean blacklist record. Trustpilot sits at 4.0/5 across roughly 8,020 reviews, where the consistent theme from players is that first withdrawals sit a couple of days while verification clears — repeat Interac payouts typically arrive same-day — alongside praise for game range and the longevity of the brand. AskGamblers shows 5/10, but worth knowing: AskGamblers' complaint resolution rate is calculated only for operators that opt into their dispute process. AskGamblers has refused to register as a formally recognised Alternative Dispute Resolution body — unlike eCOGRA — so most regulated operators (Super Partners brands included) route disputes through eCOGRA or MGA-recognised bodies instead. A low AskGamblers CRM doesn't mean unresolved complaints; it reflects which ADR the operator engages with.",

  /* Signed expert verdict from Andre Weston */
  expertVerdict:
    "Jackpot City is one of the few brands in Canada with the operational maturity to back up the marketing. Twenty-eight years on the same Microgaming-now-Games-Global platform means the cashier, KYC, and bonus mechanics have been hardened against the kinds of failure modes that plague newer entrants. The C$1,600 welcome is the largest of the Bayton stable and the daily Free Shots draw is a genuine value-add rather than a bonus-trap. My real reason for placing it at the top of this comparison, though, is the eCOGRA certification — when something goes sideways, you have a regulated ADR you can actually escalate to, which is not something every operator in this space can say.",

  /* CTA */
  ctaLabel: "Visit Jackpot City",
  ctaHref: "https://www.jackpotcitycasino.com/canada/",
};
