"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MotionWrapper, fadeUpPlain } from "./MotionWrapper";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import type { HomeContent } from "@/payload/integration/getHomeContent";

const REVEAL = { willChange: "transform, opacity" } as const;

export default function FaqSection({ content }: { content: HomeContent["faq"] }) {
  const site = useSiteSettings();
  if (content.items.length === 0) return null;

  return (
    <section id="faq" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
        <MotionWrapper className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl leading-[1.05] tracking-tight text-text sm:text-5xl">
            {content.headline}{" "}
            <span className="font-editorial italic text-text/60">
              {content.headlineAccent}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text/60">
            {content.body}
          </p>
        </MotionWrapper>

        <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface">
          {content.items.map((faq, i) => (
            <motion.div
              key={faq.question}
              variants={fadeUpPlain}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={REVEAL}
            >
              <details open={i === 0} className="group border-b border-line last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 transition-colors duration-200 hover:bg-surface-muted marker:hidden sm:px-7 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-base font-semibold tracking-tight text-text sm:text-lg">
                    {faq.question}
                  </span>

                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-text/50 transition-colors duration-300 ease-out group-hover:border-line-strong group-open:border-accent group-open:bg-accent group-open:text-white">
                    <span className="relative block h-3.5 w-3.5 transition-transform duration-300 ease-out group-open:rotate-45">
                      <span className="absolute left-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-3.5 w-px -translate-x-1/2 bg-current" />
                    </span>
                  </span>
                </summary>

                <p className="max-w-2xl px-6 pb-6 text-[15px] leading-relaxed text-text/60 sm:px-7">
                  {faq.answer}
                </p>
              </details>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-3xl border border-line bg-surface-muted px-6 py-5 sm:flex-row sm:px-7">
          <p className="text-center text-[15px] text-text/70 sm:text-left">
            Still not sure? We answer every message ourselves.
          </p>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <a
              href={site.telHref}
              className="rounded-2xl border border-line-strong px-5 py-2.5 font-mono text-xs font-bold tabular-nums text-text transition-colors duration-200 ease-out hover:bg-text hover:text-bg"
            >
              {site.phone}
            </a>
            <Link
              href={content.ctaHref}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-text px-5 py-2.5 text-sm font-semibold text-bg transition-colors duration-200 ease-out hover:bg-accent"
            >
              {content.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
