import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryItems, getGalleryCategories } from "@/payload/integration/getGallery";

export const metadata: Metadata = {
  title: "Gallery — Éditorial",
  description: "A curated portfolio of residential, commercial, and specialized work.",
};

export default async function GalleryPage() {
  const [items, categories] = await Promise.all([
    getGalleryItems(),
    getGalleryCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-28">
      <header className="max-w-2xl">
        <p className="editorial-label text-xs tracking-widest text-text/50">The Portfolio</p>
        <h1 className="mt-2 text-6xl font-bold leading-[0.9] tracking-tighter">Gallery</h1>
        <p className="mt-5 max-w-md text-lg text-text/60">
          Selected work, catalogued like a collection. Filter by discipline below.
        </p>
      </header>

      <GalleryGrid items={items} categories={categories} />
    </div>
  );
}
