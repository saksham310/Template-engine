import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content", hideAPIURL: true },
  access: { read: () => true },
  upload: {

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
