/**
 * IndexNow Pulsed Submission Utility
 *
 * Submits URLs to Bing via IndexNow using small pulsed batches with delays
 * between pulses. Bing explicitly discourages large batch dumps.
 *
 * Direct pipeline to ChatGPT visibility: ChatGPT search leans on Bing's index,
 * so getting pages into Bing fast is the lever. No Bing index = no citation.
 *
 * Usage:
 *   import { submitToIndexNow } from "@/lib/indexnow";
 *   await submitToIndexNow(urls);
 */

const SITE = "https://casinoexpert.ai";
const INDEXNOW_KEY = "dd77a7ffabe339fec89d70856c5d25f3";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Bing best practice: small pulses, not large dumps.
const PULSE_SIZE = 100;
const PULSE_DELAY_MS = 3000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface IndexNowResult {
  submitted: number;
  accepted: number;
  failed: number;
  rateLimited: boolean;
}

/**
 * Submit URLs to IndexNow in pulsed batches.
 *
 * - Max 100 URLs per pulse (well under the 10K API limit)
 * - 3-second delay between pulses
 * - Stops on 429 rate limiting
 */
export async function submitToIndexNow(
  urls: string[],
  options: { quiet?: boolean; pulseSize?: number; delayMs?: number } = {},
): Promise<IndexNowResult> {
  const { quiet = false, pulseSize = PULSE_SIZE, delayMs = PULSE_DELAY_MS } = options;

  if (urls.length === 0) {
    if (!quiet) console.log("IndexNow: No URLs to submit.");
    return { submitted: 0, accepted: 0, failed: 0, rateLimited: false };
  }

  const uniqueUrls = Array.from(new Set(urls));

  if (!quiet) {
    console.log(`\n📡 IndexNow: Submitting ${uniqueUrls.length} URLs in pulses of ${pulseSize}...`);
  }

  let accepted = 0;
  let failed = 0;
  let rateLimited = false;

  for (let i = 0; i < uniqueUrls.length; i += pulseSize) {
    const pulse = uniqueUrls.slice(i, i + pulseSize);
    const pulseNum = Math.floor(i / pulseSize) + 1;
    const totalPulses = Math.ceil(uniqueUrls.length / pulseSize);

    const body = {
      host: "casinoexpert.ai",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList: pulse,
    };

    try {
      const res = await fetch(INDEXNOW_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });

      if (res.ok || res.status === 202) {
        accepted += pulse.length;
        if (!quiet) {
          console.log(`  ✅ Pulse ${pulseNum}/${totalPulses}: ${pulse.length} URLs accepted (HTTP ${res.status})`);
        }
      } else if (res.status === 429) {
        rateLimited = true;
        failed += pulse.length;
        const retryAfter = res.headers.get("Retry-After");
        if (!quiet) {
          console.log(`  ⚠️ Pulse ${pulseNum}/${totalPulses}: RATE LIMITED (429). ${retryAfter ? `Retry after ${retryAfter}s` : "Stopping."}`);
        }
        break;
      } else {
        failed += pulse.length;
        const text = await res.text();
        if (!quiet) {
          console.log(`  ❌ Pulse ${pulseNum}/${totalPulses}: HTTP ${res.status} — ${text.substring(0, 200)}`);
        }
      }
    } catch (e: any) {
      failed += pulse.length;
      if (!quiet) {
        console.log(`  ❌ Pulse ${pulseNum}/${totalPulses}: ${e.message}`);
      }
    }

    if (i + pulseSize < uniqueUrls.length && !rateLimited) {
      await sleep(delayMs);
    }
  }

  if (!quiet) {
    console.log(`\n📡 IndexNow complete: ${accepted} accepted, ${failed} failed${rateLimited ? " (rate limited)" : ""}`);
  }

  return { submitted: uniqueUrls.length, accepted, failed, rateLimited };
}

export function buildUrl(path: string): string {
  return `${SITE}${path.startsWith("/") ? "" : "/"}${path}`;
}
