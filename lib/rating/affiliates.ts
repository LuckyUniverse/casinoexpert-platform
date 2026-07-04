import { allCasinosInOrder } from "@/lib/casino-data";

/**
 * Match a safety-check result to one of our partner brands so the results
 * page can show an affiliate link. Canada-only for now - our deals
 * (Super Partners / Casino Rewards) are Canadian-market programs, and the
 * transparency guide states this scope.
 */

export interface AffiliateMatch {
  name: string;
  url: string;
}

function nameKey(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b(casino|sports)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

let matchTable: { key: string; name: string; url: string }[] | null = null;

function table() {
  if (!matchTable) {
    matchTable = [];
    for (const brand of allCasinosInOrder()) {
      if (!brand.affiliateUrl) continue;
      const key = nameKey(brand.name);
      // first entry wins (brand order puts e.g. Betway Casino before Betway Sports)
      if (key && !matchTable.some((e) => e.key === key)) {
        matchTable.push({ key, name: brand.name, url: brand.affiliateUrl });
      }
    }
  }
  return matchTable;
}

export function findAffiliate(country: string, brandName: string, userInput: string): AffiliateMatch | null {
  if (country !== "Canada") return null;
  const candidates = [nameKey(brandName), nameKey(userInput)].filter(Boolean);
  for (const entry of table()) {
    for (const c of candidates) {
      if (c === entry.key || c.startsWith(entry.key) || entry.key.startsWith(c)) {
        return { name: entry.name, url: entry.url };
      }
    }
  }
  return null;
}
