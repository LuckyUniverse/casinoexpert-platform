import type { BrandReviewData } from "@/lib/review-types";

/**
 * Experience hero — opens on what playing there is actually like, leading
 * with a featured product or interaction. Used for Spin Casino (live dealer
 * focus), Ruby Fortune, Betway, Golden Tiger.
 *
 * Visual feel: feature-led, less about a stamp/badge, more about the vibe.
 */
export function ExperienceHero({ brand }: { brand: BrandReviewData }) {
  return (
    <section className="lu-container" style={{ paddingTop: "2.5rem" }}>
      <div
        style={{
          display: "grid",
          gap: "1.25rem",
          maxWidth: 880,
        }}
      >
        <p
          style={{
            fontSize: "0.78rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-fg-subtle)",
            margin: 0,
          }}
        >
          Brand review · {brand.family.replace(/-/g, " ")}
        </p>

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

        {/* Mini stat row */}
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            margin: "1rem 0 0",
            padding: 0,
            listStyle: "none",
            color: "var(--color-fg-muted)",
            fontSize: "0.9rem",
          }}
        >
          {brand.yearFounded && (
            <li>
              <span style={{ color: "var(--color-fg-subtle)" }}>Since</span>{" "}
              <strong style={{ color: "var(--color-fg)" }}>{brand.yearFounded}</strong>
            </li>
          )}
          {brand.licenseBody && (
            <li>
              <span style={{ color: "var(--color-fg-subtle)" }}>License</span>{" "}
              <strong style={{ color: "var(--color-fg)" }}>{brand.licenseBody}</strong>
            </li>
          )}
          {brand.formalAdr && (
            <li>
              <span style={{ color: "var(--color-fg-subtle)" }}>ADR</span>{" "}
              <strong style={{ color: "var(--color-fg)" }}>{brand.formalAdr}</strong>
            </li>
          )}
        </ul>

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
