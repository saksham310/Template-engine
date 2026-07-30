import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/**
 * Uploaded media is served straight from S3/CDN when S3_BUCKET is set (see
 * payload.config.ts), so next/image has to be told about that host too —
 * otherwise CMS-uploaded hero images 400 in production.
 */
function mediaHost(): string | null {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) return null;

  const base =
    process.env.S3_PUBLIC_URL ??
    `https://${bucket}.s3.${process.env.S3_REGION ?? "us-east-1"}.amazonaws.com`;

  try {
    return new URL(base).hostname;
  } catch {
    return null;
  }
}

const host = mediaHost();

const nextConfig: NextConfig = {
  images: {
    // Swap for your own asset host / CDN in production.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      ...(host ? [{ protocol: "https" as const, hostname: host }] : []),
    ],
  },
};

export default withPayload(nextConfig);
