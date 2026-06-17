import { CompareClient } from "./CompareClient";
import { breadcrumbList, itemList, jsonLdGraph } from "@/lib/seo/jsonld";
import { allCasinosInOrder } from "@/lib/casino-data";

/**
 * Server wrapper for /compare. Emits JSON-LD (BreadcrumbList + ItemList of the
 * brands) server-side, then mounts the interactive CompareClient island.
 * Next.js SSRs the client island's default selection into the initial HTML, so
 * the default comparison is already crawlable; this wrapper adds the structured
 * data a client component shouldn't own. Metadata lives in ./layout.tsx.
 */
const jsonLd = jsonLdGraph(
  breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Compare casinos", url: "/compare" },
  ]),
  itemList(
    allCasinosInOrder().map((b) => ({ name: b.name, url: `/casinos/${b.slug}` })),
  ),
);

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompareClient />
    </>
  );
}
