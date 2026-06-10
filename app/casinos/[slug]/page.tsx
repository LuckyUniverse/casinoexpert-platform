import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandReviewTemplate } from "@/components/casino/BrandReviewTemplate";
import { allCasinoSlugs, getCasino } from "@/lib/casino-data";

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
  return <BrandReviewTemplate config={casino} />;
}
