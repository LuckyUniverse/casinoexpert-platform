import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ANDRE_WESTON } from "@/lib/author-data/andre-weston";

export const metadata: Metadata = {
  title: "Andre Weston — iGaming Industry Expert",
  description:
    "Andre Weston is an iGaming industry expert with 20+ years of experience across casino operations, payments, player protection, VIP management, and platform integrity. He reviews and signs the verdicts on casinoexpert.ai.",
  alternates: { canonical: "/authors/andre-weston" },
};

export default function AndreWestonPage() {
  const author = ANDRE_WESTON;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.title,
    description: author.bioParagraphs[0],
    url: `https://casinoexpert.ai/authors/${author.slug}`,
    image: `https://casinoexpert.ai${author.photoSrc}`,
    sameAs: [author.websiteUrl],
    knowsAbout: author.expertiseTags,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article className="lu-container" style={{ paddingBlock: "3rem 4rem", maxWidth: 880 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
          <ol
            style={{
              display: "flex",
              gap: "0.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
              color: "var(--color-fg-subtle)",
              fontSize: "0.85rem",
            }}
          >
            <li>
              <Link href="/" style={{ color: "var(--color-fg-muted)" }}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/about" style={{ color: "var(--color-fg-muted)" }}>
                About
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li style={{ color: "var(--color-fg)" }}>{author.name}</li>
          </ol>
        </nav>

        {/* Header lockup */}
        <header
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "2rem",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
          className="lu-author-header"
        >
          <div
            style={{
              width: 144,
              height: 144,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid var(--color-accent)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <Image
              src={author.photoSrc}
              alt={`${author.name} — ${author.title}`}
              width={144}
              height={144}
              priority
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                margin: "0 0 0.25rem",
              }}
            >
              Expert author
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 2.75rem)", marginBottom: "0.4rem" }}>
              {author.name}
            </h1>
            <p style={{ color: "var(--color-fg-muted)", marginBottom: "0.85rem", fontSize: "1.1rem" }}>
              {author.title}
            </p>
            <p style={{ color: "var(--color-fg-subtle)", fontSize: "0.92rem", margin: 0 }}>
              <a href={author.websiteUrl} target="_blank" rel="noreferrer">
                {author.websiteUrl.replace(/^https?:\/\//, "")}
              </a>
              {" · "}
              {author.credentialsLine}
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "1rem 0 0",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {author.expertiseTags.map((tag) => (
                <li
                  key={tag}
                  style={{
                    padding: "0.3rem 0.7rem",
                    background: "var(--color-bg-elevated)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: 999,
                    fontSize: "0.82rem",
                    color: "var(--color-fg-muted)",
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Bio */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>About Andre</h2>
          {author.bioParagraphs.map((p, i) => (
            <p
              key={i}
              style={{
                margin: "0 0 1.1rem",
                lineHeight: 1.7,
                color: "var(--color-fg)",
                fontSize: "1.02rem",
              }}
            >
              {p}
            </p>
          ))}
        </section>

        {/* Areas of expertise */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Areas of expertise</h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {author.expertiseAreas.map((a) => (
              <li
                key={a.title}
                className="lu-card"
                style={{ padding: "1.1rem 1.25rem" }}
              >
                <h3 style={{ fontSize: "1.05rem", marginBottom: "0.4rem" }}>{a.title}</h3>
                <p style={{ margin: 0, color: "var(--color-fg-muted)", fontSize: "0.92rem", lineHeight: 1.55 }}>
                  {a.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Role */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Role at casinoexpert.ai</h2>
          <p style={{ lineHeight: 1.7, color: "var(--color-fg)", fontSize: "1.02rem", marginBottom: "0.85rem" }}>
            Andre signs the expert verdict on every brand review published here. Each verdict is
            written from his operator-side knowledge of how a given casino actually behaves —
            cashier reliability, KYC process, bonus mechanics, support quality — not from the
            marketing copy on the site.
          </p>
          <p style={{ lineHeight: 1.7, color: "var(--color-fg)", fontSize: "1.02rem", margin: 0 }}>
            He also reviews and verifies the factual claims on every page (licensing, license
            numbers, payout speeds, software providers, T&amp;Cs) before publication, and flags
            anything that doesn't hold up against current operator behaviour.
          </p>
        </section>
      </article>

      <style>{`
        @media (max-width: 720px) {
          .lu-author-header { grid-template-columns: 1fr !important; text-align: center; }
        }
      `}</style>
    </>
  );
}
