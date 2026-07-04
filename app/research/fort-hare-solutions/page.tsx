import type { Metadata } from "next";

/**
 * Internal research dossier - deliberately noindexed and excluded from
 * the sitemap (app/sitemap.ts is an explicit list, so nothing to remove).
 * Not linked from any nav or footer.
 */
export const metadata: Metadata = {
  title: "Fort Hare Solutions - Company Research Dossier",
  description:
    "Internal research page on Fort Hare Trading Solutions (Pty) Ltd, the wholly owned commercial company of the University of Fort Hare, South Africa.",
  robots: { index: false, follow: false },
};

const FACTS: Array<{ label: string; value: string }> = [
  {
    label: "Trading name",
    value: "Fort Hare Solutions (FHS)",
  },
  {
    label: "Legal entity",
    value: "Fort Hare Trading Solutions (Pty) Ltd",
  },
  {
    label: "Jurisdiction",
    value: "South Africa (private company, Companies Act)",
  },
  {
    label: "Established",
    value: "2006 (registered as a company in 2007)",
  },
  {
    label: "Ownership",
    value: "Wholly owned by the University of Fort Hare (sole shareholder)",
  },
  {
    label: "Head office",
    value: "Independence Avenue, Bhisho, 5605, Eastern Cape (UFH Bhisho Campus)",
  },
  {
    label: "Postal address",
    value: "Private Bag X7487, King Williams Town, 5600, Eastern Cape",
  },
  {
    label: "Contact",
    value: "+27 (0)40 608 5300 / info.fhs@ufh.ac.za",
  },
];

const SOURCES: Array<{ name: string; url: string; note: string }> = [
  {
    name: "Fort Hare Solutions - About Us (University of Fort Hare)",
    url: "https://www.ufh.ac.za/centres/fhs/introduction",
    note: "Primary source for founding dates, ownership and mandate. Page was intermittently unreachable at the time of research; details captured via search index.",
  },
  {
    name: "Fort Hare Solutions official site",
    url: "http://fortharesolutions.ufh.ac.za/",
    note: "Company subdomain on the university's domain. Offline / timing out at the time of research.",
  },
  {
    name: "Fort Hare Trading Solutions (Pty) Ltd - LinkedIn",
    url: "https://za.linkedin.com/company/fort-hare-trading-solutions-pty-ltd",
    note: "Confirms the full legal entity name.",
  },
  {
    name: "University of Fort Hare - Wikipedia",
    url: "https://en.wikipedia.org/wiki/University_of_Fort_Hare",
    note: "Parent institution background and history.",
  },
  {
    name: "GroundUp: Fort Hare paid R17-million for work that was never done, SIU finds",
    url: "https://groundup.org.za/article/fort-hare-paid-r17-million-for-work-that-was-never-done-siu-finds/",
    note: "SIU investigation into the parent university's ICT procurement. Fort Hare Solutions is not named.",
  },
  {
    name: "IOL: Murder, fraud, corruption - unpacking the University of Fort Hare scandal",
    url: "https://iol.co.za/news/crime-and-courts/murder-fraud-corruption-unpacking-the-university-of-fort-hare-scandal-7d6cf9f1-f8dd-4329-8186-1d4f9c756403/",
    note: "Timeline of the wider university scandal, 2017-2024. Fort Hare Solutions is not named.",
  },
];

export default function FortHareSolutionsResearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Internal research - not indexed
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Fort Hare Solutions
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            A research dossier on Fort Hare Trading Solutions (Pty) Ltd, the
            wholly owned commercial arm of the University of Fort Hare in the
            Eastern Cape, South Africa. Compiled from public sources on 4 July
            2026.
          </p>
        </header>

        {/* At a glance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">At a glance</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <dl className="divide-y divide-gray-100">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-6 py-3"
                >
                  <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {f.label}
                  </dt>
                  <dd className="sm:col-span-2 text-gray-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* History */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Company history
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Fort Hare Solutions was established in 2006 and formally
              registered as a private company in 2007. It was created as the
              vehicle through which the University of Fort Hare could extend
              its strategic-partnerships agenda and compete commercially in
              the market for knowledge-based solutions - specifically human
              capital development, evidence-based research, and advisory
              services.
            </p>
            <p>
              The company did not appear from nowhere. It consolidated three
              revenue-generating units that had previously been housed inside
              the university&apos;s School of Public Management and
              Development: the Special Executive Programmes, the Transversal
              Training Management Agency, and the Public Financial Services
              Agency. Spinning these into a Pty Ltd gave the university a
              standard South African commercialisation structure - the
              academic institution keeps its statutory role while the company
              contracts with government and private clients on commercial
              terms.
            </p>
            <p>
              Its positioning follows from that origin: process-based
              consulting, training and research delivery with an explicit
              emphasis on transferring skills to communities and project
              beneficiaries rather than fly-in, fly-out consulting. Its
              natural client base is the Eastern Cape public sector -
              provincial departments and municipalities around Bhisho, the
              provincial capital, where the company is headquartered on the
              university&apos;s Bhisho campus.
            </p>
          </div>
        </section>

        {/* Shareholders */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Shareholding and governance
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The shareholding is simple: Fort Hare Trading Solutions (Pty)
              Ltd is a wholly owned subsidiary of the University of Fort Hare.
              The university is the sole shareholder; there are no outside
              investors, and the company&apos;s profits ultimately accrue to
              the institution.
            </p>
            <p>
              Public sources do not name the current directors, and CIPC
              (South Africa&apos;s companies register) does not expose
              director records without a paid disclosure request. As a
              university-owned entity, its board would typically be appointed
              by, and accountable to, the university council. A registration
              number could not be confirmed from free public sources either -
              a CIPC disclosure request against the name &quot;Fort Hare
              Trading Solutions&quot; would settle both questions.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            What the company does
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Executive and short-course training
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Descended from the Special Executive Programmes unit -
                management development and executive education, largely for
                public-sector clients.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Transversal training management
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Coordinated skills programmes that cut across government
                departments, inherited from the Transversal Training
                Management Agency.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Public financial management
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Advisory and capacity-building in public finance, the legacy
                of the Public Financial Services Agency.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Research and advisory
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Evidence-based research and consulting, marketed as using
                internationally recognised methods with skills transfer to
                beneficiaries built in.
              </p>
            </div>
          </div>
        </section>

        {/* Parent context */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            The parent institution
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The University of Fort Hare, founded in 1916 in Alice, Eastern
              Cape, is one of the most historically significant universities
              in Africa. For decades it was the leading institution of higher
              education for Black students in Southern Africa, and its alumni
              include Nelson Mandela, Oliver Tambo, Robert Sobukwe and Robert
              Mugabe. It celebrated its 110th anniversary in 2026. Fort Hare
              Solutions operates from the university&apos;s Bhisho campus,
              about 60 km from the main Alice campus.
            </p>
            <p>
              One caveat worth recording: the parent university has been the
              subject of a major Special Investigating Unit (SIU) probe since
              2022, covering procurement, ICT contracts, executive
              appointments and academic fraud, with more than 25 arrests and
              two associated murders. None of the public reporting reviewed
              for this dossier names Fort Hare Solutions or Fort Hare Trading
              Solutions as an implicated entity - the findings centre on the
              university&apos;s own ICT department and residence-management
              tenders. It is context for dealing with the institution, not an
              allegation against the company.
            </p>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Sources</h2>
          <div className="space-y-4">
            {SOURCES.map((s) => (
              <article
                key={s.url}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {s.name}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {s.note}
                </p>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer nofollow"
                  className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-semibold break-all"
                >
                  {s.url}
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Research gaps */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Open questions
          </h3>
          <ul className="text-sm text-gray-700 leading-relaxed list-disc pl-5 space-y-1">
            <li>
              CIPC registration number and current director list (requires a
              paid CIPC disclosure request).
            </li>
            <li>
              Current leadership - no managing director or CEO is named in
              public sources.
            </li>
            <li>
              Financials - the company&apos;s results are consolidated into
              the university&apos;s annual report, which is not published in
              an easily searchable form.
            </li>
            <li>
              Whether the company remains actively trading - its own website
              was offline at the time of research, though it was advertising
              a bookkeeper role in Bhisho relatively recently.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
