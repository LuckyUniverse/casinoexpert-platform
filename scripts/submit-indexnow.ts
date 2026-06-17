#!/usr/bin/env npx tsx
/**
 * IndexNow submission for casinoexpert.ai
 *
 * Pulls the live sitemap, extracts URLs, and submits them to IndexNow in
 * pulsed batches via lib/indexnow.ts.
 *
 * Usage:
 *   npx tsx scripts/submit-indexnow.ts            # submit everything in the sitemap
 *   npx tsx scripts/submit-indexnow.ts --dry-run  # print URLs, submit nothing
 *   npx tsx scripts/submit-indexnow.ts --limit 50 # first 50 URLs
 */

import { submitToIndexNow } from "../lib/indexnow";

const SITEMAP_URL = "https://casinoexpert.ai/sitemap.xml";

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const limitFlag = process.argv.indexOf("--limit");
  const limit = limitFlag >= 0 ? parseInt(process.argv[limitFlag + 1], 10) : undefined;

  let urls = await fetchSitemapUrls();
  if (limit) urls = urls.slice(0, limit);

  console.log(`Found ${urls.length} URLs in sitemap.`);

  if (dryRun) {
    urls.forEach((u) => console.log(`  ${u}`));
    console.log("\n(dry run — nothing submitted)");
    return;
  }

  await submitToIndexNow(urls);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
