import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    group: "Sales",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "serviceRequested", "status", "createdAt"],
    hideAPIURL: true,
  },
  access: {
    create: () => true,
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
      type: "row",
      fields: [
        {
          name: "propertyType",
          type: "text",
          label: "Property type",
          admin: {
            width: "50%",
            description: "Carried over from wherever the visitor started.",
          },
        },
        {
          name: "location",
          type: "text",
          label: "Location",
          admin: { width: "50%" },
        },
      ],
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
      label: "Submitted from",
      defaultValue: "service-detail",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Which form the request came through.",
      },
    },
    {
      name: "sourcePath",
      type: "text",
      label: "Page",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "The exact page the visitor submitted from.",
      },
    },
  ],
};

export default Leads;
