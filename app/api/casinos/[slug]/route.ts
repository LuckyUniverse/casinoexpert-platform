import { NextResponse } from "next/server";
import { getCasino } from "@/lib/casino-data";

/**
 * GET /api/casinos/[slug]
 * Public JSON for a single brand — the full CasinoConfig (including the HTML
 * content sections, FAQs and quick facts), so native clients can render the
 * complete review in-app without sending the user to the website. Reads the
 * same lib/casino-data registry that renders the HTML page.
 */
const CORS_AND_CACHE = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const casino = getCasino(slug);
  if (!casino) {
    return NextResponse.json(
      { error: "not_found", slug },
      { status: 404, headers: { "Access-Control-Allow-Origin": "*" } },
    );
  }
  return NextResponse.json(casino, { headers: CORS_AND_CACHE });
}
