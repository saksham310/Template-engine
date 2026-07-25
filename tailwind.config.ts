import type { Config } from "tailwindcss";

/**
 * Global Design Tokens — premium editorial service platform.
 * Loaded by Tailwind v4 via `@config` in src/app/globals.css.
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
      colors: {
        // Global Design Tokens
        bg: "#F9FAFB",
        text: "#0A192F",
        accent: "#0070F3",
        // semantic aliases
        background: "#F9FAFB",
        foreground: "#0A192F",
        primary: {
          DEFAULT: "#0070F3",
          foreground: "#F9FAFB",
        },
        border: "rgb(226 232 240 / 0.6)", // slate-200/60 — 1px borders over shadows
      },
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
