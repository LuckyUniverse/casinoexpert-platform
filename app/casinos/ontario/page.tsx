import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ONTARIO_BRANDS } from "@/lib/ontario-brands";
import { brandLogoSrc } from "@/lib/brand-logos";

/**
 * Ontario landing page. Lists the 12 brands casinoexpert.ai has iGO/AGCO
 * deals on. Affiliate links are the same tracked URLs in use on
 * casinogpt.ai for those brands.
 *
 * AGCO Standard 2.05 binds the copy on this page - no welcome-offer,
 * bonus, free-spin, jackpot-$, loyalty-program or inducement language.
 * Brand descriptions are factual and neutral.
 *
 * The Ask CasinoExpert chat is intentionally EXCLUDED on this route
 * (see components/chat/ContentChatBanner EXCLUDED_PATHS) - the global
 * chat is rest-of-Canada-flavoured and can't be served here without an
 * AGCO-compliant variant. Build that variant later when it's needed.
 */

export const metadata: Metadata = {
  title: "AGCO-Regulated Online Casinos in Ontario | CasinoExpert AI",
  description:
    "Online casinos registered with iGaming Ontario and regulated by the AGCO. Twelve operators in our coverage, listed in commercial priority.",
  alternates: { canonical: "/casinos/ontario" },
};

export default function OntarioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span
              className="px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full border border-blue-200"
              role="img"
              aria-label="AGCO Regulated"
            >
              AGCO Regulated
            </span>
            <span
              className="px-4 py-1.5 bg-green-100 text-green-800 text-sm font-semibold rounded-full border border-green-200"
              role="img"
              aria-label="iGaming Ontario Licensed"
            >
              iGaming Ontario Licensed
            </span>
            <span
              className="px-4 py-1.5 bg-red-100 text-red-800 text-sm font-semibold rounded-full border border-red-300"
              role="img"
              aria-label="19+ Only"
            >
              19+ Only
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Online Casinos in Ontario
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
            Twelve casinos registered with iGaming Ontario and regulated by the AGCO.
            Each brand below holds an active iGO operator agreement; click through to
            the operator&apos;s official Ontario site to learn more.
          </p>
        </header>

        {/* Compliance band */}
        <div className="mb-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
          <p className="mb-2">
            <strong>For Ontario players only.</strong> All brands listed are
            registered with{" "}
            <a
              href="https://igamingontario.ca/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              iGaming Ontario
            </a>{" "}
            and regulated by the{" "}
            <a
              href="https://www.agco.ca/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Alcohol and Gaming Commission of Ontario (AGCO)
            </a>
            . Must be 19+ to play.
          </p>
          <p>
            If you or someone you know is experiencing problems with gambling,
            help is available 24/7 from{" "}
            <a
              href="https://www.connexontario.ca/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              ConnexOntario
            </a>{" "}
            at <span className="font-semibold">1-866-531-2600</span>.
          </p>
        </div>

        {/* Brand grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ONTARIO_BRANDS.map((brand) => (
              <article
                key={brand.slug}
                className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition p-6 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                    <Image
                      src={brandLogoSrc(brand.logoSlug)}
                      alt={`${brand.name} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-gray-900 truncate">
                      {brand.name}
                    </h2>
                    <p className="text-xs text-gray-500 truncate">
                      {brand.operator}
                    </p>
                  </div>
                </div>

                <div className="mb-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100 font-medium">
                    AGCO Regulated
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-100 font-medium">
                    iGO Licensed
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {brand.blurb}
                </p>

                <dl className="grid grid-cols-2 gap-x-3 gap-y-1 mb-5 text-xs">
                  <dt className="text-gray-500">Online since</dt>
                  <dd className="text-gray-900 font-medium text-right">
                    {brand.founded}
                  </dd>
                  <dt className="text-gray-500">Platform</dt>
                  <dd className="text-gray-900 font-medium text-right truncate">
                    {brand.software}
                  </dd>
                </dl>

                <a
                  href={brand.affiliateUrl}
                  target="_blank"
                  rel="nofollow noopener sponsored"
                  className="mt-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  Visit {brand.shortName} →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Footer compliance */}
        <section className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-sm text-gray-700 leading-relaxed">
          <p className="mb-2">
            <strong>Informational resource.</strong> casinoexpert.ai is an
            independent affiliate website. We may receive compensation if you
            sign up at one of the operators above. This does not affect their
            iGO registration or AGCO regulation, and it does not change the fact
            that each operator is independently licensed.
          </p>
          <p>
            All gambling involves financial risk. Set a budget before you play,
            and never gamble money you cannot afford to lose. For confidential
            24/7 support, contact{" "}
            <a
              href="https://www.connexontario.ca/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              ConnexOntario
            </a>{" "}
            at 1-866-531-2600.
          </p>
        </section>
      </div>
    </div>
  );
}
