/**
 * casinoexpert.ai wordmark, live text rendering, no raster crop.
 * Tri-coloured to mirror casinogpt's logo treatment (subtle accent colour
 * on the brand-distinctive part of the name).
 */
export function Logo({
  height = 24,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center font-bold leading-none ${className}`}
      style={{ fontSize: height, letterSpacing: "-0.015em" }}
      aria-label="casinoexpert.ai"
    >
      <span className="text-gray-900">casinoexpert</span>
      <span className="text-blue-600">.ai</span>
    </span>
  );
}
