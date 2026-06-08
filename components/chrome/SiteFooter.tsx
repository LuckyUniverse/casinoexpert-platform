import Link from "next/link";
import { Wordmark } from "./Wordmark";

const SITE_LINKS: Array<{ label: string; href: string }> = [
  { label: "Casinos", href: "/casinos" },
  { label: "Sports", href: "/sports" },
  { label: "Guides", href: "/guides" },
  { label: "Ask the Eggspert", href: "/ask" },
];

const TRUST_LINKS: Array<{ label: string; href: string }> = [
  { label: "Our methodology", href: "/methodology" },
  { label: "Editorial standards", href: "/editorial-standards" },
  { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
  { label: "Responsible gambling", href: "/responsible-gambling" },
];

const LEGAL_LINKS: Array<{ label: string; href: string }> = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  const year = 2026; // hard-coded — date funcs cause hydration drift; refresh annually

  return (
    <footer
      style={{
        background: "var(--color-bg-deep)",
        borderTop: "1px solid var(--color-border-subtle)",
        marginTop: "5rem",
        paddingBlock: "3rem 2rem",
        color: "var(--color-fg-muted)",
        fontSize: "0.92rem",
      }}
    >
      <div className="lu-container">
        {/* RG / 18+ banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 1.25rem",
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-md)",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "999px",
              border: "2px solid var(--color-fg)",
              fontWeight: 800,
              color: "var(--color-fg)",
              flexShrink: 0,
            }}
          >
            18+
          </span>
          <p style={{ margin: 0, maxWidth: 720, lineHeight: 1.5 }}>
            casinoexpert.ai is for adults 18 and over. Gambling involves financial risk and can
            be addictive. If you need help, contact{" "}
            <Link href="https://www.gamcare.org.uk/" target="_blank" rel="noreferrer">
              GamCare
            </Link>
            ,{" "}
            <Link href="https://www.begambleaware.org/" target="_blank" rel="noreferrer">
              BeGambleAware
            </Link>
            , or your provincial helpline.
          </p>
        </div>

        {/* Grid of links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr repeat(3, 1fr)",
            gap: "2rem",
            marginBottom: "2rem",
          }}
          className="lu-footer-grid"
        >
          <div>
            <Wordmark size={36} />
            <p
              style={{
                marginTop: "1rem",
                maxWidth: 320,
                lineHeight: 1.55,
              }}
            >
              The global expert at online casinos — objective reviews of the operators we work
              with, built for players who want to make informed choices.
            </p>
          </div>

          <FooterColumn title="Site" links={SITE_LINKS} />
          <FooterColumn title="Trust" links={TRUST_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--color-border-subtle)",
            flexWrap: "wrap",
            fontSize: "0.85rem",
            color: "var(--color-fg-subtle)",
          }}
        >
          <span>© {year} Lucky Universe Ltd. casinoexpert.ai is an affiliate property.</span>
          <span>
            Some links on this site are affiliate links. Read our{" "}
            <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .lu-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .lu-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3
        style={{
          fontSize: "0.78rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-fg-subtle)",
          marginBottom: "0.85rem",
        }}
      >
        {title}
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              style={{ color: "var(--color-fg-muted)" }}
              className="lu-footer-link"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <style>{`.lu-footer-link:hover { color: var(--color-fg); }`}</style>
    </div>
  );
}
