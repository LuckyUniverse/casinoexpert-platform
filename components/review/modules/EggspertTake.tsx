import type { BrandReviewData } from "@/lib/review-types";
import { Phase3 } from "@/components/eggspert/phases/Phase3";

/**
 * "Eggspert's take" — a small, opinionated, mascot-fronted callout. Used
 * sparingly (not every brand gets one) so it stays special when it appears.
 *
 * Body content is brand-specific and written by hand — this is the place
 * for the one cheeky, memorable line per brand that no other page has.
 */
export function EggspertTake({ brand: _brand }: { brand: BrandReviewData }) {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 12%, var(--color-bg-elevated)) 0%, var(--color-bg-elevated) 100%)",
        border: "1px solid var(--color-border-strong)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem 1.75rem",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "1.25rem",
        alignItems: "center",
      }}
    >
      <Phase3 size={88} />
      <div>
        <p
          style={{
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-accent)",
            margin: "0 0 0.35rem",
          }}
        >
          Eggspert's take
        </p>
        <p style={{ margin: 0, color: "var(--color-fg)", lineHeight: 1.55 }}>
          The brand-specific zinger lands here — one line, opinion-led, written fresh per page.
        </p>
      </div>
    </section>
  );
}
