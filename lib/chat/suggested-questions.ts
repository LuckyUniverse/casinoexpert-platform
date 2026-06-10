/**
 * Contextual suggested questions for the Ask CasinoExpert chat.
 * Returns 4 relevant questions based on the current page URL.
 */

const CASINO_NAMES: Record<string, string> = {
  "jackpot-city": "Jackpot City",
  "spin-casino": "Spin Casino",
  "royal-vegas": "Royal Vegas",
  "ruby-fortune": "Ruby Fortune",
  "zodiac": "Zodiac Casino",
  "grand-mondial": "Grand Mondial",
  "captain-cooks": "Captain Cooks",
  "luxury-casino": "Luxury Casino",
  "yukon-gold": "Yukon Gold",
  "casino-classic": "Casino Classic",
  "golden-tiger": "Golden Tiger",
  "betway-casino": "Betway Casino",
  "betway-sports": "Betway Sports",
};

const HOMEPAGE_QUESTIONS = [
  "What casinos accept Interac in Canada?",
  "How do I withdraw from Jackpot City?",
  "Which casino has the biggest welcome bonus?",
  "Do I pay taxes on casino winnings in Canada?",
];

const ONTARIO_QUESTIONS = [
  "Which AGCO-regulated casinos accept Interac?",
  "How long do withdrawals take in Ontario?",
  "Is online gambling legal in Ontario?",
  "What's the difference between AGCO and iGaming Ontario?",
];

const AUTHOR_QUESTIONS = [
  "Who is Andre Weston?",
  "How does casinoexpert.ai pick which casinos to review?",
  "Are these casinos legal in Canada?",
  "What makes a casino trustworthy?",
];

function brandSpecificQuestions(name: string): string[] {
  return [
    `What's the ${name} welcome offer?`,
    `How long do ${name} withdrawals take?`,
    `Is ${name} licensed for Canadian players?`,
    `How does ${name} compare to its sister sites?`,
  ];
}

/**
 * Pick 4 contextual questions based on the current pathname.
 */
export function getSuggestedQuestions(pathname: string | null): string[] {
  if (!pathname || pathname === "/") return HOMEPAGE_QUESTIONS;

  if (pathname === "/casinos/ontario") return ONTARIO_QUESTIONS;

  // /casinos/<slug>
  const casinoMatch = pathname.match(/^\/casinos\/([^/]+)/);
  if (casinoMatch) {
    const slug = casinoMatch[1];
    const name = CASINO_NAMES[slug] ?? slug;
    return brandSpecificQuestions(name);
  }

  if (pathname.startsWith("/authors/")) return AUTHOR_QUESTIONS;

  return HOMEPAGE_QUESTIONS;
}
