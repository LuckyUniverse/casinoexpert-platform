import Link from "next/link";

/**
 * Compliance footer - 19+ Canada badge, responsible gambling logos,
 * copyright, secondary links. ROC-flavoured (no ConnexOntario - that lives
 * on the Ontario page when we build it).
 */
export function ComplianceFooter() {
  return (
    <footer className="mt-16 pt-8 border-t border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-600">
        <div className="text-center md:text-left">
          <p>Copyright © 2026 casinoexpert.ai. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-3 md:gap-4 justify-center">
          <div
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-red-600 text-white font-bold text-xl md:text-2xl rounded-full flex-shrink-0"
            role="img"
            aria-label="19+ minimum legal gambling age in Canada"
          >
            19+
          </div>
          <a
            href="https://www.gamcare.org.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 md:px-4 bg-orange-100 rounded-lg hover:bg-orange-200 transition flex-shrink-0"
            aria-label="GamCare - gambling support and treatment"
          >
            <span className="text-xs md:text-sm font-semibold text-orange-800 whitespace-nowrap">
              GamCare
            </span>
          </a>
          <a
            href="https://www.gamblersanonymous.org/ga/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 md:px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex-shrink-0"
            aria-label="Gamblers Anonymous - peer support meetings"
          >
            <span className="text-xs md:text-sm font-semibold text-gray-800 whitespace-nowrap">
              Gamblers Anonymous
            </span>
          </a>
        </div>

        <div className="text-center md:text-right space-y-1">
          <div className="flex items-center justify-center md:justify-end gap-3 text-xs">
            <Link
              href="/authors/andre-weston"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              About Andre
            </Link>
          </div>
          <p className="font-semibold text-gray-700">casinoexpert.ai</p>
        </div>
      </div>
    </footer>
  );
}
