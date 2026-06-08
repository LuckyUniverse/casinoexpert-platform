import type { BrandReviewData } from "@/lib/review-types";
import { ModuleFrame } from "./_ModuleFrame";

export function WithdrawalExperience({ brand }: { brand: BrandReviewData }) {
  return (
    <ModuleFrame eyebrow="Cashing out" title="What withdrawal looks like" variant="split">
      <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.6, marginBottom: 0 }}>
        {brand.withdrawalTime
          ? `Typical withdrawal flow: ${brand.withdrawalTime}.`
          : "Withdrawal flow and verification timing pending operator-site walk."}{" "}
        First-time payouts typically wait for verification to clear; repeat payouts run faster.
      </p>
    </ModuleFrame>
  );
}
