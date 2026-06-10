import { NextRequest, NextResponse } from "next/server";

/**
 * HTTP basic-auth wall for the holding page.
 *
 * The site isn't ready for public eyes yet, so we gate everything behind a
 * browser-native username/password prompt. Credentials are read from env vars
 * (SITE_USER / SITE_PASS) configured in the Vercel dashboard - nothing
 * sensitive is committed to the (public) repo.
 *
 * If no creds are configured, the wall is OFF (so local dev "just works" and
 * we never accidentally lock ourselves out if env vars are unset in prod).
 */
export function middleware(req: NextRequest) {
  const expectedUser = process.env.SITE_USER;
  const expectedPass = process.env.SITE_PASS;

  // No creds configured → no protection.
  if (!expectedUser || !expectedPass) return NextResponse.next();

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
    const sep = decoded.indexOf(":");
    if (sep !== -1) {
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="casinoexpert.ai", charset="UTF-8"',
    },
  });
}

export const config = {
  // Protect every route except Next internals and the favicon.
  matcher: ["/((?!_next/|favicon\\.ico).*)"],
};
