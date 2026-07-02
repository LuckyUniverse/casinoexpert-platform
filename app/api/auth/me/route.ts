import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getUserFromRequest } from "@/lib/auth/session";

/** GET /api/auth/me - hydrate client auth state from the session cookie. */
export async function GET() {
  const userId = await getUserFromRequest();
  if (!userId) return NextResponse.json({ user: null });

  const admin = getSupabaseAdmin();
  const { data: user } = await admin
    .from("cex_users")
    .select("id, alias, first_name, email, email_verified_at")
    .eq("id", userId)
    .single();

  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: {
      id: user.id,
      alias: user.alias,
      firstName: user.first_name,
      email: user.email,
      verified: Boolean(user.email_verified_at),
    },
  });
}
