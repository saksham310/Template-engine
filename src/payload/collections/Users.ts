import type { CollectionConfig } from "payload";

/** Admin users — auth-enabled, powers the Payload admin login. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", group: "System" },
  fields: [{ name: "name", type: "text" }],
};

export default Users;
