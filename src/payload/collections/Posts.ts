import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedDate", "updatedAt"],
    hideAPIURL: true,
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      admin: { description: "Hero image for the article and its listing card." },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: { description: "Short editorial standfirst shown on cards and the listing." },
    },
    {
      name: "content",
      type: "richText",
      admin: { description: "The main editorial body." },
    },
    {
      name: "publishedDate",
      type: "date",
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
        description: "Display date on the article and listing.",
      },
    },
    {
      name: "author",
      type: "text",
      admin: { position: "sidebar", description: "Byline, e.g. \"The Editorial Desk\"." },
    },
  ],
};

export default Posts;
