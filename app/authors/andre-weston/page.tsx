import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Andre Weston — iGaming Industry Expert | casinoexpert.ai",
  description:
    "Andre Weston is an iGaming industry expert with 20+ years of operator-side experience across casino operations, payments, player protection, VIP management and platform integrity. He reviews and signs every brand review on casinoexpert.ai.",
  alternates: { canonical: "/authors/andre-weston" },
};

export default function AndreWestonPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andre Weston",
    jobTitle: "iGaming Industry Consultant",
    description:
      "Online casino industry expert with over 20 years of experience in casino operations, payments, player protection, fraud prevention, VIP management, and platform integrity.",
    url: "https://casinoexpert.ai/authors/andre-weston",
    image: "https://casinoexpert.ai/images/andre-weston.jpg",
    sameAs: ["https://andreweston.com"],
    worksFor: {
      "@type": "Organization",
      name: "casinoexpert.ai",
      url: "https://casinoexpert.ai",
    },
    knowsAbout: [
      "Online Casino Operations",
      "iGaming Regulation",
      "Player Protection",
      "Casino Payment Processing",
      "Responsible Gambling",
      "VIP Management",
      "Platform Integrity",
      "Fraud Prevention",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Andre Weston</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-600 shadow-xl bg-white">
                <Image
                  src="/images/andre-weston.jpg"
                  alt="Andre Weston — iGaming Industry Expert"
                  width={160}
                  height={160}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center md:text-left">
                Andre Weston
              </h1>
              <p className="text-xl text-blue-600 font-medium mb-4 text-center md:text-left">
                iGaming Industry Consultant &amp; Expert Author
              </p>
              <p className="text-gray-600 mb-4">
                <a
                  href="https://andreweston.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  andreweston.com
                </a>
                {" · "}20+ years in iGaming{" · "}Canada &amp; international markets
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Casino Operations",
                  "Player Protection",
                  "Payment Processing",
                  "VIP Management",
                  "Responsible Gambling",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <h2>About Andre</h2>
            <p>
              Andre Weston is an online casino industry expert with more than twenty years of
              experience spanning casino operations, payments, player protection, fraud
              prevention, VIP management, and platform integrity. His expertise is grounded
              in real operational experience inside major global online casino environments,
              combined with extensive firsthand player experience across dozens of platforms
              in Canada and abroad.
            </p>
            <p>
              Having worked across multiple disciplines inside casino operations, Andre has
              practical knowledge of how the systems function behind the scenes — including
              withdrawals, payment processing, account restrictions, bonus mechanics,
              compliance frameworks, and risk-management protocols. That dual perspective of
              operator-side and player-side experience is what lets him write reviews that
              are useful rather than promotional.
            </p>
            <p>
              Andre has also travelled extensively to major gambling jurisdictions including
              Las Vegas, attended international iGaming conferences, and worked across
              multiple regulatory regimes (UKGC, MGA, Kahnawake, AGCO). The breadth helps
              him compare how operators behave when they're regulated tightly versus more
              loosely, and translate that into clear guidance for Canadian players choosing
              where to play.
            </p>

            <h2>Role at casinoexpert.ai</h2>
            <p>
              Andre signs the expert review on every brand page published on casinoexpert.ai.
              Each review is written from his operator-side knowledge of how a given casino
              actually behaves — cashier reliability, KYC process, bonus mechanics, support
              quality — not from the marketing copy on the operator's site.
            </p>
            <p>His specific contributions include:</p>
            <ul>
              <li>
                <strong>Expert verdicts</strong> — Personal assessments of each brand based
                on operational quality, payment reliability, and player experience
              </li>
              <li>
                <strong>Accuracy verification</strong> — Cross-checking casino data
                (withdrawal speeds, deposit limits, game counts) against current operator
                offerings
              </li>
              <li>
                <strong>Regulatory review</strong> — Ensuring licence claims, ADR
                relationships and certification badges line up against the public registers
              </li>
              <li>
                <strong>Responsible gambling oversight</strong> — Verifying that all content
                includes appropriate responsible-gambling resources and warnings
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
