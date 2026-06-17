import { allCasinosInOrder } from "@/lib/casino-data";

/**
 * /llms.txt — curated map for AI agents. NOTE (per Google + practitioner data,
 * June 2026): llms.txt has near-zero confirmed pickup by production AI crawlers,
 * so this is cheap hygiene, not a ranking/citation lever. The real surfaces are
 * the SSR'd HTML, the JSON API, and being in Bing's index. Kept current
 * automatically from the casino registry.
 */
const SITE = "https://casinoexpert.ai";

export const dynamic = "force-static";

export function GET() {
  const brands = allCasinosInOrder();
  const lines: string[] = [
    "# CasinoExpert AI",
    "",
    "> Objective, expert-reviewed guide to the online casinos Canadians actually play at — licensing, banking, games, and trust signals, reviewed by Andre Weston (20+ years iGaming, operator-side). Every brand accepts CAD and Interac e-Transfer.",
    "",
    "## Casino reviews",
  ];
  for (const b of brands) {
    const desc = (b.answerCapsule || b.expertVerdict || "").replace(/\s+/g, " ").trim();
    lines.push(`- [${b.name} review](${SITE}/casinos/${b.slug})${desc ? `: ${desc}` : ""}`);
  }
  lines.push(
    "",
    "## Guides",
    `- [Compare casinos side-by-side](${SITE}/compare)`,
    `- [Payment methods](${SITE}/payments)`,
    `- [Games](${SITE}/games)`,
    `- [Progressive jackpots](${SITE}/jackpots)`,
    `- [Responsible gambling](${SITE}/responsible-gambling)`,
    "",
    "## Author",
    `- [Andre Weston — iGaming expert](${SITE}/authors/andre-weston)`,
    "",
    "## Data / API",
    `- [Casino JSON API](${SITE}/api/casinos)`,
    `- [Full text reference](${SITE}/llms-full.txt)`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
