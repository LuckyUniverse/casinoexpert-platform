"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChatHero } from "./ChatHero";

/**
 * Pages where the chat banner should NOT appear.
 * Info / about / legal pages don't need it.
 */
const EXCLUDED_PATHS = new Set<string>([
  "/about",
  "/privacy",
  "/terms",
  "/methodology",
]);

export function ContentChatBanner() {
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname.startsWith("/#");
  const isOntario = pathname === "/casinos/ontario";
  const chatMode: "default" | "ontario" = isOntario ? "ontario" : "default";
  const prevPathRef = useRef(pathname);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const navigatedInternally = prevPathRef.current !== pathname;
    prevPathRef.current = pathname;
    if (navigatedInternally) {
      setChatOpen(false);
      if (isHomepage) {
        window.scrollTo({ top: 0, behavior: "instant" });
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
        setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
        setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 100);
      }
    }
  }, [pathname, isHomepage]);

  if (EXCLUDED_PATHS.has(pathname)) return null;

  // Homepage, full hero
  if (isHomepage) {
    return (
      <>
        <div
          id="ask-casinoexpert"
          data-nosnippet=""
          aria-label="Ask CasinoExpert"
          className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white min-h-[calc(100vh-56px)] flex flex-col justify-center"
        >
          <div className="container mx-auto px-4 max-w-7xl py-12">
            <div className="text-center mb-10">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-semibold">
                  19+ Only
                </span>
                <span className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-1.5 text-sm font-semibold">
                  Canadian Online Casinos
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Ask CasinoExpert
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                Your Canadian online casino expert.
              </p>
            </div>
            <ChatHero mode={chatMode} />
          </div>
        </div>
        <div className="bg-gray-50 border-b border-gray-200 py-2">
          <p className="text-center text-sm text-gray-500">
            Reviewed by{" "}
            <span className="font-medium text-gray-700">Andre Weston</span> · 20+
            years iGaming industry experience
          </p>
        </div>
        <div id="content" />
      </>
    );
  }

  // Subpages, compact expandable banner
  return (
    <>
      <div id="ask-casinoexpert">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-full bg-gradient-to-r from-blue-900 to-indigo-900 text-white cursor-pointer hover:from-blue-800 hover:to-indigo-800 transition-colors"
        >
          <div className="container mx-auto px-4 max-w-7xl py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <svg
                className="w-5 h-5 text-blue-300 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p className="text-sm text-blue-100">
                Have a question?{" "}
                <span className="font-semibold text-white">Ask CasinoExpert</span>,{" "}
                {isOntario ? "your AGCO-regulated Ontario casino expert" : "your Canadian casino expert"}
              </p>
            </div>
            <span className="flex-shrink-0 bg-white/15 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
              {chatOpen ? "Close ✕" : "Ask a question"}
            </span>
          </div>
        </button>

        {chatOpen && (
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
            <div className="container mx-auto px-4 max-w-7xl py-6">
              <ChatHero mode={chatMode} />
            </div>
          </div>
        )}
      </div>
      <div id="content" />
    </>
  );
}
