import { HERO_BAR, SITE_CONFIG } from "./site";

export type SocialLink = { label: string; href: string };

/**
 * Contact details and social profiles, as the frontend consumes them. Editable
 * in the admin under Settings → Contact & Social; this module holds only the
 * shape and the bundled fallback so client components can import it without
 * pulling the Payload runtime into the browser bundle.
 */
export type SiteSettings = {
  email: string;
  phone: string;
  /** `tel:` href with the display formatting stripped out. */
  telHref: string;
  address: string;
  socials: SocialLink[];
  /** Options in the property dropdown, on the hero bar and in every quote form. */
  propertyTypes: string[];
};

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export const SITE_SETTINGS_FALLBACK: SiteSettings = {
  email: SITE_CONFIG.email,
  phone: SITE_CONFIG.phone,
  telHref: telHref(SITE_CONFIG.phone),
  address: SITE_CONFIG.address,
  socials: [
    { label: "Instagram", href: SITE_CONFIG.socials.instagram },
    { label: "Facebook", href: SITE_CONFIG.socials.facebook },
    { label: "LinkedIn", href: SITE_CONFIG.socials.linkedin },
  ],
  propertyTypes: [...HERO_BAR.propertyTypes],
};
