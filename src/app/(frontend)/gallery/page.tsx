import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryItems, getGalleryCategories } from "@/payload/integration/getGallery";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Gallery — ${SITE_CONFIG.name}`,
  description: "A curated portfolio of residential, commercial, and specialized work.",
};

export default async function GalleryPage() {
  const [items, categories] = await Promise.all([
    getGalleryItems(),
    getGalleryCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
          The portfolio
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-6xl">
          Before, and{" "}
          <span className="font-editorial italic font-normal text-text/60">after.</span>
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-text/60">
          Selected work, catalogued like a collection. Filter by discipline below.
        </p>
      </header>

      <GalleryGrid items={items} categories={categories} />
    </div>
  );
}
