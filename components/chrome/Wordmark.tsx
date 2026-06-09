import Image from "next/image";
import Link from "next/link";

/**
 * casinoexpert.ai logo lockup — medallion icon + tri-colour wordmark.
 *
 * The wordmark is rendered as live text (not a raster crop) so it stays
 * crisp at every size and respects user-agent font rendering / accessibility.
 * The medallion is the AI-rendered round badge sitting beside it.
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
      <span
        style={{
          display: "inline-flex",
          lineHeight: 0,
          width: size,
          height: size,
          flexShrink: 0,
        }}
      >
        <Image
          src="/images/brand/logo-medallion.png"
          alt="casinoexpert.ai mascot — the Eggspert in a casino chip"
          width={size}
          height={size}
          priority
          style={{ width: size, height: size, objectFit: "contain" }}
        />
      </span>
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "-0.01em",
          }}
        >
          <span>casino</span>
          <span style={{ color: "var(--color-brand-red)" }}>expert</span>
          <span style={{ color: "var(--color-accent)" }}>.ai</span>
        </span>
      )}
    </Link>
  );
}
