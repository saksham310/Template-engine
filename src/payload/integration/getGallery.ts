import { getPayload } from "payload";
import config from "@payload-config";

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  fullUrl: string;
  alt: string;
  width: number;
  height: number;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function sized(media: any, size: "card" | "hero"): string {
  return media?.sizes?.[size]?.url ?? media?.url ?? "";
}

function toItem(doc: any): GalleryItem {
  const media = doc.image;
  return {
    id: String(doc.id),
    title: doc.title ?? "",
    category: doc.category ?? "Uncategorized",
    description: doc.description ?? "",
    imageUrl: sized(media, "card"),
    fullUrl: sized(media, "hero"),
    alt: media?.alt ?? doc.title ?? "",
    width: media?.width ?? 800,
    height: media?.height ?? 600,
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
  return docs.map(toItem);
}

export async function getGalleryCategories(): Promise<string[]> {
  const items = await getGalleryItems();
  return Array.from(new Set(items.map((i) => i.category)));
}
