import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Canadian Online Casinos Side-by-Side",
  description:
    "Pick up to three of the thirteen Canadian online casinos we cover and compare them side-by-side — operator, licence, welcome offer, banking, support, eCOGRA status.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare Canadian Online Casinos | casinoexpert.ai",
    description:
      "Side-by-side comparison of the brands on casinoexpert.ai — operator, licence, welcome offer, banking, support, trust signals.",
    url: "/compare",
    type: "website",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
