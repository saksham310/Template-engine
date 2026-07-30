import { getPayload } from "payload";
import config from "@payload-config";

import { HOME_FAQS, HOME_FEATURES, HOME_HERO, HOME_SECTIONS } from "@/config/site";
import type { Home, Media } from "@/payload/payload-types";

/** Normalized shape the home page components consume. */
export type HomeContent = {
  hero: {
    eyebrow: string;
    headline: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    imageUrl: string;
    imageAlt: string;
    statusText: string;
    statusMetricLabel: string;
    statusMetricValue: string;
  };
  services: { eyebrow: string; headline: string };
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
  hero: {
    eyebrow: HOME_HERO.eyebrow,
    headline: HOME_HERO.headline,
    body: HOME_HERO.body,
    primaryLabel: HOME_HERO.primaryLabel,
    primaryHref: HOME_HERO.primaryHref,
    secondaryLabel: HOME_HERO.secondaryLabel,
    secondaryHref: HOME_HERO.secondaryHref,
    imageUrl: HOME_HERO.imageUrl,
    imageAlt: HOME_HERO.imageAlt,
    statusText: HOME_HERO.statusText,
    statusMetricLabel: HOME_HERO.statusMetricLabel,
    statusMetricValue: HOME_HERO.statusMetricValue,
  },
  services: { ...HOME_SECTIONS.services },
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
      eyebrow: text(doc.heroEyebrow, f.hero.eyebrow),
      headline: text(doc.heroHeadline, f.hero.headline),
      body: text(doc.heroBody, f.hero.body),
      primaryLabel: text(doc.heroPrimaryLabel, f.hero.primaryLabel),
      primaryHref: text(doc.heroPrimaryHref, f.hero.primaryHref),
      secondaryLabel: text(doc.heroSecondaryLabel, f.hero.secondaryLabel),
      secondaryHref: text(doc.heroSecondaryHref, f.hero.secondaryHref),
      imageUrl: uploadUrl(doc.heroImage, f.hero.imageUrl),
      imageAlt: text(doc.heroImageAlt, f.hero.imageAlt),
      statusText: text(doc.heroStatusText, f.hero.statusText),
      statusMetricLabel: text(doc.heroStatusMetricLabel, f.hero.statusMetricLabel),
      statusMetricValue: text(doc.heroStatusMetricValue, f.hero.statusMetricValue),
    },
    services: {
      eyebrow: text(doc.servicesEyebrow, f.services.eyebrow),
      headline: text(doc.servicesHeadline, f.services.headline),
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
