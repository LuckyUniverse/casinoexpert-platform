import type { BrandReviewData } from "@/lib/review-types";
import { ModuleFrame } from "./_ModuleFrame";

export function GameLibrarySpotlight({ brand }: { brand: BrandReviewData }) {
  return (
    <ModuleFrame eyebrow="Inside the lobby" title="What you'll actually play" variant="flush">
      <p style={{ marginBottom: "1rem", color: "var(--color-fg-muted)", lineHeight: 1.6 }}>
        {brand.gameCountClaim ?? "Game catalogue detail pending operator-site walk."}
      </p>
      {brand.softwareProviders && brand.softwareProviders.length > 0 && (
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {brand.softwareProviders.map((p) => (
            <li
              key={p}
              style={{
                padding: "0.35rem 0.75rem",
                background: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: 999,
                fontSize: "0.85rem",
                color: "var(--color-fg-muted)",
              }}
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </ModuleFrame>
  );
}
