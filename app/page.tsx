import { Phase1 } from "@/components/eggspert/phases/Phase1";

export default function Home() {
  return (
    <section className="lu-container" style={{ paddingBlock: "5rem 4rem" }}>
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
              padding: "0.35rem 0.75rem",
              borderRadius: 999,
              border: "1px solid var(--color-border-strong)",
              background: "var(--color-bg-elevated)",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "1.5rem",
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
            casinoexpert<span style={{ color: "var(--color-accent)" }}>.ai</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
              color: "var(--color-fg-muted)",
              maxWidth: "38ch",
              marginBottom: "0.5rem",
              lineHeight: 1.5,
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
            filter: "drop-shadow(0 18px 36px rgba(0, 0, 0, 0.4))",
          }}
        >
          <Phase1 size={260} />
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .lu-home-grid { grid-template-columns: 1fr !important; }
          .lu-home-mascot { order: -1; }
        }
      `}</style>
    </section>
  );
}
