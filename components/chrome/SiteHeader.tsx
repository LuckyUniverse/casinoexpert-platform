"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "./Wordmark";

/**
 * Primary nav targets. Pages may not all exist yet during the build-out —
 * the links will 404 until each one ships, which is intentional rather
 * than hidden so we can wire pages up as they land.
 */
const NAV_ITEMS: Array<{ label: string; href: string }> = [
  { label: "Casinos", href: "/casinos" },
  { label: "Sports", href: "/sports" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--color-bg-deep) 92%, transparent)",
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div
        className="lu-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBlock: "0.85rem",
          gap: "1rem",
        }}
      >
        <Wordmark size={32} />

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
          className="lu-nav-desktop"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "var(--color-fg-muted)",
                fontWeight: 500,
                fontSize: "0.95rem",
                transition: "color 150ms ease-out",
              }}
              className="lu-nav-link"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/ask" className="lu-btn-accent" style={{ padding: "0.45rem 0.95rem", fontSize: "0.9rem" }}>
            Ask the Eggspert
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          aria-expanded={open}
          aria-controls="lu-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="lu-menu-toggle"
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid var(--color-border-strong)",
            color: "var(--color-fg)",
            borderRadius: "999px",
            width: 40,
            height: 40,
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path d="M3 5h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M3 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M3 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <div
          id="lu-mobile-menu"
          className="lu-container"
          style={{
            paddingBlock: "0.75rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            borderTop: "1px solid var(--color-border-subtle)",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                color: "var(--color-fg)",
                padding: "0.65rem 0.25rem",
                fontWeight: 500,
                fontSize: "1rem",
                borderBottom: "1px solid var(--color-border-subtle)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/ask"
            onClick={() => setOpen(false)}
            className="lu-btn-accent"
            style={{ marginTop: "0.75rem", justifyContent: "center" }}
          >
            Ask the Eggspert
          </Link>
        </div>
      )}

      {/* Scoped responsive helpers */}
      <style>{`
        .lu-nav-link:hover { color: var(--color-fg); }
        @media (max-width: 768px) {
          .lu-nav-desktop { display: none !important; }
          .lu-menu-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
