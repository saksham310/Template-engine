import { HERO_BAR, SITE_CONFIG } from "./site";

export type SocialLink = { label: string; href: string };

export type SiteSettings = {
  email: string;
  phone: string;

  telHref: string;
  address: string;
  socials: SocialLink[];

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
