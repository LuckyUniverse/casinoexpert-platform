/**
 * Strip Ontario / AGCO / iGO / ConnexOntario references from brand-data
 * files. Idempotent — safe to run repeatedly.
 *
 * Per Andrew (2026-06-09), the only place on casinoexpert.ai that may
 * mention Ontario is /casinos/ontario.
 */
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "lib", "casino-data");
const SLUGS = [
  "jackpot-city", "spin-casino", "ruby-fortune", "royal-vegas",
  "yukon-gold", "betway-casino", "betway-sports", "casino-classic",
  "golden-tiger", "grand-mondial", "luxury-casino", "zodiac", "captain-cooks",
];

const RULES = [
  /* === SENTENCE-LEVEL STRIPS — anything that mentions Ontario / AGCO / iGO === */
  // Whole sentences inside <p> tags that mention any Ontario-flagged term.
  // Captures both the leading whitespace and the trailing space/period.
  [/\s*[^.<>]*?(?:For Ontario players|For Ontario residents|Ontario players are regulated|Ontario players[, ]|AGCO ?\/ ?iGaming Ontario|iGaming Ontario|AGCO|iGO|ConnexOntario|outside of Ontario|outside Ontario)[^.<>]*?\.\s*/gi, " "],

  // "If you're in Ontario, ..." entire sentence
  [/\s*If you'?re in Ontario,[^.]*?\.\s*/gi, " "],

  // "for Canadian players outside Ontario" qualifier (without enclosing sentence)
  [/\bfor Canadian players outside of Ontario\b/gi, "for Canadian players"],
  [/\bfor Canadian players outside Ontario\b/gi, "for Canadian players"],
  [/\bCanadian players outside Ontario\b/gi, "Canadian players"],
  [/\bplayers outside Ontario\b/gi, "players"],
  [/\bplayers outside of Ontario\b/gi, "players"],
  [/\boutside of Ontario\b/gi, ""],
  [/\boutside Ontario\b/gi, ""],

  // jurisdiction field
  [/jurisdiction:\s*"Rest of Canada \(\.com\)"/g, 'jurisdiction: "Canada (.com)"'],

  // rest-of-Canada variants
  [/\brest-of-Canada \(\.com\)\b/gi, "Canada (.com)"],
  [/\bthe rest-of-Canada \.com market\b/gi, "the .com Canadian market"],
  [/\brest-of-Canada \.com\b/gi, ".com Canadian"],
  [/\brest-of-Canada market\b/gi, "Canadian market"],
  [/\brest-of-Canada\b/gi, "Canadian"],
  [/\brest of Canada\b/gi, "Canada"],

  // Inline qualifier fragments (after sentence-level strips clear the obvious cases)
  [/\s*\+\s*AGCO\s*\/\s*iGaming Ontario(?:\s*for\s*(?:Ontario|ON))?\b/gi, ""],
  [/\s*\+\s*AGCO(?:\s*for\s*(?:Ontario|ON))?\b/gi, ""],
  [/\s*\(\s*\+\s*AGCO\s*for\s*ON\s*\)\s*/gi, ""],

  /* === FALLBACK: ANY REMAINING ORPHAN "Ontario" / "AGCO" === */
  // Sentences that snuck through containing the bare word "Ontario" / "AGCO"
  [/\s*[^.<>\n]*?\b(?:Ontario|AGCO)\b[^.<>\n]*?\.\s*/g, " "],

  /* === CLEANUP === */
  [/  +/g, " "],
  [/\(\s*\)/g, ""],
  [/\s+\./g, "."],
  [/\s+,/g, ","],
  [/\s+\)/g, ")"],
  [/\(\s+/g, "("],
  [/\.\s*\.\s*/g, ". "],
  // Empty <p> tags left behind
  [/<p>\s*<\/p>\s*/gi, ""],
  // Collapse newlines around stripped sentences inside HTML
  [/\n\s*\n\s*\n+/g, "\n\n"],
];

function process(slug) {
  const filePath = path.join(DIR, `${slug}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log("  - skip (no file)", slug);
    return;
  }
  let src = fs.readFileSync(filePath, "utf8");
  const before = src.length;

  for (const [re, repl] of RULES) {
    src = src.replace(re, repl);
  }

  // Run a few passes to catch cases where strip-one-sentence creates a new
  // "sentence ending" that matches another rule.
  for (let i = 0; i < 3; i++) {
    for (const [re, repl] of RULES) {
      src = src.replace(re, repl);
    }
  }

  const remaining = src.match(/Ontario|AGCO|iGaming Ontario|iGO\b|ConnexOntario/gi) ?? [];
  fs.writeFileSync(filePath, src);
  const after = src.length;
  console.log(
    `  ✓ ${slug}.ts`,
    `${before} → ${after}`,
    remaining.length ? `(${remaining.length} mentions remaining)` : "(clean)"
  );
  if (remaining.length) {
    const lines = src.split("\n");
    lines.forEach((line, i) => {
      if (/Ontario|AGCO|iGaming Ontario|ConnexOntario/i.test(line)) {
        console.log(`     L${i + 1}: ${line.trim().slice(0, 140)}`);
      }
    });
  }
}

console.log("Stripping Ontario / AGCO / iGO references from brand-data files…\n");
for (const slug of SLUGS) process(slug);
console.log("\nDone. Run `npm run build` to verify TypeScript is still happy.");
