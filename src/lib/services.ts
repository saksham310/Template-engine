import { Building2, Home, KeyRound, Sparkles, type LucideIcon } from "lucide-react";

export type ServiceCategory = "Residential" | "Commercial" | "Specialized";

export type ProcessStep = { n: string; title: string; description: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  category: ServiceCategory;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  marketing: string;
  durationLabel: string;
  image: string;
  inclusions: string[];
  process: ProcessStep[];
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const TRUST = {
  rating: "4.9/5",
  ratingCount: "240+ verified reviews",
  reviewCount: "240+",
  jobs: "200+",
  jobsLabel: "Jobs completed",
  responseTime: "60 minutes",
  guarantee: "Re-clean guarantee",
} as const;

// Appended to every service so inclusion lists stay dense.
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
    slug: "end-of-lease-cleaning",
    category: "Specialized",
    icon: KeyRound,
    title: "End of Lease Cleaning",
    tagline: "The handover clean that returns the bond.",
    description:
      "A full vacate clean worked against the agent's inspection checklist, so nothing on it is left to argue about.",
    marketing:
      "An end of lease clean is graded, not admired. Inspectors work from a fixed checklist, and bonds are rarely lost on the obvious things — it is the oven rails, the window tracks, the skirting, and the marks behind the door that cost tenants money. We work that checklist line for line, photograph the result, and return to re-clean any item an agent flags. Also called a bond clean, vacate clean, or move-out clean.",
    durationLabel: "5–8 hrs",
    image: IMG("photo-1484154218962-a197022b5858"),
    inclusions: [
      "Oven, rangehood & cooktop degreased",
      "Cupboards cleaned inside and out",
      "Window tracks, sills & frames detailed",
      "Skirting, door frames & marks on walls",
      "Bathroom descaled, grout restored",
      "Carpets vacuumed, hard floors mopped",
    ],
    process: [
      { n: "01", title: "Checklist", description: "Scope agreed against your agent's exit condition report." },
      { n: "02", title: "Clean", description: "Full vacate pass, room by room, top down." },
      { n: "03", title: "Evidence", description: "Before-and-after photos supplied for the handover." },
    ],
  },
  {
    slug: "house-cleaning",
    category: "Residential",
    icon: Home,
    title: "House Cleaning",
    tagline: "The regular clean that keeps a home level.",
    description:
      "A consistent pass over the rooms that carry the day — weekly, fortnightly, or whenever it suits.",
    marketing:
      "Regular cleaning is not about a single dramatic result; it is about never needing one. The same team learns your home, works to the same checklist each visit, and keeps the house close to the state you actually want to live in. Book it weekly, fortnightly, or monthly, and move or pause a visit whenever the week calls for it.",
    durationLabel: "2–3 hrs",
    image: IMG("photo-1584622650111-993a426fbf0a"),
    inclusions: [
      "Kitchen surfaces, sink & exterior of appliances",
      "Bathrooms sanitised end to end",
      "All floors vacuumed and mopped",
      "Dusting through every room",
      "Beds made, linen changed on request",
      "Bins emptied and re-lined",
    ],
    process: [
      { n: "01", title: "Set up", description: "First visit sets the checklist and the access method." },
      { n: "02", title: "Rhythm", description: "The same team returns on your schedule." },
      { n: "03", title: "Adjust", description: "Rooms and frequency changed whenever you ask." },
    ],
  },
  {
    slug: "office-cleaning",
    category: "Commercial",
    icon: Building2,
    title: "Office Cleaning",
    tagline: "Workspaces reset before anyone arrives.",
    description:
      "Scheduled commercial cleaning for offices, studios, and retail — after hours, to an agreed scope.",
    marketing:
      "A workspace is judged the moment someone walks in, and staff notice long before clients do. We service offices, studios, clinics, and retail floors outside working hours, against a written scope agreed at the walkthrough, with the same team every visit and a logged record of each pass. Fully insured, with police-checked staff and public liability cover your building manager can verify.",
    durationLabel: "By site",
    image: IMG("photo-1497366216548-37526070297c"),
    inclusions: [
      "Desks, meeting rooms & common areas",
      "Kitchens and breakout spaces",
      "Washrooms sanitised and restocked",
      "Internal glass and reception frontage",
      "Floors vacuumed, mopped, or buffed",
      "Waste and recycling removed",
    ],
    process: [
      { n: "01", title: "Walkthrough", description: "On-site scope, access, and out-of-hours plan." },
      { n: "02", title: "Program", description: "Frequency and checklist agreed in writing." },
      { n: "03", title: "Service", description: "Standardised passes, logged every visit." },
    ],
  },
  {
    slug: "deep-cleaning",
    category: "Residential",
    icon: Sparkles,
    title: "Deep Cleaning",
    tagline: "The once-a-year reset, done properly.",
    description:
      "Everything a regular clean does not reach — inside, behind, above, and underneath.",
    marketing:
      "A deep clean goes after the build-up a weekly service is not scheduled to touch: inside the oven and the fridge, behind the appliances, the tops of cupboards, the tracks, the tiles, and the fan blades. Most homes book it seasonally as a spring clean, before guests arrive, or as the reset that makes regular cleaning worth doing again.",
    durationLabel: "4–6 hrs",
    image: IMG("photo-1618221195710-dd6b41faaea6"),
    inclusions: [
      "Inside oven, fridge & cupboards",
      "Behind and under movable appliances",
      "Tiles and grout scrubbed",
      "Light fittings, fans & vents dusted",
      "Interior windows, tracks & sills",
      "Skirting, door frames & switch plates",
    ],
    process: [
      { n: "01", title: "Survey", description: "Room-by-room condition audit and priority map." },
      { n: "02", title: "Detail", description: "Specialist pass, top surfaces down to floor." },
      { n: "03", title: "Finish", description: "Final inspection under working daylight." },
    ],
  },
];

export function getInclusions(service: Service): string[] {
  return [...service.inclusions, ...COMMON_INCLUSIONS];
}

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
