import Link from "next/link";
import { Phase1 } from "../eggspert/phases/Phase1";

/**
 * The site's combined mascot + wordmark, used in the header and footer.
 *
 * Reuses the Phase 1 Eggspert SVG so the mascot stays consistent with the
 * gamification system. Sized small so it works as a logo lockup.
 */
export function Wordmark({
  size = 36,
  showText = true,
}: {
  size?: number;
  showText?: boolean;
}) {
  return (
    <Link
      href="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        color: "var(--color-fg)",
        textDecoration: "none",
        lineHeight: 1,
      }}
      aria-label="casinoexpert.ai home"
    >
      <span style={{ display: "inline-flex", lineHeight: 0 }}>
        <Phase1 size={size} />
      </span>
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "-0.01em",
          }}
        >
          casinoexpert<span style={{ color: "var(--color-accent)" }}>.ai</span>
        </span>
      )}
    </Link>
  );
}
