import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Progressive Jackpot Casinos in Canada, WowPot, Mega Moolah & More",
  description:
    "How progressive jackpots work, which networks pay out the biggest pools, and which Canadian-facing brands carry them. Featuring the Games Global WowPot family and the long-running Mega Moolah ladder.",
  alternates: { canonical: "/jackpots" },
};

const NETWORKS: Array<{
  name: string;
  tagline: string;
  body: string;
  tiers: string[];
  availableAt: string;
}> = [
  {
    name: "WowPot",
    tagline: "Games Global's flagship four-tier progressive network",
    body:
      "WowPot is the multi-tier progressive jackpot network that runs across Games Global's modern slot catalogue. The network funds four jackpot tiers from every spin on a participating game, Mini, Minor, Major and the headline WowPot, meaning a single spin can trigger a payout at any tier, not just the top one. Pool sizes accumulate across the entire network of operators carrying participating titles, which is why the headline WowPot regularly clears C$1M before resetting. For a deeper dive into the network's mechanics and a live pool tracker, see the dedicated wowpot.org site.",
    tiers: ["Mini · seed C$10", "Minor · seed C$100", "Major · seed C$10k", "WowPot · seed C$2M typical"],
    availableAt:
      "Casino Rewards group (Yukon Gold, Zodiac, Captain Cooks, Grand Mondial, Casino Classic, Golden Tiger, Luxury), Bayton 4 (Jackpot City, Spin Casino, Royal Vegas, Ruby Fortune), and Betway",
  },
  {
    name: "Mega Moolah",
    tagline: "The original Microgaming progressive, now under WowPot's umbrella",
    body:
      "Mega Moolah is the long-running Microgaming progressive jackpot ladder that produced some of the biggest online casino wins on record (multiple seven-figure CAD payouts annually since 2006). Following Microgaming's transition to Games Global, the Mega Moolah brand sits alongside WowPot as a parallel network, same operator stable, same pool-aggregation principle, different jackpot ceilings. The base Mega Moolah game itself remains in heavy rotation across the Bayton 4 and Casino Rewards 7 lobbies, with sister titles (Mega Moolah Atlantean Treasures, Mega Moolah Lucky Bachelorettes, etc.) on the same network.",
    tiers: ["Mini · seed C$10", "Minor · seed C$100", "Major · seed C$10k", "Mega · seed C$1M typical"],
    availableAt:
      "Same brands as WowPot, every Microgaming/Games Global property in our 13",
  },
  {
    name: "Mega Money Wheel",
    tagline: "The Casino Rewards group's signature welcome-mechanic jackpot",
    body:
      "Mega Money Wheel is the wheel-spin mechanic Casino Rewards uses to convert the group's signature low-deposit entrance offers (Yukon Gold's 150 chances for $10, Zodiac's 80 chances for $1, Casino Classic's free no-deposit chance, etc.) into a real progressive jackpot draw. Hits feed into the same Mega Moolah/WowPot pool ecosystem, so the headline win can be life-changing. The wheel is unique to the Casino Rewards lobby and isn't available at the Bayton family or Betway.",
    tiers: ["Multi-tier, fed into the Microgaming progressive pool"],
    availableAt:
      "Casino Rewards group only, Yukon Gold, Zodiac, Captain Cooks, Grand Mondial, Casino Classic (no-deposit chance), Golden Tiger, Luxury",
  },
];

export default function JackpotsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Progressive jackpots
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Progressive jackpots at Canadian online casinos
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
            Three jackpot networks power virtually every progressive win across the brands
            we cover, WowPot, the wider Mega Moolah family, and the Casino Rewards Mega
            Money Wheel mechanic. Here&apos;s what each is, how they pay out, and which
            operators carry them.
          </p>
        </header>

        {/* Quick orientation */}
        <div className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            How progressive jackpots work
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            A progressive jackpot pools a small fraction of every wager across the entire
            network of operators carrying participating games. The pool keeps growing until
            it&apos;s won, at which point it resets to a seed amount and starts climbing
            again.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>The implication for players</strong>: the bigger the network, the
            bigger the headline pool. Multi-operator networks like WowPot and Mega Moolah
            consistently clear seven figures CAD because every spin at every participating
            casino, across dozens of brands worldwide, contributes to one shared pot.
          </p>
        </div>

        {/* Networks */}
        <section className="space-y-6 mb-12">
          {NETWORKS.map((n) => (
            <article
              key={n.name}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-7"
            >
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                Jackpot network
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{n.name}</h2>
              <p className="text-lg text-gray-600 italic mb-4">{n.tagline}</p>
              <p className="text-gray-700 leading-relaxed mb-5">{n.body}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Jackpot tiers
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {n.tiers.map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Where it&apos;s available
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{n.availableAt}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* WowPot deeper dive callout */}
        <section className="mb-12 bg-white border-2 border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            More on WowPot specifically
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            WowPot is the most actively-marketed progressive network across the brands we
            cover. The dedicated{" "}
            <a
              href="https://wowpot.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              wowpot.org
            </a>{" "}
            site covers the network in more depth, game-by-game RTPs, current jackpot pool
            sizes (live), participating operators worldwide, and the network&apos;s
            historical big-win archive.
          </p>
          <p className="text-sm text-gray-600">
            wowpot.org is a sister property, independently editorial, but built on the same
            content team behind casinoexpert.ai.
          </p>
        </section>

        {/* Cross-link */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Which brands lean hardest into progressives?
          </h2>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Jackpot City is openly the most jackpot-forward of the Bayton family. The seven
            Casino Rewards brands all run the Mega Money Wheel hook into the same pool.
            Compare them side-by-side.
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
