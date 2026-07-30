"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export type QuoteState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action — saves a new Lead into the `leads` collection, then triggers a
 * console.log stub in place of a transactional email.
 *
 * Wire to the form with useActionState:
 *   const [state, action] = useActionState(requestQuote, { status: "idle" });
 *   <form action={action}> … <input name="name" /> … </form>
 *
 * `serviceRequested` accepts the Service document id (from a hidden input) so the
 * lead links straight to the service in the admin.
 */
export async function requestQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const serviceSlug = String(formData.get("serviceSlug") ?? "").trim();
  const serviceTitle = String(formData.get("serviceTitle") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const propertyType = String(formData.get("propertyType") ?? "").trim();
  const source = String(formData.get("source") ?? "").trim() || "unknown";
  const sourcePath = String(formData.get("sourcePath") ?? "").trim();

  if (!name || !email) {
    return { status: "error", message: "Name and email are required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const payload = await getPayload({ config });

    // Resolve the service slug to a document id for the relationship (if seeded).
    let serviceRequested: number | undefined;
    if (serviceSlug && serviceSlug !== "general") {
      const { docs } = await payload.find({
        collection: "services",
        where: { slug: { equals: serviceSlug } },
        limit: 1,
        depth: 0,
      });
      serviceRequested = docs[0] ? Number(docs[0].id) : undefined;
    }

    const unresolved = !serviceRequested && serviceTitle && serviceSlug !== "general";

    const lead = await payload.create({
      collection: "leads",
      data: {
        name,
        email,
        phone: phone || undefined,
        message:
          [message, unresolved ? `(Service requested: ${serviceTitle})` : ""]
            .filter(Boolean)
            .join("\n\n") || undefined,
        serviceRequested,
        propertyType: propertyType || undefined,
        location: location || undefined,
        status: "New",
        source,
        sourcePath: sourcePath || undefined,
      },
    });

    // TODO: replace with a real transactional send (Resend / Postmark / SES).
    console.log(
      `[lead] #${lead.id} · ${name} <${email}> · service=${serviceRequested || "n/a"} · from=${source}`,
    );

    return {
      status: "success",
      message: "Request received. We'll be in touch within 60 minutes.",
    };
  } catch (err) {
    console.error("[requestQuote] failed:", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
