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

export const siteFontVariables = `${geist.variable} ${geistMono.variable} ${playfair.variable} ${sourceSerif.variable}`;

export const adminFontVariables = `${geist.variable} ${geistMono.variable} ${playfair.variable}`;
