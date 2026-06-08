import type { BrandReviewData } from "@/lib/review-types";
import { ModuleFrame } from "./_ModuleFrame";

export function MobileWalkthrough({ brand }: { brand: BrandReviewData }) {
  return (
    <ModuleFrame eyebrow="On the small screen" title="Mobile experience" variant="card">
      <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.6, margin: 0 }}>
        {brand.mobile ?? "Mobile app vs. mobile-web breakdown pending operator-site walk."}
      </p>
    </ModuleFrame>
  );
}
