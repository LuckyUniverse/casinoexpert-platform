import { ReviewLayout } from "@/components/review/ReviewLayout";
import type { BrandReviewData } from "@/lib/review-types";

/**
 * Internal demo page — renders one review using the three master templates
 * with sample data so we can confirm the system works end-to-end before
 * Dice's full research lands.
 *
 * This page is internal-only (the whole site is behind the basic-auth
 * wall while WIP) and will be removed once real brand pages ship.
 */

const JACKPOT_CITY_SAMPLE: BrandReviewData = {
  slug: "jackpot-city",
  name: "Jackpot City",
  url: "https://www.jackpotcitycasino.com/canada/",
  hero: "heritage",
  heroHeadline: "Jackpot City — Canada's longest-running online casino, reviewed",
  heroSubhead:
    "Since 1998, Jackpot City has been one of the most recognisable names in Canadian online casino. Here's what playing there actually looks like in 2026 — the welcome offer, the Microgaming–now–Games Global library, and how the brand backs itself up on trust.",
  editorsTake:
    "Jackpot City is the brand most Canadians have heard of for a reason — it has 28 years of operating history, a clean eCOGRA-certified backbone, and one of the largest welcome packages in the market. Where it really shines is the everyday experience: fast repeat withdrawals through Interac, a steady Games Global pipeline, and a loyalty program that quietly compounds for regular players. Fair warning — first-time payouts wait a couple of days while verification clears, which is standard for the licence but worth knowing.",
  modules: [
    "brand-history",
    "welcome-offer-math",
    "game-library-spotlight",
    "withdrawal-experience",
    "sister-comparison",
    "eggspert-take",
  ],
  family: "bayton-4",
  sisters: [
    { slug: "spin-casino", name: "Spin Casino" },
    { slug: "ruby-fortune", name: "Ruby Fortune" },
    { slug: "royal-vegas", name: "Royal Vegas" },
  ],
  bestFor: "is the flagship — the most recognisable name in the family and the broadest game library",
  operator: "Baytree Interactive Ltd",
  licenseBody: "Kahnawake Gaming Commission",
  licenseNumber: "#00892",
  yearFounded: 1998,
  softwareProviders: ["Games Global", "On Air Entertainment", "Pragmatic Play", "Hacksaw Gaming", "Blueprint Gaming"],
  gameCountClaim: "Games Global headline catalogue + four other studio partners, spanning slots, table games, live dealer, and the C$1M daily Free Shots draw.",
  welcomeOfferShort: "C$1,600 over your first 4 deposits + 10 daily Free Shots",
  wageringRequirement: "Pending operator-walk verification",
  minDeposit: "C$10",
  withdrawalTime: "first withdrawal 1–2 days for verification, repeat Interac payouts typically same-day per player reports",
  mobile: "Native Casino App advertised in the top nav alongside mobile-web access.",
  liveChat: "Help Centre present; live-chat hours pending verification",
  formalAdr: "eCOGRA (seal displayed on site)",
  trustpilot: "4.0 / 5 across ~8,020 reviews",
  casinoGuruSafety: "High 8.0",
  reputationParagraph:
    "Jackpot City has run since 1998 and, in the rest-of-Canada market, operates under Baytree Interactive Ltd on a Kahnawake Gaming Commission licence (number 00892), with the eCOGRA \"Safe & Fair\" seal displayed on the live Canadian site and Gambling Therapy named as the responsible-gambling partner in the footer. Casino.Guru rates it a High 8.0 Safety Index, crediting its scale (revenue over C$1 billion), a low complaint-to-player ratio, and a clean blacklist record. Trustpilot sits at 4.0/5 across roughly 8,020 reviews, where the consistent theme from players is that first withdrawals sit a couple of days while verification clears — repeat Interac payouts typically arrive same-day — alongside praise for game range and the longevity of the brand. AskGamblers shows 5/10, but worth knowing: AskGamblers' complaint resolution rate is calculated only for operators that opt into their dispute process. AskGamblers has refused to register as a formally recognised Alternative Dispute Resolution body — unlike eCOGRA — so most regulated operators (Super Partners brands included) route disputes through eCOGRA or MGA-recognised bodies instead. A low AskGamblers CRM doesn't mean unresolved complaints; it reflects which ADR the operator engages with.",
  ctaLabel: "Visit Jackpot City",
  ctaHref: "https://www.jackpotcitycasino.com/canada/",
};

const YUKON_GOLD_SAMPLE: BrandReviewData = {
  ...JACKPOT_CITY_SAMPLE,
  slug: "yukon-gold",
  name: "Yukon Gold",
  url: "https://yukongold.casino/en/",
  hero: "hook",
  heroHeadline: "Yukon Gold — the Casino Rewards entry-offer everyone remembers",
  heroSubhead:
    "Yukon Gold is best known for one specific hook: a low-stakes way into the Casino Rewards group, an MGA-adjacent loyalty system, and a friendly cashout experience for new players willing to verify early.",
  editorsTake:
    "Yukon Gold's appeal is uncomplicated: it's an entry-cost hook to the broader Casino Rewards family, with an eCOGRA-audited backbone and a long-standing loyalty program that compounds across the sister sites. Where it really shines is for players who want to sample without commitment. Worth knowing — the C$4,000 weekly payout cap is the trade-off, so large winners will want to plan withdrawals or look at the sister brands with higher caps.",
  modules: [
    "welcome-offer-math",
    "game-library-spotlight",
    "withdrawal-experience",
    "sister-comparison",
    "loyalty-deepdive",
  ],
  family: "casino-rewards-7",
  sisters: [
    { slug: "zodiac", name: "Zodiac Casino" },
    { slug: "captain-cooks", name: "Captain Cooks" },
    { slug: "grand-mondial", name: "Grand Mondial" },
    { slug: "casino-classic", name: "Casino Classic" },
    { slug: "golden-tiger", name: "Golden Tiger" },
    { slug: "luxury-casino", name: "Luxury Casino" },
  ],
  bestFor: "is the entry hook — lowest barrier-to-try in the family with a focused lobby",
  operator: "Fresh Horizons Ltd.",
  licenseBody: "Kahnawake Gaming Commission",
  licenseNumber: "#00972",
  yearFounded: 2004,
  welcomeOfferShort: "150 chances to win the jackpot for C$10",
  withdrawalTime: "weekly payout cap of C$4,000 (source-of-funds verification on large balances)",
  trustpilot: "4.2 / 5 across ~7,700–7,800 reviews",
  casinoGuruSafety: "Very high 9.5",
  reputationParagraph:
    "Yukon Gold Casino, a Casino Rewards group brand launched in 2004 and operated by Fresh Horizons Limited under Kahnawake Gaming Commission licence #00972, presents a generally solid independent reputation with one consistent caveat around cashouts. Casino.Guru assigns it a \"Very high\" Safety Index of 9.5, reasoning that it is a very large operator with a very low sum of disputed winnings in complaints, while noting it is related to other casinos in the group that contribute black points to the family record. Its games carry an eCOGRA seal with published monthly payout reports, and it advertises GamCare, BeGambleAware, and Gambling Therapy responsible-gambling links. On Trustpilot it sits at 4.2/5 (\"Great\") across roughly 7,700–7,800 reviews, where players praise fast, friendly support and quick wins; the recurring trade-off worth knowing is withdrawal friction — source-of-funds holds, the C$4,000 weekly payout cap, and large-balance verification delays.",
  ctaLabel: "Visit Yukon Gold",
  ctaHref: "https://yukongold.casino/en/",
};

const BETWAY_CASINO_SAMPLE: BrandReviewData = {
  ...JACKPOT_CITY_SAMPLE,
  slug: "betway-casino",
  name: "Betway Casino",
  url: "https://betway.com/bwp/welcome-casino-ca-1000-50/en-ca/",
  hero: "experience",
  heroHeadline: "Betway Casino — the only round-1 brand with active MGA + UKGC dual licensing",
  heroSubhead:
    "Operated by NYSE-listed Super Group, Betway Casino is the heaviest-regulated brand in this comparison — an MGA Type-1 licence verified active on the MGA portal plus UKGC #39372. Here's how the casino product reads in practice for Canadian players.",
  editorsTake:
    "Betway sits in a category of one in this batch — it's the only brand with an active MGA licence (Bayton's MGA reads surrendered; Casino Rewards never had one) and the only one carrying UKGC alongside. That's the trust headline. Where it really shines is the scale of the operation and the breadth of the catalogue. Fair warning — Betway's brand-wide Trustpilot score sits low at ~1.3/5, mostly around verification and withdrawal speed; worth weighing alongside the strong regulatory backbone.",
  modules: [
    "brand-history",
    "game-library-spotlight",
    "live-dealer-focus",
    "withdrawal-experience",
    "eggspert-take",
  ],
  family: "betway",
  sisters: [{ slug: "betway-sports", name: "Betway Sports" }],
  bestFor: "is the casino-only product — for the sportsbook, see the dedicated Betway Sports review",
  operator: "Super Group (SGHC, NYSE)",
  licenseBody: "MGA",
  licenseNumber: "B2C/130/2006",
  licenseStatus: "verified active",
  yearFounded: 2006,
  softwareProviders: ["Various — pending operator-walk"],
  gameCountClaim: "Casino product catalogue pending operator-walk",
  welcomeOfferShort: "100% match up to C$1,000 + 50 free spins (T&Cs pending verification)",
  trustpilot: "~1.3 / 5 across ~18,000+ reviews (brand-wide)",
  casinoGuruSafety: "Very high 9.1",
  reputationParagraph:
    "Betway, founded in 2006 and operated by NYSE-listed Super Group (SGHC), holds a verified Malta Gaming Authority licence under Betway Limited — public number MGA/B2C/130/2006, confirmed \"Licensed\" on the MGA's portal covering www.betway.com for both Type 1 casino and Type 2 fixed-odds/live betting — plus a UKGC licence (39372). Casino.Guru rates it a Very high 9.1 Safety Index, citing a very large operator with $100M+ estimated revenue, mostly fair terms, no blacklist presence, and a low value of withheld winnings. The trade-off worth knowing: Trustpilot sits very low at roughly 1.3/5 across ~18,000+ reviews, where players note slow withdrawals and verification holds — a brand-wide theme that touches both the casino and sportsbook sides. Worth weighing alongside the strong dual MGA + UKGC regulatory backbone, which is the strongest licensing combination of any brand in this comparison.",
  ctaLabel: "Visit Betway Casino",
  ctaHref: "https://betway.com/bwp/welcome-casino-ca-1000-50/en-ca/",
};

const SAMPLES = [JACKPOT_CITY_SAMPLE, YUKON_GOLD_SAMPLE, BETWAY_CASINO_SAMPLE];

export default function ReviewDemoPage() {
  return (
    <div>
      <div
        className="lu-container"
        style={{
          paddingBlock: "2.5rem 1.5rem",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "0.5rem",
          }}
        >
          Internal demo · WIP
        </p>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
          Review template gallery
        </h1>
        <p style={{ color: "var(--color-fg-muted)", maxWidth: 720, margin: 0 }}>
          Three brand reviews rendered with sample data to show each master template
          shape — Heritage-lead (Jackpot City), Hook-lead (Yukon Gold), Experience-lead
          (Betway Casino). Different hero, different module set, different order, different
          editor's take. Same code, different page silhouette.
        </p>
      </div>

      {SAMPLES.map((s, i) => (
        <div
          key={s.slug}
          style={{
            paddingBlock: "1rem 3rem",
            borderBottom:
              i === SAMPLES.length - 1 ? "none" : "1px dashed var(--color-border-subtle)",
            marginBottom: i === SAMPLES.length - 1 ? 0 : "2rem",
          }}
        >
          <ReviewLayout brand={s} />
        </div>
      ))}
    </div>
  );
}
