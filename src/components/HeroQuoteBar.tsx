"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HERO_BAR } from "@/config/site";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import type { ServiceListItem } from "@/payload/integration/getServiceView";

type Props = { services: ServiceListItem[] };

const FIELD =
  "w-full bg-transparent text-sm text-text placeholder:text-text/40 focus:outline-none";

/**
 * Solid glyphs, drawn here rather than pulled from lucide — that set is
 * outline-only, and filling its paths produces blobs.
 */
const ICON = "h-5 w-5 shrink-0 text-accent/70";

function PinSolid() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function HomeSolid() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.3 2.6a1 1 0 0 1 1.4 0l8 7.2a1 1 0 0 1-.7 1.7H19v8.5a1 1 0 0 1-1 1h-3.5v-5.5h-5V21H6a1 1 0 0 1-1-1v-8.5H4a1 1 0 0 1-.7-1.7l8-7.2Z" />
    </svg>
  );
}

function DropSolid() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.6 4.2 6.5 7.9 6.5 11.2a6.5 6.5 0 0 1-13 0c0-3.3 2.9-7 6.5-11.2Z" />
    </svg>
  );
}

/**
 * The bar overlapping the hero panel. It does not collect leads itself — it
 * hands what the visitor picked to the real quote form at #book: the service as
 * a selection, location and property type as a seeded message.
 */
export default function HeroQuoteBar({ services }: Props) {
  const router = useRouter();
  const { propertyTypes } = useSiteSettings();
  const [location, setLocation] = useState("");
  const [property, setProperty] = useState("");
  const [service, setService] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (service) params.set("service", service);
    if (location.trim()) params.set("location", location.trim());
    if (property) params.set("property", property);
    const query = params.toString();
    router.push(query ? `/?${query}#book` : "/#book");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 mx-auto -mt-12 w-full max-w-5xl px-4 sm:-mt-14 sm:px-5"
    >
      <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line sm:flex-row sm:items-stretch">
        <label className="flex flex-1 items-center gap-3 bg-surface py-3.5 pl-7 pr-5">
          <PinSolid />
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-text/45">
              {HERO_BAR.locationLabel}
            </span>
            <input
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={HERO_BAR.locationPlaceholder}
              className={FIELD}
            />
          </span>
        </label>

        <label className="flex flex-1 items-center gap-3 bg-surface px-5 py-3.5">
          <HomeSolid />
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-text/45">
              {HERO_BAR.propertyLabel}
            </span>
            <select
              name="property"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className={`${FIELD} ${property ? "" : "text-text/40"}`}
            >
              <option value="">{HERO_BAR.propertyPlaceholder}</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="flex flex-1 items-center gap-3 bg-surface px-5 py-3.5">
          <DropSolid />
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-text/45">
              {HERO_BAR.serviceLabel}
            </span>
            <select
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={`${FIELD} ${service ? "" : "text-text/40"}`}
            >
              <option value="">{HERO_BAR.servicePlaceholder}</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </span>
        </label>

        {/* The label lives on the button, so the bar is one object rather than a
            card wearing a tab. */}
        <div className="flex items-center bg-surface p-2">
          <button
            type="submit"
            className="w-full  bg-text px-8 py-4 text-sm font-semibold text-bg transition-colors duration-200 ease-out hover:bg-accent sm:h-full sm:rounded-2xl sm:py-0"
          >
            {HERO_BAR.submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
