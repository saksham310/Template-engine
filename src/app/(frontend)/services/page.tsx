import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Grain } from "@/components/patterns";
import {
  getServiceList,
  getServiceCategories,
} from "@/payload/integration/getServiceView";
import { SITE_CONFIG } from "@/config/site";
import { TRUST } from "@/lib/services";
import { MotionWrapper, MotionStagger, MotionItem } from "@/components/MotionWrapper";

export const metadata: Metadata = {
  title: "All Services — Éditorial",
  description: "The full catalog of residential, commercial, and specialized services.",
};

export default async function ServicesIndex() {
  const [services, cats] = await Promise.all([
    getServiceList(),
    getServiceCategories(),
  ]);

  const ordered = cats.map((c) => c.title);
  const extras = services
    .map((s) => s.category)
    .filter((c) => c && !ordered.includes(c));
  const categories = [...ordered, ...Array.from(new Set(extras))].filter((c) =>
    services.some((s) => s.category === c),
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
      <header className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <MotionWrapper>
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
            The catalog
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-6xl">
            Every service we{" "}
            <span className="font-editorial font-normal italic text-text/60">offer.</span>
          </h1>
        </MotionWrapper>

        <MotionWrapper delay={0.1} className="lg:pb-3">
          <p className="max-w-sm font-serif text-[17px] leading-relaxed text-text/60">
            {services.length} services, quoted by a person who has read your
            message — usually within {TRUST.responseTime}.
          </p>
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 font-mono text-xs font-bold tabular-nums text-text transition-colors duration-200 ease-out hover:bg-text hover:text-bg"
          >
            {SITE_CONFIG.phone}
          </a>
        </MotionWrapper>
      </header>

      <div className="mt-16 space-y-14 sm:mt-20">
        {categories.map((category) => {
          const items = services.filter((s) => s.category === category);

          return (
            <section key={category}>
              <MotionWrapper className="flex items-baseline gap-3 border-b border-line pb-3">
                <h2 className="text-2xl tracking-tight text-text sm:text-3xl">
                  {category}
                </h2>
                <span className="font-mono text-[10px] tabular-nums text-text/35">
                  {String(items.length).padStart(2, "0")}
                </span>
              </MotionWrapper>

              <MotionStagger className="mt-4 space-y-1">
                {items.map((svc) => (
                  <MotionItem key={svc.slug}>
                    <Link
                      href={`/services/${svc.slug}`}
                      className="group -mx-4 flex items-center gap-5 rounded-3xl px-4 py-4 transition-colors duration-300 ease-out hover:bg-surface sm:gap-7"
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface-sunken sm:h-20 sm:w-28">
                        <Image
                          src={svc.imageUrl}
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>

                      <h3 className="min-w-0 flex-1 text-lg tracking-tight text-text transition-colors duration-200 group-hover:text-accent sm:text-xl">
                        {svc.title}
                      </h3>

                      {svc.price ? (
                        <p className="shrink-0 font-mono text-base font-bold tabular-nums text-text">
                          {svc.price}
                        </p>
                      ) : (
                        <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-widest text-text/40 sm:block">
                          On review
                        </p>
                      )}

                      <span
                        aria-hidden="true"
                        className="shrink-0 text-text/25 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-accent"
                      >
                        →
                      </span>
                    </Link>
                  </MotionItem>
                ))}
              </MotionStagger>
            </section>
          );
        })}
      </div>

      <MotionWrapper className="relative isolate mt-16 overflow-hidden rounded-3xl bg-surface-warm sm:mt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 50% 30%, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0) 70%)",
          }}
        />
        <Grain opacity={0.07} />

        <div className="relative px-6 py-14 text-center sm:px-10 sm:py-16">
          <h2 className="text-3xl leading-[1.05] tracking-tight text-text sm:text-4xl">
            Not sure which one{" "}
            <span className="font-editorial italic text-text/60">you need?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text/60">
            Describe the space and we&apos;ll tell you what it actually needs —
            including when that is less than you asked for.
          </p>
          <Link
            href="/#book"
            className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-text px-7 py-3.5 text-sm font-semibold text-bg transition-colors duration-200 ease-out hover:bg-accent"
          >
            Request a quote
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </MotionWrapper>
    </div>
  );
}
