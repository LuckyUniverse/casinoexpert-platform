import Link from "next/link";
import Image from "next/image";
import type { CasinoConfig } from "./types";
import { hasBrandLogo, brandLogoSrc, DARK_TILE_BRANDS, SELF_TILED_BRANDS } from "@/lib/brand-logos";
import { TableOfContents } from "./TableOfContents";
import { QuickFactsTable } from "./QuickFactsTable";
import { OfficialSiteCTA } from "./OfficialSiteCTA";
import { FAQSection } from "./FAQSection";
import { AuthorBio } from "@/components/AuthorByline";
import { SectionHeading } from "@/components/icons/CasinoIcons";

interface BrandReviewTemplateProps {
  config: CasinoConfig;
}

const TONE_CLASSES: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  green: "bg-green-100 text-green-800 border-green-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
  amber: "bg-amber-100 text-amber-800 border-amber-200",
};

export function BrandReviewTemplate({ config }: BrandReviewTemplateProps) {
  const tocSections = [
    { id: "quick-facts", title: "Quick Facts" },
    { id: "official-site", title: config.dealLive ? "Official Site" : "Visit Site" },
    ...(config.aboutContent || config.keyCharacteristics
      ? [{ id: "about", title: `About ${config.name}` }]
      : []),
    { id: "legality", title: "Legality & Regulation" },
    { id: "trust", title: "Trust & Safety" },
    { id: "deposits", title: "Deposits & Withdrawals" },
    { id: "games", title: "Games" },
    { id: "mobile", title: "Mobile Experience" },
    ...(config.supportContent ? [{ id: "support", title: "Customer Support" }] : []),
    { id: "responsible", title: "Responsible Gambling" },
    { id: "suitability", title: "Summary & Suitability" },
    { id: "faqs", title: "Frequently Asked Questions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-6">
            {hasBrandLogo(config.slug) && (
              <div
                className={`flex-shrink-0 rounded-xl w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center overflow-hidden ${
                  SELF_TILED_BRANDS.has(config.slug)
                    ? ""
                    : DARK_TILE_BRANDS.has(config.slug)
                    ? "bg-slate-800"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <Image
                  src={brandLogoSrc(config.slug)}
                  alt={`${config.name} logo`}
                  width={192}
                  height={192}
                  className={`w-full h-full object-contain ${
                    SELF_TILED_BRANDS.has(config.slug) ? "" : "p-1.5"
                  }`}
                  priority
                />
              </div>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              {(config.badges ?? []).map((badge, i) => (
                <div
                  key={i}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full border ${
                    TONE_CLASSES[badge.tone ?? "blue"]
                  }`}
                  role="img"
                  aria-label={badge.label}
                >
                  {badge.label}
                </div>
              ))}
              {config.lastReviewed && (
                <Link
                  href="/authors/andre-weston"
                  className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-200 transition"
                >
                  Reviewed by Andre Weston ·{" "}
                  {new Date(config.lastReviewed).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Link>
              )}
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{config.name} (2026)</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">{config.introduction}</p>
        </header>

        {/* Answer Capsule + Trust Score */}
        {config.answerCapsule && (
          <div className="mb-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-2">
                  Quick Answer
                </p>
                <p className="text-base text-gray-800 leading-relaxed">{config.answerCapsule}</p>
                {config.expertVerdict && (
                  <p className="mt-3 text-sm text-gray-600 italic">{config.expertVerdict}</p>
                )}
              </div>
              {config.trustScore !== undefined && config.trustScore > 0 && (
                <div className="flex-shrink-0 text-center md:border-l md:border-blue-200 md:pl-6">
                  <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-1">
                    Trust Score
                  </p>
                  <p
                    className={`text-4xl font-bold ${
                      config.trustScore >= 90
                        ? "text-green-600"
                        : config.trustScore >= 80
                        ? "text-blue-600"
                        : config.trustScore >= 70
                        ? "text-yellow-600"
                        : config.trustScore >= 60
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    {config.trustScore}
                  </p>
                  <p className="text-xs text-gray-500">/100</p>
                  {config.trustRating && (
                    <p
                      className={`text-sm font-medium mt-1 ${
                        config.trustScore >= 90
                          ? "text-green-700"
                          : config.trustScore >= 80
                          ? "text-blue-700"
                          : config.trustScore >= 70
                          ? "text-yellow-700"
                          : config.trustScore >= 60
                          ? "text-orange-700"
                          : "text-red-700"
                      }`}
                    >
                      {config.trustRating}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <TableOfContents sections={tocSections} />

        {/* Quick Facts */}
        <section id="quick-facts" className="mb-12 scroll-mt-8">
          <SectionHeading id="quick-facts" title="Quick Facts" />
          <QuickFactsTable facts={config.quickFacts} />
        </section>

        {/* CTA #1 */}
        <section id="official-site" className="mb-12 scroll-mt-8">
          <OfficialSiteCTA
            casinoName={config.shortName}
            casinoSlug={config.slug}
            affiliateUrl={config.affiliateUrl}
            themeColor={config.themeColor}
            ctaLocation="hero"
          />
        </section>

        {/* About */}
        {(config.aboutContent || config.keyCharacteristics) && (
          <section id="about" className="mb-12 scroll-mt-8">
            <SectionHeading id="about" title={`About ${config.name}`} />
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              {config.aboutContent && (
                <div
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: config.aboutContent }}
                />
              )}
              {config.keyCharacteristics && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key characteristics</h3>
                  <ul className="space-y-4">
                    {config.keyCharacteristics.map((char, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base text-gray-700">
                        <span className="text-blue-600 text-xl leading-none mt-0.5">•</span>
                        <span>
                          <span className="font-semibold text-gray-900">{char.title}:</span>{" "}
                          {char.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Legality */}
        <section id="legality" className="mb-12 scroll-mt-8">
          <SectionHeading id="legality" title="Legality & Regulation" />
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: config.legalityContent }}
          />
        </section>

        {/* Trust & Safety */}
        <section id="trust" className="mb-12 scroll-mt-8">
          <SectionHeading id="trust" title="Trust & Safety" />
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: config.trustContent }}
          />
        </section>

        {/* Deposits & Withdrawals */}
        <section id="deposits" className="mb-12 scroll-mt-8">
          <SectionHeading id="deposits" title="Deposits & Withdrawals" />
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: config.depositsContent }}
          />
        </section>

        {/* Games */}
        <section id="games" className="mb-12 scroll-mt-8">
          <SectionHeading id="games" title="Games" />
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: config.gamesContent }}
          />
        </section>

        {/* Mobile */}
        <section id="mobile" className="mb-12 scroll-mt-8">
          <SectionHeading id="mobile" title="Mobile Experience" />
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: config.mobileContent }}
          />
        </section>

        {/* Support */}
        {config.supportContent && (
          <section id="support" className="mb-12 scroll-mt-8">
            <SectionHeading id="support" title="Customer Support" />
            <div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: config.supportContent }}
            />
          </section>
        )}

        {/* Responsible Gambling */}
        <section id="responsible" className="mb-12 scroll-mt-8">
          <SectionHeading id="responsible" title="Responsible Gambling" />
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: config.responsibleGamblingContent }}
          />
        </section>

        {/* Suitability */}
        <section id="suitability" className="mb-12 scroll-mt-8">
          <SectionHeading id="suitability" title="Summary & Suitability" />
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: config.suitabilityContent }}
          />
        </section>

        {/* FAQs */}
        <section id="faqs" className="mb-12 scroll-mt-8">
          <SectionHeading id="faqs" title="Frequently Asked Questions" />
          <FAQSection faqs={config.faqs} />
        </section>

        {/* CTA #2 */}
        <section className="mb-12">
          <OfficialSiteCTA
            casinoName={config.shortName}
            casinoSlug={config.slug}
            affiliateUrl={config.affiliateUrl}
            themeColor={config.themeColor}
            ctaLocation="footer"
          />
        </section>

        {/* Author Bio */}
        <AuthorBio className="mb-12" />
      </div>
    </div>
  );
}
