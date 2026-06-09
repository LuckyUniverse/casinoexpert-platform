import Image from "next/image";
import Link from "next/link";
import type { BrandReviewData } from "@/lib/review-types";
import { ANDRE_WESTON } from "@/lib/author-data/andre-weston";

/**
 * Signed expert verdict — replaces the placeholder "Eggspert's take" as the
 * page's opinion module. Carries a real named author (Andre Weston) with
 * verifiable credentials, photo, and link to the author profile page.
 *
 * The Eggspert remains the site mascot in chrome / progression / Ask panel
 * contexts, but the *opinion* on each brand review is owned by a credentialed
 * human. That's what carries E-E-A-T weight on YMYL pages — Google ranks
 * signed expert content above anonymous editorial.
 */
export function ExpertVerdict({ brand }: { brand: BrandReviewData }) {
  const author = ANDRE_WESTON;

  if (!brand.expertVerdict) return <></>;

  return (
    <section
      className="lu-card"
      aria-labelledby={`expert-verdict-${brand.slug}`}
      style={{
        padding: "1.75rem 1.75rem 1.5rem",
        borderLeft: "4px solid var(--color-accent)",
        background:
          "linear-gradient(135deg, var(--color-bg-card) 0%, var(--color-bg-elevated) 100%)",
      }}
    >
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.1rem",
        }}
      >
        <Link
          href={`/authors/${author.slug}`}
          aria-label={`${author.name} — author profile`}
          style={{ lineHeight: 0 }}
        >
          <span
            style={{
              display: "inline-block",
              width: 56,
              height: 56,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--color-accent)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <Image
              src={author.photoSrc}
              alt={`${author.name} — ${author.title}`}
              width={56}
              height={56}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </span>
        </Link>
        <div>
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              margin: "0 0 0.2rem",
            }}
          >
            Expert verdict
          </p>
          <h2
            id={`expert-verdict-${brand.slug}`}
            style={{ fontSize: "1.15rem", margin: 0, color: "var(--color-fg)" }}
          >
            <Link
              href={`/authors/${author.slug}`}
              style={{ color: "var(--color-fg)" }}
            >
              {author.name}
            </Link>{" "}
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 400,
                color: "var(--color-fg-muted)",
              }}
            >
              · {author.title}
            </span>
          </h2>
        </div>
      </header>

      <p
        style={{
          margin: 0,
          color: "var(--color-fg)",
          lineHeight: 1.7,
          fontSize: "1.02rem",
        }}
      >
        {brand.expertVerdict}
      </p>

      <footer
        style={{
          marginTop: "1.25rem",
          paddingTop: "0.85rem",
          borderTop: "1px solid var(--color-border-subtle)",
          fontSize: "0.82rem",
          color: "var(--color-fg-subtle)",
        }}
      >
        Andre signs and verifies every brand review on casinoexpert.ai.{" "}
        <Link href={`/authors/${author.slug}`}>About Andre →</Link>
      </footer>
    </section>
  );
}
