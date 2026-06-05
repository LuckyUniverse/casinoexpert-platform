import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://casinoexpert.ai"),
  title: "casinoexpert.ai — Your Ultimate, Factual, Objective Casino Guide",
  description:
    "casinoexpert.ai — your ultimate, factual, objective casino guide.",
  robots: { index: true, follow: true },
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
