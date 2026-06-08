import Link from "next/link";
import type { BrandReviewData } from "@/lib/review-types";
import { ModuleFrame } from "./_ModuleFrame";

/**
 * Family transparency module — for the Bayton 4 and Casino Rewards 7. Shows
 * the brand's sister sites and a one-line "best for…" framing so readers can
 * orient themselves quickly. Also creates a unique internal-link graph per
 * page.
 */
export function SisterComparison({ brand }: { brand: BrandReviewData }) {
  if (!brand.sisters || brand.sisters.length === 0) return <></>;

  const familyLabel: Record<typeof brand.family, string> = {
    "bayton-4": "the Bayton family",
    "betway": "the Betway lineup",
    "casino-rewards-7": "the Casino Rewards group",
    "independent": "the family",
  };

  return (
    <ModuleFrame
      eyebrow="Family ties"
      title={`Where ${brand.name} sits in ${familyLabel[brand.family]}`}
      variant="card"
    >
      <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
        These brands share infrastructure — same backend, similar loyalty mechanics, related
        operator. If {brand.name} isn't quite the fit, here's where its sisters lean:
        {brand.bestFor ? ` ${brand.name} ${brand.bestFor}.` : ""}
      </p>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0.75rem",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {brand.sisters.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/casinos/${s.slug}`}
              style={{
                display: "block",
                padding: "0.85rem 1rem",
                background: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-md)",
                color: "var(--color-fg)",
                fontWeight: 500,
              }}
            >
              {s.name}
              <span style={{ display: "block", fontSize: "0.8rem", color: "var(--color-fg-subtle)", marginTop: 2 }}>
                See review →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </ModuleFrame>
  );
}
