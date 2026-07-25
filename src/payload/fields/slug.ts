import type { Field, FieldHook } from "payload";

/** Slugify: "Full Residence Detail" → "full-residence-detail". */
const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

/** Auto-fill the slug from `title` when empty; keep it if the editor sets one. */
const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, data }) => {
    if (typeof value === "string" && value.length > 0) return format(value);
    const source = data?.[fallback];
    return typeof source === "string" ? format(source) : value;
  };

/**
 * Reusable slug field. Auto-generates from `title`, editable in the sidebar.
 * Usage:  ...slugField()  inside a collection's `fields` array.
 */
export const slugField = (fieldToUse = "title"): Field => ({
  name: "slug",
  type: "text",
  index: true,
  unique: true,
  admin: {
    position: "sidebar",
    description: "Auto-generated from title. Edit only if you need a custom URL.",
  },
  hooks: {
    beforeValidate: [formatSlug(fieldToUse)],
  },
});

export default slugField;
