import { NextResponse } from "next/server";

/**
 * Image relay for the slot-check results page.
 *
 * Game imagery lives on third-party sites that usually hotlink-block, so
 * <img src="their-url"> fails in the browser. This endpoint fetches
 * server-side and streams the bytes through:
 *   /api/game-image?src=<direct image url>   - relay an image
 *   /api/game-image?page=<page url>          - fetch page, follow its og:image
 *
 * Guardrails: https only, public hostnames only, images only, 5MB cap.
 */
export const maxDuration = 30;

const MAX_BYTES = 5 * 1024 * 1024;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

function isSafeUrl(raw: string): URL | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const host = url.hostname.toLowerCase();
  // Block obvious internal targets; numeric IPs are rejected wholesale.
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
    host.includes(":")
  ) {
    return null;
  }
  return url;
}

function extractOgImage(html: string): string | null {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return m[1];
  }
  return null;
}

// Chrome/UI noise we never want in a game gallery: site furniture plus the
// compliance badges every gambling page carries (ecogra, 18+, GambleAware...).
const IMG_EXCLUDE =
  /favicon|sprite|icon|flag|avatar|badge|logo|banner-ad|placeholder|pixel|trust|ecogra|gambleaware|gamble-aware|begambleaware|gambling-commission|18plus|18-plus|plus-18|dmca|scroll|arrow|payment|visa|mastercard|paypal|app-?store|google-?play|\.svg|\.gif/i;

/** WxH from URL path/name (e.g. /600x400/, _32x32.png). Null if absent. */
function urlDimensions(u: string): { w: number; h: number } | null {
  const m = u.match(/(\d{2,4})x(\d{2,4})/);
  if (!m) return null;
  return { w: parseInt(m[1], 10), h: parseInt(m[2], 10) };
}
// Signals that an image is actual game content, screenshots first.
const IMG_SCREENSHOT = /screenshot|screen-?shot|gameplay|in-?game|reels?|bonus/i;
const IMG_GAME = /game|slot|machine/i;

/**
 * Pull plausible game-content images out of a page: <img> src/data-src plus
 * og:image, absolutized, de-noised, screenshots sorted first.
 */
function extractGalleryImages(html: string, base: URL, limit: number): string[] {
  const found = new Set<string>();
  const tagMatches = html.matchAll(/<img[^>]+(?:src|data-src|data-lazy-src)=["']([^"'>]+)["']/gi);
  for (const m of tagMatches) {
    try {
      const abs = new URL(m[1], base).toString();
      if (!abs.startsWith("https://") || !/\.(jpe?g|png|webp)(\?|$)/i.test(abs) || IMG_EXCLUDE.test(abs)) {
        continue;
      }
      // Dimensions embedded in the URL are a cheap size filter: badges and
      // buttons are tiny, game shots aren't. No dimensions = keep and let
      // the browser's onError/render decide.
      const dims = urlDimensions(abs);
      if (dims && (dims.w < 250 || dims.h < 150)) continue;
      found.add(abs);
    } catch {
      /* skip malformed src */
    }
  }
  const og = extractOgImage(html);
  if (og) {
    try {
      const abs = new URL(og, base).toString();
      if (abs.startsWith("https://")) found.add(abs);
    } catch {}
  }
  return [...found]
    .sort((a, b) => {
      const rank = (u: string) => (IMG_SCREENSHOT.test(u) ? 0 : IMG_GAME.test(u) ? 1 : 2);
      return rank(a) - rank(b);
    })
    .slice(0, limit);
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const src = params.get("src");
  const page = params.get("page");
  const list = params.get("list") === "1";

  // List mode: return candidate game-image URLs from a page as JSON.
  // The client renders each through ?src= relay. Screenshots sort first.
  if (list && page) {
    const pageUrl = isSafeUrl(page);
    if (!pageUrl) return NextResponse.json({ images: [] });
    try {
      const res = await fetch(pageUrl, {
        headers: { "User-Agent": UA, Accept: "text/html" },
        signal: AbortSignal.timeout(8000),
        redirect: "follow",
      });
      if (!res.ok) return NextResponse.json({ images: [] });
      const html = (await res.text()).slice(0, 800_000);
      return NextResponse.json(
        { images: extractGalleryImages(html, pageUrl, 8) },
        { headers: { "Cache-Control": "public, max-age=86400" } }
      );
    } catch {
      return NextResponse.json({ images: [] });
    }
  }

  let imageUrl: URL | null = null;

  if (src) {
    imageUrl = isSafeUrl(src);
  } else if (page) {
    const pageUrl = isSafeUrl(page);
    if (!pageUrl) return new NextResponse(null, { status: 400 });
    try {
      const res = await fetch(pageUrl, {
        headers: { "User-Agent": UA, Accept: "text/html" },
        signal: AbortSignal.timeout(8000),
        redirect: "follow",
      });
      if (!res.ok) return new NextResponse(null, { status: 404 });
      const html = (await res.text()).slice(0, 500_000);
      const og = extractOgImage(html);
      if (!og) return new NextResponse(null, { status: 404 });
      imageUrl = isSafeUrl(new URL(og, pageUrl).toString());
    } catch {
      return new NextResponse(null, { status: 404 });
    }
  }

  if (!imageUrl) return new NextResponse(null, { status: 400 });

  try {
    const res = await fetch(imageUrl, {
      headers: {
        "User-Agent": UA,
        // Some hosts require a same-site referer to serve images
        Referer: `${imageUrl.protocol}//${imageUrl.hostname}/`,
        Accept: "image/*",
      },
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    });
    if (!res.ok) return new NextResponse(null, { status: 404 });

    const type = res.headers.get("content-type") ?? "";
    if (!type.startsWith("image/")) return new NextResponse(null, { status: 404 });

    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) return new NextResponse(null, { status: 413 });

    return new NextResponse(buf, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
