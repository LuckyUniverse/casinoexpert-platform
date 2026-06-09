import Image from "next/image";
import type { BrandReviewData } from "@/lib/review-types";

/**
 * "What you'll see when you arrive" — a cropped preview of the brand's
 * live homepage, captured from a Vancouver VPN so it matches the
 * rest-of-Canada experience the reader will get.
 *
 * Renders only when brand.screenshotSrc is set. We show only the
 * above-the-fold portion (top ~480 px) of the source image so the page
 * doesn't turn into an unscrollable monolith — the rest of the screenshot
 * is purely a source asset, not a UI element. Anyone who wants to see
 * the whole live site can click through.
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
          padding: "0.85rem 1.25rem",
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
          See it live →
        </a>
      </div>

      <div
        style={{
          background:
            "linear-gradient(180deg, var(--color-bg-deep) 0%, var(--color-bg-elevated) 100%)",
          padding: "1.25rem",
        }}
      >
        {/* Cropped preview frame */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 880,
            margin: "0 auto",
            height: 480,
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            boxShadow: "var(--shadow-hero)",
            background: "var(--color-bg-deep)",
          }}
        >
          <Image
            src={brand.screenshotSrc}
            alt={`${brand.name} homepage above the fold, captured from a Vancouver VPN`}
            fill
            sizes="(max-width: 880px) 100vw, 880px"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
            priority={false}
          />
          {/* Bottom fade — tells the eye there's more page below, doesn't pretend the screenshot ends here */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 90,
              background:
                "linear-gradient(180deg, rgba(7,16,31,0) 0%, var(--color-bg-deep) 95%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {brand.screenshotCaption && (
        <figcaption
          style={{
            padding: "0.6rem 1.5rem 1rem",
            fontSize: "0.78rem",
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
