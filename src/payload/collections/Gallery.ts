import type { CollectionConfig } from "payload";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "updatedAt"],
    hideAPIURL: true,
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "Portfolio photo. Card + hero sizes are generated automatically." },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "Residential",
      options: [
        { label: "Residential", value: "Residential" },
        { label: "Commercial", value: "Commercial" },
        { label: "Specialized", value: "Specialized" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "description",
      type: "text",
      admin: { description: "Optional caption shown on hover / under the frame." },
    },
  ],
};

export default Gallery;
