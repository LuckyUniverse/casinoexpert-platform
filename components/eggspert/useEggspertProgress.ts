"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EGGSPERT_ACTIONS,
  type EggspertAction,
  type EggspertPhase,
  phaseForPoints,
  phaseFraction,
  pointsToNextPhase,
} from "@/lib/eggspert-config";

const STORAGE_KEY = "eggspert.progress.v1";

type StoredState = {
  points: number;
  /** Action keys that have already been counted — prevents double-earning the same one. */
  earned: EggspertAction[];
};

const EMPTY: StoredState = { points: 0, earned: [] };

function readStorage(): StoredState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.points !== "number" || !Array.isArray(parsed?.earned)) {
      return EMPTY;
    }
    return parsed as StoredState;
  } catch {
    return EMPTY;
  }
}

function writeStorage(state: StoredState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota or privacy mode — silently no-op.
  }
}

/**
 * Eggspert progression hook. Tracks points + earned actions in localStorage,
 * exposes a `record(action)` callback callers can fire from anywhere.
 *
 * `record` is idempotent per action key by default — calling
 * `record('quiz_completed')` twice only counts the first one. Pass
 * `{ allowRepeat: true }` for actions that can fire repeatedly
 * (e.g. `page_visited`).
 */
export function useEggspertProgress() {
  // Start from EMPTY so the server-rendered HTML and the first client render
  // match. We hydrate from localStorage in an effect on mount.
  const [state, setState] = useState<StoredState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readStorage());
    setHydrated(true);
  }, []);

  const record = useCallback(
    (action: EggspertAction, opts?: { allowRepeat?: boolean }) => {
      setState((prev) => {
        if (!opts?.allowRepeat && prev.earned.includes(action)) {
          return prev;
        }
        const cfg = EGGSPERT_ACTIONS[action];
        if (!cfg) return prev;
        const next: StoredState = {
          points: prev.points + cfg.points,
          earned: prev.earned.includes(action)
            ? prev.earned
            : [...prev.earned, action],
        };
        writeStorage(next);
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setState(EMPTY);
    writeStorage(EMPTY);
  }, []);

  const phase: EggspertPhase = phaseForPoints(state.points);

  return {
    hydrated,
    points: state.points,
    earned: state.earned,
    phase,
    fraction: phaseFraction(state.points),
    nextPhaseIn: pointsToNextPhase(state.points),
    record,
    reset,
  };
}
