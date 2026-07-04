import type { Metadata } from "next";
import { SafetyCheckClient } from "@/components/safety-check/SafetyCheckClient";

/**
 * Internal lab page for the live AI casino safety check.
 * Deliberately NOT indexed: robots noindex below, absent from sitemap.ts,
 * and not linked from any navigation. Reach it directly at /safety-check.
 */
export const metadata: Metadata = {
  title: "Casino Safety Check (Lab)",
  description: "Live AI safety check for any online casino, by market.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function SafetyCheckPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <p className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          Lab preview - not indexed
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Casino Safety Check
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Enter any online casino and where you play from. We run a live check
          against regulator registers, complaint data, and company records,
          then score it on the criteria that actually predict whether players
          get paid.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Reports are date-stamped and refreshed every 6 months.{" "}
          <a href="/safety-check/guide" className="text-blue-600 underline hover:text-blue-800">
            How our checks work, and our affiliate transparency policy
          </a>
        </p>
      </div>
      <SafetyCheckClient />
    </main>
  );
}
