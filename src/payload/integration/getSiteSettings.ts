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

/** Blank strings count as "not set" — an editor clearing a field gets the default back. */
function text(value: string | null | undefined, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

/** Social links are optional: a cleared field drops the link rather than restoring a default. */
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

/** An emptied list falls back to the bundled set — a blank dropdown is worse than a stale one. */
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

/**
 * Contact details from the `site` global, with the values bundled in
 * `src/config/site.ts` filling any blank field. Wrapped in `cache` so the
 * several components that need it share one read per request; a CMS/DB
 * failure logs and returns the bundled values rather than breaking the page.
 */
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
