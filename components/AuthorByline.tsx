"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Andre Weston author bio block - appears at the bottom of every brand review.
 * Mirrors casinogpt's AuthorBio component but tuned for casinoexpert.ai's
 * broader Canadian (non-Ontario) scope.
 */
export function AuthorBio({ className = "" }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 md:p-8 ${className}`}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
        About the Expert: Andre Weston
      </h3>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-xl bg-white">
            <Image
              src="/images/andre-weston.jpg"
              alt="Andre Weston - iGaming industry expert"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center md:text-left">
            Andre Weston{" "}
            <span className="text-base md:text-lg font-normal text-gray-600 block md:inline">
              | iGaming Industry Consultant
            </span>
          </h4>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            Andre Weston is an online casino industry expert with more than twenty years of
            experience across operations, payments, player protection, fraud prevention, VIP
            management, and platform integrity. His perspective is grounded in real
            operational experience inside major global online casino environments, combined
            with active firsthand player experience across dozens of platforms in Canada and
            abroad.
          </p>

          {expanded && (
            <>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                Having worked across multiple disciplines inside casino operations, Andre has
                practical knowledge of how the systems function behind the scenes - including
                withdrawals, payment processing, account restrictions, bonus mechanics,
                compliance frameworks, and risk-management protocols. That dual perspective of
                operator-side and player-side experience is what lets him write reviews that
                are useful rather than promotional.
              </p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                Andre has travelled extensively to major gambling jurisdictions including Las
                Vegas, attended international iGaming conferences, and worked across multiple
                regulatory regimes (UKGC, MGA, Kahnawake, AGCO). The breadth helps him compare
                how operators behave when they&apos;re regulated tightly versus more loosely, and
                translate that into clear guidance for Canadian players.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm border-t border-blue-200 pt-4 mb-4">
                <a
                  href="https://andreweston.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  andreweston.com
                </a>
                <Link
                  href="/authors/andre-weston"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Full bio →
                </Link>
              </div>
            </>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {expanded ? "Show less" : "Read more about Andre →"}
          </button>
        </div>
      </div>
    </div>
  );
}
