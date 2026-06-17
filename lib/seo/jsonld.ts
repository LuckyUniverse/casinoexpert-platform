/**
 * Shared JSON-LD builders. Centralizes the @context/@graph boilerplate that was
 * inlined in app/casinos/[slug]/page.tsx so every page emits consistent schema.
 *
 * NOTE: Google's AI-features docs say no special schema is *required* to appear
 * in AI Overviews — this exists for rich results + entity clarity, which is
 * still worth doing. Keep nodes accurate to on-page content.
 */

export const SEO_SITE = "https://casinoexpert.ai";
export const ORG_NAME = "CasinoExpert AI";

type Node = Record<string, unknown>;

function abs(url: string): string {
  return url.startsWith("http") ? url : `${SEO_SITE}${url}`;
}

/** Organization node — reused via @id reference elsewhere. */
export function organization(): Node {
  return {
    "@type": "Organization",
    "@id": `${SEO_SITE}/#organization`,
    name: ORG_NAME,
    url: SEO_SITE,
    logo: `${SEO_SITE}/logo-icon.svg`,
    founder: {
      "@type": "Person",
      name: "Andre Weston",
      url: `${SEO_SITE}/authors/andre-weston`,
    },
  };
}

/** WebSite node, linked to the Organization as publisher. */
export function website(): Node {
  return {
    "@type": "WebSite",
    "@id": `${SEO_SITE}/#website`,
    name: ORG_NAME,
    url: SEO_SITE,
    publisher: { "@id": `${SEO_SITE}/#organization` },
  };
}

export function breadcrumbList(items: { name: string; url: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

export function itemList(items: { name: string; url: string }[]): Node {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.url),
    })),
  };
}

export function faqPage(faqs: { question: string; answer: string }[]): Node {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Wrap one or more nodes in a schema.org graph document. */
export function jsonLdGraph(...nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}
