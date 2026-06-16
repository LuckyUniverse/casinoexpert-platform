import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandReviewTemplate } from "@/components/casino/BrandReviewTemplate";
import type { CasinoConfig } from "@/components/casino/types";
import { allCasinoSlugs, getCasino } from "@/lib/casino-data";

const SITE = "https://casinoexpert.ai";

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Review + FAQPage structured data — helps the page get cited by LLMs and
 * shown as rich results. Built from the existing review data; no data changes.
 */
function buildJsonLd(c: CasinoConfig) {
  const graph: Record<string, unknown>[] = [];

  const review: Record<string, unknown> = {
    "@type": "Review",
    name: `${c.name} review`,
    itemReviewed: { "@type": "Organization", name: c.name, url: c.affiliateUrl },
    author: {
      "@type": "Person",
      name: "Andre Weston",
      url: `${SITE}/authors/andre-weston`,
    },
    publisher: { "@type": "Organization", name: "casinoexpert.ai", url: SITE },
    reviewBody:
      c.answerCapsule || c.expertVerdict || stripHtml(c.introduction).slice(0, 280),
    url: `${SITE}/casinos/${c.slug}`,
  };
  if (typeof c.trustScore === "number") {
    review.reviewRating = {
      "@type": "Rating",
      ratingValue: (c.trustScore / 20).toFixed(1),
      bestRating: "5",
      worstRating: "1",
    };
  }
  if (c.lastReviewed) review.datePublished = c.lastReviewed;
  graph.push(review);

  if (c.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: stripHtml(f.answer) },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allCasinoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const casino = getCasino(slug);
  if (!casino) return { title: "Not found" };

  const title = `${casino.name} review (2026) - Canada`;
  const description = casino.answerCapsule
    ? casino.answerCapsule.slice(0, 158)
    : casino.introduction.slice(0, 158);

  return {
    title,
    description,
    alternates: { canonical: `/casinos/${casino.slug}` },
    openGraph: { title, description, url: `/casinos/${casino.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BrandReviewPage({ params }: RouteParams) {
  const { slug } = await params;
  const casino = getCasino(slug);
  if (!casino) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(casino)) }}
      />
      <BrandReviewTemplate config={casino} />
    </>
  );
}
