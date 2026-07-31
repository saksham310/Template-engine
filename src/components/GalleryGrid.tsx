"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MotionStagger, fadeUpPlain } from "./MotionWrapper";
import type { GalleryItem, GalleryPhoto } from "@/payload/integration/getGallery";

const REVEAL = { willChange: "transform, opacity" } as const;

const CHIP =
  "absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest";

function Frame({
  photo,
  label,
  tone,
  sizes,
}: {
  photo: GalleryPhoto;
  label?: string;
  tone?: string;
  sizes: string;
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-sunken">
      <Image src={photo.url} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      {label && <span className={`${CHIP} ${tone}`}>{label}</span>}
    </div>
  );
}

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
      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={on}
              className={`rounded-full px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 ease-out ${
                on
                  ? "bg-text text-bg"
                  : "border border-line-strong text-text/60 hover:bg-text hover:text-bg"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <MotionStagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => {
          const paired = item.before !== null;

          return (
            <motion.figure
              key={item.id}
              variants={fadeUpPlain}
              style={REVEAL}
              className={`overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-300 ease-out hover:border-line-strong ${
                paired ? "sm:col-span-2" : ""
              }`}
            >
              {item.before ? (
                <div className="grid grid-cols-2 gap-px bg-line">
                  <Frame
                    photo={item.before}
                    label="Before"
                    tone="bg-bg/85 text-text/60"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 30vw"
                  />
                  <Frame
                    photo={item.after}
                    label="After"
                    tone="bg-text text-bg"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 30vw"
                  />
                </div>
              ) : (
                <Frame
                  photo={item.after}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                />
              )}

              <figcaption className="border-t border-line px-5 py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-base font-semibold tracking-tight text-text">
                    {item.title}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-text/40">
                    {item.category}
                  </span>
                </div>
                {item.description && (
                  <p className="mt-1.5 max-w-prose text-[15px] leading-snug text-text/55">
                    {item.description}
                  </p>
                )}
              </figcaption>
            </motion.figure>
          );
        })}
      </MotionStagger>

      {visible.length === 0 && (
        <p className="mt-16 font-mono text-sm text-text/40">
          No images in this category yet.
        </p>
      )}
    </>
  );
}
