"use client";

import Image from "next/image";
import { useState } from "react";
import type { BrandReviewData } from "@/lib/review-types";

/**
 * Inline "Ask the Eggspert" panel — appears near the bottom of every brand
 * review page, pre-seeded with brand-specific questions. The AI backend
 * isn't wired up yet; this is the placeholder so the page architecture is
 * complete and the UX shape is locked.
 *
 * When the backend lands, swap the onSubmit handler — everything else stays.
 */
export function AskEggspertPanel({ brand }: { brand: BrandReviewData }) {
  const [q, setQ] = useState("");

  const seeds = buildSeedQuestions(brand);

  return (
    <section
      className="lu-card lu-ask-panel"
      style={{
        padding: "2rem 2rem 1.75rem",
        background:
          "linear-gradient(135deg, var(--color-bg-card) 0%, color-mix(in srgb, var(--color-accent) 6%, var(--color-bg-elevated)) 100%)",
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr)",
        gap: "1.5rem",
        alignItems: "center",
      }}
    >
      <div
        className="lu-ask-mascot"
        aria-hidden="true"
        style={{
          flexShrink: 0,
          filter: "drop-shadow(0 14px 24px rgba(0, 0, 0, 0.35))",
        }}
      >
        <Image
          src="/images/brand/character.png"
          alt=""
          width={180}
          height={168}
          sizes="(max-width: 720px) 130px, 180px"
          style={{ width: 180, height: "auto", display: "block" }}
        />
      </div>

      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            margin: "0 0 0.35rem",
          }}
        >
          Ask the Eggspert
        </p>
        <h2 style={{ fontSize: "1.4rem", margin: "0 0 1.1rem" }}>
          Got a question about {brand.name}?
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Backend wiring TBD.
          }}
          style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}
        >
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`e.g. ${seeds[0]}`}
            style={{
              flex: "1 1 240px",
              padding: "0.75rem 1rem",
              borderRadius: 999,
              border: "1px solid var(--color-border-strong)",
              background: "var(--color-bg-deep)",
              color: "var(--color-fg)",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />
          <button type="submit" className="lu-btn-accent" disabled>
            Ask (coming soon)
          </button>
        </form>

        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {seeds.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => setQ(s)}
                style={{
                  padding: "0.4rem 0.75rem",
                  borderRadius: 999,
                  background: "transparent",
                  border: "1px solid var(--color-border-strong)",
                  color: "var(--color-fg-muted)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .lu-ask-panel {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .lu-ask-mascot { justify-self: center; }
          .lu-ask-mascot img { width: 130px !important; }
        }
      `}</style>
    </section>
  );
}

function buildSeedQuestions(brand: BrandReviewData): string[] {
  return [
    `Is ${brand.name} licensed for Canadian players?`,
    `What is ${brand.name}'s withdrawal time like?`,
    `Is the ${brand.name} welcome offer worth it?`,
    `How does ${brand.name} compare to its sister sites?`,
  ];
}
