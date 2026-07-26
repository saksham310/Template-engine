import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { seedContent } from "@/payload/seed/content";

const ADMIN_EMAIL = "admin@editorial.test";
const ADMIN_PASSWORD = "changeme123";

export async function GET() {
  const payload = await getPayload({ config });

  let admin = "exists (unchanged)";
  const users = await payload.find({ collection: "users", limit: 1 });
  if (users.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "Admin" },
    });
    admin = `${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`;
  }

  const summary = await seedContent(payload);
  return NextResponse.json({ ok: true, admin, ...summary });
}
