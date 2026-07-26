import { getPayload } from "payload";
import config from "@payload-config";

export type PostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string | null;
  imageUrl: string;
  heroUrl: string;
  alt: string;
};

export type PostView = PostCard & {
  content: unknown;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function sized(media: any, size: "card" | "hero"): string {
  return media?.sizes?.[size]?.url ?? media?.url ?? "";
}

function toCard(doc: any): PostCard {
  const media = doc.featuredImage;
  return {
    id: String(doc.id),
    slug: doc.slug ?? "",
    title: doc.title ?? "",
    excerpt: doc.excerpt ?? "",
    author: doc.author ?? "The Editorial Desk",
    publishedDate: doc.publishedDate ?? null,
    imageUrl: sized(media, "card"),
    heroUrl: sized(media, "hero"),
    alt: media?.alt ?? doc.title ?? "",
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getPostList(): Promise<PostCard[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    limit: 1000,
    pagination: false,
    depth: 1,
    sort: "-publishedDate",
  });
  return docs.map(toCard);
}

export async function getPostBySlug(slug: string): Promise<PostView | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  const doc = docs[0];
  if (!doc) return null;
  return { ...toCard(doc), content: (doc as { content?: unknown }).content ?? null };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    limit: 1000,
    pagination: false,
    depth: 0,
  });
  return docs
    .map((d) => (d as { slug?: string }).slug)
    .filter(Boolean) as string[];
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<PostCard[]> {
  const all = await getPostList();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}
