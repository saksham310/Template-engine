"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Phone } from "lucide-react";
import { TRUST } from "@/lib/services";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { EASE } from "./MotionWrapper";
import { Grain } from "./patterns";
import QuoteForm, { type QuoteContext } from "./QuoteForm";
import type { HomeContent } from "@/payload/integration/getHomeContent";

type Titles = Record<string, string>;
type Copy = HomeContent["quote"];

/**
 * Home "Request a Quote" section (#book).
 * useSearchParams needs a Suspense boundary during static prerender.
 */
function RequestQuoteInner({ titles, copy }: { titles: Titles; copy: Copy }) {
  const params = useSearchParams();
  const slug = params.get("service");
  const title = slug ? titles[slug] : undefined;

  const serviceSlug = title ? slug! : "general";
  const serviceTitle = title ?? "your space";
  const selected = title ? { title } : undefined;

  const context: QuoteContext = {
    serviceSlug,
    serviceTitle,
    source: "home",
    location: params.get("location") ?? undefined,
    propertyType: params.get("property") ?? undefined,
  };

  const sectionRef = useRef<HTMLElement | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { rootMargin: "-20% 0px -40% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const site = useSiteSettings();

  const assurances = [
    `Reply within ${TRUST.responseTime}`,
    "No payment details required",
    TRUST.guarantee,
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="relative isolate overflow-hidden bg-surface-warm"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 45% at 50% 30%, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0) 70%)",
          }}
        />
        <Grain opacity={0.07} />

        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl leading-[1.05] tracking-tight text-text sm:text-5xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={selected ? selected.title : "default"}
                  className="inline-block"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{ willChange: "transform, opacity" }}
                >
                  {selected ? `Request your ${selected.title} quote` : copy.headline}
                </motion.span>
              </AnimatePresence>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text/60">
              {copy.body}
            </p>

            <ul className="mt-7 space-y-3">
              {assurances.map((line) => (
                <li key={line} className="flex items-center gap-3 text-[15px] text-text/70">
                  <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                  {line}
                </li>
              ))}
            </ul>

            <a
              href={site.telHref}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-mono text-xs font-bold tabular-nums text-text transition-colors duration-200 ease-out hover:bg-text hover:text-bg"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
              {site.phone}
            </a>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <QuoteForm
              key={`${context.serviceSlug}-${context.location}-${context.propertyType}`}
              context={context}
            />
          </div>
        </div>
      </section>

      {/* Mobile sticky quote bar — hidden once the form is in view */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-5 py-3 backdrop-blur-sm transition-transform duration-300 ease-out sm:hidden ${
          formVisible ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <a
          href="#book"
          className="flex w-full items-center justify-center rounded-full bg-text px-6 py-3.5 text-base font-semibold text-bg transition-colors hover:bg-accent"
        >
          Request a Quote →
        </a>
      </div>
    </>
  );
}

export default function BookingWizard({ titles, copy }: { titles: Titles; copy: Copy }) {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-7xl px-5 py-16 sm:py-28">
          <div className="h-96 animate-pulse border border-line bg-surface" />
        </section>
      }
    >
      <RequestQuoteInner titles={titles} copy={copy} />
    </Suspense>
  );
}
