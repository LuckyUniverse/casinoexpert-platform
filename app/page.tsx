import Image from "next/image";

export default function Home() {
  return (
    <section className="lu-container" style={{ paddingBlock: "4rem 4rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "3rem",
          alignItems: "center",
        }}
        className="lu-home-grid"
      >
        <div>
          <p
            style={{
              display: "inline-block",
              padding: "0.35rem 0.85rem",
              borderRadius: 999,
              border: "1px solid var(--color-border-strong)",
              background: "var(--color-bg-elevated)",
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "1.5rem",
              fontWeight: 600,
            }}
          >
            Coming soon
          </p>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 700,
              marginBottom: "1.25rem",
            }}
          >
            <span>casino</span>
            <span style={{ color: "var(--color-brand-red)" }}>expert</span>
            <span style={{ color: "var(--color-accent)" }}>.ai</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: "var(--color-fg)",
              maxWidth: "42ch",
              marginBottom: "0.65rem",
              lineHeight: 1.45,
              fontWeight: 500,
            }}
          >
            Expert insights. Smarter play.
          </p>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-fg-muted)",
              maxWidth: "42ch",
              lineHeight: 1.5,
              marginBottom: "0.5rem",
            }}
          >
            Your ultimate, factual, objective casino guide.
          </p>
          <p
            style={{
              color: "var(--color-accent)",
              fontStyle: "italic",
              fontSize: "1rem",
            }}
          >
            Coming soon to a casino near you…
          </p>
        </div>

        <div
          aria-hidden="true"
          className="lu-home-mascot"
          style={{
            display: "flex",
            justifyContent: "center",
            filter: "drop-shadow(0 22px 36px rgba(0, 0, 0, 0.45))",
          }}
        >
          <Image
            src="/images/brand/logo-medallion.png"
            alt=""
            width={340}
            height={329}
            priority
            sizes="(max-width: 760px) 240px, 340px"
            style={{ width: 340, height: "auto" }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .lu-home-grid { grid-template-columns: 1fr !important; }
          .lu-home-mascot { order: -1; }
          .lu-home-mascot img { width: 240px !important; }
        }
      `}</style>
    </section>
  );
}
