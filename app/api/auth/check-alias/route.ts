import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { validateAlias } from "@/lib/auth/validation";

/**
 * GET /api/auth/check-alias?alias=... - live availability feedback for the
 * registration form (same UX as casinogpt, but served via the admin client
 * because cex_users has no public read policy).
 */
export async function GET(req: Request) {
  const alias = new URL(req.url).searchParams.get("alias") ?? "";

  const error = validateAlias(alias);
  if (error) return NextResponse.json({ available: false, error });

  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from("cex_users")
    .select("id")
    .ilike("alias", alias.trim())
    .limit(1);

  return NextResponse.json({ available: !data || data.length === 0 });
}
