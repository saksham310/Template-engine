import { getPayload } from "payload";
import config from "@payload-config";

import { seedContent } from "./content";

const payload = await getPayload({ config });
const summary = await seedContent(payload);

payload.logger.info(
  `seeded — categories: ${summary.categories}, services: ${summary.services}, gallery: ${summary.gallery}, posts: ${summary.posts}`,
);

process.exit(0);
