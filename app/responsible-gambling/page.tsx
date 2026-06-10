import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsible Gambling Resources for Canadian Players",
  description:
    "Self-help tools, external support resources and warning signs. If you or someone you know is struggling with gambling, help is free and confidential.",
  alternates: { canonical: "/responsible-gambling" },
};

const TOOLS: Array<{ title: string; description: string }> = [
  {
    title: "Deposit limits",
    description:
      "Cap how much you can deposit per day, week or month. Increases take effect after a cooling-off period; decreases apply immediately.",
  },
  {
    title: "Loss limits",
    description:
      "Cap how much you can lose in a given period, a useful guardrail when chasing makes you forget what you've spent.",
  },
  {
    title: "Session-time limits",
    description:
      "Set a max session length. The operator logs you out when the timer hits and won't let you back in until the period resets.",
  },
  {
    title: "Reality checks",
    description:
      "Periodic pop-up reminders during play telling you how long you've been logged in and how much you've wagered.",
  },
  {
    title: "Cooling-off period",
    description:
      "Temporarily lock yourself out, 24 hours, 7 days, 30 days. Account auto-reopens at the end.",
  },
  {
    title: "Self-exclusion",
    description:
      "Indefinite or longer-term block, typically 6 months minimum, often a year or more. Reinstatement usually requires a written request after the period ends.",
  },
];

const HELPLINES: Array<{
  name: string;
  url: string;
  coverage: string;
  detail: string;
}> = [
  {
    name: "GamCare",
    url: "https://www.gamcare.org.uk/",
    coverage: "UK-based, internationally accessible",
    detail:
      "Free 24/7 helpline, live chat and structured treatment programmes. One of the longest-running gambling-harm charities; their content is rigorously evidence-based.",
  },
  {
    name: "Gambling Therapy",
    url: "https://www.gamblingtherapy.org/",
    coverage: "Global, multilingual",
    detail:
      "Free online support, including live advisor chat, forums, group meetings and self-help tools. Accessible from anywhere with no geographic gating.",
  },
  {
    name: "Gamblers Anonymous",
    url: "https://www.gamblersanonymous.org/",
    coverage: "Worldwide, peer-led",
    detail:
      "Twelve-step fellowship modelled on Alcoholics Anonymous. Free meetings (in-person and online) in cities across Canada.",
  },
  {
    name: "Responsible Gambling Council (Canada)",
    url: "https://www.responsiblegambling.org/",
    coverage: "Canada",
    detail:
      "Canadian-based independent non-profit; resources, RG accreditation programmes (RG Check), and provincial campaign work.",
  },
];

const WARNING_SIGNS = [
  "Gambling more than you intended, more often than you planned",
  "Hiding the scale or frequency of your play from people close to you",
  "Chasing losses with bigger bets to recover",
  "Borrowing money or selling things to fund play",
  "Lying about gambling time or money",
  "Feeling anxious, irritable or restless when not gambling",
  "Gambling to escape stress, low mood or anxiety",
  "Continuing to gamble despite serious negative consequences (work, relationships, finances)",
];

export default function ResponsibleGamblingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Responsible gambling
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            If gambling is affecting your life, help is available
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Free, confidential support exists at every level, in-account self-help tools at
            each operator, dedicated charities reachable any time of day, and peer-led
            meetings in person and online. You don&apos;t need to wait until things are
            bad.
          </p>
        </header>

        {/* Emergency band */}
        <div className="mb-12 bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-red-900 mb-2">
            If you need to talk to somebody now
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <a
              href="https://www.gamcare.org.uk/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              GamCare&apos;s 24/7 helpline
            </a>{" "}
            and{" "}
            <a
              href="https://www.gamblingtherapy.org/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              Gambling Therapy&apos;s online chat
            </a>{" "}
            are both free, confidential and available right now. Provincial helplines are
            listed below.
          </p>
        </div>

        {/* In-account tools */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Tools available inside every casino account
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            All thirteen brands we cover offer the same core set of self-help tools.
            They&apos;re in your account settings once you&apos;re logged in, you don&apos;t
            need to ask support to enable them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLS.map((t) => (
              <div
                key={t.title}
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* External resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            External support, free and confidential
          </h2>
          <div className="space-y-4">
            {HELPLINES.map((h) => (
              <article
                key={h.name}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{h.name}</h3>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h.coverage}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{h.detail}</p>
                <a
                  href={h.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-semibold"
                >
                  Visit {h.name} →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Warning signs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Signs gambling might be becoming a problem
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you recognise yourself, or someone close to you, in more than a couple of
            these, that&apos;s a reason to reach out to one of the resources above. You
            don&apos;t need to wait for a crisis.
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <ul className="space-y-2">
              {WARNING_SIGNS.map((sign) => (
                <li
                  key={sign}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="text-red-500 mt-1 flex-shrink-0">●</span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing note */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            One more thing
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Asking for help isn&apos;t admitting defeat. The earlier you start a
            conversation, with a partner, a helpline, a support group, the easier the
            path back. Every resource on this page is free, judgement-free, and used
            routinely by people who later wonder why they waited.
          </p>
        </section>
      </div>
    </div>
  );
}
