import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServiceView,
  getAllServiceSlugs,
} from "@/payload/integration/getServiceView";
import ServiceTemplate from "@/components/ServiceTemplate";
import { SITE_CONFIG } from "@/config/site";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllServiceSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceView(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.seo.title} — ${SITE_CONFIG.name}`,
    description: service.seo.description,
  };
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
