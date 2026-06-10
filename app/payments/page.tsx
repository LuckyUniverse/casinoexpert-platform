import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Methods at Canadian Online Casinos",
  description:
    "Deposit and withdrawal methods at Canadian online casinos — Interac, Visa, Mastercard, iDebit, Instadebit, e-wallets, crypto. Timing, limits, and which of the 13 brands we cover accept what.",
  alternates: { canonical: "/payments" },
};

const METHODS: Array<{
  name: string;
  blurb: string;
  deposit: string;
  withdrawal: string;
  whoAccepts: string;
  note?: string;
}> = [
  {
    name: "Interac e-Transfer",
    blurb:
      "The most-used Canadian payment method at online casinos — bank-to-bank transfer, no card required, supported at every brand we cover.",
    deposit: "Instant once authorised by your bank",
    withdrawal: "Same-day to 3 business days after KYC clears",
    whoAccepts: "All 13 brands",
  },
  {
    name: "Visa",
    blurb:
      "Credit and debit card deposits. Some Canadian banks block gambling transactions on credit cards; debit usually goes through.",
    deposit: "Instant",
    withdrawal: "3–8 business days (most operators)",
    whoAccepts: "All 13 brands",
    note: "Visa withdrawals are typically slower than Interac.",
  },
  {
    name: "Mastercard",
    blurb:
      "Same characteristics as Visa — credit cards may be blocked at the bank level for gambling; debit usually works.",
    deposit: "Instant",
    withdrawal: "3–8 business days",
    whoAccepts: "All 13 brands",
  },
  {
    name: "iDebit",
    blurb:
      "Online voucher service — links to your bank account, processes payments without sharing card details with the operator.",
    deposit: "Instant",
    withdrawal: "Within 24 hours typically",
    whoAccepts: "Most brands we cover (Casino Rewards group + Betway)",
  },
  {
    name: "Instadebit",
    blurb:
      "Similar to iDebit — direct bank-account linked service for Canadian players, popular at Casino Rewards brands.",
    deposit: "Instant",
    withdrawal: "Within 24 hours typically",
    whoAccepts: "Most brands we cover",
  },
  {
    name: "MuchBetter / ecoPayz / Skrill / Neteller",
    blurb:
      "E-wallets — fund a balance once, then deposit at any casino accepting that wallet without re-sharing bank details.",
    deposit: "Instant",
    withdrawal: "Same day (usually within hours)",
    whoAccepts: "Betway in particular; Bayton brands more selectively",
    note: "Faster withdrawals than card or bank transfer but typically excluded from welcome offers.",
  },
  {
    name: "Apple Pay",
    blurb:
      "iOS-native payment method — face/touch ID auth, no card-detail entry. Limited operator support in Canada.",
    deposit: "Instant",
    withdrawal: "Withdrawals typically route to the source bank, not back to Apple Pay",
    whoAccepts: "Betway Sports (notable in our 13)",
  },
  {
    name: "Cryptocurrency",
    blurb:
      "Cash-equivalent crypto deposits at the small number of operators offering it. Generally faster withdrawal pacing.",
    deposit: "Within network confirmation (minutes to ~1 hour for Bitcoin)",
    withdrawal: "Within 24 hours typically",
    whoAccepts: "Jackpot City (advertised on the Canadian homepage)",
    note: "Not currently supported at Betway or the Casino Rewards group.",
  },
];

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Banking guide
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Payment methods at Canadian online casinos
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
            A practical walkthrough of how Canadian players deposit and withdraw at the
            thirteen operators we cover — what each method does, typical timing, and which
            brands accept what.
          </p>
        </header>

        {/* Quick orientation */}
        <div className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            The short version for Canadian players
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700 leading-relaxed">
            <li>
              <strong>Interac e-Transfer</strong> is the default — every brand we cover
              supports it, deposits are instant, withdrawals run same-day to a few business
              days once KYC clears.
            </li>
            <li>
              <strong>First-time withdrawals pause 1–2 business days</strong> across every
              operator while identity verification (KYC) completes. Subsequent withdrawals
              run faster.
            </li>
            <li>
              <strong>Card deposits may be blocked at the bank</strong> — some Canadian
              issuers refuse gambling transactions on credit cards. Debit usually works;
              Interac always works.
            </li>
            <li>
              <strong>Crypto is limited.</strong> Only Jackpot City advertises crypto
              deposits across our 13. Betway and the Casino Rewards brands don&apos;t support
              it.
            </li>
          </ul>
        </div>

        {/* Methods */}
        <section className="space-y-6 mb-12">
          {METHODS.map((m) => (
            <article
              key={m.name}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-7"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{m.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-5">{m.blurb}</p>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Deposit timing
                  </dt>
                  <dd className="text-sm text-gray-900 mt-1">{m.deposit}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Withdrawal timing
                  </dt>
                  <dd className="text-sm text-gray-900 mt-1">{m.withdrawal}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Where it&apos;s accepted
                  </dt>
                  <dd className="text-sm text-gray-900 mt-1">{m.whoAccepts}</dd>
                </div>
              </dl>

              {m.note && (
                <p className="text-sm text-gray-600 italic border-l-2 border-blue-200 pl-3">
                  {m.note}
                </p>
              )}
            </article>
          ))}
        </section>

        {/* Cross-link */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Comparing brands by banking?
          </h3>
          <p className="text-gray-600 mb-4">
            Side-by-side compare any two or three of the brands we cover, including
            withdrawal speed and accepted methods.
          </p>
          <Link
            href="/compare"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition"
          >
            Open the compare tool →
          </Link>
        </section>
      </div>
    </div>
  );
}
