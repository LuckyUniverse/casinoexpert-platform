import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContentChatBanner } from "@/components/chat/ContentChatBanner";
import { PageFooter } from "@/components/layout/PageFooter";
import "./globals.css";

// Build the verification object only when the env vars are set, so the meta
// tags appear only once a Google/Bing token actually exists.
const verificationConfig: Record<string, unknown> = {};
if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
  verificationConfig.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
}
if (process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION) {
  verificationConfig.other = {
    "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  };
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casinoexpert.ai"),
  title: {
    default: "casinoexpert.ai - Your Ultimate, Factual, Objective Casino Guide for Canada",
    template: "%s | casinoexpert.ai",
  },
  description:
    "Objective reviews of the online casinos Canadians actually play at - licensing, banking, games, and trust signals laid out plainly.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "casinoexpert.ai",
  },
  twitter: { card: "summary_large_image" },
  ...(Object.keys(verificationConfig).length > 0 && { verification: verificationConfig }),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteHeader />
        <ContentChatBanner />
        {children}
        <PageFooter />
      </body>
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
