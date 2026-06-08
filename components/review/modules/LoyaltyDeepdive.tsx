import type { BrandReviewData } from "@/lib/review-types";
import { ModuleFrame } from "./_ModuleFrame";

export function LoyaltyDeepdive({ brand }: { brand: BrandReviewData }) {
  return (
    <ModuleFrame eyebrow="Loyalty & rewards" title={`How ${brand.name}'s loyalty program works`} variant="split">
      <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.6, marginBottom: 0 }}>
        Loyalty and VIP tier detail pending operator-site walk. This is the slot where the
        program structure, comp-point earn rate, tier benefits and any cash-back mechanics
        get laid out, with specifics rather than marketing platitudes.
      </p>
    </ModuleFrame>
  );
}
