import {
  Sparkles,
  Wind,
  Building2,
  Sofa,
  Refrigerator,
  Shirt,
  Bath,
  PawPrint,
  Hammer,
  Droplets,
  Flame,
  Layers,
  Cog,
  Leaf,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "Residential" | "Commercial" | "Specialized";

export type ProcessStep = { n: string; title: string; description: string };
export type Benefit = { icon: LucideIcon; title: string; description: string };
export type Faq = { q: string; a: string };
export type Testimonial = { quote: string; author: string; role: string };

export type Service = {
  slug: string;
  category: ServiceCategory;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  /** long-form marketing value copy for the deep-dive section */
  marketing: string;
  durationLabel: string;
  image: string;
  /** service-specific inclusions; getInclusions() appends the shared standard */
  inclusions: string[];
  process: ProcessStep[];
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

// ── Trust layer (Orangeball / Sajilo-style high-contrast proof, editorial variant) ──
export const TRUST = {
  rating: "4.9/5",
  ratingCount: "240+ verified reviews",
  reviewCount: "240+",
  jobs: "200+",
  jobsLabel: "Jobs completed",
  responseTime: "60 minutes",
  guarantee: "Re-clean guarantee",
} as const;

// Technical spec line — Geist Mono, used in the Value Bento (col 3).
export const TECH_SPECS = [
  "HEPA filtration & air scrubbing",
  "pH-neutral, surface-safe chemistry",
  "12-point quality check",
  "Colour-coded micro-fibre system",
  "Insured, background-checked team of 2+",
] as const;

// Shared standard — appended to every service so inclusions read dense (15+).
const COMMON_INCLUSIONS = [
  "Fully insured, background-checked specialists",
  "Eco-certified, low-tox product system",
  "HEPA-filtered extraction equipment",
  "Colour-coded micro-fibre (no cross-contamination)",
  "Edges, corners & skirting detailed",
  "Fixtures & hardware polished",
  "Interior glass & mirrors finished",
  "Switch plates, handles & touch-points sanitised",
  "Waste removed & bins reset",
  "Final inspection under working daylight",
  "Satisfaction re-clean guarantee",
];

export const SERVICES: Service[] = [
  {
    slug: "full-residence-detail",
    category: "Residential",
    icon: Sparkles,
    title: "Full Residence Detail",
    tagline: "Archival-grade care for the entire home.",
    description:
      "The reference standard. Every room treated as an editorial subject — surfaces restored, edges defined, light left to do the rest.",
    marketing:
      "Your home is the backdrop to everything you photograph, host, and live inside. The Full Residence Detail is our most complete pass — a specialist team moves through every room top-to-ceiling, restoring surfaces most services never touch. It is the standard interior stylists and estate agents book before a shoot, and the one families book to reset the whole house in a single visit.",
    durationLabel: "4–5 hrs",
    image: IMG("photo-1618221195710-dd6b41faaea6"),
    inclusions: [
      "All rooms, floor to ceiling",
      "Baseboards & trim detail",
      "Linen reset & staging",
      "Interior window sills & tracks",
      "Light fittings & shades dusted",
    ],
    process: [
      { n: "01", title: "Survey", description: "Room-by-room condition audit and priority map." },
      { n: "02", title: "Detail", description: "Specialist pass, top surfaces down to floor." },
      { n: "03", title: "Finish", description: "Final inspection under working daylight." },
    ],
  },
  {
    slug: "maintenance-refresh",
    category: "Residential",
    icon: Wind,
    title: "Maintenance Refresh",
    tagline: "A precise reset of high-traffic rooms.",
    description:
      "For homes already in rhythm. A focused pass over the rooms that carry the day.",
    marketing:
      "Between full details, entropy is quiet but constant. The Maintenance Refresh keeps your standard intact — a fast, exact pass over the rooms that take the most traffic, so the house never drifts far from the state you want it in. Most clients pair it with a recurring schedule and forget cleaning is a task at all.",
    durationLabel: "2 hrs",
    image: IMG("photo-1584622650111-993a426fbf0a"),
    inclusions: [
      "Kitchen & bath surfaces",
      "Floors, high-traffic zones",
      "Glass touch-points",
      "Entry & landing detail",
    ],
    process: [
      { n: "01", title: "Target", description: "Confirm the rooms in scope." },
      { n: "02", title: "Reset", description: "Fast, exact pass on key surfaces." },
      { n: "03", title: "Check", description: "Walkthrough and sign-off." },
    ],
  },
  {
    slug: "upholstery-restoration",
    category: "Residential",
    icon: Sofa,
    title: "Upholstery Restoration",
    tagline: "Fabric brought back to gallery condition.",
    description: "Deep extraction and fibre care for sofas, chairs, and headboards.",
    marketing:
      "Upholstery ages in the parts you sit on most — colour flattens, pile compresses, odours settle in. Our restoration is fibre-first: colour-fastness tested, extracted with controlled moisture, and dried to a safe residual so nothing warps or mildews. Pieces come back looking years younger without a reupholstery bill.",
    durationLabel: "90 min",
    image: IMG("photo-1493663284031-b7e3aefcae8e"),
    inclusions: [
      "Colour-fastness test",
      "Hot-water extraction",
      "Fibre-safe agents",
      "Stain treatment & deodorise",
    ],
    process: [
      { n: "01", title: "Test", description: "Colour-fastness and fibre check." },
      { n: "02", title: "Extract", description: "Deep-clean pass, controlled moisture." },
      { n: "03", title: "Dry", description: "Air-move to safe residual humidity." },
    ],
  },
  {
    slug: "kitchen-deep-clean",
    category: "Residential",
    icon: Refrigerator,
    title: "Kitchen Deep Clean",
    tagline: "Every surface, seam, and appliance.",
    description: "The hardest-working room, handled with precision.",
    marketing:
      "The kitchen is where grease, heat, and daily use conspire against every surface. Our deep clean degreases and descales down to the hinge — inside appliances, along backsplash grout, across the rangehood — leaving a room that photographs clean and stays hygienic where it counts.",
    durationLabel: "2 hrs",
    image: IMG("photo-1556909212-d5b604d0c90d"),
    inclusions: [
      "Degrease all surfaces",
      "Interior appliance clean",
      "Backsplash & grout",
      "Rangehood & filter",
    ],
    process: [
      { n: "01", title: "Clear", description: "Surfaces cleared and staged." },
      { n: "02", title: "Degrease", description: "Heat + agent on every surface." },
      { n: "03", title: "Detail", description: "Seams, hinges, and finish." },
    ],
  },
  {
    slug: "laundry-linen",
    category: "Residential",
    icon: Shirt,
    title: "Laundry & Linen",
    tagline: "Wash, press, and stage.",
    description: "Full linen service, returned hotel-ready.",
    marketing:
      "Linen is the fastest way a room reads as cared-for or neglected. Our service launders, presses, and stages by fabric and care label — beds set the way a hotel would leave them, wardrobes reset, everything returned to the room rather than the basket.",
    durationLabel: "1 hr",
    image: IMG("photo-1545173168-9f1947eebb7f"),
    inclusions: [
      "Wash & dry by fabric",
      "Press & fold",
      "Bed staging",
      "Wardrobe reset",
    ],
    process: [
      { n: "01", title: "Sort", description: "By fabric and care label." },
      { n: "02", title: "Process", description: "Wash, dry, press." },
      { n: "03", title: "Stage", description: "Returned and set." },
    ],
  },
  {
    slug: "studio-commercial",
    category: "Commercial",
    icon: Building2,
    title: "Studio & Commercial",
    tagline: "After-hours detailing for workspaces.",
    description: "Galleries, studios, and offices, camera-ready at open.",
    marketing:
      "A workspace is a brand statement your clients read before you speak. We service galleries, studios, and offices after hours on a standardised, logged program — so every morning opens on a space that looks considered, not just tidied. Scoped to your footprint, keyed to your schedule.",
    durationLabel: "By scope",
    image: IMG("photo-1497366216548-37526070297c"),
    inclusions: [
      "After-hours secure access",
      "Desk & surface reset",
      "Glass partitions",
      "Common areas & kitchenette",
    ],
    process: [
      { n: "01", title: "Walkthrough", description: "On-site scope and access plan." },
      { n: "02", title: "Program", description: "Recurring schedule agreed." },
      { n: "03", title: "Service", description: "Standardised, logged passes." },
    ],
  },
  {
    slug: "retail-front",
    category: "Commercial",
    icon: Layers,
    title: "Retail Frontage",
    tagline: "Storefront and display, kept sharp.",
    description: "Frontage as considered as the product behind it.",
    marketing:
      "Frontage is your highest-traffic first impression. We keep storefront glass, entry floors, and display surfaces sharp on a before-hours schedule, so the frontage never undercuts the product it frames. Fitting rooms included — the detail shoppers notice most.",
    durationLabel: "2–3 hrs",
    image: IMG("photo-1441986300917-64674bd600d8"),
    inclusions: [
      "Storefront glass, inside & out",
      "Display surfaces",
      "Entry floors",
      "Fitting rooms",
    ],
    process: [
      { n: "01", title: "Open", description: "Before-hours entry." },
      { n: "02", title: "Detail", description: "Glass, floors, displays." },
      { n: "03", title: "Ready", description: "Set before first customer." },
    ],
  },
  {
    slug: "post-construction",
    category: "Specialized",
    icon: Hammer,
    title: "Post-Construction",
    tagline: "From site to showroom.",
    description: "The heavy first clean after a build or renovation.",
    marketing:
      "New builds and renovations leave a specific mess — fine dust in every track, adhesive residue, splatter on glass. Our post-construction team runs a HEPA top-down extraction, strips residue, and delivers a handover-grade polish so the space is ready to live in the day the trades leave, not a week after.",
    durationLabel: "6+ hrs",
    image: IMG("photo-1503387762-592deb58ef4e"),
    inclusions: [
      "Fine dust HEPA extraction",
      "Adhesive & residue removal",
      "Window, track & frame detail",
      "Handover-grade final polish",
    ],
    process: [
      { n: "01", title: "Extract", description: "HEPA dust removal, top-down." },
      { n: "02", title: "Strip", description: "Residue, stickers, splatter." },
      { n: "03", title: "Polish", description: "Handover-grade finish." },
    ],
  },
  {
    slug: "window-restoration",
    category: "Specialized",
    icon: Droplets,
    title: "Window Restoration",
    tagline: "Interior and exterior, streak-free.",
    description: "Purified-water glass restoration, inside and out.",
    marketing:
      "Windows are the one surface that changes how an entire room feels. Our purified-water system restores glass inside and out with no streaks and no residue, tracks and frames detailed, screens cleaned — light back to full transmission and staying that way longer than a squeegee ever manages.",
    durationLabel: "90 min",
    image: IMG("photo-1527515545081-5db817172677"),
    inclusions: [
      "Interior & exterior glass",
      "Track & frame detail",
      "Purified-water finish",
      "Screen clean",
    ],
    process: [
      { n: "01", title: "Frames", description: "Tracks and frames first." },
      { n: "02", title: "Glass", description: "Purified-water pass." },
      { n: "03", title: "Detail", description: "Edges and corners." },
    ],
  },
  {
    slug: "fireplace-hearth",
    category: "Specialized",
    icon: Flame,
    title: "Fireplace & Hearth",
    tagline: "Stone and surround, restored.",
    description: "Soot removal and stone care for fireplaces and hearths.",
    marketing:
      "A fireplace is a room's focal point — and the fastest to look neglected. We remove soot and residue with stone-safe chemistry, detail the surround, and seal masonry on request, so the hearth reads as an architectural feature again rather than a maintenance afterthought.",
    durationLabel: "90 min",
    image: IMG("photo-1522708323590-d24dbb6b0267"),
    inclusions: [
      "Soot & residue removal",
      "Stone-safe agents",
      "Surround detail",
      "Optional masonry seal",
    ],
    process: [
      { n: "01", title: "Protect", description: "Mask surrounding surfaces." },
      { n: "02", title: "Clean", description: "Soot and residue lifted." },
      { n: "03", title: "Seal", description: "Optional masonry seal." },
    ],
  },
  {
    slug: "pet-deep-treatment",
    category: "Specialized",
    icon: PawPrint,
    title: "Pet Deep Treatment",
    tagline: "Odour, dander, and fibre reset.",
    description: "Targeted extraction and enzyme treatment for homes with animals.",
    marketing:
      "Living with animals means dander and odour settle into the soft surfaces you can't wash. Our enzyme treatment neutralises odour at the source rather than masking it, with targeted extraction pulling dander from upholstery and rugs — the difference guests notice the moment they walk in.",
    durationLabel: "2 hrs",
    image: IMG("photo-1450778869180-41d0601e046e"),
    inclusions: [
      "Enzyme odour treatment",
      "Soft-surface extraction",
      "Dander removal",
      "Source neutralisation",
    ],
    process: [
      { n: "01", title: "Locate", description: "Identify affected zones." },
      { n: "02", title: "Treat", description: "Enzyme + extraction pass." },
      { n: "03", title: "Neutralize", description: "Odour source resolved." },
    ],
  },
  {
    slug: "bath-restoration",
    category: "Specialized",
    icon: Bath,
    title: "Bath Restoration",
    tagline: "Grout, glass, and fixtures renewed.",
    description: "Deep descale and grout restoration for baths and wet rooms.",
    marketing:
      "Bathrooms show wear faster than any room — limescale on glass, grout going grey, fixtures dulling. Our restoration descales, restores and seals grout lines, clarifies glass and polishes fixtures, returning the wet room to a finish that looks renovated rather than merely cleaned.",
    durationLabel: "90 min",
    image: IMG("photo-1584622781564-1d987f7333c1"),
    inclusions: [
      "Descale all surfaces",
      "Grout restoration & seal",
      "Glass clarify",
      "Fixture polish",
    ],
    process: [
      { n: "01", title: "Descale", description: "Lime and residue removed." },
      { n: "02", title: "Grout", description: "Lines restored and sealed." },
      { n: "03", title: "Polish", description: "Glass and fixtures finished." },
    ],
  },
];

// Gallery pool for the "Results" section (before/after showcase imagery).
const GALLERY_POOL = [
  "photo-1584622650111-993a426fbf0a",
  "photo-1616486338812-3dadae4b4ace",
  "photo-1600585154340-be6161a56a0c",
  "photo-1600607687939-ce8a6c25118c",
  "photo-1567767292278-a4f21aa2d36e",
  "photo-1560448204-e02f11c3d0e2",
];

export const CATEGORIES: ServiceCategory[] = [
  "Residential",
  "Commercial",
  "Specialized",
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesByCategory(category: ServiceCategory): Service[] {
  return SERVICES.filter((s) => s.category === category);
}

/** Dense inclusion list: service-specific first, then the shared standard (15+ total). */
export function getInclusions(service: Service): string[] {
  return [...service.inclusions, ...COMMON_INCLUSIONS];
}

/** Four gallery images: the hero shot plus three from the pool. */
export function getGallery(service: Service): string[] {
  const pool = GALLERY_POOL.filter((id) => !service.image.includes(id)).slice(0, 3);
  return [service.image, ...pool.map(IMG)];
}

/** Three "Why this service" benefit cards. */
export function getBenefits(service: Service): Benefit[] {
  return [
    {
      icon: Cog,
      title: "Specialist equipment",
      description: `HEPA extraction and purpose-built tools calibrated for ${service.title.toLowerCase()} — not a domestic kit.`,
    },
    {
      icon: Leaf,
      title: "Eco-certified chemistry",
      description:
        "Low-tox, surface-safe agents that are effective on the finish and safe around children and pets.",
    },
    {
      icon: ShieldCheck,
      title: "Vetted, insured staff",
      description:
        "Background-checked specialists, fully insured, backed by our satisfaction re-clean guarantee.",
    },
  ];
}

/** FAQ set — 4 objection-killers: price, insurance, access/keys, guarantee. */
export function getFaqs(service: Service): Faq[] {
  return [
    {
      q: "How is the price determined?",
      a: `There are no fixed rates for ${service.title} — every space is different. We review your request and deliver a personalised estimate, usually within 60 minutes. No payment information is required to request one.`,
    },
    {
      q: "Are you insured, and are staff vetted?",
      a: "Yes. We carry full public-liability insurance, and every specialist is background-checked. All work is covered by our satisfaction re-clean guarantee.",
    },
    {
      q: "Do you need keys, or do I have to be home?",
      a: "Whatever suits you. Many clients provide secure key access or a code for after-hours service; others prefer to be present. Access details are agreed when we confirm your quote.",
    },
    {
      q: "What if I'm not satisfied with the finish?",
      a: "Tell us within 48 hours and we return to re-clean the area at no additional cost — the guarantee stands on every job.",
    },
  ];
}

const MACRO_SHOT = IMG("photo-1527515637462-cff94eecc1ac");

/** Macro "finish detail" shot for the Value Bento. */
export function getMacroShot(): string {
  return MACRO_SHOT;
}

/** Single editorial pull-quote testimonial (Source Serif, italic). */
export function getTestimonial(service: Service): Testimonial {
  return {
    quote: `They treated our home the way a gallery treats its collection. The ${service.title.toLowerCase()} was flawless — I've stopped noticing the work and started noticing the light.`,
    author: "Marguerite L.",
    role: `${service.category} client · verified review`,
  };
}
