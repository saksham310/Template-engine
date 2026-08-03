import { revalidatePath } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

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
