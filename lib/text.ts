/**
 * Shared text helpers. Kept tiny and dependency-free so server components and
 * route handlers (llms.txt etc.) can all use the same HTML-stripping logic.
 */
export function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
