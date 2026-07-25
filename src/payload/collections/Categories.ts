import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

/**
 * CATEGORIES — editor-managed service groupings (Residential, Commercial, …).
 * Replaces the old hard-coded select on Services so admins can add their own.
 * `order` drives the sort in the site nav mega-menu and the /services index.
 */
export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "order", "slug", "updatedAt"],
    hideAPIURL: true,
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    {
      name: "order",
      type: "number",
      defaultValue: 99,
      admin: {
        position: "sidebar",
        description: "Sort weight — lower shows first in nav and the catalog.",
      },
    },
    {
      name: "blurb",
      type: "textarea",
      admin: { description: "Short line shown under this category in the site mega-menu." },
    },
  ],
};

export default Categories;
