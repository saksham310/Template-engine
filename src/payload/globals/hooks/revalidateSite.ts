import { revalidatePath } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

/**
 * Contact details live in the root layout's footer, so every statically
 * rendered route embeds them. Purging the layout invalidates all of them at
 * once. `context.disableRevalidate` lets seed/purge scripts opt out.
 */
export const revalidateSite: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath("/", "layout");
    payload.logger.info("revalidated all routes after site global change");
  }

  return doc;
};

export default revalidateSite;
