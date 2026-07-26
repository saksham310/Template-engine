import type { GalleryItem } from "@/payload/integration/getGallery";
import type { PostView } from "@/payload/integration/getPosts";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MOCK_GALLERY: GalleryItem[] = [
  {
    id: "m1",
    title: "Kensington Penthouse",
    category: "Residential",
    description: "Full residence detail, post-renovation.",
    imageUrl: U("photo-1560448204-e02f11c3d0e2", 800),
    fullUrl: U("photo-1560448204-e02f11c3d0e2"),
    alt: "Sunlit minimal living room",
    width: 800,
    height: 1000,
  },
  {
    id: "m2",
    title: "Studio Nord",
    category: "Commercial",
    description: "Workspace reset for a design studio.",
    imageUrl: U("photo-1497366216548-37526070297c", 800),
    fullUrl: U("photo-1497366216548-37526070297c"),
    alt: "Bright open-plan office",
    width: 800,
    height: 600,
  },
  {
    id: "m3",
    title: "Marble Restoration",
    category: "Specialized",
    description: "pH-neutral treatment on honed marble.",
    imageUrl: U("photo-1600585154340-be6161a56a0c", 800),
    fullUrl: U("photo-1600585154340-be6161a56a0c"),
    alt: "Detail of restored marble surface",
    width: 800,
    height: 900,
  },
  {
    id: "m4",
    title: "The Glass House",
    category: "Residential",
    description: "Interior windows and glazing detail.",
    imageUrl: U("photo-1512917774080-9991f1c4c750", 800),
    fullUrl: U("photo-1512917774080-9991f1c4c750"),
    alt: "Modern house with floor-to-ceiling glass",
    width: 800,
    height: 640,
  },
  {
    id: "m5",
    title: "Atelier Retail",
    category: "Commercial",
    description: "End-of-fit-out clean for a flagship store.",
    imageUrl: U("photo-1441986300917-64674bd600d8", 800),
    fullUrl: U("photo-1441986300917-64674bd600d8"),
    alt: "Minimal retail interior",
    width: 800,
    height: 1000,
  },
  {
    id: "m6",
    title: "Hearth & Stone",
    category: "Specialized",
    description: "Fireplace and hearth restoration.",
    imageUrl: U("photo-1513694203232-719a280e022f", 800),
    fullUrl: U("photo-1513694203232-719a280e022f"),
    alt: "Restored stone fireplace",
    width: 800,
    height: 800,
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
function lexical(paragraphs: string[], quote?: string): any {
  const text = (value: string) => ({
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text: value,
    version: 1,
  });
  const para = (value: string) => ({
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    textFormat: 0,
    children: [text(value)],
  });
  const children: any[] = paragraphs.map(para);
  if (quote) {
    children.splice(1, 0, {
      type: "quote",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [text(quote)],
    });
  }
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children,
    },
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const MOCK_POSTS: PostView[] = [
  {
    id: "p1",
    slug: "science-of-restoration-hepa",
    title: "The Science of Restoration: Why HEPA Matters.",
    excerpt:
      "Filtration is the difference between moving dust and removing it. A look at the physics behind an archival-grade clean.",
    author: "The Editorial Desk",
    publishedDate: "2026-07-18T09:00:00.000Z",
    imageUrl: U("photo-1581578731548-c64695cc6952", 800),
    heroUrl: U("photo-1581578731548-c64695cc6952"),
    alt: "Detail of a clean, sunlit surface",
    content: lexical(
      [
        "Most cleaning simply relocates particulate. It lifts dust into the air, where it settles again an hour later. A HEPA-grade system is engineered to capture 99.97% of particles down to 0.3 microns — the size at which airborne matter is most stubborn.",
        "The result is not a surface that merely looks clean, but an interior that measurably holds fewer allergens, fewer spores, and less of the fine grit that dulls finishes over time.",
        "This is what we mean by restoration rather than maintenance: returning a space to a baseline, not just resetting the visible layer.",
      ],
      "Filtration is the quiet variable. It decides whether you have moved the dust or removed it.",
    ),
  },
  {
    id: "p2",
    slug: "end-of-lease-guidelines-deposit",
    title: "End-of-Lease Guidelines: Securing Your Deposit.",
    excerpt:
      "A methodical checklist for the handover clean that inspectors actually reward — and the details that quietly cost tenants their bond.",
    author: "The Editorial Desk",
    publishedDate: "2026-07-09T09:00:00.000Z",
    imageUrl: U("photo-1484154218962-a197022b5858", 800),
    heroUrl: U("photo-1484154218962-a197022b5858"),
    alt: "Empty apartment ready for handover",
    content: lexical(
      [
        "The end-of-lease clean is graded against a standard most tenants never see. Inspectors work from a fixed checklist, and the points lost are rarely the obvious ones — it is the oven rails, the window tracks, and the skirting that decide a bond.",
        "Our handover protocol mirrors that checklist line for line, then adds the finishing detail a landlord photographs: streak-free glazing, dressed grout, and a genuinely neutral scent.",
        "Documented before-and-after imagery accompanies every handover, so there is a record if a deduction is ever disputed.",
      ],
      "Deposits are lost in the details a hurried clean skips — the tracks, the rails, the edges.",
    ),
  },
  {
    id: "p3",
    slug: "sustainable-spaces-eco-chemistry",
    title: "Sustainable Spaces: The Shift to Eco-Certified Chemistry.",
    excerpt:
      "Why we retired the harsh solvents — and how pH-neutral formulations protect both your finishes and the people who live with them.",
    author: "The Editorial Desk",
    publishedDate: "2026-06-28T09:00:00.000Z",
    imageUrl: U("photo-1466692476868-aef1dfb1e735", 800),
    heroUrl: U("photo-1466692476868-aef1dfb1e735"),
    alt: "Green plants beside a bright window",
    content: lexical(
      [
        "Aggressive solvents deliver a fast result and a slow cost. They etch stone, strip sealants, and leave a residue that attracts the next layer of grime faster than before.",
        "Eco-certified, pH-neutral chemistry works with a surface rather than against it. The clean takes marginally longer; the finish lasts materially longer, and the indoor air stays breathable throughout.",
        "For homes with children, pets, or sensitive occupants, that trade is not a preference — it is the whole point.",
      ],
      "A finish should outlast the clean that produced it. Harsh chemistry guarantees the opposite.",
    ),
  },
];
