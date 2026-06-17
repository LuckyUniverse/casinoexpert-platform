import type { MetadataRoute } from "next";
import { allCasinosInOrder } from "@/lib/casino-data";

/**
 * sitemap.xml at https://casinoexpert.ai/sitemap.xml
 *
 * Generated from the brand registry (single source of truth) plus the
 * fixed pages. When we add new routes (Ontario sub-pages, more guides,
 * city-level locations) they should be appended here so search engines
 * find them.
 *
 * Note: while the basic-auth wall is up, search engines won't actually
 * be able to fetch this - every request returns 401. The sitemap is
 * ready to be useful the moment we remove the SITE_USER/SITE_PASS env
 * vars on Vercel.
 */
const BASE = "https://casinoexpert.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  // Per-URL lastModified derives from each brand's lastReviewed so freshness
  // signals move whenever a review is updated. (Date.now() is avoided — it
  // drifts during prerender; we read freshness from the content instead.)
  const FALLBACK = "2026-06-09";
  const brands = allCasinosInOrder();
  const freshest =
    brands
      .map((b) => b.lastReviewed)
      .filter((d): d is string => Boolean(d))
      .sort()
      .pop() ?? FALLBACK;

  const brandRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${BASE}/casinos/${brand.slug}`,
    lastModified: brand.lastReviewed ?? FALLBACK,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: `${BASE}/`,
      lastModified: freshest,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE}/casinos/ontario`,
      lastModified: freshest,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...brandRoutes,
    {
      url: `${BASE}/compare`,
      lastModified: freshest,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE}/games`,
      lastModified: freshest,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/jackpots`,
      lastModified: freshest,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE}/payments`,
      lastModified: freshest,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/responsible-gambling`,
      lastModified: freshest,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/authors/andre-weston`,
      lastModified: freshest,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
