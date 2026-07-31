import { getPayload } from "payload";
import config from "@payload-config";

export type GalleryPhoto = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  before: GalleryPhoto | null;
  after: GalleryPhoto;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function sized(media: any, size: "card" | "hero"): string {
  return media?.sizes?.[size]?.url ?? media?.url ?? "";
}

function toPhoto(media: any, fallbackAlt: string): GalleryPhoto | null {
  const url = sized(media, "card");
  if (!url) return null;
  return {
    url,
    alt: media?.alt ?? fallbackAlt,
    width: media?.width ?? 800,
    height: media?.height ?? 600,
  };
}

function toItem(doc: any): GalleryItem | null {
  const title: string = doc.title ?? "";
  const after = toPhoto(doc.image, title);
  if (!after) return null;

  return {
    id: String(doc.id),
    title,
    category: doc.category ?? "Uncategorized",
    description: doc.description ?? "",
    before: toPhoto(doc.beforeImage, `${title} — before`),
    after,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "gallery",
    limit: 1000,
    pagination: false,
    depth: 1,
    sort: "-createdAt",
  });
  return docs.map(toItem).filter((i): i is GalleryItem => i !== null);
}

export async function getGalleryCategories(): Promise<string[]> {
  const items = await getGalleryItems();
  return Array.from(new Set(items.map((i) => i.category)));
}
