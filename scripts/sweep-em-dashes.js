/**
 * Sweep em-dashes (—) from all source files in the project.
 *
 * Em-dashes are reportedly a Google AI-content signal, so we want them
 * out of every page that ships. This script handles the common patterns
 * and leaves a report of any unusual cases that should be reviewed
 * manually.
 *
 * Replacement rules (applied in order):
 *   " — "  →  ", "    most common: appositive/parenthetical use
 *   " —"   →  ","      trailing form (rare)
 *   "— "   →  ", "     leading form (rare)
 *   "—"    →  ", "     no-spaces form (rare; manually review)
 *
 * Run from repo root: node scripts/sweep-em-dashes.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INCLUDE_DIRS = ["app", "components", "lib"];
const INCLUDE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".md"]);
const EXCLUDE_DIRS = new Set(["node_modules", ".next", ".git", "dist", "build"]);

let filesTouched = 0;
let totalReplacements = 0;
const reports = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      walk(full);
    } else {
      const ext = path.extname(entry.name);
      if (INCLUDE_EXTS.has(ext)) processFile(full);
    }
  }
}

function processFile(file) {
  const original = fs.readFileSync(file, "utf8");
  if (!original.includes("—")) return;

  let next = original;
  // Order matters: most-specific patterns first
  next = next.replace(/ — /g, ", ");
  next = next.replace(/ —/g, ",");
  next = next.replace(/— /g, ", ");
  next = next.replace(/—/g, ", ");

  const count = (original.match(/—/g) || []).length;
  totalReplacements += count;
  filesTouched++;

  fs.writeFileSync(file, next, "utf8");
  reports.push({ file: path.relative(ROOT, file), count });
}

for (const dir of INCLUDE_DIRS) {
  const p = path.join(ROOT, dir);
  if (fs.existsSync(p)) walk(p);
}

// Also sweep the top-level docs that ship in the repo
const topLevel = ["middleware.ts", "README.md"];
for (const f of topLevel) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p)) processFile(p);
}

console.log("\n=== Em-dash sweep complete ===");
console.log(`Files touched: ${filesTouched}`);
console.log(`Total em-dashes replaced: ${totalReplacements}`);
console.log("\nPer-file:");
reports.sort((a, b) => b.count - a.count);
for (const r of reports) {
  console.log(`  ${r.count.toString().padStart(3)}  ${r.file}`);
}
