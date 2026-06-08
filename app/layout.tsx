import type { Metadata } from "next";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://casinoexpert.ai"),
  title: {
    default: "casinoexpert.ai — Your Ultimate, Factual, Objective Casino Guide",
    template: "%s | casinoexpert.ai",
  },
  description:
    "casinoexpert.ai — your ultimate, factual, objective casino guide.",
  robots: { index: false, follow: false }, // staying noindex until WIP wall comes down
  openGraph: {
    type: "website",
    siteName: "casinoexpert.ai",
    title: "casinoexpert.ai — Your Ultimate, Factual, Objective Casino Guide",
    description:
      "casinoexpert.ai — your ultimate, factual, objective casino guide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "casinoexpert.ai",
    description:
      "casinoexpert.ai — your ultimate, factual, objective casino guide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <SiteHeader />
        <main style={{ flex: 1 }}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
