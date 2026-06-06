"use client";

import { Eggspert } from "@/components/eggspert/Eggspert";
import { useEggspertProgress } from "@/components/eggspert/useEggspertProgress";
import "@/components/eggspert/eggspert.css";
import {
  EGGSPERT_ACTIONS,
  EGGSPERT_THRESHOLDS,
  type EggspertAction,
} from "@/lib/eggspert-config";
import { Phase1 } from "@/components/eggspert/phases/Phase1";
import { Phase2 } from "@/components/eggspert/phases/Phase2";
import { Phase3 } from "@/components/eggspert/phases/Phase3";
import { Phase4 } from "@/components/eggspert/phases/Phase4";

export default function EggspertDemoPage() {
  const { hydrated, points, earned, phase, fraction, nextPhaseIn, record, reset } =
    useEggspertProgress();

  return (
    <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>The Eggspert — demo</h1>
      <p style={{ color: "#9ca3af", marginBottom: "2rem" }}>
        Placeholder art. Final illustrations will swap in via
        <code style={{ marginLeft: 6 }}>components/eggspert/phases/PhaseN.tsx</code>.
      </p>

      {/* Phase reference strip */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          marginBottom: "3rem",
          padding: "1.5rem",
          background: "#10161f",
          borderRadius: 14,
        }}
      >
        {[
          { n: 1, C: Phase1, label: "Whole" },
          { n: 2, C: Phase2, label: "First crack" },
          { n: 3, C: Phase3, label: "Spider-webbed" },
          { n: 4, C: Phase4, label: "Cracks open" },
        ].map(({ n, C, label }) => (
          <figure
            key={n}
            style={{
              textAlign: "center",
              margin: 0,
              padding: "1rem 0.5rem",
              background: "#0b1018",
              borderRadius: 10,
              border: phase === n ? "2px solid #7dd3fc" : "2px solid transparent",
            }}
          >
            <C size={120} />
            <figcaption style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
              <strong>Phase {n}</strong>
              <br />
              <span style={{ color: "#9ca3af" }}>{label}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      {/* Live progress panel */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "2rem",
          alignItems: "center",
          padding: "1.5rem",
          background: "#10161f",
          borderRadius: 14,
          marginBottom: "2rem",
        }}
      >
        <div>
          <Eggspert phase={phase} size={160} />
        </div>
        <div>
          <h2 style={{ marginTop: 0 }}>Your progress</h2>
          {!hydrated ? (
            <p style={{ color: "#9ca3af" }}>Loading…</p>
          ) : (
            <>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>{points}</strong> points · <strong>Phase {phase}</strong>
                {phase < 4 && (
                  <span style={{ color: "#9ca3af" }}>
                    {" "}
                    · {nextPhaseIn} more for phase {phase + 1}
                  </span>
                )}
              </p>
              {/* Progress bar within current phase */}
              <div
                style={{
                  height: 8,
                  background: "#1d2533",
                  borderRadius: 4,
                  overflow: "hidden",
                  margin: "0.75rem 0",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${fraction * 100}%`,
                    background: "#7dd3fc",
                    transition: "width 400ms ease-out",
                  }}
                />
              </div>
              <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
                Thresholds: P1={EGGSPERT_THRESHOLDS[1]} ·
                P2={EGGSPERT_THRESHOLDS[2]} ·
                P3={EGGSPERT_THRESHOLDS[3]} ·
                P4={EGGSPERT_THRESHOLDS[4]}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Action buttons */}
      <section>
        <h2>Trigger an action</h2>
        <p style={{ color: "#9ca3af" }}>
          Each action awards points and may advance the Eggspert to the next phase.
          Earned actions are remembered (in localStorage) so you can&apos;t spam them.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
          {(Object.keys(EGGSPERT_ACTIONS) as EggspertAction[]).map((action) => {
            const cfg = EGGSPERT_ACTIONS[action];
            const alreadyEarned = earned.includes(action);
            return (
              <button
                key={action}
                onClick={() => record(action, { allowRepeat: action === "page_visited" })}
                disabled={alreadyEarned && action !== "page_visited"}
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: 8,
                  border: "1px solid #2a3445",
                  background: alreadyEarned && action !== "page_visited" ? "#1a2230" : "#7dd3fc",
                  color: alreadyEarned && action !== "page_visited" ? "#6b7280" : "#0b1530",
                  fontWeight: 600,
                  cursor: alreadyEarned && action !== "page_visited" ? "not-allowed" : "pointer",
                }}
              >
                {cfg.label} · +{cfg.points}
                {alreadyEarned && action !== "page_visited" && " ✓"}
              </button>
            );
          })}
          <button
            onClick={reset}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: 8,
              border: "1px solid #3a2a2a",
              background: "transparent",
              color: "#f08aa0",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset progress
          </button>
        </div>
      </section>
    </main>
  );
}
