import type { BrandReviewData } from "@/lib/review-types";

/**
 * Hook hero — opens on the welcome offer / entrance hook. Used for brands
 * whose primary recognition signal is "the famous offer" — Yukon Gold's
 * spins-for-$10 angle, Zodiac's themed welcome, etc.
 *
 * Visual feel: the offer text is the focal element, headline framed around
 * it; punchier feel than the heritage hero.
 */
export function HookHero({ brand }: { brand: BrandReviewData }) {
  return (
    <section className="lu-container" style={{ paddingTop: "2.5rem" }}>
      <div
        className="lu-card"
        style={{
          padding: "2.25rem 2rem",
          background:
            "linear-gradient(135deg, var(--color-bg-card) 0%, var(--color-bg-elevated) 100%)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-accent)",
              margin: "0 0 0.85rem",
            }}
          >
            The headline offer
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              marginBottom: "1rem",
            }}
          >
            {brand.heroHeadline}
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
              color: "var(--color-fg-muted)",
              maxWidth: 560,
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {brand.heroSubhead}
          </p>
          {brand.ctaHref && (
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href={brand.ctaHref}
                className="lu-btn-accent"
                target="_blank"
                rel="noopener sponsored"
              >
                {brand.ctaLabel ?? `Claim at ${brand.name}`}
              </a>
            </div>
          )}
        </div>

        <div
          aria-hidden="true"
          style={{
            display: "grid",
            placeItems: "center",
            background: "var(--color-bg-deep)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem 1.75rem",
            textAlign: "center",
            minWidth: 200,
          }}
          className="lu-hook-stamp"
        >
          <span
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-fg-subtle)",
              marginBottom: "0.5rem",
            }}
          >
            Welcome offer
          </span>
          <strong
            style={{
              display: "block",
              color: "var(--color-cream)",
              fontSize: "1.1rem",
              lineHeight: 1.35,
              maxWidth: 200,
            }}
          >
            {brand.welcomeOfferShort}
          </strong>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .lu-card:has(.lu-hook-stamp) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
