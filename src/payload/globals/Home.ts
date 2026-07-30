import type { GlobalConfig } from "payload";

import { revalidateHome } from "./hooks/revalidateHome";
import {
  HOME_ADD_ONS,
  HOME_FAQS,
  HOME_FEATURES,
  HOME_SECTIONS,
  SITE_CONFIG,
} from "../../config/site";

/** Icons the "Why Choose Us" list can render (mapped in (frontend)/page.tsx). */
const ICON_OPTIONS = [
  { label: "Shield (standards)", value: "ShieldCheck" },
  { label: "Leaf (eco)", value: "Leaf" },
  { label: "People (teams)", value: "Users" },
  { label: "Clock (response time)", value: "Clock" },
  { label: "Sparkles (finish)", value: "Sparkles" },
];

const PATH_NOTE = "Site path such as /contact, or #book to scroll down this page.";

/**
 * Every word on the public home page. The frontend falls back to the copy
 * bundled in `src/config/site.ts` when a field is blank or the CMS is
 * unreachable, so a half-filled global can never blank out the page.
 */
export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  admin: {
    group: "Content",
    hideAPIURL: true,
    description:
      "The public home page, section by section. Anything left empty keeps the wording already built into the site.",
  },
  versions: { max: 20 },
  hooks: {
    afterChange: [revalidateHome],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          description:
            "The first screen: headline, intro, and the photo. The quote bar below it is the hero's only action, so there are no buttons to set here.",
          fields: [
            {
              name: "heroHeadline",
              type: "text",
              label: "Headline",
              defaultValue: SITE_CONFIG.tagline,
              admin: { description: "Kept short — it is set at display size." },
            },
            {
              name: "heroBody",
              type: "textarea",
              label: "Intro paragraph",
              defaultValue: SITE_CONFIG.description,
            },
            {
              type: "collapsible",
              label: "Hero photo",
              fields: [
                {
                  name: "heroImage",
                  type: "upload",
                  relationTo: "media",
                  label: "Photo",
                  admin: {
                    description:
                      "Portrait crop works best. Leave empty to keep the current stock photo.",
                  },
                },
                {
                  name: "heroImageAlt",
                  type: "text",
                  label: "Photo description (alt text)",
                  defaultValue: "Sunlit modern living room with clean minimal interior",
                  admin: {
                    description:
                      "Read aloud by screen readers. Describe what is in the photo, not the mood.",
                  },
                },
              ],
            },
          ],
        },

        {
          label: "Services",
          description:
            "The services grid. Service names, taglines, and photos come from the Services collection — here you choose which two are featured and edit everything around them.",
          fields: [
            {
              name: "servicesEyebrow",
              type: "text",
              label: "Small label",
              defaultValue: HOME_SECTIONS.services.eyebrow,
            },
            {
              name: "servicesHeadline",
              type: "text",
              label: "Headline",
              defaultValue: HOME_SECTIONS.services.headline,
            },
            {
              name: "featuredServices",
              type: "relationship",
              relationTo: "services",
              hasMany: true,
              maxRows: 2,
              label: "Featured services",
              admin: {
                description:
                  "The first one fills the large card, the second the small card beside it. Leave empty to use the first two services in the order set on the Services list.",
              },
            },
            {
              name: "servicesLeadCtaLabel",
              type: "text",
              label: "Button label on the large card",
              defaultValue: HOME_SECTIONS.services.leadCtaLabel,
              admin: { description: "Always links to the featured service's own page." },
            },
            {
              type: "collapsible",
              label: "Add-ons card",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "servicesAddOnsBadge",
                      type: "text",
                      label: "Small label",
                      defaultValue: HOME_SECTIONS.services.addOnsBadge,
                      admin: { width: "50%" },
                    },
                    {
                      name: "servicesAddOnsTitle",
                      type: "text",
                      label: "Card title",
                      defaultValue: HOME_SECTIONS.services.addOnsTitle,
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "addOns",
                  type: "array",
                  label: "Add-ons",
                  labels: { singular: "Add-on", plural: "Add-ons" },
                  maxRows: 6,
                  admin: {
                    description:
                      "Three fit the card without scrolling. These are public claims about time — keep them honest.",
                  },
                  defaultValue: HOME_ADD_ONS.map((a) => ({ ...a })),
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "label",
                          type: "text",
                          label: "Add-on",
                          required: true,
                          admin: { width: "65%" },
                        },
                        {
                          name: "meta",
                          type: "text",
                          label: "Extra time",
                          required: true,
                          admin: { width: "35%", description: 'e.g. "+45m".' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          label: "Why Choose Us",
          description: "The numbered list of standards.",
          fields: [
            {
              name: "featuresEyebrow",
              type: "text",
              label: "Small label",
              defaultValue: HOME_SECTIONS.features.eyebrow,
            },
            {
              type: "row",
              fields: [
                {
                  name: "featuresHeadline",
                  type: "text",
                  label: "Headline — plain part",
                  defaultValue: HOME_SECTIONS.features.headline,
                  admin: { width: "60%" },
                },
                {
                  name: "featuresHeadlineAccent",
                  type: "text",
                  label: "Headline — italic ending",
                  defaultValue: HOME_SECTIONS.features.headlineAccent,
                  admin: {
                    width: "40%",
                    description: "Rendered in italic serif after the plain part.",
                  },
                },
              ],
            },
            {
              name: "featuresBody",
              type: "textarea",
              label: "Intro paragraph",
              defaultValue: HOME_SECTIONS.features.body,
            },
            {
              name: "features",
              type: "array",
              label: "Standards",
              labels: { singular: "Standard", plural: "Standards" },
              maxRows: 6,
              admin: {
                description:
                  "Numbered automatically in the order listed here. Four fill the two-column layout evenly.",
              },
              defaultValue: HOME_FEATURES.map((f) => ({ ...f })),
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Title",
                      required: true,
                      admin: { width: "60%" },
                    },
                    {
                      name: "icon",
                      type: "select",
                      label: "Icon",
                      required: true,
                      defaultValue: "ShieldCheck",
                      options: ICON_OPTIONS,
                      admin: { width: "40%" },
                    },
                  ],
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Description",
                  required: true,
                },
              ],
            },
          ],
        },

        {
          label: "Questions",
          description: "The FAQ block. The first question is open when the page loads.",
          fields: [
            {
              name: "faqEyebrow",
              type: "text",
              label: "Small label",
              defaultValue: HOME_SECTIONS.faq.eyebrow,
            },
            {
              type: "row",
              fields: [
                {
                  name: "faqHeadline",
                  type: "text",
                  label: "Headline — plain part",
                  defaultValue: HOME_SECTIONS.faq.headline,
                  admin: { width: "60%" },
                },
                {
                  name: "faqHeadlineAccent",
                  type: "text",
                  label: "Headline — italic ending",
                  defaultValue: HOME_SECTIONS.faq.headlineAccent,
                  admin: { width: "40%" },
                },
              ],
            },
            {
              name: "faqBody",
              type: "textarea",
              label: "Paragraph under the headline",
              defaultValue: HOME_SECTIONS.faq.body,
            },
            {
              type: "row",
              fields: [
                {
                  name: "faqCtaLabel",
                  type: "text",
                  label: "Link label",
                  defaultValue: HOME_SECTIONS.faq.ctaLabel,
                  admin: { width: "50%" },
                },
                {
                  name: "faqCtaHref",
                  type: "text",
                  label: "Link target",
                  defaultValue: "/contact",
                  admin: { width: "50%", description: PATH_NOTE },
                },
              ],
            },
            {
              name: "faqs",
              type: "array",
              label: "Questions",
              labels: { singular: "Question", plural: "Questions" },
              defaultValue: HOME_FAQS.map((f) => ({ ...f })),
              fields: [
                { name: "question", type: "text", label: "Question", required: true },
                { name: "answer", type: "textarea", label: "Answer", required: true },
              ],
            },
          ],
        },

        {
          label: "Quote Form",
          description: "The heading above the quote request form at the bottom of the page.",
          fields: [
            {
              name: "quoteEyebrow",
              type: "text",
              label: "Small label",
              defaultValue: HOME_SECTIONS.quote.eyebrow,
            },
            {
              name: "quoteHeadline",
              type: "text",
              label: "Headline",
              defaultValue: HOME_SECTIONS.quote.headline,
              admin: {
                description:
                  "Used on the home page. Service pages replace it with “Request your <service> quote”.",
              },
            },
            {
              name: "quoteBody",
              type: "textarea",
              label: "Paragraph under the headline",
              defaultValue: HOME_SECTIONS.quote.body,
            },
          ],
        },
      ],
    },
  ],
};

export default Home;
