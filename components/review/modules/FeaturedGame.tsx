import type { BrandReviewData } from "@/lib/review-types";
import { ModuleFrame } from "./_ModuleFrame";

export function FeaturedGame({ brand: _brand }: { brand: BrandReviewData }) {
  return (
    <ModuleFrame eyebrow="Worth a session" title="Featured game" variant="card">
      <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.6, margin: 0 }}>
        Brand-specific featured-game spotlight — chosen for relevance, not popularity — will go
        here. The featured game varies per page so the spotlight reads as a real recommendation
        rather than a generic top-10.
      </p>
    </ModuleFrame>
  );
}
