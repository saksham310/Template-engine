import type { GlobalConfig } from "payload";

import { revalidateSite } from "./hooks/revalidateSite";
import { HERO_BAR, SITE_CONFIG } from "../../config/site";

const SOCIAL_NOTE =
  "Full profile URL, including https://. Leave empty to hide the link everywhere it appears.";

/**
 * The contact details and quote-form options shared by every page. A blank
 * field falls back to the value bundled in `src/config/site.ts`, so a
 * half-filled global never blanks out the footer — the exception is social
 * links, which are simply hidden when cleared.
 */
export const Site: GlobalConfig = {
  slug: "site",
  label: "Site Settings",
  admin: {
    group: "Settings",
    hideAPIURL: true,
    description:
      "How customers reach you, and the options they pick from when requesting a quote.",
  },
  versions: { max: 20 },
  hooks: {
    afterChange: [revalidateSite],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact",
          description:
            "Shown in the site footer, on the contact page, and in every 'call us' button.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "email",
                  type: "email",
                  label: "Email",
                  defaultValue: SITE_CONFIG.email,
                  admin: { width: "50%" },
                },
                {
                  name: "phone",
                  type: "text",
                  label: "Phone",
                  defaultValue: SITE_CONFIG.phone,
                  admin: {
                    width: "50%",
                    description:
                      "Written the way you want it read. The dialling link strips the formatting automatically.",
                  },
                },
              ],
            },
            {
              name: "address",
              type: "textarea",
              label: "Address",
              defaultValue: SITE_CONFIG.address,
              admin: { description: "Shown in the footer. One line is plenty." },
            },
            {
              type: "collapsible",
              label: "Social profiles",
              admin: {
                description: "Each one is listed in the footer and on the contact page.",
              },
              fields: [
                {
                  name: "instagram",
                  type: "text",
                  label: "Instagram",
                  defaultValue: SITE_CONFIG.socials.instagram,
                  admin: { description: SOCIAL_NOTE },
                },
                {
                  name: "facebook",
                  type: "text",
                  label: "Facebook",
                  defaultValue: SITE_CONFIG.socials.facebook,
                  admin: { description: SOCIAL_NOTE },
                },
                {
                  name: "linkedin",
                  type: "text",
                  label: "LinkedIn",
                  defaultValue: SITE_CONFIG.socials.linkedin,
                  admin: { description: SOCIAL_NOTE },
                },
              ],
            },
          ],
        },
        {
          label: "Quote form",
          description:
            "The choices a visitor picks from. These fill the property dropdown in the hero bar and in every quote form.",
          fields: [
            {
              name: "propertyTypes",
              type: "array",
              label: "Property types",
              labels: { singular: "Property type", plural: "Property types" },
              defaultValue: HERO_BAR.propertyTypes.map((label) => ({ label })),
              admin: {
                description:
                  "Drag to reorder. Emptying the list restores the built-in set rather than leaving the dropdown blank.",
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: "Label",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Site;
