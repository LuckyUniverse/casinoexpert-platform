/**
 * Extract each page of casinoexpert-casino-screenshots.pdf to a PNG so we
 * can wire individual screenshots to brand review pages.
 *
 * Pages come out as page-01.png ... page-NN.png in
 * public/images/brand-screenshots/. After running, inspect them and rename
 * to <brand-slug>.png (or update a mapping table).
 */
const path = require("path");
const fs = require("fs");
const poppler = require("pdf-poppler");

const PDF = path.join(__dirname, "..", "docs", "casinoexpert-casino-screenshots.pdf");
const OUT_DIR = path.join(__dirname, "..", "public", "images", "brand-screenshots");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const opts = {
  format: "png",
  out_dir: OUT_DIR,
  out_prefix: "page",
  // 150 dpi gives readable but reasonably-sized PNGs.
  // Bump to 200+ if any page is too low-res for hero use.
  scale: 1500, // pixel-width (pdf-poppler uses 'scale' = max width in px)
};

(async () => {
  console.log("Converting:", PDF);
  console.log("Output:", OUT_DIR);
  try {
    await poppler.convert(PDF, opts);
    const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".png")).sort();
    console.log("Produced", files.length, "PNGs:");
    files.forEach((f) => {
      const stats = fs.statSync(path.join(OUT_DIR, f));
      console.log("  ", f, `(${(stats.size / 1024).toFixed(0)} KB)`);
    });
  } catch (e) {
    console.error("ERR", e.message || e);
    process.exit(1);
  }
})();
