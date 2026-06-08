import type { BrandReviewData } from "@/lib/review-types";
import { ModuleFrame } from "./_ModuleFrame";

export function BrandHistory({ brand }: { brand: BrandReviewData }) {
  return (
    <ModuleFrame eyebrow="The backstory" title={`The story of ${brand.name}`} variant="flush">
      <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.7, margin: 0 }}>
        {brand.yearFounded
          ? `Online since ${brand.yearFounded}, operated by ${brand.operator}. Brand history detail pending.`
          : `Operated by ${brand.operator}. Brand history detail pending.`}
      </p>
    </ModuleFrame>
  );
}
