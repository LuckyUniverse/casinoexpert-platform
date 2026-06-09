/**
 * Crop the new logo + character out of the ChatGPT composite PNG and save
 * as discrete brand assets under public/images/brand/.
 *
 * Source: 1536 × 1024 design board.
 *   - Top-left: medallion logo
 *   - Top-right: standalone character with chip + clipboard
 *
 * Re-run with `node scripts/extract-brand-assets.js` if the source changes.
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const SRC = path.join(
  "C:/Users/avs_o/Downloads",
  "ChatGPT Image Jun 9, 2026, 01_12_43 PM.png"
);
const OUT = path.join(__dirname, "..", "public", "images", "brand");

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const meta = await sharp(SRC).metadata();
  console.log("Source:", `${meta.width}×${meta.height}`);

  // Big medallion — circular badge from the top-left lockup
  await sharp(SRC)
    .extract({ left: 130, top: 10, width: 420, height: 380 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(OUT, "logo-medallion.png"));
  let m = await sharp(path.join(OUT, "logo-medallion.png")).metadata();
  console.log("  ✓ logo-medallion.png", `${m.width}×${m.height}`);

  // Character — top-right standalone with chip + clipboard
  await sharp(SRC)
    .extract({ left: 940, top: 10, width: 460, height: 580 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(OUT, "character.png"));
  m = await sharp(path.join(OUT, "character.png")).metadata();
  console.log("  ✓ character.png", `${m.width}×${m.height}`);

  // Remove any stale icon file from previous runs
  const stale = path.join(OUT, "logo-icon.png");
  if (fs.existsSync(stale)) {
    fs.unlinkSync(stale);
    console.log("  - removed stale logo-icon.png (use medallion at small sizes)");
  }

  console.log("\nAll brand assets saved to public/images/brand/");
})().catch((e) => {
  console.error("ERR", e);
  process.exit(1);
});
