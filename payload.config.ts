import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
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

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * S3 media storage. Enabled only when S3_BUCKET is set — otherwise media
 * falls back to local disk (dev). Uploads (originals + generated sizes) go to
 * the bucket under the `media/` prefix; the public URL is written to the DB
 * `url` field so the frontend loads straight from S3/CDN, bypassing Payload.
 */
const S3_BUCKET = process.env.S3_BUCKET ?? "";
const S3_REGION = process.env.S3_REGION ?? "us-east-1";
const S3_ENDPOINT = process.env.S3_ENDPOINT; // set for R2/MinIO/other S3-compatible
const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL; // CDN or bucket base, no trailing slash
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
      // Serve straight from S3/CDN (skip Payload's proxy route) and persist
      // the absolute URL to the database.
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
  collections: [Users, Media, Categories, Services, Gallery, Posts, Leads],
  globals: [Home],
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
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./payload.db",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    push: process.env.NODE_ENV !== "production",
    migrationDir: path.resolve(dirname, "src/migrations"),
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
});
