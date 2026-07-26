import type { Payload } from "payload";
import { SERVICES, getInclusions, getFaqs } from "@/lib/services";
import { MOCK_GALLERY, MOCK_POSTS } from "@/config/mock-data";

const CATEGORY_SEED = [
  { title: "Residential", order: 1, blurb: "Homes, apartments, and private residences." },
  { title: "Commercial", order: 2, blurb: "Offices, retail, and workspaces." },
  { title: "Specialized", order: 3, blurb: "Precision treatments for demanding surfaces." },
];

const SPECS = [
  { label: "Filtration", value: "HEPA" },
  { label: "Chemistry", value: "pH-neutral" },
  { label: "Quality", value: "12-point check" },
];
const SIDEBAR = [
  { feature: "Deep Restoration" },
  { feature: "Eco-Chemicals" },
  { feature: "Team of 2+" },
];

export type SeedSummary = {
  categories: number;
  services: number;
  gallery: number;
  posts: number;
};

async function uploadRemote(
  payload: Payload,
  url: string,
  alt: string,
): Promise<number | string | undefined> {
  const res = await fetch(url);
  if (!res.ok) return undefined;
  const buffer = Buffer.from(await res.arrayBuffer());
  const mimetype = res.headers.get("content-type")?.split(";")[0] || "image/jpeg";
  const ext = mimetype.split("/")[1] || "jpg";
  const name = `${alt.toLowerCase().replace(/[^\w]+/g, "-").slice(0, 40)}.${ext}`;
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    file: { data: buffer, mimetype, name, size: buffer.length },
  });
  return doc.id;
}

export async function seedContent(payload: Payload): Promise<SeedSummary> {
  const summary: SeedSummary = { categories: 0, services: 0, gallery: 0, posts: 0 };

  const catIdByTitle: Record<string, number | string> = {};
  for (const c of CATEGORY_SEED) {
    const existing = await payload.find({
      collection: "categories",
      where: { title: { equals: c.title } },
      limit: 1,
    });
    if (existing.totalDocs > 0) {
      catIdByTitle[c.title] = existing.docs[0].id;
    } else {
      const doc = await payload.create({
        collection: "categories",
        data: { title: c.title, order: c.order, blurb: c.blurb },
      });
      catIdByTitle[c.title] = doc.id;
      summary.categories++;
    }
  }

  for (const s of SERVICES) {
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: s.slug } },
      limit: 1,
    });
    if (existing.totalDocs > 0) continue;
    await payload.create({
      collection: "services",
      data: {
        title: s.title,
        slug: s.slug,
        category: catIdByTitle[s.category],
        durationLabel: s.durationLabel,
        tagline: s.tagline,
        marketing: s.marketing,
        hero: {
          headline: s.title,
          subheadline: `A systematic approach to ${s.title.toLowerCase()}.`,
          imageUrl: s.image,
        },
        editorialQuote: {
          quote: `They treated our ${
            s.category === "Commercial" ? "space" : "home"
          } the way a gallery treats its collection. The ${s.title.toLowerCase()} was flawless.`,
          citation: "Marguerite L. · verified client",
        },
        technicalSpecs: SPECS,
        inclusions: getInclusions(s).map((item) => ({ item })),
        sidebarInclusions: SIDEBAR,
        faq: getFaqs(s).map((f) => ({ question: f.q, answer: f.a })),
      },
    });
    summary.services++;
  }

  for (const g of MOCK_GALLERY) {
    const existing = await payload.find({
      collection: "gallery",
      where: { title: { equals: g.title } },
      limit: 1,
    });
    if (existing.totalDocs > 0) continue;
    const image = await uploadRemote(payload, g.fullUrl, g.alt);
    if (!image) continue;
    await payload.create({
      collection: "gallery",
      data: {
        title: g.title,
        category: g.category,
        description: g.description,
        image,
      },
    });
    summary.gallery++;
  }

  for (const p of MOCK_POSTS) {
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: p.slug } },
      limit: 1,
    });
    if (existing.totalDocs > 0) continue;
    const featuredImage = await uploadRemote(payload, p.heroUrl, p.alt);
    await payload.create({
      collection: "posts",
      data: {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        author: p.author,
        publishedDate: p.publishedDate ?? new Date().toISOString(),
        featuredImage,
        content: p.content as never,
      },
    });
    summary.posts++;
  }

  return summary;
}

export type PurgeSummary = Record<string, number>;

export async function purgeContent(payload: Payload): Promise<PurgeSummary> {
  const collections = ["leads", "posts", "gallery", "services", "categories", "media"] as const;
  const summary: PurgeSummary = {};
  for (const collection of collections) {
    const res = await payload.delete({
      collection,
      where: { id: { exists: true } },
    });
    summary[collection] = Array.isArray(res.docs) ? res.docs.length : 0;
  }
  return summary;
}
