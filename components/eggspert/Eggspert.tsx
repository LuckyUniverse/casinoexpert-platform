"use client";

import { useEffect, useRef, useState } from "react";
import type { EggspertPhase } from "@/lib/eggspert-config";
import { EGGSPERT_TIMINGS } from "@/lib/eggspert-config";
import { Phase1 } from "./phases/Phase1";
import { Phase2 } from "./phases/Phase2";
import { Phase3 } from "./phases/Phase3";
import { Phase4 } from "./phases/Phase4";

const PHASE_COMPONENT: Record<EggspertPhase, (props: { size?: number }) => React.ReactElement> = {
  1: Phase1,
  2: Phase2,
  3: Phase3,
  4: Phase4,
};

/**
 * Renders the right phase for a given progression value. When the phase
 * changes, plays a brief celebration animation.
 */
export function Eggspert({
  phase,
  size = 120,
}: {
  phase: EggspertPhase;
  size?: number;
}) {
  const [celebrating, setCelebrating] = useState(false);
  const prevPhase = useRef<EggspertPhase>(phase);

  useEffect(() => {
    if (prevPhase.current !== phase) {
      setCelebrating(true);
      const duration =
        phase === 4
          ? EGGSPERT_TIMINGS.phase4Burst
          : EGGSPERT_TIMINGS.phaseAdvanceBounce;
      const t = window.setTimeout(() => setCelebrating(false), duration);
      prevPhase.current = phase;
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  const Phase = PHASE_COMPONENT[phase];

  return (
    <span
      className={`eggspert ${celebrating ? "eggspert--celebrating" : ""}`}
      data-phase={phase}
      style={{ display: "inline-block", lineHeight: 0 }}
    >
      <Phase size={size} />
    </span>
  );
}
