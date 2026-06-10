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
 * be able to fetch this — every request returns 401. The sitemap is
 * ready to be useful the moment we remove the SITE_USER/SITE_PASS env
 * vars on Vercel.
 */
const BASE = "https://casinoexpert.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  // ISO date stamp anchored to last editorial pass — refresh when content
  // ships a real update. (Date.now() can drift during build prerender, so
  // we keep this static.)
  const lastModified = "2026-06-09";

  const brandRoutes: MetadataRoute.Sitemap = allCasinosInOrder().map((brand) => ({
    url: `${BASE}/casinos/${brand.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE}/casinos/ontario`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...brandRoutes,
    {
      url: `${BASE}/compare`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE}/games`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/jackpots`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE}/payments`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/responsible-gambling`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/authors/andre-weston`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
