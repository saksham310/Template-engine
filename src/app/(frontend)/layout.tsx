import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { siteFontVariables } from "@/app/fonts";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { getSiteSettings } from "@/payload/integration/getSiteSettings";
import { SITE_CONFIG } from "@/config/site";
import { getServiceNav } from "@/payload/integration/getServiceView";

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: "A premium cleaning service platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [nav, site] = await Promise.all([getServiceNav(), getSiteSettings()]);
  return (
    <html
      lang="en"
      className={`${siteFontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-bg text-text">
        <MotionConfig reducedMotion="user">
          <SiteSettingsProvider value={site}>
            <SiteHeader nav={nav} />
            <main className="w-full max-w-full flex-1">{children}</main>
            <SiteFooter />
          </SiteSettingsProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
