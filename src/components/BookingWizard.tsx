"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";
import { TRUST } from "@/lib/services";
import { EASE } from "./MotionWrapper";
import QuoteForm from "./QuoteForm";
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

  return (
    <>
      <section ref={sectionRef} className="mx-auto max-w-7xl px-5 py-16 sm:py-28">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
          <div>
            <p className="editorial-label text-xs tracking-widest text-text/50">
              {copy.eyebrow}
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight text-text sm:text-4xl lg:text-5xl">
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
            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-text/50">
              <Clock className="h-3.5 w-3.5" strokeWidth={2} />
              Estimates delivered within {TRUST.responseTime}
            </div>
          </div>

          <QuoteForm serviceSlug={serviceSlug} serviceTitle={serviceTitle} />
        </div>
      </section>

      {/* Mobile sticky quote bar — hidden once the form is in view */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/60 bg-bg/95 px-5 py-3 backdrop-blur-sm transition-transform duration-300 ease-out sm:hidden ${
          formVisible ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <a
          href="#book"
          className="flex w-full items-center justify-center rounded-sm bg-text px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-text/90"
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
          <div className="h-96 animate-pulse border border-slate-200/60 bg-white" />
        </section>
      }
    >
      <RequestQuoteInner titles={titles} copy={copy} />
    </Suspense>
  );
}
