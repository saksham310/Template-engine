export const SITE_CONFIG = {
  name: "Éditorial",
  tagline: "Expert Cleaning for Modern Spaces",
  description:
    "We treat interiors like editorial subjects — trained specialists, archival-grade products, and a standard of finish reserved for the spaces you photograph.",
  email: "studio@editorial.co",
  phone: "+1 (415) 555-0142",
  address: "148 Gallery Row, Suite 3B, San Francisco, CA",
  socials: {
    facebook: "https://facebook.com/editorial",
    instagram: "https://instagram.com/editorial",
    linkedin: "https://linkedin.com/company/editorial",
  },
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/#services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type FooterSection = { title: string; links: NavLink[] };

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { label: "Work", href: "/#services" },
      { label: "Gallery", href: "/gallery" },
      { label: "Journal", href: "/blog" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Request a Quote", href: "/#book" },
      { label: "Book a Walkthrough", href: "/#book" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: SITE_CONFIG.socials.instagram },
      { label: "Facebook", href: SITE_CONFIG.socials.facebook },
      { label: "LinkedIn", href: SITE_CONFIG.socials.linkedin },
    ],
  },
];

/**
 * Home page copy. This is the fallback layer: the `home` global in Payload
 * overrides any of it, and the page falls back here field by field so a blank
 * (or unreachable) CMS still renders a complete page.
 */
export const HOME_HERO = {
  eyebrow: "Est. 2026 — Bespoke Care",
  headline: SITE_CONFIG.tagline,
  body: SITE_CONFIG.description,
  primaryLabel: "Request a Quote →",
  primaryHref: "#book",
  secondaryLabel: "View recent work",
  secondaryHref: "/gallery",
  imageUrl:
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
  imageAlt: "Sunlit modern living room with clean minimal interior",
  statusText: "Live Status: Professionals active nearby",
  statusMetricLabel: "Avg. response",
  statusMetricValue: "~12 min",
} as const;

export const HOME_SECTIONS = {
  services: {
    eyebrow: "The Services",
    headline: "A standard of finish, room by room.",
  },
  features: {
    eyebrow: "Why Choose Us",
    headline: "The difference is in the",
    headlineAccent: "discipline.",
    body:
      "Anyone can leave a room looking clean. We hold four standards that decide whether it stays that way — and whether you ever think about it again.",
  },
  faq: {
    eyebrow: "Common Questions",
    headline: "Answered before",
    headlineAccent: "you ask.",
    body: "Still curious? We answer every message ourselves, within the hour.",
    ctaLabel: "Ask us directly",
    ctaHref: "/contact",
  },
  quote: {
    eyebrow: "Request a Quote",
    headline: "Request your personalised quote",
    body:
      "Tell us about your space. Every request is reviewed individually — no fixed rates, no obligation, no payment details.",
  },
} as const;

export type HomeFeature = { title: string; description: string; icon: string };

export const HOME_FEATURES: HomeFeature[] = [
  {
    title: "Archival-Grade Method",
    description:
      "A documented 12-point protocol per room — the same discipline a gallery applies to its collection.",
    icon: "ShieldCheck",
  },
  {
    title: "Eco-Certified Chemistry",
    description:
      "pH-neutral, low-residue formulations that protect finishes and the people who live with them.",
    icon: "Leaf",
  },
  {
    title: "Trained Specialists",
    description:
      "Vetted, insured teams of two or more — never a rotating cast of subcontractors.",
    icon: "Users",
  },
  {
    title: "Response in Minutes",
    description:
      "Quotes reviewed and returned within the hour. Recurring care scheduled around your calendar.",
    icon: "Clock",
  },
];

export type HomeFaq = { question: string; answer: string };

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "How is a quote calculated?",
    answer:
      "Every space is reviewed individually — there are no fixed rates. Send scope and photos and we return a firm quote within the hour.",
  },
  {
    question: "What products do you use?",
    answer:
      "Exclusively eco-certified, pH-neutral chemistry paired with HEPA filtration, safe for stone, timber, and delicate finishes.",
  },
  {
    question: "Are your teams insured?",
    answer:
      "Yes. Every specialist is background-checked, fully insured, and works in vetted teams of two or more.",
  },
  {
    question: "Do you offer recurring care?",
    answer:
      "We do. Membership schedules recurring detail on your calendar at a preferred rate, paused or adjusted anytime.",
  },
];
