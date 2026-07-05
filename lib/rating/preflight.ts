import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

/**
 * Cheap existence check before the expensive live rating run.
 *
 * Gibberish or non-existent casino names used to trigger the full
 * Opus + 12-search investigation (~$1.50-3). This gate runs Haiku with at
 * most 2 web searches (~$0.01-0.02) and only lets real brands through.
 * It also returns the canonical brand name, which improves cache hits
 * ("jackpot city casino online" -> "Jackpot City" -> key jackpotcity).
 *
 * Fails OPEN on errors: a broken preflight must never block real checks -
 * the main run's own early-abort instruction is the backstop.
 */

export type PreflightResult =
  | { status: "exists"; canonicalName: string }
  | { status: "not_found" }
  | { status: "unknown" };

export async function verifyCasinoExists(
  apiKey: string,
  casino: string,
  country: string
): Promise<PreflightResult> {
  try {
    const anthropic = createAnthropic({ apiKey });
    const { text } = await generateText({
      // Haiku: ~cents. Note: the newer _20260209 search tool needs
      // Opus/Sonnet 4.6+; Haiku uses the basic _20250305 variant.
      model: anthropic("claude-haiku-4-5-20251001"),
      system:
        'You verify whether user input refers to a real online casino brand. Use at most 2 web searches - usually 1 is enough, and if the input is obvious gibberish, 0. The input may be a brand name or a domain, possibly misspelled. Reply with ONLY a JSON object, no other text: {"exists": true|false, "canonicalName": string} - canonicalName is the casino\'s proper brand name when it exists (fix spelling/casing), empty string otherwise. exists=false when the input is gibberish, not a gambling brand, or no real online casino plausibly matches it.',
      messages: [
        {
          role: "user",
          content: `Input: ${casino.trim().slice(0, 100)}\nPlayer market (context only): ${country.slice(0, 60)}`,
        },
      ],
      tools: {
        web_search: anthropic.tools.webSearch_20250305({ maxUses: 2 }),
      },
      maxOutputTokens: 150,
    });

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end <= start) return { status: "unknown" };
    const parsed = JSON.parse(text.slice(start, end + 1)) as {
      exists?: boolean;
      canonicalName?: string;
    };
    if (parsed.exists === true) {
      return {
        status: "exists",
        canonicalName:
          typeof parsed.canonicalName === "string" && parsed.canonicalName.trim()
            ? parsed.canonicalName.trim()
            : casino.trim(),
      };
    }
    if (parsed.exists === false) return { status: "not_found" };
    return { status: "unknown" };
  } catch (err) {
    console.error("Preflight failed (failing open):", err);
    return { status: "unknown" };
  }
}

/**
 * Zero-cost sanity filter that runs before even the preflight: obvious
 * keyboard mashing never reaches any API. Deliberately loose - real brands
 * have weird names, so anything borderline goes to the preflight instead.
 */
export function looksLikeGibberish(input: string): boolean {
  const s = input.trim().toLowerCase();
  if (s.length < 3 || s.length > 80) return true;
  if (!/[aeiouy]/.test(s)) return true; // no vowels at all
  if (/(.)\1{4,}/.test(s)) return true; // aaaaa
  if (!/[a-z]/.test(s)) return true; // no letters (digits/symbols only)
  return false;
}
