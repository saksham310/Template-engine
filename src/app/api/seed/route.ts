import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { SERVICES, getInclusions, getFaqs } from "@/lib/services";

/**
 * DEV seed — GET /api/seed
 * Creates the first admin user (if none) and upserts the 12 services from
 * src/lib/services.ts into Payload. Idempotent: existing slugs are skipped.
 * Remove or guard this route before production.
 */

const ADMIN_EMAIL = "admin@editorial.test";
const ADMIN_PASSWORD = "changeme123";

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

export async function GET() {
  const payload = await getPayload({ config });
  const result: {
    admin?: string;
    categories: string[];
    created: string[];
    skipped: string[];
  } = {
    categories: [],
    created: [],
    skipped: [],
  };

  const users = await payload.find({ collection: "users", limit: 1 });
  if (users.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "Admin" },
    });
    result.admin = `${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`;
  } else {
    result.admin = "exists (unchanged)";
  }

  // Upsert categories; keep an id lookup by title for the services below.
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
      result.categories.push(c.title);
    }
  }

  for (const s of SERVICES) {
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: s.slug } },
      limit: 1,
    });
    if (existing.totalDocs > 0) {
      result.skipped.push(s.slug);
      continue;
    }
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
          } the way a gallery treats its collection. The ${s.title.toLowerCase()} was flawless — I've stopped noticing the work and started noticing the light.`,
          citation: "Marguerite L. · verified client",
        },
        technicalSpecs: SPECS,
        inclusions: getInclusions(s).map((item) => ({ item })),
        sidebarInclusions: SIDEBAR,
        faq: getFaqs(s).map((f) => ({ question: f.q, answer: f.a })),
      },
    });
    result.created.push(s.slug);
  }

  return NextResponse.json({ ok: true, ...result });
}
