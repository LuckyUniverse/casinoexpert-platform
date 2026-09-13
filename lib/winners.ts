/**
 * Recent-wins data for /winners.
 *
 * Source: the `cr_winners` and `cr_jackpot_wins` tables in the shared Lucky
 * Universe Supabase project, filled hourly by casinogpt-platform's
 * /api/cron/cr-winners poller (migration 036). We read the tables directly
 * with the service role rather than calling casinogpt's /api/winners, because
 * both sites already share this database and the extra network hop would just
 * add a second thing that can be down.
 *
 * TWO SOURCES, TWO DIFFERENT DATE MEANINGS - do not merge them:
 *  - cr_jackpot_wins.won_at is the OPERATOR'S timestamp. Real. Safe to print
 *    as the moment of the win.
 *  - cr_winners.first_seen_at is when OUR poller first saw the win on the
 *    leaderboard it comes from. That board carries no dates at all, so this is
 *    a discovery time and can trail the actual win by hours. Label it as
 *    "reported", never as the date won.
 */

import { getSupabaseAdmin } from "@/lib/supabase-admin";

/** Global/"Other" market - the board Canadian visitors are shown. */
const MARKET_GLOBAL = 5;

/**
 * Brand site code (as stored by the poller) -> our review page slug.
 *
 * This map is also the page's FILTER, not just a linker. The feeds cover the
 * whole operator stable, including brands we have no review for (Quatro, Cosmo,
 * Villento, Casino Kingdom, Blackjack Ballroom, Casino Action, UK Casino Club).
 * Showing those would contradict the page's own headline, send readers to names
 * with nowhere to click, and in one case surface a game title that names the
 * affiliate programme itself. A brand earns a place here when it earns a review.
 */
const BRAND_SLUGS: Record<string, string> = {
  ZC: "zodiac",
  YG: "yukon-gold",
  CC: "casino-classic",
  GT: "golden-tiger",
  GMD: "grand-mondial",
  LXC: "luxury-casino",
  CCC: "captain-cooks",
};

export interface WinRow {
  casino: string;
  slug: string;
  game: string;
  amount: string;
  date: string | null;
}

export interface BrandGroup {
  casino: string;
  slug: string;
  wins: WinRow[];
}

function slugFor(brandCode: string | null): string | null {
  return brandCode ? BRAND_SLUGS[brandCode] ?? null : null;
}

/**
 * Progressive jackpot drops, newest first. These carry real won_at timestamps.
 */
export async function getJackpotWins(limit = 10): Promise<WinRow[]> {
  const supabase = getSupabaseAdmin();
  // Over-fetch, because the filter below drops rows from brands we do not
  // review and we still want a full table.
  const { data, error } = await supabase
    .from("cr_jackpot_wins")
    .select("casino, brand_code, game, amount_raw, won_at")
    .order("won_at", { ascending: false })
    .limit(limit * 4);
  if (error) throw error;

  const rows: WinRow[] = [];
  for (const r of data ?? []) {
    const slug = slugFor(r.brand_code as string | null);
    if (!slug) continue;
    rows.push({
      casino: r.casino as string,
      slug,
      game: r.game as string,
      amount: r.amount_raw as string,
      date: r.won_at as string,
    });
    if (rows.length >= limit) break;
  }
  return rows;
}

/**
 * The week's biggest wins, grouped by casino and capped per brand.
 *
 * Ordered by amount rather than date on purpose: the underlying board is a
 * leaderboard, so "biggest this week" is a claim the data actually supports,
 * while "most recent" would be a claim about ordering it cannot make.
 */
export async function getWinnersByBrand(
  days = 7,
  perBrand = 5,
): Promise<BrandGroup[]> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - days * 86_400_000).toISOString();

  const { data, error } = await supabase
    .from("cr_winners")
    .select("casino, brand_code, game, amount_raw, amount, first_seen_at")
    .eq("market", MARKET_GLOBAL)
    .gte("first_seen_at", since)
    .order("amount", { ascending: false })
    .limit(400);
  if (error) throw error;

  const groups = new Map<string, BrandGroup>();
  for (const r of data ?? []) {
    const slug = slugFor(r.brand_code as string | null);
    if (!slug) continue;
    const casino = r.casino as string;
    let group = groups.get(casino);
    if (!group) {
      group = { casino, slug, wins: [] };
      groups.set(casino, group);
    }
    if (group.wins.length >= perBrand) continue;
    group.wins.push({
      casino,
      slug,
      game: r.game as string,
      amount: r.amount_raw as string,
      date: r.first_seen_at as string,
    });
  }

  // Brands with the biggest single win first, so the strongest row leads.
  return [...groups.values()].sort(
    (a, b) => parseAmount(b.wins[0]?.amount) - parseAmount(a.wins[0]?.amount),
  );
}

function parseAmount(raw: string | undefined): number {
  if (!raw) return 0;
  const n = Number.parseFloat(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** "13 September 2026" - en-GB for day-first, which en-CA does not give. */
export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
