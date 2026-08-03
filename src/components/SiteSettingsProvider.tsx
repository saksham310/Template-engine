"use client";

import { createContext, useContext } from "react";
import { SITE_SETTINGS_FALLBACK, type SiteSettings } from "@/config/site-settings";

const SiteSettingsContext = createContext<SiteSettings>(SITE_SETTINGS_FALLBACK);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
