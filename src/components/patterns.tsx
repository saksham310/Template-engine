/**
 * Shared surface texture. Takes its colour from `currentColor`, so a parent sets
 * the tone with a text utility and the pattern follows the palette.
 */

/**
 * Technical grid. `id` must be unique per instance — SVG pattern ids are
 * document-global, so two grids sharing one id would render the same fill.
 */
export function GridPattern({
  id,
  size = 56,
  opacity = 0.6,
  className = "",
}: {
  id: string;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      fill="none"
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <path
            d={`M${size} 0H0V${size}`}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}

