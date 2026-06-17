/**
 * GET /api — machine-readable discovery index for agents/apps. Points at the
 * public casino endpoints + the llms.txt surfaces. CORS-open, edge-cached.
 */
const SITE = "https://casinoexpert.ai";

const CORS_AND_CACHE = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;

export function GET() {
  return Response.json(
    {
      name: "CasinoExpert AI API",
      description: "Public casino data for Canadian online casinos, reviewed by Andre Weston.",
      endpoints: {
        casinos: `${SITE}/api/casinos`,
        casino: `${SITE}/api/casinos/{slug}`,
        questions: `${SITE}/api/questions`,
      },
      llms: `${SITE}/llms.txt`,
      reference: `${SITE}/llms-full.txt`,
      sitemap: `${SITE}/sitemap.xml`,
    },
    { headers: CORS_AND_CACHE },
  );
}
