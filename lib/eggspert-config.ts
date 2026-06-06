/**
 * Single source of truth for the Eggspert mascot mechanic.
 *
 * Change values here and the UI, the progression hook, and the demo page all
 * follow automatically. No magic numbers anywhere else.
 */

export type EggspertPhase = 1 | 2 | 3 | 4;

/**
 * Named in-site actions that earn the visitor progress points.
 * Keep these stable — they're used as keys in localStorage history.
 */
export const EGGSPERT_ACTIONS = {
  page_visited: { points: 1, label: "Browsing the site" },
  question_asked: { points: 2, label: "Asked a question" },
  email_subscribed: { points: 3, label: "Joined the email list" },
  operator_clicked: { points: 3, label: "Clicked through to an operator" },
  quiz_completed: { points: 4, label: "Completed the quiz" },
} as const;

export type EggspertAction = keyof typeof EGGSPERT_ACTIONS;

/**
 * Total points required to enter each phase (cumulative, not delta).
 * Phase 1 is the starting state — no points needed.
 */
export const EGGSPERT_THRESHOLDS: Record<EggspertPhase, number> = {
  1: 0,
  2: 3,
  3: 6,
  4: 10,
};

/**
 * Animation timings (ms). Tune to taste.
 */
export const EGGSPERT_TIMINGS = {
  phaseAdvanceBounce: 1200,
  phase4Burst: 2500,
  hoverScale: 200,
};

/**
 * Resolve the current phase from a points total.
 */
export function phaseForPoints(points: number): EggspertPhase {
  if (points >= EGGSPERT_THRESHOLDS[4]) return 4;
  if (points >= EGGSPERT_THRESHOLDS[3]) return 3;
  if (points >= EGGSPERT_THRESHOLDS[2]) return 2;
  return 1;
}

/**
 * How far through the current phase the visitor is (0–1), useful for
 * progress-bar UI inside the popover.
 */
export function phaseFraction(points: number): number {
  const phase = phaseForPoints(points);
  if (phase === 4) return 1;
  const lower = EGGSPERT_THRESHOLDS[phase];
  const upper = EGGSPERT_THRESHOLDS[(phase + 1) as EggspertPhase];
  return Math.max(0, Math.min(1, (points - lower) / (upper - lower)));
}

/**
 * How many more points until the next phase. Returns 0 if already at phase 4.
 */
export function pointsToNextPhase(points: number): number {
  const phase = phaseForPoints(points);
  if (phase === 4) return 0;
  return EGGSPERT_THRESHOLDS[(phase + 1) as EggspertPhase] - points;
}
