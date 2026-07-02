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

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const src = params.get("src");
  const page = params.get("page");

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
