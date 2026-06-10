import Link from "next/link";
import Image from "next/image";
import { allCasinosInOrder } from "@/lib/casino-data";
import { hasBrandLogo, brandLogoSrc } from "@/lib/brand-logos";

/**
 * Homepage. The Ask CasinoExpert hero is rendered above by ContentChatBanner
 * in the root layout. This page renders the scope note, brand grid, how-we-review
 * methodology block, and the Andre Weston author callout.
 */
export default function Home() {
  const brands = allCasinosInOrder();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Scope note */}
        <section className="mb-12 text-center">
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            casinoexpert.ai reviews international online casinos serving Canadian players.
            Every brand on this site accepts CAD, supports Interac e-Transfer at the cashier,
            and holds an independent international licence.
          </p>
        </section>

        {/* Brand grid */}
        <section id="casinos" className="mb-16">
          <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Canadian online casinos
            </h2>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Last full review pass: June 2026
            </p>
          </div>
          <p className="text-base text-gray-600 mb-8">
            Thirteen brands fully reviewed for Canadian players. Brands
            ordered by our internal commercial priority. Verify each offer at the
            cashier before depositing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/casinos/${brand.slug}`}
                className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition p-6 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  {hasBrandLogo(brand.slug) ? (
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                      <Image
                        src={brandLogoSrc(brand.slug)}
                        alt={`${brand.name} logo`}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-2xl font-bold">
                      {brand.shortName.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition truncate">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {brand.operator}
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {(brand.badges ?? []).slice(0, 2).map((badge, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100 font-medium"
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {brand.introduction}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    Read review →
                  </span>
                  <span className="text-xs text-gray-400">
                    Since {brand.founded}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How we review */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How we review
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Three things that separate a real operator review from a rewrite of
              the operator&apos;s own marketing copy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                Real deposits, real withdrawals
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Every brand is tested with funded play, not a registration walkthrough.
                Withdrawal timelines are measured stopwatch in hand, from cashier
                request to funds in the bank account.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                Operator-side experience
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Andre Weston has 20+ years inside the industry. Reviews flag the
                operational behaviours (cashier policies, KYC patterns, bonus terms)
                that matter once you&apos;re actually playing, not just signing up.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                Trust score, not vibe score
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Each brand&apos;s score sums licensing, length of operation,
                third-party audit status, ownership transparency, and complaint
                history. A measurable signal, not a feeling.
              </p>
            </div>
          </div>
        </section>

        {/* Andre Weston callout */}
        <section className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Reviewed by an industry expert
          </h2>
          <p className="text-base text-gray-700 mb-4 max-w-2xl mx-auto">
            Every review on casinoexpert.ai is signed by{" "}
            <Link
              href="/authors/andre-weston"
              className="text-blue-600 hover:underline font-semibold"
            >
              Andre Weston
            </Link>
            , an iGaming industry consultant with twenty years of operator-side
            experience. Reviews are written from operational knowledge of how
            brands actually behave at the cashier, KYC desk and bonus system,
            not from operator marketing copy.
          </p>
          <Link
            href="/authors/andre-weston"
            className="inline-block bg-blue-600 text-white text-base font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition"
          >
            About Andre →
          </Link>
        </section>
      </div>
    </div>
  );
}
