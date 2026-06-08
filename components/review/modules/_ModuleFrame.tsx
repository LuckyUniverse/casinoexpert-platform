import type { ReactNode } from "react";

/**
 * Shared frame for review-page modules. Provides a consistent heading style
 * but lets each module decide its own body shape — that's important; if
 * every module renders the same internal layout, pages start to feel
 * template-y again.
 */
export function ModuleFrame({
  eyebrow,
  title,
  children,
  variant = "card",
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  variant?: "card" | "flush" | "split";
}) {
  if (variant === "flush") {
    // No card — title sits inline with the body. Useful for shorter modules
    // where a card outline would add too much visual weight.
    return (
      <section>
        {eyebrow && (
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              margin: "0 0 0.4rem",
            }}
          >
            {eyebrow}
          </p>
        )}
        <h2 style={{ fontSize: "1.45rem", marginBottom: "0.85rem" }}>{title}</h2>
        {children}
      </section>
    );
  }

  if (variant === "split") {
    // Wider card with a left rail accent — more visual presence.
    return (
      <section
        className="lu-card"
        style={{
          padding: "1.75rem 1.75rem 1.5rem",
          borderLeft: "3px solid var(--color-cream)",
        }}
      >
        {eyebrow && (
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-cream)",
              margin: "0 0 0.4rem",
            }}
          >
            {eyebrow}
          </p>
        )}
        <h2 style={{ fontSize: "1.55rem", marginBottom: "1rem" }}>{title}</h2>
        {children}
      </section>
    );
  }

  // default 'card'
  return (
    <section
      className="lu-card"
      style={{
        padding: "1.5rem 1.75rem",
      }}
    >
      {eyebrow && (
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-fg-subtle)",
            margin: "0 0 0.4rem",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2 style={{ fontSize: "1.4rem", marginBottom: "0.85rem" }}>{title}</h2>
      {children}
    </section>
  );
}
