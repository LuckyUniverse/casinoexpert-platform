import type { BrandReviewData } from "@/lib/review-types";
import { ModuleFrame } from "./_ModuleFrame";

/**
 * Module — breaks down the welcome offer mechanics: % match, wagering, time
 * limit, the *actual* cost of clearing it. Strong on hook-led pages, optional
 * on heritage/experience-led pages.
 */
export function WelcomeOfferMath({ brand }: { brand: BrandReviewData }) {
  return (
    <ModuleFrame eyebrow="The offer in plain numbers" title="Welcome offer, by the math" variant="card">
      <p style={{ fontSize: "1.05rem", marginBottom: "1rem", color: "var(--color-fg)" }}>
        {brand.welcomeOfferShort}
      </p>
      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          margin: 0,
        }}
      >
        <Stat label="Wagering" value={brand.wageringRequirement ?? "—"} />
        <Stat label="Min deposit" value={brand.minDeposit ?? "—"} />
        <Stat label="License" value={brand.licenseBody} />
      </dl>
    </ModuleFrame>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt
        style={{
          fontSize: "0.72rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-fg-subtle)",
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </dt>
      <dd style={{ margin: 0, fontWeight: 600, color: "var(--color-cream)" }}>{value}</dd>
    </div>
  );
}
