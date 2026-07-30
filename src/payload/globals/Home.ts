import type { GlobalConfig } from "payload";

import { revalidateHome } from "./hooks/revalidateHome";
import { HOME_FAQS, HOME_FEATURES, HOME_SECTIONS, SITE_CONFIG } from "../../config/site";

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
          description: "The first screen: headline, intro, buttons, and the photo beside them.",
          fields: [
            {
              name: "heroEyebrow",
              type: "text",
              label: "Small label above the headline",
              defaultValue: "Est. 2026 — Bespoke Care",
            },
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
              type: "row",
              fields: [
                {
                  name: "heroPrimaryLabel",
                  type: "text",
                  label: "Primary button label",
                  defaultValue: "Request a Quote →",
                  admin: { width: "50%" },
                },
                {
                  name: "heroPrimaryHref",
                  type: "text",
                  label: "Primary button link",
                  defaultValue: "#book",
                  admin: { width: "50%", description: PATH_NOTE },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "heroSecondaryLabel",
                  type: "text",
                  label: "Secondary link label",
                  defaultValue: "View recent work",
                  admin: { width: "50%" },
                },
                {
                  name: "heroSecondaryHref",
                  type: "text",
                  label: "Secondary link",
                  defaultValue: "/gallery",
                  admin: { width: "50%", description: PATH_NOTE },
                },
              ],
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
            {
              type: "collapsible",
              label: "Live status card (overlaps the photo)",
              fields: [
                {
                  name: "heroStatusText",
                  type: "text",
                  label: "Status line",
                  defaultValue: "Live Status: Professionals active nearby",
                  admin: { description: "Sits next to a pulsing green dot." },
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "heroStatusMetricLabel",
                      type: "text",
                      label: "Metric label",
                      defaultValue: "Avg. response",
                      admin: { width: "50%" },
                    },
                    {
                      name: "heroStatusMetricValue",
                      type: "text",
                      label: "Metric value",
                      defaultValue: "~12 min",
                      admin: {
                        width: "50%",
                        description: "A public promise — only claim what you can meet.",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          label: "Services",
          description: "The heading above the services grid. The cards themselves come from Services.",
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
