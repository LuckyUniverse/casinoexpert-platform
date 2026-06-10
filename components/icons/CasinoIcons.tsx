/**
 * Section-header icons used across the brand review template.
 * Mirrored from casinogpt's visual language, consistent across the portfolio.
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function QuickFactsIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="10" y="6" width="28" height="36" rx="4" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
      <rect x="16" y="2" width="16" height="8" rx="3" fill="#4F46E5" />
      <circle cx="24" cy="6" r="2" fill="#E0E7FF" />
      <line x1="16" y1="20" x2="32" y2="20" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="26" x2="28" y2="26" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="32" x2="30" y2="32" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function OfficialSiteIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="8" ry="18" stroke="#059669" strokeWidth="1.5" fill="none" />
      <line x1="6" y1="24" x2="42" y2="24" stroke="#059669" strokeWidth="1.5" />
      <line x1="24" y1="6" x2="24" y2="42" stroke="#059669" strokeWidth="1.5" />
    </svg>
  );
}

export function AboutIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
      <rect x="20" y="16" width="8" height="16" rx="1" fill="#2563EB" />
    </svg>
  );
}

export function LegalityIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4L6 14v10c0 12 8 18 18 20 10-2 18-8 18-20V14L24 4z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
      <path d="M18 22l4 4 8-8" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrustIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="12" y="20" width="24" height="20" rx="4" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
      <path d="M16 20v-6a8 8 0 0116 0v6" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="30" r="3" fill="#059669" />
    </svg>
  );
}

export function DepositsIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="14" width="32" height="24" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <rect x="4" y="14" width="32" height="8" rx="0" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      <circle cx="38" cy="28" r="8" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
      <text x="38" y="32" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="bold">$</text>
    </svg>
  );
}

export function GamesIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <g transform="rotate(-15, 20, 28)">
        <rect x="8" y="8" width="22" height="30" rx="3" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="13" y="22" fill="#7C3AED" fontSize="12" fontWeight="bold">A</text>
      </g>
      <g transform="rotate(10, 28, 28)">
        <rect x="18" y="8" width="22" height="30" rx="3" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="23" y="22" fill="#7C3AED" fontSize="12" fontWeight="bold">K</text>
      </g>
    </svg>
  );
}

export function MobileIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="12" y="4" width="24" height="40" rx="5" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
      <rect x="15" y="10" width="18" height="24" rx="2" fill="#C7D2FE" />
      <circle cx="24" cy="39" r="2" fill="#4F46E5" />
    </svg>
  );
}

export function SupportIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M8 12c0-3.3 2.7-6 6-6h20c3.3 0 6 2.7 6 6v14c0 3.3-2.7 6-6 6H22l-8 6v-6h-0c-3.3 0-6-2.7-6-6V12z"
        fill="#DBEAFE"
        stroke="#2563EB"
        strokeWidth="2"
      />
      <circle cx="18" cy="19" r="2" fill="#2563EB" />
      <circle cx="24" cy="19" r="2" fill="#2563EB" />
      <circle cx="30" cy="19" r="2" fill="#2563EB" />
    </svg>
  );
}

export function ResponsibleIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 42s-16-8-16-20V10l16-6 16 6v12c0 12-16 20-16 20z" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
      <path d="M24 16c-2-4-8-4-8 0 0 6 8 12 8 12s8-6 8-12c0-4-6-4-8 0z" fill="#DC2626" />
    </svg>
  );
}

export function SuitabilityIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
      <path d="M16 26h4v8h-4v-8z" fill="#059669" />
      <path d="M20 26c0 0 2-12 6-12 2 0 2 4 2 4h4c2 0 3 1 3 3l-1 8c0 2-1 3-3 3H20v-6z" fill="#059669" />
    </svg>
  );
}

export function FAQIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <text x="24" y="30" textAnchor="middle" fill="#92400E" fontSize="22" fontWeight="bold">?</text>
    </svg>
  );
}

export const sectionIconMap: Record<string, React.FC<IconProps>> = {
  "quick-facts": QuickFactsIcon,
  "official-site": OfficialSiteIcon,
  about: AboutIcon,
  legality: LegalityIcon,
  trust: TrustIcon,
  deposits: DepositsIcon,
  games: GamesIcon,
  mobile: MobileIcon,
  support: SupportIcon,
  responsible: ResponsibleIcon,
  suitability: SuitabilityIcon,
  faqs: FAQIcon,
};

export function SectionHeading({
  id,
  title,
  className = "",
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const IconComponent = sectionIconMap[id];
  return (
    <h2 className={`text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3 ${className}`}>
      {IconComponent && <IconComponent size={36} />}
      {title}
    </h2>
  );
}
