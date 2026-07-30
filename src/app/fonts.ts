import { Geist, Geist_Mono, Playfair_Display, Source_Serif_4 } from "next/font/google";


export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
});

export const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

/** Public site: sans body, Playfair display italics, Source Serif long-form. */
export const siteFontVariables = `${geist.variable} ${geistMono.variable} ${playfair.variable} ${sourceSerif.variable}`;

/** Admin console: sans UI, mono for data, Playfair only for the wordmark. */
export const adminFontVariables = `${geist.variable} ${geistMono.variable} ${playfair.variable}`;
