import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

export const Services: CollectionConfig = {
  slug: "services",

  orderable: true,
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "slug", "updatedAt"],
    hideAPIURL: true,
  },
  access: { read: () => true },
  fields: [

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
          ],
        },
        {
          label: "Pricing",
          description:
            "The published rate, shown on the home page pricing section. Leave the price empty to keep this service out of it.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "price",
                  type: "text",
                  label: "Price",
                  admin: {
                    width: "50%",
                    description:
                      'Written exactly as it should appear, e.g. "$120" or "From $45". Empty = not shown in pricing.',
                  },
                },
                {
                  name: "priceUnit",
                  type: "text",
                  label: "Unit",
                  defaultValue: "per visit",
                  admin: {
                    width: "50%",
                    description: 'What the price buys, e.g. "per visit", "per hour", "per m²".',
                  },
                },
              ],
            },
            {
              name: "priceNotes",
              type: "array",
              label: "What's included",
              labels: { singular: "Line", plural: "Lines" },
              maxRows: 6,
              admin: {
                description:
                  "Ticked list on the pricing card. These are pricing promises — only list what the rate actually covers.",
              },
              fields: [{ name: "note", type: "text", required: true }],
            },
            {
              name: "pricePopular",
              type: "checkbox",
              label: "Highlight this one",
              defaultValue: false,
              admin: {
                description:
                  "Lifts the card and marks it. Only the first ticked service is highlighted.",
              },
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
