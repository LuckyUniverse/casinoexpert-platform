/**
 * Recovery sweep: convert the comma-replacements made by the original
 * em-dash sweep (commit 3ffec80) back to hyphens.
 *
 * The original sweep replaced every " — " with ", ". A single hyphen
 * reads more naturally for most em-dash use cases (and is just as safe
 * from the AI-content signal). This script reverses that mistake
 * SURGICALLY: only the ", " positions that came from " — " get changed,
 * genuine commas are left alone.
 *
 * Method:
 *   For each line modified by commit 3ffec80:
 *     1. Get the pre-sweep line (with em-dashes)
 *     2. Compute the IDEAL line (pre-sweep with " — " replaced by " - ")
 *     3. Get the post-sweep line (with commas)
 *     4. If the current file still contains the post-sweep line verbatim,
 *        replace it with the ideal line. (If the line was further edited
 *        since the sweep, leave it alone, we can't safely transform it.)
 *
 * Run from repo root: node scripts/em-dash-recovery.js
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SWEEP_COMMIT = "3ffec80";

/**
 * Get the contents of a file at a specific commit.
 * Returns null if the file didn't exist at that commit.
 */
function fileAtCommit(commit, relPath) {
  try {
    return execSync(`git show ${commit}:${relPath}`, {
      cwd: ROOT,
      stdio: ["pipe", "pipe", "ignore"],
    }).toString("utf8");
  } catch {
    return null;
  }
}

/**
 * Get the list of files modified in the sweep commit.
 */
function filesInCommit(commit) {
  const out = execSync(`git show --name-only --format= ${commit}`, {
    cwd: ROOT,
  }).toString("utf8");
  return out
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Convert em-dash patterns in a line to hyphen patterns.
 * Matches the rules of the original sweep, but with " - " instead of ", ".
 */
function emDashToHyphen(line) {
  return line
    .replace(/ — /g, " - ")
    .replace(/ —/g, " -")
    .replace(/— /g, "- ")
    .replace(/—/g, "-");
}

const files = filesInCommit(SWEEP_COMMIT);
console.log(`Sweep commit ${SWEEP_COMMIT} touched ${files.length} files.\n`);

let totalReplacements = 0;
let filesTouched = 0;
const report = [];

for (const relPath of files) {
  // Skip scripts and docs, we only want source files that ship.
  if (relPath.startsWith("scripts/")) continue;
  if (relPath.startsWith("docs/")) continue;

  const absPath = path.join(ROOT, relPath);
  if (!fs.existsSync(absPath)) continue;

  const preSweep = fileAtCommit(`${SWEEP_COMMIT}~1`, relPath);
  const postSweep = fileAtCommit(SWEEP_COMMIT, relPath);
  if (preSweep === null || postSweep === null) continue;

  const preLines = preSweep.split("\n");
  const postLines = postSweep.split("\n");
  let current = fs.readFileSync(absPath, "utf8");
  let fileReplacements = 0;

  // Walk line-by-line through pre/post. If the line changed and the post-
  // sweep version is still present verbatim in current, swap it for ideal.
  const len = Math.max(preLines.length, postLines.length);
  for (let i = 0; i < len; i++) {
    const pre = preLines[i] ?? "";
    const post = postLines[i] ?? "";
    if (pre === post) continue;
    if (!pre.includes("—")) continue; // not an em-dash change

    const ideal = emDashToHyphen(pre);
    if (ideal === post) continue; // nothing to recover

    // Skip empty/whitespace-only post lines, indexOf("") returns 0 and
    // would prepend the ideal line to the file. Same for very short lines
    // that might match too widely.
    if (post.trim().length < 4) continue;

    // The post line must appear EXACTLY ONCE in the current file. If it
    // appears zero times the line was further edited; if it appears
    // multiple times we can't safely pick which one to replace.
    const first = current.indexOf(post);
    if (first === -1) continue;
    const last = current.lastIndexOf(post);
    if (first !== last) continue; // ambiguous, skip

    current =
      current.slice(0, first) + ideal + current.slice(first + post.length);
    fileReplacements++;
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(absPath, current, "utf8");
    filesTouched++;
    totalReplacements += fileReplacements;
    report.push({ file: relPath, count: fileReplacements });
  }
}

console.log("=== Em-dash recovery complete ===");
console.log(`Files touched: ${filesTouched}`);
console.log(`Total ", " → " - " conversions: ${totalReplacements}`);
console.log("\nPer-file:");
report.sort((a, b) => b.count - a.count);
for (const r of report) {
  console.log(`  ${r.count.toString().padStart(3)}  ${r.file}`);
}
