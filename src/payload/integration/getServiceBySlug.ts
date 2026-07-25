import { getPayload } from "payload";
import config from "@payload-config";
// After `payload generate:types`, import the generated row type:
// import type { Service } from "@/payload/payload-types";

/**
 * Fetch one Service by slug via the Payload Local API (no HTTP hop).
 * Runs inside a Server Component / Server Action.
 *
 * depth: 2 resolves the hero `image` upload relationship so you get the media
 * doc (url, sizes, alt) inline rather than just an id.
 */
export async function getServiceBySlug(slug: string) {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });

  return docs[0] ?? null; // typed as Service once payload-types is generated
}

/** All slugs — for generateStaticParams() on /services/[slug]. */
export async function getAllServiceSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "services",
    limit: 1000,
    pagination: false,
    select: { slug: true },
  });
  return docs.map((d) => d.slug as string);
}

/* ── Usage in the Server Component page ──────────────────────────────
 *
 * // src/app/services/[slug]/page.tsx
 * import { notFound } from "next/navigation";
 * import { getServiceBySlug, getAllServiceSlugs } from "@/payload/integration/getServiceBySlug";
 * import ServiceTemplate from "@/components/ServiceTemplate";
 *
 * export async function generateStaticParams() {
 *   const slugs = await getAllServiceSlugs();
 *   return slugs.map((slug) => ({ slug }));
 * }
 *
 * export default async function ServicePage({
 *   params,
 * }: { params: Promise<{ slug: string }> }) {
 *   const { slug } = await params;
 *   const service = await getServiceBySlug(slug);
 *   if (!service) notFound();
 *   return <ServiceTemplate service={service} />;
 * }
 * ─────────────────────────────────────────────────────────────────── */
