/**
 * Global Design Tokens — single source of truth.
 * Premium editorial service platform.
 *
 * DISCIPLINE:
 *   - Radius: sm/md only. NO rounded-full / xl / 2xl / 3xl.
 *   - Borders (1px slate-200/60) over shadows.
 *   - No glow, no glassmorphism, no floating blur.
 */

export const COLORS = {
  bg: "#F9FAFB",
  text: "#0A192F",
  accent: "#0070F3",
  border: "rgb(226 232 240 / 0.6)", // slate-200/60
  white: "#FFFFFF",
} as const;

export const RADIUS = {
  none: "0px",
  sm: "0.125rem", // 2px
  md: "0.375rem", // 6px
} as const;

export const SPACING = {
  1: "0.25rem", //   4px
  2: "0.5rem", //    8px
  3: "0.75rem", //  12px
  4: "1rem", //      16px
  5: "1.5rem", //    24px
  6: "2rem", //      32px
  7: "3rem", //      48px
  8: "4rem", //      64px
  9: "6rem", //      96px
  10: "8rem", //    128px
  11: "12rem", //   192px
} as const;

export const FONTS = {
  sans: "var(--font-geist)", // everything
  editorial: "var(--font-playfair)", // editorial labels only
} as const;

export const TYPE = {
  h1: {
    fontFamily: FONTS.sans,
    fontWeight: 700,
    lineHeight: 0.9, // leading-[0.9]
    letterSpacing: "-0.05em", // tracking-tighter
    fontSize: "clamp(2.75rem, 8vw, 6rem)",
  },
  editorialLabel: {
    fontFamily: FONTS.editorial,
    fontStyle: "italic",
    letterSpacing: "0.02em",
  },
  body: {
    fontFamily: FONTS.sans,
    fontSize: "16px",
    lineHeight: 1.5,
  },
} as const;

/** Enforced constraints — reference in reviews / lint rules. */
export const FORBIDDEN = [
  "rounded-full",
  "rounded-xl",
  "rounded-2xl",
  "rounded-3xl",
  "glow / drop-shadow glow",
  "glassmorphism / backdrop-blur floats",
] as const;

export const DesignSystem = {
  COLORS,
  RADIUS,
  SPACING,
  FONTS,
  TYPE,
  FORBIDDEN,
} as const;

export default DesignSystem;
