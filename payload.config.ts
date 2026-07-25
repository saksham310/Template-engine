import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./src/payload/collections/Users";
import { Media } from "./src/payload/collections/Media";
import { Categories } from "./src/payload/collections/Categories";
import { Services } from "./src/payload/collections/Services";
import { Leads } from "./src/payload/collections/Leads";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    theme: "light",
    meta: {
      titleSuffix: " · Pristine Console",
    },
    components: {
      // Brand wordmark (login + nav header) and compact mark.
      graphics: {
        Logo: "/src/payload/admin/Logo#Logo",
        Icon: "/src/payload/admin/Icon#Icon",
      },
      // Replace the default collection-list dashboard with the Pristine Console.
      views: {
        dashboard: {
          Component: "/src/payload/admin/Dashboard#Dashboard",
        },
      },
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Categories, Services, Leads],
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-in-production",
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./payload.db" },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
});
