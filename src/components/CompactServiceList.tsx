"use client";

import {
  CATEGORIES,
  SERVICES,
  servicesByCategory,
  type Service,
} from "@/lib/services";

const T = "transition-all duration-200 ease-out";
const SERVICE_COUNT = SERVICES.length;

type Props = {
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

/**
 * Left column (40%) — compact, scrollable technical list.
 * Grouped by category so 10+ items stay navigable. Each tile: icon + title + price.
 * No bubbly cards: flat rows, 1px dividers, blue rail on the active row.
 */
export default function CompactServiceList({ selectedSlug, onSelect }: Props) {
  return (
    <div className="flex h-full flex-col border border-slate-200/60 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200/60 px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-text/50">
          Catalog
        </span>
        <span className="font-mono text-[11px] tabular-nums text-text/40">
          {SERVICE_COUNT} services
        </span>
      </div>

      {/* Scroll region — handles arbitrary length */}
      <div className="max-h-[560px] flex-1 overflow-y-auto">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <div className="sticky top-0 z-10 border-b border-slate-200/60 bg-bg px-4 py-1.5">
              <span className="editorial-label text-[11px] tracking-widest text-text/60">
                {category}
              </span>
            </div>
            <ul>
              {servicesByCategory(category).map((svc: Service) => {
                const selected = selectedSlug === svc.slug;
                const Icon = svc.icon;
                return (
                  <li key={svc.slug}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onSelect(svc.slug)}
                      className={`flex w-full items-center gap-3 border-b border-slate-200/60 px-4 py-3 text-left ${T} ${
                        selected
                          ? "bg-accent/5"
                          : "bg-white hover:bg-bg"
                      }`}
                    >
                      {/* Blue selection rail */}
                      <span
                        aria-hidden="true"
                        className={`h-8 w-0.5 shrink-0 ${T} ${
                          selected ? "bg-accent" : "bg-transparent"
                        }`}
                      />
                      <Icon
                        className={`h-4 w-4 shrink-0 ${T} ${
                          selected ? "text-accent" : "text-text/60"
                        }`}
                        strokeWidth={1.75}
                      />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-text">
                        {svc.title}
                      </span>
                      <span
                        className={`shrink-0 font-mono text-[11px] uppercase tracking-widest ${
                          selected ? "text-accent" : "text-text/40"
                        }`}
                      >
                        {svc.durationLabel}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
