import Image from "next/image";
import type { BrandReviewData } from "@/lib/review-types";

/**
 * "What you'll see when you arrive" — a full-page screenshot of the brand's
 * live site, captured from a Vancouver VPN so it matches the rest-of-Canada
 * experience the reader will actually get.
 *
 * Renders only when brand.screenshotSrc is set. Visual evidence that
 * matches the editorial: when the page says "C$1,600 across 4 deposits,"
 * the screenshot shows the same offer on the operator's hero.
 */
export function SiteSnapshot({ brand }: { brand: BrandReviewData }) {
  if (!brand.screenshotSrc) return <></>;

  return (
    <figure
      className="lu-card"
      style={{
        padding: 0,
        overflow: "hidden",
        margin: 0,
        background: "var(--color-bg-deep)",
      }}
    >
      <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--color-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            margin: 0,
          }}
        >
          Site snapshot · what you'll see when you arrive
        </p>
        <a
          href={brand.ctaHref ?? brand.url}
          target="_blank"
          rel="noopener sponsored"
          style={{ fontSize: "0.85rem" }}
        >
          Open {brand.name} →
        </a>
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, var(--color-bg-deep) 0%, var(--color-bg-elevated) 100%)",
          padding: "1.25rem",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            maxWidth: 720,
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            boxShadow: "var(--shadow-hero)",
            background: "var(--color-bg-deep)",
          }}
        >
          <Image
            src={brand.screenshotSrc}
            alt={`Full-page screenshot of ${brand.name}'s homepage, captured from a Vancouver VPN`}
            width={1500}
            height={2400}
            sizes="(max-width: 720px) 100vw, 720px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
      {brand.screenshotCaption && (
        <figcaption
          style={{
            padding: "0.85rem 1.5rem 1.25rem",
            fontSize: "0.82rem",
            color: "var(--color-fg-subtle)",
            margin: 0,
            textAlign: "center",
          }}
        >
          {brand.screenshotCaption}
        </figcaption>
      )}
    </figure>
  );
}
