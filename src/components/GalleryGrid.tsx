"use client";

import { useMemo, useState } from "react";
import type { GalleryItem } from "@/payload/integration/getGallery";

export default function GalleryGrid({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("All");
  const filters = ["All", ...categories];

  const visible = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [items, active],
  );

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-px border border-line bg-surface-sunken sm:inline-flex">
        {filters.map((f) => {
          const on = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={on}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                on ? "bg-text text-white" : "bg-surface text-text/60 hover:text-text"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {visible.map((item) => (
          <figure
            key={item.id}
            className="group mb-4 break-inside-avoid overflow-hidden border border-line bg-surface"
          >
            <div className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="flex items-baseline justify-between gap-3 border-t border-line px-4 py-3">
              <span className="text-sm font-semibold tracking-tight text-text">
                {item.title}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text/40">
                {item.category}
              </span>
            </figcaption>
            {item.description && (
              <p className="px-4 pb-3 text-xs leading-snug text-text/50">
                {item.description}
              </p>
            )}
          </figure>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-16 font-mono text-sm text-text/40">No images in this category yet.</p>
      )}
    </>
  );
}
