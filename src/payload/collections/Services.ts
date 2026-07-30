import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

/**
 * SERVICES — drives the editorial Service Detail / Authority page.
 * Fields are organised into admin tabs + groups so editors get a clear,
 * high-end editing surface (Hero, Editorial, Specs, FAQ).
 */
export const Services: CollectionConfig = {
  slug: "services",
  // Drag-to-reorder in the list view. That order drives the /services index and
  // is the fallback order for the home page bento when no featured services are
  // picked in the Home global. (Payload marks `orderable` experimental.)
  orderable: true,
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "slug", "updatedAt"],
    hideAPIURL: true,
  },
  access: { read: () => true },
  fields: [
    // ── Top-level identity ──
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField("title"),
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: {
        position: "sidebar",
        description: "Pick a category, or add a new one in the Categories collection.",
      },
    },
    {
      name: "durationLabel",
      type: "text",
      admin: { position: "sidebar", description: 'On-site estimate, e.g. "2 hrs".' },
    },

    // ── Tabbed content ──
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          description: "Above-the-fold authority layer and pull-quote.",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Hero",
              fields: [
                { name: "headline", type: "text", required: true },
                {
                  name: "subheadline",
                  type: "text",
                  admin: {
                    description:
                      'Secondary line, e.g. "A systematic approach to restoration."',
                  },
                },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  admin: { description: "Full-width architectural hero photo (upload)." },
                },
                {
                  name: "imageUrl",
                  type: "text",
                  admin: {
                    description:
                      "Fallback hero image URL, used when no upload is set (e.g. a CDN/Unsplash link).",
                  },
                },
              ],
            },
            {
              name: "tagline",
              type: "text",
              admin: { description: "Short line used as the editorial pull-quote." },
            },
            {
              name: "marketing",
              type: "textarea",
              admin: { description: "Long-form value copy for the Bespoke Difference block." },
            },
            {
              name: "editorialQuote",
              type: "group",
              label: "Editorial Quote",
              fields: [
                { name: "quote", type: "text", required: true },
                {
                  name: "citation",
                  type: "text",
                  admin: { description: 'Attribution, e.g. "Marguerite L. — Kensington".' },
                },
              ],
            },
          ],
        },
        {
          label: "SEO",
          description: "Search + social metadata. Falls back to tagline/title when blank.",
          fields: [
            {
              name: "metaTitle",
              type: "text",
              admin: { description: "Browser tab / search title. Defaults to the service title." },
            },
            {
              name: "metaDescription",
              type: "textarea",
              admin: {
                description: "Search + social description (~155 chars). Defaults to the tagline.",
              },
            },
          ],
        },
        {
          label: "Technical",
          fields: [
            {
              name: "technicalSpecs",
              type: "array",
              label: "Technical Specifications",
              labels: { singular: "Spec", plural: "Specs" },
              admin: {
                description: "Geist Mono spec rows, e.g. Filtration → HEPA.",
              },
              fields: [
                { name: "label", type: "text", required: true },
                { name: "value", type: "text", required: true },
              ],
            },
            {
              name: "inclusions",
              type: "array",
              label: "Inclusions (12-point matrix)",
              labels: { singular: "Inclusion", plural: "Inclusions" },
              minRows: 4,
              fields: [{ name: "item", type: "text", required: true }],
            },
            {
              name: "sidebarInclusions",
              type: "array",
              label: "Sidebar Inclusions (Quote card)",
              labels: { singular: "Feature", plural: "Features" },
              admin: {
                description: 'Short bullets for the quote sidebar, e.g. "Team of 2+".',
              },
              fields: [{ name: "feature", type: "text", required: true }],
            },
          ],
        },
        {
          label: "FAQ",
          fields: [
            {
              name: "faq",
              type: "array",
              label: "Frequently Asked Questions",
              labels: { singular: "Question", plural: "Questions" },
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Services;
