"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MotionStagger, MotionWrapper, fadeUpPlain } from "./MotionWrapper";
import { Grain } from "./patterns";
import type { ServiceListItem } from "@/payload/integration/getServiceView";
import type { HomeContent } from "@/payload/integration/getHomeContent";

const REVEAL = { willChange: "transform, opacity" } as const;

/** Past this, visitors go to the full index rather than reading a wall of cards. */
const MAX_CARDS = 4;

/** Static column classes so Tailwind sees them at build time. */
const COLUMNS: Record<number, string> = {
  1: "max-w-sm mx-auto",
  2: "sm:grid-cols-2 max-w-3xl mx-auto",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`mt-0.5 h-4 w-4 shrink-0 ${className}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm4.1 6.6-4.9 5.6a1 1 0 0 1-1.5.03L5.4 10.7a1 1 0 1 1 1.46-1.36l1.6 1.7 4.2-4.8A1 1 0 0 1 14.1 7.6Z" />
    </svg>
  );
}

export default function PricingCards({
  services,
  content,
}: {
  services: ServiceListItem[];
  content: HomeContent["pricing"];
}) {
  // A service with no published price is not a rate — it belongs in the index.
  const priced = services.filter((s) => s.price);
  if (!content.enabled || priced.length === 0) return null;

  const cards = priced.slice(0, MAX_CARDS);
  const columns = COLUMNS[cards.length] ?? COLUMNS[4];
  const showAll = priced.length > MAX_CARDS;
  // Only ever one raised card, however many are ticked in the admin.
  const popularSlug = cards.find((s) => s.popular)?.slug;

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden border-b border-line bg-surface-warm"
    >
      {/* Soft white spotlight over the warm ground, so the cards sit in light
          rather than on flat colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 45% at 50% 32%, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0) 70%)",
        }}
      />

      <Grain opacity={0.07} />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-text sm:text-6xl">
            {content.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text/60">
            {content.body}
          </p>
          <Link
            href={content.ctaHref}
            className="mt-6 inline-flex items-center rounded-2xl bg-text px-7 py-3.5 text-sm font-semibold text-bg transition-colors duration-200 ease-out hover:bg-accent"
          >
            {content.ctaLabel}
          </Link>
        </MotionWrapper>

        <MotionStagger
          className={`mt-14 grid grid-cols-1 items-start gap-5 ${columns}`}
        >
          {cards.map((service) => {
            const isPopular = service.slug === popularSlug;

            return (
              <motion.article
                key={service.slug}
                variants={fadeUpPlain}
                style={REVEAL}
                className={`relative flex h-full flex-col rounded-3xl border bg-surface p-8 transition-colors duration-300 ease-out ${
                  isPopular
                    ? "border-accent/40 lg:-mt-6 lg:pt-12"
                    : "border-line hover:border-line-strong"
                }`}
              >
                {isPopular && (
                  <>
                    {/* Accent cap, inset so it reads as part of the card edge. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-accent"
                    />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-2xl border border-accent/30 bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                      {content.popularLabel}
                    </span>
                  </>
                )}

                <p className="font-mono text-[10px] uppercase tracking-widest text-text/40">
                  {service.category}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-text">
                  {service.title}
                </h3>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-mono text-4xl font-bold tracking-tight tabular-nums text-text">
                    {service.price}
                  </span>
                  {service.priceUnit && (
                    <span className="font-mono text-[11px] uppercase tracking-widest text-text/45">
                      {service.priceUnit}
                    </span>
                  )}
                </p>

                <p className="mt-3 font-serif text-[15px] leading-relaxed text-text/60">
                  {service.tagline}
                </p>

                <Link
                  href={`/?service=${service.slug}#book`}
                  className={`mt-6 flex items-center justify-center gap-1.5 rounded-2xl px-5 py-4 text-xs font-semibold transition-colors duration-200 ease-out ${
                    isPopular
                      ? "bg-text text-bg hover:bg-accent"
                      : "border border-line-strong text-text hover:bg-text hover:text-bg"
                  }`}
                >
                  {content.cardCtaLabel}
                  <span aria-hidden="true">→</span>
                </Link>

                {service.priceNotes.length > 0 && (
                  <div className="mt-7 border-t border-dashed border-line-strong/50 pt-6">
                    <p className="text-sm font-semibold text-text">
                      {content.includedLabel}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {service.priceNotes.map((note) => (
                        <li key={note} className="flex gap-2.5 text-sm leading-snug text-text/70">
                          <Tick className={isPopular ? "text-accent" : "text-text/30"} />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="mt-auto border-t border-dashed border-line-strong/50 pt-5 text-center font-mono text-[10px] uppercase tracking-widest text-text/40">
                  {service.durationLabel} on site
                </p>
              </motion.article>
            );
          })}
        </MotionStagger>

        {showAll && (
          <div className="mt-10 text-center">
            <Link
              href={content.viewAllHref}
              className="inline-flex items-center gap-2 rounded-2xl border border-line-strong px-6 py-3 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:bg-text hover:text-bg"
            >
              {content.viewAllLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
