import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

import {
  SITE_SETTINGS_FALLBACK,
  telHref,
  type SiteSettings,
  type SocialLink,
} from "@/config/site-settings";
import type { Site } from "@/payload/payload-types";

export type { SiteSettings, SocialLink };
export { SITE_SETTINGS_FALLBACK };

function text(value: string | null | undefined, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function socials(doc: Site): SocialLink[] {
  return (
    [
      { label: "Instagram", href: doc.instagram },
      { label: "Facebook", href: doc.facebook },
      { label: "LinkedIn", href: doc.linkedin },
    ] satisfies { label: string; href: string | null | undefined }[]
  )
    .filter((s) => typeof s.href === "string" && s.href.trim())
    .map((s) => ({ label: s.label, href: (s.href as string).trim() }));
}

function propertyTypes(doc: Site, fallback: string[]): string[] {
  const labels = (doc.propertyTypes ?? [])
    .map((row) => row.label?.trim())
    .filter((label): label is string => Boolean(label));
  return labels.length ? labels : fallback;
}

function toSettings(doc: Site): SiteSettings {
  const f = SITE_SETTINGS_FALLBACK;
  const phone = text(doc.phone, f.phone);

  return {
    email: text(doc.email, f.email),
    phone,
    telHref: telHref(phone),
    address: text(doc.address, f.address),
    socials: socials(doc),
    propertyTypes: propertyTypes(doc, f.propertyTypes),
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const payload = await getPayload({ config });
    const site = await payload.findGlobal({ slug: "site" });
    return toSettings(site);
  } catch (error) {
    console.error("site: falling back to bundled contact details", error);
    return SITE_SETTINGS_FALLBACK;
  }
});
