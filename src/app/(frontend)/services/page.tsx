import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  getServiceList,
  getServiceCategories,
} from "@/payload/integration/getServiceView";

export const metadata: Metadata = {
  title: "All Services — Éditorial",
  description: "The full catalog of residential, commercial, and specialized services.",
};

export default async function ServicesIndex() {
  const [services, cats] = await Promise.all([
    getServiceList(),
    getServiceCategories(),
  ]);
  // Ordered category titles that actually have services, plus any orphans.
  const ordered = cats.map((c) => c.title);
  const extras = services
    .map((s) => s.category)
    .filter((c) => c && !ordered.includes(c));
  const categories = [...ordered, ...Array.from(new Set(extras))].filter((c) =>
    services.some((s) => s.category === c),
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-28">
      <header className="max-w-2xl">
        <p className="editorial-label text-xs tracking-widest text-text/50">The Catalog</p>
        <h1 className="mt-2 text-6xl font-bold leading-[0.9] tracking-tighter">All Services</h1>
        <p className="mt-5 max-w-md text-lg text-text/60">
          Every service is quoted individually after review — no fixed rates.
        </p>
      </header>

      <div className="mt-16 space-y-16">
        {categories.map((category) => {
          const items = services.filter((s) => s.category === category);
          return (
            <section key={category}>
              <div className="mb-5 flex items-baseline justify-between border-b border-slate-200/60 pb-2">
                <h2 className="editorial-label text-2xl text-text">{category}</h2>
                <span className="font-mono text-[11px] tabular-nums text-text/40">
                  {String(items.length).padStart(2, "0")} services
                </span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((svc, i) => (
                  <li key={svc.slug}>
                    <Link
                      href={`/services/${svc.slug}`}
                      className="group flex h-full flex-col border border-slate-200/60 bg-white p-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-slate-400/70"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[11px] tabular-nums text-text/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 text-text/30 transition-colors group-hover:text-accent"
                          strokeWidth={2}
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-bold tracking-tight text-text">
                        {svc.title}
                      </h3>
                      <p className="mt-1 flex-1 text-sm leading-snug text-text/60">
                        {svc.tagline}
                      </p>
                      <span className="mt-4 font-mono text-[11px] uppercase tracking-widest text-text/40">
                        {svc.durationLabel} · Quote on review
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
