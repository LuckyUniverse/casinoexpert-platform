import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { consumeMagicLink } from "@/lib/auth/magic-link";
import { createUserSessionToken, USER_COOKIE_NAME, SESSION_TTL } from "@/lib/auth/session";

/**
 * GET /api/auth/verify?token=...
 * Landing endpoint for both email-verification and sign-in links.
 * Consumes the token atomically, marks the email verified, starts the
 * session, and drops the user back on the safety-check page.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";

  const consumed = await consumeMagicLink(token);
  if (!consumed) {
    return NextResponse.redirect(new URL("/safety-check?verify_error=1", url.origin));
  }

  const admin = getSupabaseAdmin();
  const now = new Date().toISOString();

  // Clicking any emailed link proves inbox ownership - verify if not already.
  const { data: user } = await admin
    .from("cex_users")
    .select("id, email_verified_at")
    .eq("id", consumed.userId)
    .single();

  await admin
    .from("cex_users")
    .update({
      last_login_at: now,
      updated_at: now,
      ...(user?.email_verified_at ? {} : { email_verified_at: now }),
    })
    .eq("id", consumed.userId);

  const response = NextResponse.redirect(new URL("/safety-check?verified=1", url.origin));
  response.cookies.set(USER_COOKIE_NAME, createUserSessionToken(consumed.userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL,
  });
  return response;
}
