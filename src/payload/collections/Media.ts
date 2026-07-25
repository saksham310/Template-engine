import type { CollectionConfig } from "payload";

/** Uploads — the target of the Service hero `image` relationship/upload. */
export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: { read: () => true },
  upload: {
    // Served from /media by default; add sizes for the editorial hero + cards.
    imageSizes: [
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Accessibility description (required)." },
    },
  ],
};

export default Media;
