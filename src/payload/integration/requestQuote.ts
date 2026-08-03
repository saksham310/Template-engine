"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export type QuoteState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
