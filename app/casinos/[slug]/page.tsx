import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewLayout } from "@/components/review/ReviewLayout";
import { allBrandSlugs, getBrand } from "@/lib/brand-data";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allBrandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Not found" };

  const title = `${brand.name} review (2026) — verdict, welcome offer, and trust`;
  const description = brand.editorsTake.slice(0, 158).trim();

  return {
    title,
    description,
    alternates: { canonical: `/casinos/${brand.slug}` },
    openGraph: {
      title,
      description,
      url: `/casinos/${brand.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BrandReviewPage({ params }: RouteParams) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  return <ReviewLayout brand={brand} />;
}
