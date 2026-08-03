import { getPayload } from "payload";
import config from "@payload-config";

import { seedContent } from "./content";

/**
 * One-shot seeder for a fresh database: `npx payload run src/payload/seed/run.ts`.
 * Safe to re-run — every collection is skipped when a matching document exists.
 */
const payload = await getPayload({ config });
const summary = await seedContent(payload);

payload.logger.info(
  `seeded — categories: ${summary.categories}, services: ${summary.services}, gallery: ${summary.gallery}, posts: ${summary.posts}`,
);

process.exit(0);
