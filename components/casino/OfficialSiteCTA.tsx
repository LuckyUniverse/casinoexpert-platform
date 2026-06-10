/**
 * Official Site CTA - affiliate link card.
 * ROC-flavoured (no Ontario / iGO badges).
 */

interface OfficialSiteCTAProps {
  casinoName: string;
  casinoSlug: string;
  affiliateUrl: string;
  ctaLocation?: string;
  showDisclosure?: boolean;
  themeColor?: "blue" | "purple" | "yellow" | "green" | "red";
  /** Short, brand-specific line under the headline. */
  blurb?: string;
}

const colorThemes = {
  blue: {
    bgFrom: "from-blue-50",
    bgTo: "to-blue-100",
    border: "border-blue-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  purple: {
    bgFrom: "from-purple-50",
    bgTo: "to-purple-100",
    border: "border-purple-200",
    button: "bg-purple-600 hover:bg-purple-700",
  },
  yellow: {
    bgFrom: "from-yellow-50",
    bgTo: "to-yellow-100",
    border: "border-yellow-200",
    button: "bg-yellow-600 hover:bg-yellow-700",
  },
  green: {
    bgFrom: "from-green-50",
    bgTo: "to-green-100",
    border: "border-green-200",
    button: "bg-green-600 hover:bg-green-700",
  },
  red: {
    bgFrom: "from-red-50",
    bgTo: "to-red-100",
    border: "border-red-200",
    button: "bg-red-600 hover:bg-red-700",
  },
};

export function OfficialSiteCTA({
  casinoName,
  casinoSlug: _casinoSlug,
  affiliateUrl,
  ctaLocation: _ctaLocation = "hero",
  showDisclosure = false,
  themeColor = "blue",
  blurb,
}: OfficialSiteCTAProps) {
  const theme = colorThemes[themeColor];
  const hasAffiliateLink =
    affiliateUrl && affiliateUrl.trim().length > 0 && affiliateUrl.startsWith("http");

  return (
    <div
      className={`bg-gradient-to-br ${theme.bgFrom} ${theme.bgTo} border-2 ${theme.border} rounded-xl p-8 text-center`}
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {hasAffiliateLink
          ? `Visit the Official Site - ${casinoName}`
          : `${casinoName} - Official Information`}
      </h3>
      <p className="text-base text-gray-700 mb-6">
        {blurb ?? "Players must be 19+. Verify the offer at the cashier before depositing. Play responsibly."}
      </p>
      {hasAffiliateLink ? (
        <>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow noopener noreferrer sponsored"
            className={`inline-block ${theme.button} text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition`}
          >
            Visit official site →
          </a>
          {showDisclosure && (
            <p className="text-sm text-gray-600 mt-4">
              <strong>Disclosure:</strong> We may earn commission if you sign up through this
              link. This does not affect our editorial content.
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500 italic">
          This is an informational review. Visit {casinoName}&apos;s official website directly
          to sign up.
        </p>
      )}
    </div>
  );
}
