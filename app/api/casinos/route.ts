import { NextResponse } from "next/server";
import { allCasinosInOrder } from "@/lib/casino-data";

/**
 * GET /api/casinos
 * Public JSON list of every reviewed brand (summary fields only — call
 * /api/casinos/[slug] for the full review). Reads the same lib/casino-data
 * registry that renders the HTML pages, so the data is identical and never
 * duplicated. Consumed by the native apps; cached at the edge.
 */
const CORS_AND_CACHE = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;

export function GET() {
  const casinos = allCasinosInOrder().map((c) => ({
    slug: c.slug,
    name: c.name,
    shortName: c.shortName,
    operator: c.operator,
    jurisdiction: c.jurisdiction,
    regulator: c.regulator,
    license: c.license,
    founded: c.founded,
    currency: c.currency,
    trustScore: c.trustScore ?? null,
    trustRating: c.trustRating ?? null,
    answerCapsule: c.answerCapsule ?? null,
    expertVerdict: c.expertVerdict ?? null,
    badges: c.badges ?? [],
    paymentMethods: c.paymentMethods ?? [],
    quickFacts: c.quickFacts,
    lastReviewed: c.lastReviewed ?? null,
    dealLive: c.dealLive,
  }));

  return NextResponse.json(
    { count: casinos.length, casinos },
    { headers: CORS_AND_CACHE },
  );
}
