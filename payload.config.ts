import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { Users } from "./src/payload/collections/Users";
import { Media } from "./src/payload/collections/Media";
import { Categories } from "./src/payload/collections/Categories";
import { Services } from "./src/payload/collections/Services";
import { Gallery } from "./src/payload/collections/Gallery";

import { Posts } from "./src/payload/collections/Posts";
import { Leads } from "./src/payload/collections/Leads";
import { Home } from "./src/payload/globals/Home";
import { Site } from "./src/payload/globals/Site";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const S3_BUCKET = process.env.S3_BUCKET ?? "";
const S3_REGION = process.env.S3_REGION ?? "us-east-1";
const S3_ENDPOINT = process.env.S3_ENDPOINT;
const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL;
const S3_MEDIA_PREFIX = "media";

const s3PublicBase = (
  S3_PUBLIC_URL ?? `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`
).replace(/\/$/, "");

const s3Plugin = s3Storage({
  enabled: Boolean(S3_BUCKET),
  acl: "public-read",
  collections: {
    media: {
      prefix: S3_MEDIA_PREFIX,

      disablePayloadAccessControl: true,
      generateFileURL: ({ filename, prefix }) => {
        const key = [prefix, filename].filter(Boolean).join("/");
        return `${s3PublicBase}/${key}`;
      },
    },
  },
  bucket: S3_BUCKET,
  config: {
    region: S3_REGION,
    ...(S3_ENDPOINT ? { endpoint: S3_ENDPOINT, forcePathStyle: true } : {}),
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
    },
  },
});

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    theme: "light",
    meta: {
      titleSuffix: " · Pristine Console",
    },
    components: {

      graphics: {
        Logo: "/src/payload/admin/Logo#Logo",
        Icon: "/src/payload/admin/Icon#Icon",
      },

      views: {
        dashboard: {
          Component: "/src/payload/admin/Dashboard#Dashboard",
        },
      },
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Categories, Services, Gallery, Posts, Leads],
  globals: [Home, Site],
  endpoints: [
    {
      path: "/seed-samples",
      method: "post",
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: "Unauthorized" }, { status: 403 });
        }
        const { seedContent } = await import("./src/payload/seed/content");
        const summary = await seedContent(req.payload);
        return Response.json({ ok: true, ...summary });
      },
    },
    {
      path: "/purge",
      method: "post",
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: "Unauthorized" }, { status: 403 });
        }
        const { purgeContent } = await import("./src/payload/seed/content");
        const summary = await purgeContent(req.payload);
        return Response.json({ ok: true, ...summary });
      },
    },
  ],
  plugins: [s3Plugin],
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-in-production",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: process.env.NODE_ENV !== "production",
    migrationDir: path.resolve(dirname, "src/migrations"),
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
});
