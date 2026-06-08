import type { BrandReviewData } from "@/lib/review-types";

/**
 * Reputation in practice — a single narrative paragraph (~200 words) that
 * weaves licensing, certifications, independent scores, and player feedback
 * into honest prose. No pro/con lists. No "complaints" heading. Mixed
 * feedback flows inline, with positives weighted at least as heavily as
 * the trade-offs worth knowing.
 *
 * The paragraph is hand-written per brand and stored in
 * `brand.reputationParagraph`. This component just frames it.
 */
export function ReputationInPractice({ brand }: { brand: BrandReviewData }) {
  return (
    <article
      className="lu-card"
      style={{
        padding: "2rem 2rem 1.75rem",
        background:
          "linear-gradient(180deg, var(--color-bg-elevated) 0%, var(--color-bg-card) 100%)",
      }}
    >
      <header style={{ marginBottom: "1rem" }}>
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            margin: "0 0 0.4rem",
          }}
        >
          How it holds up
        </p>
        <h2 style={{ fontSize: "1.6rem", margin: 0 }}>Reputation in practice</h2>
      </header>
      <p
        style={{
          fontSize: "1.02rem",
          lineHeight: 1.75,
          color: "var(--color-fg)",
          margin: 0,
          maxWidth: 78 + "ch",
        }}
      >
        {brand.reputationParagraph}
      </p>
    </article>
  );
}
