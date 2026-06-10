/**
 * Ontario-flavoured "Important Information" block - shown above the
 * OntarioComplianceFooter on /casinos/ontario only. AGCO Standard 2.05
 * binds the copy here.
 */
export function OntarioImportantInformation() {
  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 mt-16">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          <strong>19+ Only:</strong> You must be 19 years of age or older to gamble in
          Ontario. All operators require age verification before account creation.
        </p>
        <p>
          <strong>Informational resource:</strong> casinoexpert.ai is an editorial guide to
          Ontario&apos;s regulated online casino market. Content is educational and does
          not constitute gambling advice or recommendations. All gambling involves
          financial risk.
        </p>
        <p>
          <strong>Verify information:</strong> we maintain accuracy where we can, but
          operational details may change. Players should verify all information directly
          with the operator before playing.
        </p>
        <p>
          <strong>Responsible gambling:</strong> if you or someone you know has a gambling
          problem, help is available 24/7 and confidential from{" "}
          <a
            href="https://www.connexontario.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            ConnexOntario
          </a>{" "}
          at <strong>1-866-531-2600</strong>.
        </p>
        <p className="text-xs text-gray-600 mt-4 pt-3 border-t border-gray-300">
          Last updated: June 2026 · All operators listed are registered with iGaming
          Ontario and regulated by the AGCO
        </p>
      </div>
    </div>
  );
}
