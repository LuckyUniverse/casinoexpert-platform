/**
 * Safety-rating rubric for the live casino check (/safety-check).
 *
 * Single source of truth shared by the API route (drives the model's
 * scoring instructions) and the UI (labels, weights, score math).
 * Weights sum to 100; the weighted total IS the safety score.
 */

export interface Criterion {
  key: string;
  label: string;
  /** Contribution to the 0-100 safety score. All weights sum to 100. */
  weight: number;
  /** Scoring guidance handed to the model verbatim. */
  guidance: string;
}

export const SAFETY_CRITERIA: Criterion[] = [
  {
    key: "jurisdiction_license",
    label: "Licensed for the player's jurisdiction",
    weight: 25,
    guidance:
      "Does the casino hold a license valid for the player's specific country/province/state (e.g. UKGC for UK, iGO/AGCO registration for Ontario, state license for NJ/MI/PA)? Verify the license number in the regulator's public register where one exists. 9-10 = locally licensed and verified in the register. 4-6 = no local regime exists and the casino holds a reputable offshore license. 0-2 = a local licensing regime exists but the casino serves the market without it.",
  },
  {
    key: "regulator_tier",
    label: "Quality of licenses held",
    weight: 10,
    guidance:
      "Rate the overall tier of the license portfolio. Top tier (9-10): UKGC, MGA, Isle of Man, Gibraltar, Swedish/Danish/Dutch national regulators, US state regulators, AGCO/iGO. Mid tier (5-7): Kahnawake, Curacao (post-2024 LOK regime). Low tier (1-3): Anjouan, Costa Rica 'data license', or no license at all (0).",
  },
  {
    key: "regulator_actions",
    label: "Regulatory actions and warnings",
    weight: 8,
    guidance:
      "Search for fines, license suspensions/revocations, regulator warning lists (e.g. ACMA blocked list, Spelinspektionen warnings, AGCO unregistered notices) and settlements. 9-10 = clean record. Deduct per incident by severity and recency; an active warning or recent suspension scores 0-2. A historic fine that was paid with remediation is a moderate deduction (5-7).",
  },
  {
    key: "operator_track_record",
    label: "Operator / holding company",
    weight: 12,
    guidance:
      "Who operates the casino and who ultimately owns it? Consider: company age (older is better), publicly listed vs private (listed = audited accounts), ownership transparency (identifiable owners vs shell-company dead ends), size and health of the brand portfolio, behaviour of sister brands, insolvency or sudden market-exit history. 9-10 = long-established, transparent, listed or equivalent. 0-3 = opaque ownership or rogue sister brands.",
  },
  {
    key: "brand_track_record",
    label: "Casino brand age and history",
    weight: 10,
    guidance:
      "How long has this brand operated? Consider brand launch year and domain age. 15+ years continuous operation = 9-10. 5-15 years = 6-8. 2-5 years = 4-5. Under 2 years = 0-3 (not necessarily rogue, but unproven).",
  },
  {
    key: "complaints_reputation",
    label: "Player complaints and reputation",
    weight: 10,
    guidance:
      "Check complaint portals (Casino Guru complaint data, AskGamblers) and review platforms (Trustpilot score AND review volume). Weigh resolution rate and recency more than raw volume - every large casino has complaints. Presence on independent blacklists is an automatic 0-2. 9-10 = high scores with substantial review volume and complaints that get resolved.",
  },
  {
    key: "payout_reliability",
    label: "Payout reliability and limits",
    weight: 10,
    guidance:
      "Look for patterns of slow-pay/no-pay reports, confiscated winnings, and KYC used as a stalling tactic only at withdrawal. Check published withdrawal limits - a very low monthly cap (e.g. $500-$4,000/month) is a structural way to avoid paying big wins and caps this score at 5 even with a clean record. 9-10 = fast verified payouts, generous or no limits, no credible confiscation pattern.",
  },
  {
    key: "terms_fairness",
    label: "Terms and conditions fairness",
    weight: 5,
    guidance:
      "Scan the T&Cs (or credible summaries of them) for predatory clauses: max win caps on real-money deposits, dormancy fees, vague 'irregular play' clauses that let the operator void anything, right to change terms retroactively, and 'our decision is final' instead of a named ADR body (eCOGRA, IBAS). 9-10 = clean terms with a named independent ADR.",
  },
  {
    key: "game_fairness",
    label: "Game fairness and certification",
    weight: 5,
    guidance:
      "Is the RNG/RTP certified by a recognized lab (eCOGRA, iTech Labs, GLI, BMM)? Are games served from genuine licensed providers (NetEnt, Microgaming/Games Global, Evolution, Playtech, Pragmatic) rather than pirated clones? Published RTP reports are a plus. Fake/cloned games are an automatic 0.",
  },
  {
    key: "security_privacy",
    label: "Security and privacy",
    weight: 2,
    guidance:
      "Valid modern TLS on the site, 2FA availability, a real privacy policy, and no history of data breaches. 9-10 = all present, no breach history.",
  },
  {
    key: "responsible_gambling",
    label: "Responsible gambling tools",
    weight: 3,
    guidance:
      "Deposit/loss/session limits, timeouts, self-exclusion, participation in national schemes where they exist (e.g. GamStop for UK-licensed sites), reality checks, and links to real help organizations. Proper RG tooling almost never exists on rogue sites, so this doubles as a legitimacy proxy.",
  },
];

/** Secondary ratings returned alongside safety - never blended into the safety score. */
export const OTHER_RATINGS: { key: string; label: string; guidance: string }[] = [
  {
    key: "payments",
    label: "Payments",
    guidance:
      "Deposit/withdrawal methods relevant to the player's country (local rails like Interac, Pix, PayPal availability), fees, min/max limits, and typical payout speed.",
  },
  {
    key: "games",
    label: "Games",
    guidance:
      "Provider count, game count, live casino quality, exclusive titles, and other verticals (sports, poker) where relevant.",
  },
  {
    key: "bonuses",
    label: "Bonuses",
    guidance:
      "Headline offer value for this market, wagering requirements, game weightings, max cashout on bonus wins, and overall fairness of bonus terms.",
  },
  {
    key: "support",
    label: "Support",
    guidance:
      "Channels (live chat, email, phone), hours, reported response quality, and languages.",
  },
  {
    key: "localization",
    label: "Localization",
    guidance:
      "Fit for the player's market: language, currency, local payment rails, geo-appropriate site version and content.",
  },
];

export type Confidence = "high" | "medium" | "low";
export type LicenseStatus = "yes" | "no" | "no_local_regime";
export type FlagType = "positive" | "caution" | "red";

export interface CriterionResult {
  key: string;
  score: number; // 0-10
  finding: string;
  confidence: Confidence;
  sources: string[];
}

export interface RatingResult {
  resolved: {
    brandName: string;
    siteUrl: string;
    operator: string;
    holdingCompany: string;
    licenses: string[];
    marketNote: string;
  };
  licensedForJurisdiction: LicenseStatus;
  verdict: string;
  criteria: CriterionResult[];
  flags: { type: FlagType; text: string }[];
  otherRatings: { key: string; score: number; note: string }[];
}

/**
 * Weighted 0-100 safety score from per-criterion 0-10 scores.
 * Computed in code (not by the model) so the math is deterministic.
 * Hard rule: a casino serving a market that HAS a licensing regime
 * without holding that license can never score above 49 (grade D/F
 * territory) regardless of how good everything else looks.
 */
export function computeSafetyScore(result: RatingResult): number {
  const byKey = new Map(result.criteria.map((c) => [c.key, c]));
  let total = 0;
  for (const criterion of SAFETY_CRITERIA) {
    const r = byKey.get(criterion.key);
    const score = r ? Math.max(0, Math.min(10, r.score)) : 0;
    total += (score / 10) * criterion.weight;
  }
  let rounded = Math.round(total);
  if (result.licensedForJurisdiction === "no") {
    rounded = Math.min(rounded, 49);
  }
  return rounded;
}

export function gradeForScore(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

export function gradeDescription(grade: string): string {
  switch (grade) {
    case "A+":
    case "A":
      return "Very safe - strong licensing, established operator, clean track record";
    case "B":
      return "Safe - trustworthy overall with minor caveats";
    case "C":
      return "Use caution - meaningful gaps or a mixed track record";
    case "D":
      return "High risk - serious concerns identified";
    default:
      return "Avoid - unlicensed for this market or major red flags";
  }
}
