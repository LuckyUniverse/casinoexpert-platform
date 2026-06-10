import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContentChatBanner } from "@/components/chat/ContentChatBanner";
import { PageFooter } from "@/components/layout/PageFooter";
import "./globals.css";

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
    default: "casinoexpert.ai, Your Ultimate, Factual, Objective Casino Guide for Canada",
    template: "%s | casinoexpert.ai",
  },
  description:
    "Objective reviews of the online casinos Canadians actually play at, licensing, banking, games, and trust signals laid out plainly.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "casinoexpert.ai",
  },
  twitter: { card: "summary_large_image" },
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
    </html>
  );
}
