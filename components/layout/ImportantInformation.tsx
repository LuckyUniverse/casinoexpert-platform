/**
 * Important Information, required disclaimers + freshness footer.
 */
export function ImportantInformation() {
  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 mt-16">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          <strong>19+ Only:</strong> You must be 19 years of age or older to gamble in Canada
          (18+ in Alberta, Manitoba and Quebec). All operators require age verification before
          account creation.
        </p>
        <p>
          <strong>Informational resource:</strong> casinoexpert.ai is an editorial guide to
          online casinos available to Canadian players. Content is for information and does
          not constitute gambling advice. All gambling involves financial risk.
        </p>
        <p>
          <strong>Verify information:</strong> we maintain accuracy where we can, but
          operational details (offers, banking, support hours) change. Players should verify
          everything directly with the operator before depositing.
        </p>
        <p>
          <strong>Responsible gambling:</strong> if you or someone you know has a gambling
          problem, help is available, see{" "}
          <a
            href="https://www.gamcare.org.uk/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            GamCare
          </a>
          ,{" "}
          <a
            href="https://www.gamblingtherapy.org/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Gambling Therapy
          </a>
          , or your provincial helpline.
        </p>
        <p className="text-xs text-gray-600 mt-4 pt-3 border-t border-gray-300">
          Last updated: June 2026 · Editorial reviewed by Andre Weston
        </p>
      </div>
    </div>
  );
}
