import { getPayload } from "payload";
import config from "@payload-config";

/** Normalized shape the ServiceTemplate consumes (Payload doc → view model). */
export type ServiceView = {
  slug: string;
  title: string;
  category: string;
  durationLabel: string;
  tagline: string;
  marketing: string;
  hero: { headline: string; subheadline: string; imageUrl: string };
  editorialQuote: { quote: string; citation: string };
  technicalSpecs: { label: string; value: string }[];
  inclusions: string[];
  sidebarInclusions: string[];
  faqs: { q: string; a: string }[];
  testimonial: { quote: string; citation: string };
  macroShot: string;
  seo: { title: string; description: string };
};

const MACRO_SHOT =
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=80";
const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80";

/** Category is a relationship: populated → its title; id/blank → "Uncategorized". */
function categoryTitle(cat: unknown): string {
  if (cat && typeof cat === "object") {
    return (cat as { title?: string }).title ?? "Uncategorized";
  }
  return typeof cat === "string" && cat ? cat : "Uncategorized";
}

/** Resolve a hero image: uploaded media url wins, else the imageUrl fallback. */
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
    tagline: doc.tagline ?? doc.editorialQuote?.quote ?? "",
    marketing: doc.marketing ?? "",
    hero: {
      headline: hero.headline ?? title,
      subheadline: hero.subheadline ?? `A systematic approach to ${title.toLowerCase()}.`,
      imageUrl: heroImage(hero),
    },
    editorialQuote: {
      quote: doc.editorialQuote?.quote ?? doc.tagline ?? "",
      citation: doc.editorialQuote?.citation ?? "Verified review",
    },
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
    testimonial: {
      quote: doc.editorialQuote?.quote ?? doc.tagline ?? "",
      citation: doc.editorialQuote?.citation ?? "Verified review",
    },
    macroShot: MACRO_SHOT,
    seo: {
      title: doc.metaTitle ?? title,
      description: doc.metaDescription ?? doc.tagline ?? "",
    },
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** One service by slug, adapted for the detail page. Null if not found. */
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

/** All slugs — for generateStaticParams. */
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

/** Editor-managed categories, sorted by `order`. */
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

/** Ordered category titles, with any orphaned service categories appended. */
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

/** Grouped nav for the header mega-menu. */
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

/** Lightweight list for the /services index, grouped-ready. */
export async function getServiceList(): Promise<
  { slug: string; title: string; category: string; tagline: string; durationLabel: string }[]
> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "services",
    limit: 1000,
    pagination: false,
    depth: 1,
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return docs.map((d: any) => ({
    slug: d.slug,
    title: d.title,
    category: categoryTitle(d.category),
    tagline: d.tagline ?? d.editorialQuote?.quote ?? "",
    durationLabel: d.durationLabel ?? "By scope",
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
