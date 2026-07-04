import type { MetadataRoute } from "next";

/**
 * robots.txt at https://casinoexpert.ai/robots.txt
 *
 * While the basic-auth wall is up (SITE_USER / SITE_PASS env vars set on
 * Vercel), the layout sets `robots: { index: false, follow: false }`, so
 * the per-page meta is the dominant signal. When the auth wall comes down,
 * remove this `disallow: /` and switch to `allow: /` to open crawl.
 *
 * For now we ship a permissive robots.txt that DOES allow crawl - but
 * crawlers will hit 401 from the middleware before they read any page,
 * which is the actual wall. The intent is for /sitemap.xml and /robots.txt
 * to "just work" the moment the auth wall is lifted.
 */
const BASE = "https://casinoexpert.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/research/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
