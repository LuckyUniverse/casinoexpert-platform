import Link from "next/link";
import type { Metadata } from "next";
import type { CasinoConfig } from "@/components/casino/types";
import { allCasinosInOrder } from "@/lib/casino-data";
import { breadcrumbList, faqPage, itemList, jsonLdGraph } from "@/lib/seo/jsonld";
import { ChatHero } from "@/components/chat/ChatHero";

/**
 * "Answer page" — DeepAI-style, for our niche. The page LEADS with an
 * interactive, Interac-scoped chat (ChatHero), pre-opened with a server-rendered
 * answer and clickable questions that stream live answers. Below the chat sits
 * the ranked table + FAQ + schema — the part Google/ChatGPT crawl and cite.
 *
 * The chat is the hook/experience; the static content is the ranking asset.
 * Interac suggested questions are auto-scoped to this path via
 * lib/chat/suggested-questions.ts. The site-wide chat banner is suppressed here
 * (ContentChatBanner EXCLUDED_PATHS) so this embedded chat is the single entry.
 *
 * Reads the casino registry only — no content/data is modified.
 */

export const metadata: Metadata = {
  title: "Interac Casinos in Canada — Withdrawal Speeds Tested (2026)",
  description:
    "Ask our AI about Interac casinos, or read the ranked list. Every Canadian online casino we review accepts Interac — we tested withdrawal speeds, the C$4,000 weekly caps, and how e-Transfer works.",
  alternates: { canonical: "/interac-casinos" },
  openGraph: {
    title: "Interac Casinos in Canada — Withdrawal Speeds Tested (2026)",
    description:
      "Ask CasinoExpert about Interac casinos, or read the ranked list with tested withdrawal timings.",
    url: "/interac-casinos",
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "Are Interac casinos legal and safe in Canada?",
    answer:
      "For players outside Ontario, using an internationally-licensed online casino is not illegal, and Interac is simply the Canadian bank network used to move money. Every brand on this page is licensed (Kahnawake Gaming Commission or MGA) and funds are handled through your own bank's Interac rails. Always verify the operator's licence and complete identity verification (KYC) before withdrawing.",
  },
  {
    question: "How fast are Interac casino withdrawals?",
    answer:
      "In our testing, Interac withdrawals clear in roughly 1–5 business days depending on the operator. The fastest in our coverage is Betway's sportsbook side at about 1–3 business days. First withdrawals are slower because identity verification (KYC) must clear first. Deposits via Interac are effectively instant.",
  },
  {
    question: "Do any Interac casinos cap how much I can withdraw?",
    answer:
      "Yes. The Casino Rewards group brands (e.g. Captain Cooks, Casino Classic, Grand Mondial, Luxury Casino, Zodiac) apply a C$4,000 weekly withdrawal cap, so large wins are paid out across several weeks. We note the cap on each affected brand's review.",
  },
  {
    question: "What is the difference between Interac and Interac e-Transfer at casinos?",
    answer:
      "“Interac” online deposit debits your bank account directly at the cashier, while Interac e-Transfer sends money from your online banking using an email address. Most Canadian casinos support one or both. For withdrawals, casinos typically return funds via Interac e-Transfer to the email on your bank profile.",
  },
];

function withdrawalTiming(c: CasinoConfig): string {
  return c.quickFacts.find((f) => /withdraw/i.test(f.label))?.value ?? "Not disclosed";
}

function acceptsInterac(c: CasinoConfig): boolean {
  return (c.paymentMethods ?? []).some((m) => /interac/i.test(m));
}

export default function InteracCasinosPage() {
  const casinos = allCasinosInOrder()
    .filter(acceptsInterac)
    .sort((a, b) => (b.trustScore ?? 0) - (a.trustScore ?? 0));

  const jsonLd = jsonLdGraph(
    breadcrumbList([
      { name: "Home", url: "/" },
      { name: "Interac casinos", url: "/interac-casinos" },
    ]),
    itemList(casinos.map((c) => ({ name: c.name, url: `/casinos/${c.slug}` }))),
    faqPage(FAQS),
  );

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Chat-led hero: the page opens as an Interac chat that's already answered */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300 mb-3">
            Banking · Ask CasinoExpert
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Interac Casinos in Canada — Withdrawal Speeds Tested (2026)
          </h1>
          <p className="text-blue-100 mb-6 max-w-2xl">
            Ask anything about Interac casinos — answers draw on Andre Weston&apos;s tested
            data. Tap a question to start, or scroll for the full ranked list.
          </p>

          {/* Live, interactive chat that OPENS already answered — a single card:
              the opening reply renders as the first message inside ChatHero, then
              clickable Interac questions stream live follow-ups below it. */}
          <ChatHero
            mode="default"
            openingMessage={`**All ${casinos.length} casinos we review for Canadians accept Interac**, including Interac e-Transfer. In our testing, Interac withdrawals clear in roughly **1–5 business days** — Betway's sportsbook side is fastest at about **1–3 days**, while Casino Rewards brands apply a **C$4,000 weekly cap**. Deposits are effectively instant. Tap a question below to dig in ↓`}
          />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Ranked table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interac casinos ranked by trust, with tested withdrawal times
          </h2>
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Casino</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Interac withdrawal time (tested)</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Trust</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Operator / licence</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Review</th>
                </tr>
              </thead>
              <tbody>
                {casinos.map((c, i) => (
                  <tr key={c.slug} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 text-gray-400 font-medium align-top">{i + 1}</td>
                    <td className="px-4 py-3 align-top">
                      <Link href={`/casinos/${c.slug}`} className="font-semibold text-gray-900 hover:text-blue-600">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-700 align-top">{withdrawalTiming(c)}</td>
                    <td className="px-4 py-3 align-top">
                      {typeof c.trustScore === "number" ? (
                        <span className="font-semibold text-gray-900">
                          {c.trustScore}
                          <span className="text-gray-400 font-normal">/100</span>
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 align-top">
                      {c.operator}
                      <span className="block text-xs text-gray-400">{c.license}</span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Link href={`/casinos/${c.slug}`} className="text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap">
                        Read review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            Ranked by our trust score (licensing, length of operation, audit status,
            ownership transparency and complaint history). Withdrawal timings are taken from
            each brand&apos;s review and reflect Interac payouts after identity verification.
            Verify current terms at the cashier before depositing.
          </p>
        </section>

        {/* What we found */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What we found testing Interac payouts</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              Interac is the default banking method for Canadian online casino players, and
              every brand we cover supports it for both deposits and withdrawals. Deposits are
              effectively instant; the real difference between operators is on the{" "}
              <strong>withdrawal</strong> side.
            </p>
            <p>
              The fastest Interac payouts in our coverage come from Betway&apos;s sportsbook
              side at roughly <strong>1–3 business days</strong>. The Casino Rewards group brands
              apply a <strong>C$4,000 weekly withdrawal cap</strong>, which drip-feeds large wins
              over several weeks. Across every brand, your <strong>first</strong> withdrawal is
              slower because identity verification (KYC) has to clear first.
            </p>
            <p>
              Prefer to compare two brands directly? Use the{" "}
              <Link href="/compare" className="text-blue-600 hover:underline">side-by-side comparison</Link>, or
              browse all{" "}
              <Link href="/payments" className="text-blue-600 hover:underline">payment methods</Link>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Interac casino FAQ</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-2">{f.question}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
