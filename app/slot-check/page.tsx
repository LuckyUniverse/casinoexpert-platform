import type { Metadata } from "next";
import Image from "next/image";
import { SlotCheckClient } from "@/components/slot-check/SlotCheckClient";

/**
 * Client demo for penny-slot-machines.com: live AI slot-game reviews.
 * NOT indexed, off the sitemap, unlinked from navigation, and NOT behind
 * the registration gate (to be disabled after the pitch).
 */
export const metadata: Metadata = {
  title: "Slot Game Check (Demo)",
  description: "Live AI review of any slot machine game.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function SlotCheckPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <p className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          Demo preview - not indexed
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Slot Game Check
          </h1>
          <span className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Prepared for
            </span>
            <Image
              src="/partners/penny-slot-machines.png"
              alt="Penny Slot Machines"
              width={96}
              height={48}
              className="h-10 w-auto"
            />
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-gray-600">
          Enter any slot machine game. We run a live check against provider
          data, slot databases, and player reviews, then score everything that
          matters to a player - RTP versions, volatility, win potential,
          stake range, and whether the game you load is the real thing.
        </p>
      </div>
      <SlotCheckClient />
    </main>
  );
}
