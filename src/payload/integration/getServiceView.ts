import { getPayload } from "payload";
import config from "@payload-config";

export type ServiceView = {
  slug: string;
  title: string;
  category: string;
  durationLabel: string;
  tagline: string;
  marketing: string;
  hero: { headline: string; subheadline: string; imageUrl: string };
  price: string;
  priceUnit: string;
  technicalSpecs: { label: string; value: string }[];
  inclusions: string[];
  sidebarInclusions: string[];
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
};

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80";

function categoryTitle(cat: unknown): string {
  if (cat && typeof cat === "object") {
    return (cat as { title?: string }).title ?? "Uncategorized";
  }
  return typeof cat === "string" && cat ? cat : "Uncategorized";
}

function heroImage(hero: Record<string, unknown> | undefined): string {
  const upload = hero?.image as { url?: string } | string | null | undefined;
  if (upload && typeof upload === "object" && upload.url) return upload.url;
  const url = hero?.imageUrl;
  return typeof url === "string" && url ? url : FALLBACK_HERO;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function toView(doc: any): ServiceView {
  const hero = doc.hero ?? {};
  const title: string = doc.title ?? "Service";
  return {
    slug: doc.slug,
    title,
    category: categoryTitle(doc.category),
    durationLabel: doc.durationLabel ?? "By scope",
    tagline: doc.tagline ?? "",
    marketing: doc.marketing ?? "",
    hero: {
      headline: hero.headline ?? title,
      subheadline: hero.subheadline ?? `A systematic approach to ${title.toLowerCase()}.`,
      imageUrl: heroImage(hero),
    },
    price: typeof doc.price === "string" ? doc.price.trim() : "",
    priceUnit: typeof doc.priceUnit === "string" ? doc.priceUnit.trim() : "",
    technicalSpecs: Array.isArray(doc.technicalSpecs)
      ? doc.technicalSpecs.map((s: any) => ({ label: s.label, value: s.value }))
      : [],
    inclusions: Array.isArray(doc.inclusions)
      ? doc.inclusions.map((i: any) => i.item).filter(Boolean)
      : [],
    sidebarInclusions: Array.isArray(doc.sidebarInclusions)
      ? doc.sidebarInclusions.map((f: any) => f.feature).filter(Boolean)
      : [],
    faqs: Array.isArray(doc.faq)
      ? doc.faq.map((f: any) => ({ q: f.question, a: f.answer }))
      : [],
    seo: {
      title: doc.metaTitle ?? title,
      description: doc.metaDescription ?? doc.tagline ?? "",
    },
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getServiceView(slug: string): Promise<ServiceView | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return docs[0] ? toView(docs[0]) : null;
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "services",
    limit: 1000,
    pagination: false,
  });
  return docs
    .map((d) => (d as { slug?: string }).slug)
    .filter(Boolean) as string[];
}

export type ServiceNavGroup = {
  category: string;
  items: { slug: string; title: string }[];
};

export async function getServiceCategories(): Promise<
  { title: string; slug: string; blurb: string }[]
> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "categories",
    limit: 1000,
    pagination: false,
    sort: "order",
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return docs.map((d: any) => ({
    title: d.title,
    slug: d.slug ?? "",
    blurb: d.blurb ?? "",
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

async function orderedCategoryTitles(
  services: { category: string }[],
): Promise<string[]> {
  const cats = await getServiceCategories();
  const ordered = cats.map((c) => c.title);
  const extras = services
    .map((s) => s.category)
    .filter((c) => c && !ordered.includes(c));
  return [...ordered, ...Array.from(new Set(extras))];
}

export async function getServiceNav(): Promise<ServiceNavGroup[]> {
  const list = await getServiceList();
  const order = await orderedCategoryTitles(list);
  return order
    .map((category) => ({
      category,
      items: list
        .filter((s) => s.category === category)
        .map((s) => ({ slug: s.slug, title: s.title })),
    }))
    .filter((g) => g.items.length > 0);
}

export type ServiceListItem = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  durationLabel: string;
  imageUrl: string;

  price: string;
  priceUnit: string;

  priceNotes: string[];
  popular: boolean;
};

export async function getServiceList(): Promise<ServiceListItem[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "services",
    limit: 1000,
    pagination: false,
    depth: 1,

    sort: ["_order", "createdAt"],
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return docs.map((d: any) => ({
    slug: d.slug,
    title: d.title,
    category: categoryTitle(d.category),
    tagline: d.tagline ?? "",
    durationLabel: d.durationLabel ?? "By scope",
    imageUrl: heroImage(d.hero),
    price: typeof d.price === "string" ? d.price.trim() : "",
    priceUnit: typeof d.priceUnit === "string" ? d.priceUnit.trim() : "",
    priceNotes: Array.isArray(d.priceNotes)
      ? d.priceNotes.map((n: any) => n.note).filter(Boolean)
      : [],
    popular: d.pricePopular === true,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
