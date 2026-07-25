import type { CollectionConfig } from "payload";

/**
 * LEADS — quotation requests captured from the "Request Quote" form.
 * Public create (from the form); read/update restricted to authenticated admins.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    group: "Sales",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "serviceRequested", "status", "createdAt"],
    hideAPIURL: true,
  },
  access: {
    create: () => true, // public form submits
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    {
      name: "serviceRequested",
      type: "relationship",
      relationTo: "services",
      admin: { description: "The service this quote request is tied to." },
    },
    {
      name: "message",
      type: "textarea",
      label: "Message / Details",
      admin: { description: "What the customer told us about the space." },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "New",
      admin: { position: "sidebar" },
      options: [
        { label: "New", value: "New" },
        { label: "Contacted", value: "Contacted" },
        { label: "Quoted", value: "Quoted" },
        { label: "Converted", value: "Converted" },
      ],
    },
    {
      name: "source",
      type: "text",
      defaultValue: "service-detail",
      admin: { position: "sidebar", readOnly: true },
    },
  ],
};

export default Leads;
