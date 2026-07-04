import type { Metadata } from "next";
import Link from "next/link";

/**
 * Transparency guide for the safety-check tool: how checks work, the
 * 6-month report cache and date stamps, what checks cost, and why
 * affiliate links appear on some results (Canada only for now).
 * Noindex while the tool itself is a non-indexed lab page.
 */
export const metadata: Metadata = {
  title: "How Our Casino Safety Checks Work",
  description:
    "How the live safety check works, how long reports stay fresh, what checks cost, and our affiliate transparency policy.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function SafetyCheckGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
        Transparency guide
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        How our casino safety checks work
      </h1>

      <div className="prose prose-gray mt-6 max-w-none">
        <h2>What a safety check actually does</h2>
        <p>
          When you look up a casino, our system runs a live investigation
          using current information: the regulator&apos;s own public license
          registers, complaint portals, review platforms, company records,
          and the casino&apos;s published terms. It scores the brand against a
          fixed set of weighted criteria - licensing for your specific
          jurisdiction and the operator&apos;s track record count the most,
          because those are the factors that best predict whether players
          actually get paid. The result is the safety score and grade you
          see, with every criterion&apos;s finding and sources shown so you can
          verify them yourself.
        </p>

        <h2>Report dates and the 6-month refresh window</h2>
        <p>
          Every report carries a <strong>date stamp</strong> showing when the
          check was performed. If a brand has already been checked for your
          market within the last <strong>6 months</strong>, we serve you that
          report from our records instead of running a new investigation -
          instantly, and clearly marked with its original report date.
          Licensing and company facts move slowly, so a recent report is
          just as reliable, and serving it keeps our scores consistent
          rather than wobbling a point or two between runs. After 6 months a
          new lookup triggers a fresh live check, so ratings stay current.
        </p>

        <h2>Full transparency: checks cost money, and we serve affiliate links</h2>
        <p>
          Each live check runs real research infrastructure - AI analysis
          plus a dozen or more live web lookups - and costs us real money
          every time. To keep the tool free to use, we participate in
          affiliate programs: when a casino we have a partnership with
          appears in your results, we may show a link to that casino, and if
          you sign up through it we may earn a commission.
        </p>
        <p>Our rules for this, in plain terms:</p>
        <ul>
          <li>
            <strong>Scores are never influenced.</strong> The safety score is
            computed from the weighted criteria alone. Partner brands get no
            boost, and brands we have no deal with get no penalty. A partner
            casino that deserves an F gets an F.
          </li>
          <li>
            <strong>Affiliate links are labelled.</strong> Wherever one
            appears, it is marked as an affiliate link and links back to this
            page.
          </li>
          <li>
            <strong>Canada only, for now.</strong> Our current partnerships
            cover casinos serving the Canadian market, so affiliate links
            only appear on Canadian lookups. Lookups for other countries
            return exactly the same reports, just with no link.
          </li>
        </ul>

        <h2>The fine print</h2>
        <p>
          Reports are automated assessments for information only, not legal
          or financial advice. Details can change between report dates -
          always verify licensing and terms directly with the operator
          before depositing. 19+ in Canada (18+ in Alberta, Manitoba and
          Quebec) and 18+ elsewhere. If gambling stops being fun, help is
          available - see the responsible gambling resources in the site
          footer.
        </p>
      </div>

      <Link
        href="/safety-check"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        ← Back to the safety check
      </Link>
    </main>
  );
}
