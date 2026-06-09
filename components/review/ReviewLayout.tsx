import Link from "next/link";
import type { BrandReviewData, ReviewModuleKey } from "@/lib/review-types";
import { HeritageHero } from "./heroes/HeritageHero";
import { HookHero } from "./heroes/HookHero";
import { ExperienceHero } from "./heroes/ExperienceHero";
import { QuickRef } from "./QuickRef";
import { ReputationInPractice } from "./ReputationInPractice";
import { AskEggspertPanel } from "./AskEggspertPanel";
import { WelcomeOfferMath } from "./modules/WelcomeOfferMath";
import { GameLibrarySpotlight } from "./modules/GameLibrarySpotlight";
import { LoyaltyDeepdive } from "./modules/LoyaltyDeepdive";
import { MobileWalkthrough } from "./modules/MobileWalkthrough";
import { LiveDealerFocus } from "./modules/LiveDealerFocus";
import { WithdrawalExperience } from "./modules/WithdrawalExperience";
import { BrandHistory } from "./modules/BrandHistory";
import { FeaturedGame } from "./modules/FeaturedGame";
import { SisterComparison } from "./modules/SisterComparison";
import { ExpertVerdict } from "./modules/ExpertVerdict";
import { SiteSnapshot } from "./SiteSnapshot";

const MODULE_REGISTRY: Record<
  ReviewModuleKey,
  (props: { brand: BrandReviewData }) => React.ReactElement
> = {
  "welcome-offer-math": WelcomeOfferMath,
  "game-library-spotlight": GameLibrarySpotlight,
  "loyalty-deepdive": LoyaltyDeepdive,
  "mobile-walkthrough": MobileWalkthrough,
  "live-dealer-focus": LiveDealerFocus,
  "withdrawal-experience": WithdrawalExperience,
  "brand-history": BrandHistory,
  "featured-game": FeaturedGame,
  "sister-comparison": SisterComparison,
  "expert-verdict": ExpertVerdict,
};

const HERO_REGISTRY = {
  heritage: HeritageHero,
  hook: HookHero,
  experience: ExperienceHero,
} as const;

/**
 * Top-level frame for a brand review page. Pick a hero, render the selected
 * modules in order, then the reputation paragraph + quick-ref + Ask panel.
 *
 * Brand pages do not all look the same:
 *  - Different hero shape per brand
 *  - Different module set + order per brand
 *  - Hand-written editor's take, hero headline/subhead
 *  - Hand-written reputation paragraph
 *
 * The frame itself is shared; everything Google reads as content is unique.
 */
export function ReviewLayout({ brand }: { brand: BrandReviewData }) {
  const Hero = HERO_REGISTRY[brand.hero];

  return (
    <article>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="lu-container" style={{ paddingTop: "1.5rem" }}>
        <ol
          style={{
            display: "flex",
            gap: "0.5rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
            color: "var(--color-fg-subtle)",
            fontSize: "0.85rem",
          }}
        >
          <li>
            <Link href="/" style={{ color: "var(--color-fg-muted)" }}>
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/casinos" style={{ color: "var(--color-fg-muted)" }}>
              Casinos
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li style={{ color: "var(--color-fg)" }}>{brand.name}</li>
        </ol>
      </nav>

      <Hero brand={brand} />

      {/* Editor's take — hand-written per brand */}
      <section className="lu-container" style={{ marginTop: "2.5rem" }}>
        <div
          className="lu-card"
          style={{
            padding: "1.5rem 1.75rem",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "1.25rem",
            alignItems: "start",
            borderLeft: "4px solid var(--color-accent)",
          }}
        >
          <span
            style={{
              padding: "0.3rem 0.7rem",
              borderRadius: 999,
              background: "color-mix(in srgb, var(--color-accent) 14%, transparent)",
              color: "var(--color-accent)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              alignSelf: "start",
              whiteSpace: "nowrap",
            }}
          >
            Editor's take
          </span>
          <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.6 }}>{brand.editorsTake}</p>
        </div>
      </section>

      {/* Site snapshot — visual evidence sits between editor's take and the modules */}
      {brand.screenshotSrc && (
        <section className="lu-container" style={{ marginTop: "2.5rem" }}>
          <SiteSnapshot brand={brand} />
        </section>
      )}

      {/* Modules — order and set vary per brand */}
      <div
        className="lu-container"
        style={{ display: "grid", gap: "2rem", marginTop: "2.5rem" }}
      >
        {brand.modules.map((key) => {
          const Module = MODULE_REGISTRY[key];
          return <Module key={key} brand={brand} />;
        })}
      </div>

      {/* Reputation paragraph (always-on, brand-unique narrative) */}
      <section className="lu-container" style={{ marginTop: "3rem" }}>
        <ReputationInPractice brand={brand} />
      </section>

      {/* Inline Ask panel — pre-seeded with brand-relevant questions */}
      <section className="lu-container" style={{ marginTop: "3rem" }}>
        <AskEggspertPanel brand={brand} />
      </section>

      {/* Quick reference table */}
      <section className="lu-container" style={{ marginTop: "3rem" }}>
        <QuickRef brand={brand} />
      </section>
    </article>
  );
}
