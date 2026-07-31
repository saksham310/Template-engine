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
      type: "row",
      fields: [
        {
          name: "beforeImage",
          type: "upload",
          relationTo: "media",
          label: "Before",
          admin: {
            width: "50%",
            description: "Optional. Leave empty to show the after photo on its own.",
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "After",
          required: true,
          admin: {
            width: "50%",
            description: "The finished result. Card + hero sizes are generated automatically.",
          },
        },
      ],
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
