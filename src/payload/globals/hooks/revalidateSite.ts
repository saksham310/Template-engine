import { revalidatePath } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

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
