import { NextResponse } from "next/server";
import { getSuggestedQuestions } from "@/lib/chat/suggested-questions";

/**
 * GET /api/questions
 * Popular questions to surface as suggestion bubbles in the apps. Sourced from
 * the site's curated suggested-questions list so it's editable in one place.
 * (When request logging lands, this can return genuinely top-asked questions
 * without any client change.)
 */
const CORS_AND_CACHE = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;

export function GET() {
  return NextResponse.json(
    { questions: getSuggestedQuestions("/") },
    { headers: CORS_AND_CACHE },
  );
}
