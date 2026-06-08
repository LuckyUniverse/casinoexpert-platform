import type { BrandReviewData } from "@/lib/review-types";
import { ModuleFrame } from "./_ModuleFrame";

export function LiveDealerFocus({ brand: _brand }: { brand: BrandReviewData }) {
  return (
    <ModuleFrame eyebrow="Live tables" title="Live dealer, in practice" variant="flush">
      <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.6, margin: 0 }}>
        Live dealer offering — table count, providers (Evolution, On Air, Pragmatic Live),
        Canadian-friendly stake ranges, and any standout exclusives — pending operator-site
        walk.
      </p>
    </ModuleFrame>
  );
}
