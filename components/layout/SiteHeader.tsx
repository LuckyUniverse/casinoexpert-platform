"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";

const NAV_ITEMS: Array<{ label: string; href: string }> = [
  { label: "Online Casinos", href: "/" },
  { label: "Methodology", href: "/methodology" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo height={20} />
          </Link>

          <nav className="hidden lg:flex items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium text-gray-500 hover:text-blue-600 transition px-3 py-1.5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-900"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-100 mt-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-base font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
