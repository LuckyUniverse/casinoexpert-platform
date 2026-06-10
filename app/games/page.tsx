import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Games at Canadian Online Casinos - Slots, Live Dealer, Tables & More",
  description:
    "What you can actually play at the thirteen Canadian online casinos we cover - slots, live dealer, table games, video poker, game shows, and progressive jackpots. Plus which brands lean hardest into each category.",
  alternates: { canonical: "/games" },
};

const CATEGORIES: Array<{
  name: string;
  blurb: string;
  what: string;
  whoLeans: string;
}> = [
  {
    name: "Online slots",
    blurb:
      "The bulk of every Canadian online casino lobby. Reel-based games covering low- to high-volatility, classic three-reel mechanics, modern Megaways grids, branded titles and progressive jackpots.",
    what:
      "Most slot catalogues across the brands we cover sit between 400 and 1,000 titles. Heavy emphasis on Microgaming / Games Global content (Thunderstruck II, 9 Masks of Fire, Immortal Romance), with Pragmatic Play, NetEnt and Play'n GO frequently in the mix at Betway specifically.",
    whoLeans:
      "Every brand we cover has slots as the catalogue centrepiece. Grand Mondial advertises 1,000+ games (the largest stated). Ruby Fortune deliberately leans narrower at ~450 titles but heavier on Mega Moolah progressives.",
  },
  {
    name: "Live dealer",
    blurb:
      "Real-time streamed table games - blackjack, roulette, baccarat - plus game-show titles like Lightning Roulette, Crazy Time and Monopoly Live. Hosted by professional dealers in studio environments.",
    what:
      "Live tables are powered by specialist providers - Evolution dominates the space, with On Air Entertainment, Real Dealer and Pragmatic Play Live filling in. The streaming quality, table count and game-show breadth varies meaningfully by operator.",
    whoLeans:
      "Betway Casino runs the largest live floor in our 13 - 75 to 120 Evolution-led tables in 60fps HD. Royal Vegas is the table-game/live-dealer leader of the Bayton family. The Casino Rewards group runs a smaller live floor focused on Real Dealer titles.",
  },
  {
    name: "Table games (digital)",
    blurb:
      "Computerised versions of blackjack, roulette, baccarat, craps, poker variants and casino hold'em. RNG-driven (not live-streamed) - solo play, faster pace, lower stakes.",
    what:
      "Every brand we cover carries the core trio of digital blackjack, roulette and baccarat in multiple variants (American/European/French roulette; classic/Atlantic City/double-exposure blackjack; punto banco baccarat). Microgaming's table catalogue is the platform default.",
    whoLeans:
      "Royal Vegas hero-frames its table games on the homepage - 'Roulette & Blackjack' as the lead message rather than slots. Most other brands treat tables as a category alongside the slot library.",
  },
  {
    name: "Progressive jackpots",
    blurb:
      "Slots and game-show titles that contribute a small fraction of every spin to a shared pool - pools regularly clear seven figures CAD before resetting.",
    what:
      "Three networks power virtually all progressive wins in our coverage: WowPot (the modern Games Global multi-tier network), the Mega Moolah family (the long-running Microgaming line), and the Casino Rewards Mega Money Wheel mechanic.",
    whoLeans:
      "Ruby Fortune is the most jackpot-forward of the Bayton family. All seven Casino Rewards brands use the Mega Money Wheel as their entrance hook. See our dedicated progressive jackpots guide for the full breakdown.",
  },
  {
    name: "Video poker",
    blurb:
      "Five-card draw mechanic against a paytable, with optimal-strategy decisions on which cards to hold. Classic titles include Jacks or Better, Deuces Wild and Aces & Faces.",
    what:
      "Video poker sits as a separate lobby category at most brands we cover - typically 10 to 30 variant titles, with the option to multi-hand (play 5, 25, 50 or 100 hands per round). High RTP versions (99%+ with correct strategy) are available at most operators.",
    whoLeans:
      "Spin Casino and Royal Vegas both surface video poker in their main nav. The Casino Rewards group treats it as a category but doesn't lead with it.",
  },
  {
    name: "Game shows (live)",
    blurb:
      "TV-style live-streamed games that blend slot mechanics with hosted entertainment - Crazy Time, Monopoly Live, Lightning Roulette, Mega Ball, Funky Time, Sweet Bonanza CandyLand.",
    what:
      "Evolution dominates the category. Game shows sit inside the live-dealer floor and use Evolution-built studios with multiple presenters per shift. The mechanic is typically wheel-spin or ball-drop based with multipliers.",
    whoLeans:
      "Betway Casino's Evolution-led floor carries the full lineup. The Casino Rewards group has the smallest game-show selection of our 13.",
  },
  {
    name: "Sports betting",
    blurb:
      "Fixed-odds wagering on sports and esports - bet types include single bets, parlays/multis, system bets, futures, props, live in-play and same-game multis.",
    what:
      "Only one brand we cover offers a full sportsbook product: Betway Sports. Around 30+ sports, 30,000+ markets, deep coverage of niche sports (darts, snooker, table tennis, cricket) and a dedicated esports portal.",
    whoLeans:
      "Betway Sports - runs on the same operator as Betway Casino but covered as a separate brand review on casinoexpert.ai because the products are distinct.",
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Games guide
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            What you&apos;ll actually play at Canadian online casinos
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
            A quick orientation across the seven game categories that fill every casino
            lobby in our coverage - what each is, what to expect, and which of the thirteen
            brands leans hardest into it.
          </p>
        </header>

        {/* Category cards */}
        <section className="space-y-6 mb-12">
          {CATEGORIES.map((c) => (
            <article
              key={c.name}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-7"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{c.name}</h2>
              <p className="text-gray-700 leading-relaxed italic mb-4">{c.blurb}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                    What to expect
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{c.what}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                    Which brands lean hardest into it
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{c.whoLeans}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Cross-link */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Picking a brand based on what you like to play?
          </h2>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Compare any two or three of the thirteen brands we cover side-by-side, including
            software providers and game-category emphasis.
          </p>
          <Link
            href="/compare"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition"
          >
            Open the compare tool →
          </Link>
        </section>
      </div>
    </div>
  );
}
