import type { BrandReviewData } from "@/lib/review-types";

/**
 * Quick-reference table — appears at the bottom of every review page.
 * Factual rows only, no editorial language. Renders gracefully if fields
 * are missing.
 */
export function QuickRef({ brand }: { brand: BrandReviewData }) {
  const rows: Array<[string, string | undefined]> = [
    ["License", `${brand.licenseBody}${brand.licenseNumber ? ` ${brand.licenseNumber}` : ""}${brand.licenseStatus ? ` (${brand.licenseStatus})` : ""}`],
    ["Year founded", brand.yearFounded?.toString()],
    ["Software / Sports", brand.softwareProviders?.join(", ")],
    ["Game count / Markets", brand.gameCountClaim],
    ["Welcome offer", brand.welcomeOfferShort],
    ["Wagering req.", brand.wageringRequirement],
    ["Min deposit", brand.minDeposit],
    ["Withdrawal time", brand.withdrawalTime],
    ["CAD support", "Yes"],
    ["Mobile", brand.mobile],
    ["Live chat", brand.liveChat],
    ["eCOGRA / formal ADR", brand.formalAdr],
    ["Trustpilot", brand.trustpilot],
    ["Casino.Guru safety", brand.casinoGuruSafety],
  ];

  return (
    <div className="lu-card" style={{ overflow: "hidden" }}>
      <header
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--color-border-subtle)",
          background: "var(--color-bg-deep)",
        }}
      >
        <h2 style={{ fontSize: "1.15rem", margin: 0 }}>{brand.name} — quick reference</h2>
      </header>
      <dl style={{ margin: 0 }}>
        {rows.map(([label, value], i) => (
          <div
            key={label}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(160px, 220px) 1fr",
              padding: "0.85rem 1.5rem",
              borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--color-border-subtle)",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <dt style={{ fontSize: "0.85rem", color: "var(--color-fg-subtle)" }}>{label}</dt>
            <dd style={{ margin: 0, color: value ? "var(--color-fg)" : "var(--color-fg-subtle)" }}>
              {value ?? "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
