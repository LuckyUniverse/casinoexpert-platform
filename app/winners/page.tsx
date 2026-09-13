import type { Metadata } from "next";
import Link from "next/link";
import {
  getJackpotWins,
  getWinnersByBrand,
  formatDate,
  type WinRow,
} from "@/lib/winners";

export const metadata: Metadata = {
  title: "Recent Casino Wins - Jackpot Drops and Weekly Top Payouts",
  description:
    "Recent progressive jackpot drops and the week's biggest reported payouts at the Canadian-facing casinos we review, with the game and amount for each win.",
  alternates: { canonical: "/winners" },
};

// Rebuild every 15 minutes. The poller behind this data runs hourly, so
// anything tighter just re-renders identical HTML.
export const revalidate = 900;

function CasinoName({ win }: { win: WinRow }) {
  return (
    <Link
      href={`/casinos/${win.slug}`}
      className="text-blue-700 hover:text-blue-900 hover:underline"
    >
      {win.casino}
    </Link>
  );
}

export default async function WinnersPage() {
  // A reporting page must never take the site down. If the tables are
  // unreachable the page still renders with its explanation and an honest
  // empty state.
  const [jackpots, brands] = await Promise.all([
    getJackpotWins(10).catch(() => []),
    getWinnersByBrand(7, 5).catch(() => []),
  ]);

  const hasAnything = jackpots.length > 0 || brands.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Recent wins
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Recent wins at the casinos we review
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
            Two different things sit on this page. The first table is
            progressive jackpot drops, which the operators timestamp
            themselves. The second is the week&apos;s biggest reported payouts,
            brand by brand. Both cover the Canadian-facing casinos reviewed on
            this site and refresh through the day.
          </p>
        </header>

        {!hasAnything && (
          <div className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              No wins to show right now
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              We could not load win data for this page. It refreshes
              automatically, so this is usually temporary.
            </p>
          </div>
        )}

        {/* ── Progressive jackpot drops ─────────────────────────── */}
        {jackpots.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Latest progressive jackpot drops
            </h2>
            <p className="text-gray-700 mb-5 max-w-3xl leading-relaxed">
              Progressive jackpots pool contributions from every spin across
              every operator carrying the game, which is why these figures run
              so far ahead of an ordinary slot win. Dates below are the times
              the operators recorded the win.
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-600">
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Game</th>
                    <th className="px-4 py-3 font-semibold">Casino</th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      Date won
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {jackpots.map((w, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">
                        {w.amount}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{w.game}</td>
                      <td className="px-4 py-3">
                        <CasinoName win={w} />
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {formatDate(w.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Weekly top payouts by brand ───────────────────────── */}
        {brands.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              This week&apos;s biggest reported payouts
            </h2>
            <p className="text-gray-700 mb-5 max-w-3xl leading-relaxed">
              The top wins reported at each brand over the past seven days.
              These come from a leaderboard that publishes the amount, the game
              and the casino, but not the time of the win, so the date shown is
              when the win was first reported to us rather than when it landed.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              {brands.map((group) => (
                <div
                  key={group.casino}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">
                      <Link
                        href={`/casinos/${group.slug}`}
                        className="text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        {group.casino}
                      </Link>
                    </h3>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {group.wins.map((w, i) => (
                      <li
                        key={i}
                        className="px-5 py-3 flex items-baseline justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-gray-900 text-sm truncate">
                            {w.game}
                          </p>
                          <p className="text-xs text-gray-500">
                            Reported {formatDate(w.date)}
                          </p>
                        </div>
                        <span className="font-bold text-gray-900 whitespace-nowrap">
                          {w.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── How to read this ──────────────────────────────────── */}
        <section className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            How to read these numbers
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">
                These are individual results, not typical ones.
              </strong>{" "}
              A win large enough to reach a public wins list is, by definition,
              an outlier. The great majority of sessions at any casino end with
              the player down, and no amount of past results changes the odds of
              the next spin.
            </p>
            <p>
              <strong className="text-gray-900">Currencies are mixed.</strong>{" "}
              Amounts appear in the currency the winning account was played in,
              so C$, $ and euro figures sit side by side and are not converted.
            </p>
            <p>
              <strong className="text-gray-900">
                Players are not identified.
              </strong>{" "}
              Operators publish the amount, the game and the casino. No names,
              initials or locations are attached to any win on this page, and we
              do not add any.
            </p>
          </div>
        </section>

        {/* ── Where this comes from ─────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Where this data comes from
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed max-w-3xl mb-3">
            Both tables are built from win feeds published by the operators
            behind the brands we review. We record each win as it appears and
            keep our own history, because the feeds themselves only show a
            rolling snapshot.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
            We do not verify individual wins independently and we have no access
            to player accounts. Figures are shown as the operator reports them.
            Where a casino has a review on this site, its name links to it.
          </p>
        </section>

        {/* ── RG ────────────────────────────────────────────────── */}
        <section className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            19+ only. Gambling should be treated as entertainment, never as a
            way to make money or to deal with financial pressure. If it stops
            feeling like entertainment, see our{" "}
            <Link
              href="/responsible-gambling"
              className="text-blue-700 hover:text-blue-900 underline"
            >
              responsible gambling resources
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
