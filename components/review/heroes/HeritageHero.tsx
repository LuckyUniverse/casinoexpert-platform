import type { BrandReviewData } from "@/lib/review-types";

/**
 * Heritage hero — opens on time-in-market, trust, longevity.
 * Used for brands like Jackpot City (since 1998), Royal Vegas, Casino Classic
 * (since 1999), Luxury Casino.
 *
 * Visual feel: vertical lockup, big "since YEAR" stamp, calmer / less
 * promotional than the other two heroes.
 */
export function HeritageHero({ brand }: { brand: BrandReviewData }) {
  return (
    <section className="lu-container" style={{ paddingTop: "2.5rem" }}>
      <div
        style={{
          display: "grid",
          gap: "1.25rem",
          maxWidth: 880,
        }}
      >
        {brand.yearFounded && (
          <p
            style={{
              display: "inline-block",
              padding: "0.45rem 1rem",
              borderRadius: 999,
              background: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border-strong)",
              color: "var(--color-fg-muted)",
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
              width: "fit-content",
              margin: 0,
            }}
          >
            <span style={{ color: "var(--color-cream)" }}>Online since</span>{" "}
            <span style={{ fontWeight: 700, color: "var(--color-fg)" }}>{brand.yearFounded}</span>
          </p>
        )}

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 700,
          }}
        >
          {brand.heroHeadline}
        </h1>
        <p
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            color: "var(--color-fg-muted)",
            maxWidth: 640,
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {brand.heroSubhead}
        </p>

        {brand.ctaHref && (
          <div style={{ marginTop: "0.5rem" }}>
            <a
              href={brand.ctaHref}
              className="lu-btn-accent"
              target="_blank"
              rel="noopener sponsored"
            >
              {brand.ctaLabel ?? `Visit ${brand.name}`}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
