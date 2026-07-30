import { revalidatePath } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

/**
 * The home page is statically rendered from the `home` global, so an edit in
 * the admin has to purge the route cache before it shows up publicly.
 * `context.disableRevalidate` lets seed/purge scripts opt out.
 */
export const revalidateHome: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath("/", "page");
    payload.logger.info("revalidated / after home global change");
  }

  return doc;
};

export default revalidateHome;
