/**
 * Re-extract each page of casinoexpert-casino-screenshots.pdf at retina-grade
 * width, then crop to just the above-the-fold portion of each homepage so
 * the assets are both SHARP and SMALL.
 *
 * The PDF was created by pasting full-page screenshots — each PDF page is
 * ~1:8.4 aspect (very tall). The previous extraction used pdf-poppler's
 * `scale` option which maps to pdftoppm's `-scale-to` (constrains the
 * LARGER dimension), so we got 178-wide images that displayed blurry.
 *
 * Fix: call pdftoppm directly with `-scale-to-x 1760` (sets WIDTH) so the
 * width is retina-grade (2× our 880-px display target), then use sharp to
 * crop each PNG to its top portion only.
 *
 * Re-runnable: deletes <slug>.png before writing so it's idempotent.
 */
const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");
const sharp = require("sharp");

const REPO = path.join(__dirname, "..");
const PDF = path.join(REPO, "docs", "casinoexpert-casino-screenshots.pdf");
const OUT_DIR = path.join(REPO, "public", "images", "brand-screenshots");
const TMP_DIR = path.join(REPO, ".tmp-screenshots-raw");
const PDFTOPPM = path.join(
  REPO,
  "node_modules",
  "pdf-poppler",
  "lib",
  "win",
  "poppler-0.51",
  "bin",
  "pdftoppm.exe"
);

// Source width: 2× our 880-px display target = retina sharpness.
const TARGET_WIDTH = 1760;
// Above-the-fold crop height. Most operator homepages put hero + offer + CTA
// in roughly the top 60% of the source. We crop to 1.2× the display width
// which keeps the saved aspect closer to 16:11 — gives downstream UI flex.
const CROP_HEIGHT = Math.round(TARGET_WIDTH * (480 / 880) * 2.2);

// Page → slug (matches the order brands appear in the research file)
const PAGE_TO_SLUG = {
  1: "jackpot-city",
  2: "spin-casino",
  3: "ruby-fortune",
  4: "royal-vegas",
  5: "betway-casino",
  6: "betway-sports",
  7: "yukon-gold",
  8: "zodiac",
  9: "captain-cooks",
  10: "grand-mondial",
  11: "casino-classic",
  12: "golden-tiger",
  13: "luxury-casino",
};

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

(async () => {
  console.log("Rasterising pages at", TARGET_WIDTH, "px wide…");
  console.log("Source PDF:", PDF);
  console.log("Tmp dir:", TMP_DIR);

  const tmpPrefix = path.join(TMP_DIR, "raw");
  const res = spawnSync(
    PDFTOPPM,
    ["-scale-to-x", String(TARGET_WIDTH), "-png", PDF, tmpPrefix],
    { stdio: "inherit" }
  );
  if (res.status !== 0) {
    console.error("pdftoppm failed with status", res.status);
    process.exit(1);
  }

  const rawFiles = fs
    .readdirSync(TMP_DIR)
    .filter((f) => f.startsWith("raw-") && f.endsWith(".png"))
    .sort();

  console.log("\nRaw PNGs produced:", rawFiles.length);

  console.log("\nCropping to above-the-fold (top", CROP_HEIGHT, "px) and saving as <slug>.png:");
  for (const raw of rawFiles) {
    // raw is something like "raw-01.png" — extract page number
    const m = raw.match(/raw-0*(\d+)\.png/);
    if (!m) {
      console.log("  skip (cant parse page)", raw);
      continue;
    }
    const page = parseInt(m[1], 10);
    const slug = PAGE_TO_SLUG[page];
    if (!slug) {
      console.log("  skip (no slug for page", page, ")");
      continue;
    }
    const srcPath = path.join(TMP_DIR, raw);
    const dstPath = path.join(OUT_DIR, `${slug}.png`);

    const img = sharp(srcPath);
    const meta = await img.metadata();
    const cropH = Math.min(CROP_HEIGHT, meta.height || CROP_HEIGHT);

    await img
      .extract({ left: 0, top: 0, width: meta.width, height: cropH })
      // PNG with adaptive filtering — keeps text crisp without lossy artefacts.
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(dstPath);

    const out = await sharp(dstPath).metadata();
    const sz = fs.statSync(dstPath).size;
    console.log(
      "  ✓",
      `${slug}.png`,
      `${out.width}×${out.height}`,
      `(${(sz / 1024).toFixed(0)} KB)`
    );
  }

  // Clean up tmp
  for (const f of fs.readdirSync(TMP_DIR)) fs.unlinkSync(path.join(TMP_DIR, f));
  fs.rmdirSync(TMP_DIR);
  console.log("\nDone. Tmp dir removed.");
})().catch((e) => {
  console.error("ERR", e);
  process.exit(1);
});
