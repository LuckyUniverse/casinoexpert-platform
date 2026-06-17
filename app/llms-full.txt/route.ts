import { allCasinosInOrder } from "@/lib/casino-data";
import { stripHtml } from "@/lib/text";

/**
 * /llms-full.txt — single-fetch full reference of every casino (capsule,
 * verdict, quick facts, FAQ). Generated from the registry; no content changes.
 */
const SITE = "https://casinoexpert.ai";

export const dynamic = "force-static";

export function GET() {
  const brands = allCasinosInOrder();
  const out: string[] = [
    "# CasinoExpert AI — full reference",
    "",
    "Expert-reviewed online casinos for Canadian players. Reviewed by Andre Weston.",
    "",
  ];

  for (const b of brands) {
    out.push(`## ${b.name}`);
    out.push(`URL: ${SITE}/casinos/${b.slug}`);
    if (b.operator) out.push(`Operator: ${b.operator}`);
    if (b.license) out.push(`Licence: ${b.license}`);
    if (typeof b.trustScore === "number") {
      out.push(`Trust score: ${b.trustScore}/100${b.trustRating ? ` (${b.trustRating})` : ""}`);
    }
    if (b.answerCapsule) out.push(`Summary: ${b.answerCapsule}`);
    if (b.expertVerdict) out.push(`Expert verdict: ${b.expertVerdict}`);
    if (b.quickFacts?.length) {
      out.push("Quick facts:");
      for (const f of b.quickFacts) out.push(`- ${f.label}: ${f.value}`);
    }
    if (b.faqs?.length) {
      out.push("FAQ:");
      for (const f of b.faqs) out.push(`- Q: ${f.question} — A: ${stripHtml(f.answer)}`);
    }
    out.push("");
  }

  return new Response(out.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
