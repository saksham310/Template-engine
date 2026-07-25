import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServiceView,
  getAllServiceSlugs,
} from "@/payload/integration/getServiceView";
import ServiceTemplate from "@/components/ServiceTemplate";

// Prerender known services; render unknown ones on demand.
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceView(slug);
  if (!service) return { title: "Service not found" };
  return { title: `${service.title} — Éditorial`, description: service.tagline };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceView(slug);
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}
