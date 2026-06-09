/**
 * Round-1 stubs for the 12 brands that haven't been fully written yet.
 *
 * Each stub has enough content for the brand review page to render without
 * gaps (header, intro, quick facts, FAQs, RG section), but content sections
 * (Legality, Trust, Deposits, Games, Mobile, Support, Suitability) are
 * intentionally minimal — they get a one-paragraph placeholder that's
 * factually correct but light, pending the editorial voice review on the
 * Jackpot City flagship.
 *
 * When the JC voice is locked, port the rich content into these one by one.
 */

import type { CasinoConfig } from "@/components/casino/types";

const PLACEHOLDER_HTML = `<p>This section is being expanded. The factual basics are captured in the Quick Facts table above; richer editorial — bonus mechanics, payout pacing, game-library walkthroughs, support test — will land in the next content pass.</p>`;

const STANDARD_RG_HTML = `
  <p>The operator's footer lists responsible-gambling resources; in-account tools include deposit limits, session limits, cooling-off periods and self-exclusion (accessible from account settings once logged in).</p>
  <p>External resources: <a href="https://www.gamcare.org.uk/" target="_blank" rel="noopener noreferrer">GamCare</a>, <a href="https://www.gamblingtherapy.org/" target="_blank" rel="noopener noreferrer">Gambling Therapy</a>, <a href="https://www.gamblersanonymous.org/" target="_blank" rel="noopener noreferrer">Gamblers Anonymous</a>. If you're in Ontario, ConnexOntario at 1-866-531-2600 provides 24/7 confidential support.</p>
`;

const STANDARD_FAQS = (name: string) => [
  {
    question: `Is ${name} legal for Canadian players outside Ontario?`,
    answer: `Yes — the .com site operates under the licence shown in the Quick Facts table and is available to Canadian players outside Ontario. For Ontario players, ${name} either has a separate iGaming Ontario–licensed site or directs you to a regulated alternative.`,
  },
  {
    question: `Does ${name} accept Interac for Canadians?`,
    answer: `Interac e-Transfer is among the deposit/withdrawal methods displayed on the cashier. Other methods include Visa, Mastercard and (where supported) e-wallets like Skrill or Neteller. Specific limits and timings are operator-disclosed at the cashier.`,
  },
  {
    question: `What's the wagering requirement on the ${name} welcome offer?`,
    answer: `The headline offer and its wagering math are summarised in the Quick Facts table above. Always verify the live offer at the cashier before depositing — operators occasionally A/B-test wagering and bonus structures.`,
  },
  {
    question: `Is ${name} eCOGRA-certified?`,
    answer: `Operators in the Super Partners and Casino Rewards stables typically display the eCOGRA "Safe & Fair" seal, which doubles as the formal Alternative Dispute Resolution body recognised by the Kahnawake Gaming Commission. The Quick Facts table confirms the brand's exact certification.`,
  },
];

function stub(over: Partial<CasinoConfig> & Pick<CasinoConfig, "slug" | "name" | "shortName">): CasinoConfig {
  return {
    operator: "Pending verification",
    jurisdiction: "Rest of Canada (.com)",
    regulator: "Kahnawake Gaming Commission",
    license: "Kahnawake — see Quick Facts",
    founded: "—",
    currency: "CAD",
    languages: ["English"],
    minAge: 19,
    affiliateUrl: "",
    dealLive: false,
    isActive: true,
    introduction: `${over.name} is one of the brands currently featured on casinoexpert.ai. The full editorial review is being expanded — the Quick Facts table below carries the licensing, banking and library basics in the meantime.`,
    quickFacts: [],
    legalityContent: PLACEHOLDER_HTML,
    trustContent: PLACEHOLDER_HTML,
    depositsContent: PLACEHOLDER_HTML,
    gamesContent: PLACEHOLDER_HTML,
    mobileContent: PLACEHOLDER_HTML,
    responsibleGamblingContent: STANDARD_RG_HTML,
    suitabilityContent: PLACEHOLDER_HTML,
    faqs: STANDARD_FAQS(over.name),
    lastReviewed: "2026-06-09",
    ...over,
  };
}

// — Bayton sisters — same backend as Jackpot City, different headline offers.
const ZODIAC: CasinoConfig = stub({
  slug: "zodiac",
  name: "Zodiac Casino",
  shortName: "Zodiac",
  operator: "Fresh Horizons Ltd (Casino Rewards group)",
  license: "Kahnawake Gaming Commission #00972",
  founded: "2001",
  themeColor: "purple",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://zodiac.casino/en/",
  dealLive: true,
  introduction:
    "Zodiac Casino is the cheapest entry in the Casino Rewards group — $1 buys 80 chances on the Mega Money Wheel — and the longest welcome ladder of the family at five deposits. Astrology theme, Kahnawake licence #00972 (Fresh Horizons Ltd), and the eCOGRA seal that runs across the group. Online since 2001.",
  quickFacts: [
    { label: "Operator", value: "Fresh Horizons Ltd (Casino Rewards group)" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00972" },
    { label: "Online since", value: "2001" },
    { label: "Software", value: "Games Global (Microgaming)" },
    { label: "Welcome offer", value: "$1 → 80 chances · 5-deposit ladder up to ~C$480 total" },
    { label: "Wagering requirement", value: "~200× on the entrance offer (group T&Cs)" },
    { label: "Minimum deposit", value: "$1 first / C$10 subsequent" },
    { label: "Withdrawal timing", value: "~2-day hold reported on first cashouts" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Mobile + Casino Rewards apps" },
    { label: "Live chat", value: "24/7 (+ email)" },
    { label: "Formal ADR", value: "eCOGRA (monthly fairness tests)" },
  ],
});

const ROYAL_VEGAS: CasinoConfig = stub({
  slug: "royal-vegas",
  name: "Royal Vegas",
  shortName: "Royal Vegas",
  operator: "Baytree Interactive Ltd",
  license: "Kahnawake Gaming Commission #00892",
  founded: "2000",
  themeColor: "blue",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://www.royalvegascasino.com/canada/",
  dealLive: true,
  introduction:
    "Royal Vegas is the most table-game-forward of the four Bayton-family casinos — Evolution live tables sit in the hero of the site, the nav splits Casino Games and Table Games prominently. C$1,200 welcome across four deposits, same Kahnawake licence and eCOGRA seal as Jackpot City. Online since 2000.",
  quickFacts: [
    { label: "Operator", value: "Baytree Interactive Ltd" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00892" },
    { label: "Online since", value: "2000" },
    { label: "Software", value: "Games Global + Evolution live" },
    { label: "Welcome offer", value: "C$1,200 over 4 deposits + 10 daily spins" },
    { label: "Wagering requirement", value: "35× bonus (Bayton group boilerplate)" },
    { label: "Minimum deposit", value: "C$10" },
    { label: "Withdrawal timing", value: "First payout 1–2 days for KYC; repeat faster" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Mobile-optimised + group app" },
    { label: "Live chat", value: "Yes (+ email)" },
    { label: "Formal ADR", value: "eCOGRA Safe & Fair (monthly audits)" },
  ],
});

const RUBY_FORTUNE: CasinoConfig = stub({
  slug: "ruby-fortune",
  name: "Ruby Fortune",
  shortName: "Ruby Fortune",
  operator: "Baytree Interactive Ltd",
  license: "Kahnawake Gaming Commission #00892",
  founded: "2003",
  themeColor: "red",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://www.rubyfortune.com/ca/",
  dealLive: true,
  introduction:
    "Ruby Fortune is the most jackpot-forward of the four Bayton-family casinos — Mega Moolah, King of Alexandria and the Mega Millionaire Wheel sit in the hero, and the homepage openly states an over-450-game catalogue. C$750 welcome (smallest of the family), same Kahnawake licence and eCOGRA seal. Online since 2003.",
  quickFacts: [
    { label: "Operator", value: "Baytree Interactive Ltd" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00892" },
    { label: "Online since", value: "2003" },
    { label: "Software", value: "Games Global (Microgaming)" },
    { label: "Welcome offer", value: "C$750 over 3 deposits + 10 daily spins" },
    { label: "Wagering requirement", value: "35× bonus (Bayton group boilerplate)" },
    { label: "Minimum deposit", value: "C$10" },
    { label: "Withdrawal timing", value: "First payout pauses for KYC; repeat faster" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Mobile casino + group app" },
    { label: "Live chat", value: "Yes (+ email)" },
    { label: "Formal ADR", value: "eCOGRA (RTP 93.89% cited 2025)" },
  ],
});

const YUKON_GOLD: CasinoConfig = stub({
  slug: "yukon-gold",
  name: "Yukon Gold Casino",
  shortName: "Yukon Gold",
  operator: "Fresh Horizons Ltd (Casino Rewards group)",
  license: "Kahnawake Gaming Commission #00972",
  founded: "2004",
  themeColor: "yellow",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://yukongold.casino/en/",
  dealLive: true,
  introduction:
    "Yukon Gold is the low-friction entry to the Casino Rewards family — C$10 buys 150 chances on the Mega Money Wheel, followed by a 100% second-deposit match up to C$150. Gold-rush theme, Kahnawake licence #00972 (Fresh Horizons Ltd), eCOGRA seal with monthly published payout reports. Online since 2004.",
  quickFacts: [
    { label: "Operator", value: "Fresh Horizons Ltd (Casino Rewards group)" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00972" },
    { label: "Online since", value: "2004" },
    { label: "Software", value: "Games Global + Real Dealer live" },
    { label: "Welcome offer", value: "150 chances for C$10 + 100% up to C$150 on deposit 2" },
    { label: "Wagering requirement", value: "Not stated on bonus page; group free-spin WR ~200×" },
    { label: "Minimum deposit", value: "C$10" },
    { label: "Withdrawal timing", value: "C$4,000 weekly cap (group-wide)" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Mobile + Casino Rewards apps" },
    { label: "Live chat", value: "24/7 (+ email)" },
    { label: "Formal ADR", value: "eCOGRA + monthly payout reports (~96.38% RTP)" },
  ],
});

const BETWAY_CASINO: CasinoConfig = stub({
  slug: "betway-casino",
  name: "Betway Casino",
  shortName: "Betway",
  operator: "Super Group (SGHC, NYSE)",
  license: "MGA/B2C/130/2006 + UKGC #39372",
  founded: "2006",
  themeColor: "green",
  badges: [{ label: "MGA Licensed", tone: "blue" }, { label: "UKGC Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://betway.com/bwp/welcome-casino-ca-1000-50/en-ca/",
  dealLive: true,
  introduction:
    "Betway Casino is the only round-1 brand with an active Malta Gaming Authority licence on the public register (Betway Limited, MGA/B2C/130/2006) plus a UKGC licence (#39372). Operated by NYSE-listed Super Group. Heavy Evolution live-casino floor and the strongest regulatory backbone in the comparison.",
  quickFacts: [
    { label: "Operator", value: "Super Group (SGHC, NYSE)" },
    { label: "Licence", value: "MGA/B2C/130/2006 (verified active) + UKGC #39372" },
    { label: "Online since", value: "2006" },
    { label: "Software", value: "Games Global, Evolution, NetEnt, Pragmatic, Play'n GO" },
    { label: "Welcome offer", value: "100% first-deposit match (headline C$ pending re-verification)" },
    { label: "Wagering requirement", value: "50× bonus (operator T&C); ~C$7.5 max bet during WR" },
    { label: "Minimum deposit", value: "C$10" },
    { label: "Withdrawal timing", value: "~72h pending + 3–8 banking days (review-sourced)" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Native iOS + Android apps" },
    { label: "Live chat", value: "24/7 + email + phone (1-877-811-2604)" },
    { label: "Formal ADR", value: "eCOGRA (ISO 27001 awarded 2018)" },
  ],
});

const BETWAY_SPORTS: CasinoConfig = stub({
  slug: "betway-sports",
  name: "Betway Sports",
  shortName: "Betway Sports",
  operator: "Super Group (SGHC, NYSE)",
  license: "MGA/B2C/130/2006 Type 2 + UKGC #39372",
  founded: "2006",
  themeColor: "green",
  badges: [{ label: "MGA Licensed", tone: "blue" }, { label: "UKGC Licensed", tone: "blue" }],
  affiliateUrl: "https://betway.com/bwp/casportsoffer/en-ca/",
  dealLive: true,
  introduction:
    "Betway Sports shares the operator, MGA + UKGC licensing and eCOGRA relationship with Betway Casino, but the product is a different animal: 30+ sports, 30,000+ markets, deep hockey player props, a dedicated esports portal, and Interac payouts faster than the casino side (1–3 business days).",
  quickFacts: [
    { label: "Operator", value: "Super Group (SGHC, NYSE)" },
    { label: "Licence", value: "MGA/B2C/130/2006 Type 2 (Betway Ltd) + UKGC #39372" },
    { label: "Online since", value: "2006" },
    { label: "Sports", value: "30+ sports, 30,000+ betting markets, esports portal" },
    { label: "Welcome offer", value: "C$200 first-bet refund + 20 spins OR 100% match up to C$300 + 50 spins" },
    { label: "Wagering requirement", value: "10× on match bonus; free bets carry no wagering" },
    { label: "Minimum deposit", value: "C$10" },
    { label: "Withdrawal timing", value: "~1–3 business days via Interac" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "iOS 4.6★ / Android 4.5★ apps" },
    { label: "Live chat", value: "24/7 + email + phone" },
    { label: "Formal ADR", value: "eCOGRA (brand-wide)" },
  ],
});

const CASINO_CLASSIC: CasinoConfig = stub({
  slug: "casino-classic",
  name: "Casino Classic",
  shortName: "Casino Classic",
  operator: "Fresh Horizons Ltd (Casino Rewards group)",
  license: "Kahnawake Gaming Commission #00972",
  founded: "1999",
  themeColor: "purple",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://casinoclassic.casino/en/",
  dealLive: true,
  introduction:
    "Casino Classic is the longest-running brand in the Casino Rewards lineup at 27 years, and the only brand in this comparison offering a no-deposit jackpot chance — try the Mega Money Wheel free, then $1 buys 40 more spins. Retro Vegas theme, same Kahnawake licence and eCOGRA approval as the rest of the group.",
  quickFacts: [
    { label: "Operator", value: "Fresh Horizons Ltd (Casino Rewards group)" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00972" },
    { label: "Online since", value: "1999" },
    { label: "Software", value: "Games Global (37 providers verified)" },
    { label: "Welcome offer", value: "FREE no-deposit chance · $1 → 40 chances · 2nd: 100% up to C$200" },
    { label: "Wagering requirement", value: "Not stated on bonus page (group T&Cs)" },
    { label: "Minimum deposit", value: "$1 (free no-deposit entry available)" },
    { label: "Withdrawal timing", value: "Not disclosed on site" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Mobile + Casino Rewards apps" },
    { label: "Live chat", value: "24/7 (+ email)" },
    { label: "Formal ADR", value: "eCOGRA-approved (RNG + ADR)" },
  ],
});

const GOLDEN_TIGER: CasinoConfig = stub({
  slug: "golden-tiger",
  name: "Golden Tiger Casino",
  shortName: "Golden Tiger",
  operator: "Fresh Horizons Ltd (Casino Rewards group)",
  license: "Kahnawake Gaming Commission #00972",
  founded: "2000",
  themeColor: "yellow",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://goldentiger.casino/en/",
  dealLive: true,
  introduction:
    "Golden Tiger is the Casino Rewards brand that leads on match-bonus value rather than a low-deposit hook — C$1,500 across five deposits, an RTP / 'Highest Win Rate' guarantee, a sweepstakes layer and a multi-tier Casino Rewards VIP. Same Kahnawake licence and eCOGRA seal as the rest of the family.",
  quickFacts: [
    { label: "Operator", value: "Fresh Horizons Ltd (Casino Rewards group)" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00972 + AGCO for ON" },
    { label: "Online since", value: "2000" },
    { label: "Software", value: "Games Global (audited platform)" },
    { label: "Welcome offer", value: "Up to C$1,500 over 5 deposits (100%/50%/20%/30%/100%)" },
    { label: "Wagering requirement", value: "Not stated on bonus page (RTP guarantee promoted)" },
    { label: "Minimum deposit", value: "Not disclosed on bonus page" },
    { label: "Withdrawal timing", value: "Not disclosed on site" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Mobile + Casino Rewards apps" },
    { label: "Live chat", value: "24/7 (+ priority support at higher VIP tiers)" },
    { label: "Formal ADR", value: "eCOGRA 'Safe and Fair'" },
  ],
});

const GRAND_MONDIAL: CasinoConfig = stub({
  slug: "grand-mondial",
  name: "Grand Mondial Casino",
  shortName: "Grand Mondial",
  operator: "Fresh Horizons Ltd (Casino Rewards group)",
  license: "Kahnawake Gaming Commission #00972",
  founded: "2005",
  themeColor: "purple",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://grandmondial.casino/en/",
  dealLive: true,
  introduction:
    "Grand Mondial is the only Casino Rewards brand openly advertising 'over 1,000 games' on its homepage, with a two-step welcome that pairs 150 Mega Money Wheel spins with a 100% second-deposit match up to C$250 — the most generous single match top-up of the cheap-entry brands. Royal theme, same Kahnawake licence and eCOGRA seal.",
  quickFacts: [
    { label: "Operator", value: "Fresh Horizons Ltd (Casino Rewards group)" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00972 + AGCO for ON" },
    { label: "Online since", value: "~2005–2006" },
    { label: "Software", value: "Games Global (Microgaming)" },
    { label: "Game count", value: "Over 1,000 (stated on site)" },
    { label: "Welcome offer", value: "150 chances for C$10 + 100% up to C$250 on deposit 2" },
    { label: "Wagering requirement", value: "Not stated on bonus page (group T&Cs)" },
    { label: "Minimum deposit", value: "C$10" },
    { label: "Withdrawal timing", value: "~48h pending reported" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Mobile + Casino Rewards apps" },
    { label: "Live chat", value: "24/7 (+ email)" },
    { label: "Formal ADR", value: "eCOGRA + monthly payout reports" },
  ],
});

const LUXURY_CASINO: CasinoConfig = stub({
  slug: "luxury-casino",
  name: "Luxury Casino",
  shortName: "Luxury Casino",
  operator: "Fresh Horizons Ltd (Casino Rewards group)",
  license: "Kahnawake Gaming Commission #00972",
  founded: "2000",
  themeColor: "purple",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://luxury.casino/en/",
  dealLive: true,
  introduction:
    "Luxury Casino is the Casino Rewards group's premium-positioned brand — a graduated five-deposit match where the middle deposits carry the largest caps (up to C$300), wrapped in an indulgent luxury identity. Same Kahnawake licence and eCOGRA seal as the rest of the family. Solidly favourable independent reputation (Casino.Guru 9.5, Trustpilot 4.3).",
  quickFacts: [
    { label: "Operator", value: "Fresh Horizons Ltd (Casino Rewards group)" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00972 + AGCO for ON" },
    { label: "Online since", value: "2000" },
    { label: "Software", value: "Games Global (no fake games per Casino.Guru Gamecheck)" },
    { label: "Welcome offer", value: "5-deposit match: 100%/50%/25%/50%/100% up to C$150/200/300/200/150" },
    { label: "Wagering requirement", value: "Not stated on bonus page (group T&Cs)" },
    { label: "Minimum deposit", value: "Not disclosed on bonus page" },
    { label: "Withdrawal timing", value: "~2+ days reported on first cashouts" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Mobile + Casino Rewards apps" },
    { label: "Live chat", value: "24/7 (+ email)" },
    { label: "Formal ADR", value: "eCOGRA 'Safe and Fair'" },
  ],
});

const SPIN_CASINO: CasinoConfig = stub({
  slug: "spin-casino",
  name: "Spin Casino",
  shortName: "Spin Casino",
  operator: "Baytree Interactive Ltd",
  license: "Kahnawake Gaming Commission #00892",
  founded: "2001",
  themeColor: "red",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://www.spincasino.com/ca/",
  dealLive: true,
  introduction:
    "Spin Casino launched in 2001 as Spin Palace and runs on the same Bayton backend as Jackpot City, but leads with its Loyalty Club, a Vegas-strip identity and a smaller C$1,000 welcome across three deposits. Same Kahnawake licence and eCOGRA seal, with the loyalty engine running across all four Bayton sisters.",
  quickFacts: [
    { label: "Operator", value: "Baytree Interactive Ltd" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00892" },
    { label: "Online since", value: "2001 (as Spin Palace)" },
    { label: "Software", value: "Games Global (Microgaming)" },
    { label: "Welcome offer", value: "C$1,000 over 3 deposits + 10 daily spins" },
    { label: "Wagering requirement", value: "35× bonus (Bayton group boilerplate)" },
    { label: "Minimum deposit", value: "C$10" },
    { label: "Withdrawal timing", value: "First payout pauses for KYC; repeat faster" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Native Casino App + mobile web" },
    { label: "Live chat", value: "Yes (+ email)" },
    { label: "Formal ADR", value: "eCOGRA Safe & Fair (annual audits)" },
  ],
});

const CAPTAIN_COOKS: CasinoConfig = stub({
  slug: "captain-cooks",
  name: "Captain Cooks Casino",
  shortName: "Captain Cooks",
  operator: "Fresh Horizons Ltd (Casino Rewards group)",
  license: "Kahnawake Gaming Commission #00972",
  founded: "2003",
  themeColor: "blue",
  badges: [{ label: "Kahnawake Licensed", tone: "blue" }, { label: "eCOGRA Audited", tone: "green" }],
  affiliateUrl: "https://captaincooks.casino/en/",
  dealLive: true,
  introduction:
    "Captain Cooks is the mid-priced entry in the Casino Rewards group — C$5 buys 100 chances on the Mega Money Wheel (the highest spin count of the cheap-entry brands), followed by a five-deposit ladder marketed as a $500 signup bonus. Explorer / nautical theme, same Kahnawake licence and eCOGRA seal as its sisters.",
  quickFacts: [
    { label: "Operator", value: "Fresh Horizons Ltd (Casino Rewards group)" },
    { label: "Licence", value: "Kahnawake Gaming Commission #00972 + AGCO for ON" },
    { label: "Online since", value: "2003" },
    { label: "Software", value: "Games Global (Microgaming)" },
    { label: "Welcome offer", value: "100 chances for $5 + 5-deposit ladder up to $500" },
    { label: "Wagering requirement", value: "Not stated on bonus page (group T&Cs)" },
    { label: "Minimum deposit", value: "C$5 first / C$10 subsequent" },
    { label: "Withdrawal timing", value: "~48h excluding weekends, C$4,000 weekly cap" },
    { label: "CAD support", value: "Yes" },
    { label: "Mobile", value: "Mobile + Casino Rewards apps" },
    { label: "Live chat", value: "24/7 (+ email)" },
    { label: "Formal ADR", value: "eCOGRA (published RNG/RTP)" },
  ],
});

export const ALL_STUBS: CasinoConfig[] = [
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
