import { NextResponse } from "next/server";
import { getSuggestedQuestions } from "@/lib/chat/suggested-questions";
import { topQuestions } from "@/lib/chat/question-log";

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

export async function GET() {
  // Prefer genuinely top-asked questions once enough are logged; otherwise fall
  // back to the curated list (and before any KV store is provisioned).
  const top = await topQuestions(8);
  const questions = top.length >= 4 ? top : getSuggestedQuestions("/");
  return NextResponse.json({ questions }, { headers: CORS_AND_CACHE });
}
