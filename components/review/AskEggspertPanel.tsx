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

  // Pre-seeded brand-relevant questions. In production these come from a
  // per-brand prompt set; for now we synthesise 4 generic ones from the
  // brand fields so the surface area is real even before content lands.
  const seeds = buildSeedQuestions(brand);

  return (
    <section
      className="lu-card"
      style={{
        padding: "2rem",
        background:
          "linear-gradient(135deg, var(--color-bg-card) 0%, color-mix(in srgb, var(--color-accent) 6%, var(--color-bg-elevated)) 100%)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "1.25rem",
          alignItems: "center",
          marginBottom: "1.25rem",
        }}
      >
        <Image
          src="/images/brand/logo-medallion.png"
          alt=""
          width={72}
          height={72}
          style={{ width: 72, height: 72, objectFit: "contain" }}
        />
        <div>
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
          <h2 style={{ fontSize: "1.4rem", margin: 0 }}>Got a question about {brand.name}?</h2>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Wire to backend later — for now, no-op.
        }}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}
      >
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`e.g. ${seeds[0]}`}
          style={{
            flex: "1 1 280px",
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
