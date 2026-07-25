"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Check, ArrowUpRight } from "lucide-react";
import { getInclusions, type Service } from "@/lib/services";

type Props = {
  service: Service | null;
};

/**
 * Right column (60%) — Service Detail Pane.
 *   a) large image of the service
 *   b) "Inclusions" in monospaced technical type
 *   c) "Instant Summary" (Total, Est. time)
 * Technical-instrument styling: sharp corners, 1px borders, Geist Mono for data.
 */
export default function ServiceDetailPane({ service }: Props) {
  if (!service) {
    return (
      <div className="flex h-full min-h-[560px] items-center justify-center border border-dashed border-slate-200/60 bg-white p-8">
        <p className="max-w-xs text-center font-mono text-xs uppercase tracking-widest text-text/40">
          Select a service to load its specification
        </p>
      </div>
    );
  }

  const inclusions = getInclusions(service);

  return (
    <div className="flex h-full flex-col border border-slate-200/60 bg-white">
      {/* a) Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-slate-200/60">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
          <p className="editorial-label text-xs text-white/70">
            {service.category}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-white">
            {service.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-5">
        <p className="max-w-prose text-sm leading-snug text-text/70">
          {service.tagline}
        </p>

        {/* b) Inclusions — monospaced technical list */}
        <div>
          <div className="mb-2 flex items-center justify-between border-b border-slate-200/60 pb-1.5">
            <span className="font-mono text-[11px] uppercase tracking-widest text-text/50">
              Inclusions
            </span>
            <span className="font-mono text-[11px] tabular-nums text-text/40">
              {String(inclusions.length).padStart(2, "0")} items
            </span>
          </div>
          <ul className="grid max-h-40 gap-1.5 overflow-y-auto sm:grid-cols-2">
            {inclusions.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-2 font-mono text-xs leading-tight text-text/80"
              >
                <span className="text-text/30 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Check className="mt-px h-3 w-3 shrink-0 text-accent" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* c) Instant Summary — quotation logic (no fixed price) */}
        <div className="mt-auto border border-slate-200/60 bg-bg">
          <div className="flex items-center justify-between border-b border-slate-200/60 px-4 py-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-text/50">
              Instant Summary
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-text/50">
              <Clock className="h-3 w-3" strokeWidth={2} />
              {service.durationLabel}
            </span>
          </div>
          <div className="flex items-end justify-between gap-4 p-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-text/50">
                Estimate
              </p>
              <p className="text-sm font-medium leading-tight text-text">
                Provided after review
              </p>
            </div>
            <Link
              href={`/services/${service.slug}#quote`}
              className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-text px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-text/90"
            >
              Request Quote
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
