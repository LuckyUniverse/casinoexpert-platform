/**
 * Copy and trim the latest transparent-background brand assets from
 * Downloads/ into public/images/brand/.
 *
 * The source PNGs from ChatGPT come at 1536 × 1024 with the actual artwork
 * centred and the rest transparent. We trim to the artwork bounding box so
 * the on-page footprint is honest, then save as the canonical filenames the
 * components expect.
 *
 * Re-run with `node scripts/extract-brand-assets.js` after a new export.
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const DL = "C:/Users/avs_o/Downloads";
const OUT = path.join(__dirname, "..", "public", "images", "brand");

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const SOURCES = [
  {
    src: "ChatGPT Image Jun 9, 2026, 03_22_08 PM.png",
    dest: "character.png",
    label: "character",
  },
  {
    src: "ChatGPT Image Jun 9, 2026, 03_21_53 PM.png",
    dest: "logo-medallion.png",
    label: "medallion",
  },
];

(async () => {
  for (const { src, dest, label } of SOURCES) {
    const srcPath = path.join(DL, src);
    const dstPath = path.join(OUT, dest);
    if (!fs.existsSync(srcPath)) {
      console.error("  ✗ missing source:", src);
      continue;
    }
    // Trim transparent borders → tight bounding box
    await sharp(srcPath)
      .trim()
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(dstPath);
    const m = await sharp(dstPath).metadata();
    const sz = fs.statSync(dstPath).size;
    console.log(
      "  ✓",
      `${dest} (${label})`,
      `${m.width}×${m.height}`,
      `${m.hasAlpha ? "RGBA" : "RGB"}`,
      `(${(sz / 1024).toFixed(0)} KB)`
    );
  }

  console.log("\nDone. Trimmed assets saved to public/images/brand/");
})().catch((e) => {
  console.error("ERR", e);
  process.exit(1);
});
