import type { Field, FieldHook } from "payload";

const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, data }) => {
    if (typeof value === "string" && value.length > 0) return format(value);
    const source = data?.[fallback];
    return typeof source === "string" ? format(source) : value;
  };

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
