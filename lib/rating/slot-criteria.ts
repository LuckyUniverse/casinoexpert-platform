/**
 * Rating rubric for the live SLOT GAME check (/slot-check) - the
 * penny-slot-machines.com demo. Same architecture as the casino safety
 * rubric (lib/rating/criteria.ts): weights sum to 100, the model scores
 * each criterion 0-10 from live web research, the weighted total is
 * computed deterministically in code.
 */

export interface SlotCriterion {
  key: string;
  label: string;
  weight: number;
  guidance: string;
}

export const SLOT_CRITERIA: SlotCriterion[] = [
  {
    key: "rtp",
    label: "RTP (return to player)",
    weight: 20,
    guidance:
      "Find the published RTP. 96%+ = 8-10, 94-96% = 6-7, 92-94% = 4-5, below 92% = 0-3. CRITICAL: many modern slots ship in multiple RTP versions (e.g. 96% / 94% / 87%) and operators license the cheaper ones - if multiple versions exist, say so, list them, and deduct 1-2 points for the risk that a player gets a low-RTP copy without knowing.",
  },
  {
    key: "provider_trust",
    label: "Provider reputation",
    weight: 15,
    guidance:
      "Who makes the game? Established licensed studios (NetEnt, Play'n GO, Pragmatic Play, Light & Wonder, Microgaming/Games Global, Big Time Gaming, Push Gaming, Hacksaw, Relax, IGT, Aristocrat, Novomatic) = 8-10. Smaller but licensed studios = 5-7. Unknown or unlicensed developers = 0-3.",
  },
  {
    key: "fairness_certification",
    label: "Fairness and certification",
    weight: 10,
    guidance:
      "Is the RNG certified by a recognized lab (eCOGRA, iTech Labs, GLI, BMM, Quinel)? Is the game distributed through licensed aggregators? Deduct heavily if pirated/cloned copies of this title are known to circulate on rogue sites (a known problem for popular Novomatic/NetEnt titles) - players may unknowingly play a rigged fake.",
  },
  {
    key: "volatility_transparency",
    label: "Volatility and math transparency",
    weight: 10,
    guidance:
      "Does the provider publish volatility, hit frequency, and max win? Full published math model = 8-10. Volatility class only = 5-7. Nothing published = 0-4. State the volatility (low/medium/high) in the finding.",
  },
  {
    key: "win_potential",
    label: "Win potential",
    weight: 10,
    guidance:
      "Max win multiplier and/or jackpot. 10,000x+ or progressive jackpot = 9-10. 5,000-10,000x = 7-8. 1,000-5,000x = 5-6. Under 1,000x = 2-4. Judge relative to volatility - a low-volatility slot with a 500x cap is coherent, score it 5 rather than 2.",
  },
  {
    key: "player_reception",
    label: "Player reception",
    weight: 10,
    guidance:
      "Ratings and sentiment on independent slot databases and communities (SlotCatalog, Bigwinboard, Casino Guru game pages, forum/Reddit sentiment). Popular, well-reviewed evergreen titles = 8-10. Mixed = 5-7. Widely criticised or dead-on-arrival = 0-4.",
  },
  {
    key: "features",
    label: "Features and gameplay",
    weight: 10,
    guidance:
      "Depth and quality of mechanics: free spins, multipliers, cascades, Megaways/cluster mechanics, bonus buy, jackpots, innovation vs pure clone of an older game. Rich, well-designed feature set = 8-10. Bare-bones three-reel with no features can still score 5-6 if that is the design intent (classic slots).",
  },
  {
    key: "stake_range",
    label: "Stake range and penny-play fit",
    weight: 5,
    guidance:
      "Minimum and maximum bet. A slot playable from $0.10 or less per spin = 8-10 (true penny-slot territory). $0.20-0.40 min = 5-7. High minimum bets = 0-4. Mention the exact min/max stakes found.",
  },
  {
    key: "availability",
    label: "Availability and freshness",
    weight: 5,
    guidance:
      "Release date, whether the game is still widely carried at licensed casinos, and mobile/HTML5 support. Evergreen titles available everywhere = 8-10. Retired Flash-era games barely available = 0-4.",
  },
  {
    key: "demo_play",
    label: "Free demo availability",
    weight: 5,
    guidance:
      "Can players try it free? Official demo widely embedded on review sites and the provider's site = 8-10. Demo restricted in some markets only = 5-7. No demo mode = 0-3.",
  },
];

/** Secondary ratings shown beside the main score - never blended in. */
export const SLOT_OTHER_RATINGS: { key: string; label: string; guidance: string }[] = [
  { key: "graphics", label: "Graphics", guidance: "Visual quality, theme execution, animations - judged against its release era." },
  { key: "audio", label: "Audio", guidance: "Soundtrack and effect quality; does sound add to the experience." },
  { key: "mobile", label: "Mobile", guidance: "Mobile/HTML5 experience quality; portrait support; load weight." },
  { key: "gameplay", label: "Gameplay", guidance: "Pace, excitement, base-game/bonus balance, replayability." },
  { key: "value", label: "Value", guidance: "Entertainment per dollar for a low-stakes player: stake flexibility, session length, feature frequency." },
];

export type SlotAuthenticity = "official" | "counterfeit_risk" | "unverified";

export interface SlotRatingResult {
  resolved: {
    gameName: string;
    provider: string;
    releaseYear: string;
    volatility: string;
    rtp: string;
    maxWin: string;
    minStake: string;
    officialUrl: string;
    clientReviewUrl: string; // penny-slot-machines.com page for this game, if one exists
  };
  authenticity: SlotAuthenticity;
  verdict: string;
  criteria: { key: string; score: number; finding: string; confidence: "high" | "medium" | "low"; sources: string[] }[];
  flags: { type: "positive" | "caution" | "red"; text: string }[];
  otherRatings: { key: string; score: number; note: string }[];
  images: { url: string; caption: string }[];
}

/**
 * Weighted 0-100 slot score. Hard rule mirroring the casino tool: a title
 * with a known counterfeit/pirated-copy problem that can't be traced to a
 * licensed distribution chain caps at 49.
 */
export function computeSlotScore(result: SlotRatingResult): number {
  const byKey = new Map(result.criteria.map((c) => [c.key, c]));
  let total = 0;
  for (const criterion of SLOT_CRITERIA) {
    const r = byKey.get(criterion.key);
    const score = r ? Math.max(0, Math.min(10, r.score)) : 0;
    total += (score / 10) * criterion.weight;
  }
  let rounded = Math.round(total);
  if (result.authenticity === "counterfeit_risk") {
    rounded = Math.min(rounded, 49);
  }
  return rounded;
}

export function slotGradeForScore(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

export function slotGradeDescription(grade: string): string {
  switch (grade) {
    case "A+":
    case "A":
      return "Excellent slot - fair math, trusted provider, strong player value";
    case "B":
      return "Good slot - solid overall with minor weak spots";
    case "C":
      return "Average - playable but weaker math or dated design";
    case "D":
      return "Below par - significant drawbacks for players";
    default:
      return "Avoid - unfair math, unknown provider, or counterfeit risk";
  }
}
