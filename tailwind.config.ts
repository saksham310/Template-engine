import type { Config } from "tailwindcss";

/**
 * Layout tokens — spacing, radius, typography scale, font families.
 * Loaded by Tailwind v4 via `@config` in src/app/(frontend)/globals.css.
 * Colours are NOT here; see the `@theme` block in that file.
 *
 * DISCIPLINE:
 *   - Radius: sm/md only. No full / xl / 2xl / 3xl utilities generated.
 *   - 1px border (slate-200/60) over shadows.
 *   - No glow, no glassmorphism, no floating blur.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Colours live in `@theme` in src/app/(frontend)/globals.css — Tailwind v4
      // emits CSS variables for those but not for legacy JS-config values, and
      // hand-written CSS in that file needs to read the same declarations.
      fontFamily: {
        // Geist = everything; Playfair = editorial labels; Geist Mono = data;
        // Source Serif = testimonial / FAQ headers
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        editorial: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      // Radius: sm + md ONLY. Omitting full/xl/2xl/3xl removes those utilities.
      borderRadius: {
        none: "0px",
        sm: "0.125rem", // rounded-sm  (2px)
        DEFAULT: "0.125rem",
        md: "0.375rem", // rounded-md  (6px)
      },
      // Editorial spacing system (4px base, generous whitespace)
      spacing: {
        px: "1px",
        "0": "0px",
        "1": "0.25rem", //   4px
        "2": "0.5rem", //    8px
        "3": "0.75rem", //  12px
        "4": "1rem", //      16px
        "5": "1.5rem", //    24px
        "6": "2rem", //      32px
        "7": "3rem", //      48px
        "8": "4rem", //      64px
        "9": "6rem", //      96px
        "10": "8rem", //    128px
        "11": "12rem", //   192px
      },
      letterSpacing: {
        tighter: "-0.05em", // H1 display
        tight: "-0.02em",
        widest: "0.2em", // editorial labels
      },
      lineHeight: {
        none: "0.9", // H1 leading-[0.9]
      },
    },
  },
  plugins: [],
};

export default config;
