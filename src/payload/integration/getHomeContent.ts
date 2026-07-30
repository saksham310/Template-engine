import { getPayload } from "payload";
import config from "@payload-config";

import { HOME_ADD_ONS, HOME_FAQS, HOME_FEATURES, HOME_HERO, HOME_SECTIONS } from "@/config/site";
import type { Home, Media } from "@/payload/payload-types";

/** Normalized shape the home page components consume. */
export type HomeContent = {
  hero: {
    headline: string;
    body: string;
    imageUrl: string;
    imageAlt: string;
  };
  services: {
    eyebrow: string;
    headline: string;
    /** Slugs of the services filling the large + small cards, in that order. */
    featuredSlugs: string[];
    leadCtaLabel: string;
    addOnsBadge: string;
    addOnsTitle: string;
    addOns: { label: string; meta: string }[];
  };
  pricing: {
    enabled: boolean;
    headline: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    cardCtaLabel: string;
    includedLabel: string;
    popularLabel: string;
    viewAllLabel: string;
    viewAllHref: string;
  };
  features: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    body: string;
    items: { title: string; description: string; icon: string }[];
  };
  faq: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    items: { question: string; answer: string }[];
  };
  quote: { eyebrow: string; headline: string; body: string };
};

/** Blank strings count as "not set" — an editor clearing a field gets the default back. */
function text(value: string | null | undefined, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function uploadUrl(value: (number | null) | Media | undefined, fallback: string): string {
  if (value && typeof value === "object" && typeof value.url === "string" && value.url) {
    return value.url;
  }
  return fallback;
}

export const HOME_FALLBACK: HomeContent = {
  hero: { ...HOME_HERO },
  services: {
    ...HOME_SECTIONS.services,
    featuredSlugs: [],
    addOns: HOME_ADD_ONS.map((a) => ({ ...a })),
  },
  pricing: { ...HOME_SECTIONS.pricing, enabled: true },
  features: {
    ...HOME_SECTIONS.features,
    items: HOME_FEATURES.map((f) => ({ ...f })),
  },
  faq: {
    ...HOME_SECTIONS.faq,
    items: HOME_FAQS.map((f) => ({ ...f })),
  },
  quote: { ...HOME_SECTIONS.quote },
};

/** Featured picks arrive as ids (unpopulated) or docs (depth >= 1) — keep the slugs. */
function featuredSlugs(value: Home["featuredServices"]): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) =>
      entry && typeof entry === "object" && typeof entry.slug === "string"
        ? entry.slug
        : null,
    )
    .filter((slug): slug is string => Boolean(slug));
}

function toContent(doc: Home): HomeContent {
  const f = HOME_FALLBACK;

  const features = doc.features?.length
    ? doc.features.map((item) => ({
        title: item.title,
        description: item.description,
        icon: item.icon,
      }))
    : f.features.items;

  const faqs = doc.faqs?.length
    ? doc.faqs.map((item) => ({ question: item.question, answer: item.answer }))
    : f.faq.items;

  return {
    hero: {
      headline: text(doc.heroHeadline, f.hero.headline),
      body: text(doc.heroBody, f.hero.body),
      imageUrl: uploadUrl(doc.heroImage, f.hero.imageUrl),
      imageAlt: text(doc.heroImageAlt, f.hero.imageAlt),
    },
    services: {
      eyebrow: text(doc.servicesEyebrow, f.services.eyebrow),
      headline: text(doc.servicesHeadline, f.services.headline),
      featuredSlugs: featuredSlugs(doc.featuredServices),
      leadCtaLabel: text(doc.servicesLeadCtaLabel, f.services.leadCtaLabel),
      addOnsBadge: text(doc.servicesAddOnsBadge, f.services.addOnsBadge),
      addOnsTitle: text(doc.servicesAddOnsTitle, f.services.addOnsTitle),
      addOns: doc.addOns?.length
        ? doc.addOns.map((a) => ({ label: a.label, meta: a.meta }))
        : f.services.addOns,
    },
    pricing: {
      // Only an explicit `false` hides it — an unsaved global reads `null`,
      // which must keep the default-on behaviour.
      enabled: doc.pricingEnabled !== false,
      headline: text(doc.pricingHeadline, f.pricing.headline),
      body: text(doc.pricingBody, f.pricing.body),
      ctaLabel: text(doc.pricingCtaLabel, f.pricing.ctaLabel),
      ctaHref: text(doc.pricingCtaHref, f.pricing.ctaHref),
      cardCtaLabel: text(doc.pricingCardCtaLabel, f.pricing.cardCtaLabel),
      includedLabel: text(doc.pricingIncludedLabel, f.pricing.includedLabel),
      popularLabel: text(doc.pricingPopularLabel, f.pricing.popularLabel),
      viewAllLabel: text(doc.pricingViewAllLabel, f.pricing.viewAllLabel),
      viewAllHref: f.pricing.viewAllHref,
    },
    features: {
      eyebrow: text(doc.featuresEyebrow, f.features.eyebrow),
      headline: text(doc.featuresHeadline, f.features.headline),
      headlineAccent: text(doc.featuresHeadlineAccent, f.features.headlineAccent),
      body: text(doc.featuresBody, f.features.body),
      items: features,
    },
    faq: {
      eyebrow: text(doc.faqEyebrow, f.faq.eyebrow),
      headline: text(doc.faqHeadline, f.faq.headline),
      headlineAccent: text(doc.faqHeadlineAccent, f.faq.headlineAccent),
      body: text(doc.faqBody, f.faq.body),
      ctaLabel: text(doc.faqCtaLabel, f.faq.ctaLabel),
      ctaHref: text(doc.faqCtaHref, f.faq.ctaHref),
      items: faqs,
    },
    quote: {
      eyebrow: text(doc.quoteEyebrow, f.quote.eyebrow),
      headline: text(doc.quoteHeadline, f.quote.headline),
      body: text(doc.quoteBody, f.quote.body),
    },
  };
}

/**
 * Home page copy from the `home` global, with the bundled copy in
 * `src/config/site.ts` filling any blank field. A CMS/DB failure logs and
 * returns the bundled copy rather than breaking the page.
 */
export async function getHomeContent(): Promise<HomeContent> {
  try {
    const payload = await getPayload({ config });
    const home = await payload.findGlobal({ slug: "home", depth: 1 });
    return toContent(home);
  } catch (error) {
    console.error("home: falling back to bundled copy", error);
    return HOME_FALLBACK;
  }
}
