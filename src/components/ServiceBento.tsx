"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MotionStagger, MotionWrapper, fadeUpPlain } from "./MotionWrapper";
import type { HomeContent } from "@/payload/integration/getHomeContent";

const REVEAL = { willChange: "transform, opacity" } as const;

type BentoService = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  durationLabel: string;
  imageUrl: string;
};

/**
 * Cards share a frame but not a layout: each one below is built around a
 * different idea (photo lead, scrimmed tile, list), so the grid reads as composed rather
 * than as one component filled three times.
 */
const cardBase =
  "group relative isolate overflow-hidden rounded-3xl border border-line " +
  "transition-colors duration-300 ease-out hover:border-line-strong";

/** One labelling device for the whole section: index number on a hairline. */
function IndexRule({
  index,
  label,
  tone = "text-text/45",
  rule = "bg-line-strong/40",
}: {
  index: string;
  label: string;
  tone?: string;
  rule?: string;
}) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest ${tone}`}>
      <span className="tabular-nums">{index}</span>
      <span className={`h-px w-6 ${rule}`} />
      <span>{label}</span>
    </div>
  );
}

/**
 * Resolves the two featured card slots: the slugs picked in the Home global
 * first (in that order), then the remaining services in their admin drag order.
 * A pick that no longer exists is skipped rather than leaving a hole.
 */
function featured(services: BentoService[], slugs: string[]): BentoService[] {
  const picked = slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is BentoService => Boolean(s));
  const rest = services.filter((s) => !picked.includes(s));
  return [...picked, ...rest];
}

export default function ServiceBento({
  services = [],
  heading,
}: {
  services?: BentoService[];
  heading: HomeContent["services"];
}) {
  const [lead, second] = featured(services, heading.featuredSlugs);
  if (!lead) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
      <MotionWrapper className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-xl text-3xl tracking-tight sm:text-4xl">
          {heading.headline}
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-widest text-text/40">
          {heading.eyebrow}
        </p>
      </MotionWrapper>

      {/* Uneven columns — 7/5 rather than 2/1, so the grid isn't a tidy split. */}
      <MotionStagger className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        {/* ── 01 · Lead ── */}
        <motion.article
          variants={fadeUpPlain}
          style={REVEAL}
          className={`${cardBase} flex flex-col bg-surface sm:col-span-7 sm:row-span-2`}
        >
          {/* Full bleed — the card's own rounded corners do the clipping, so
              there is no inner frame to misalign. */}
          <div className="relative min-h-[320px] flex-1 sm:min-h-[400px]">
            <Image
              src={lead.imageUrl}
              alt={`${lead.title} — recent work`}
              fill
              sizes="(max-width: 640px) 100vw, 58vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="bg-surface-muted px-8 pb-8 pt-6">
            <IndexRule index="01" label={`${lead.category} · ${lead.durationLabel}`} />
            <h3 className="mt-3 text-3xl tracking-tight text-text sm:text-[2.5rem] sm:leading-[1.05]">
              {lead.title}
            </h3>
            {/* Serif against the geometric sans — the section's one warm voice. */}
            <p className="mt-3 max-w-md font-serif text-[17px] leading-relaxed text-text/65">
              {lead.tagline}
            </p>
            <Link
              href={`/services/${lead.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-2xl bg-text px-6 py-2.5 text-sm font-semibold text-bg transition-colors duration-200 ease-out hover:bg-accent"
            >
              {heading.leadCtaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.article>

        {/* ── Everything else · a list, not a card of labels ── */}
        <motion.article
          variants={fadeUpPlain}
          style={REVEAL}
          className={`${cardBase} bg-surface px-7 pb-7 pt-6 text-text sm:col-span-5`}
        >
          <IndexRule index="+" label={heading.addOnsBadge} />
          <h3 className="mt-3 text-2xl tracking-tight">{heading.addOnsTitle}</h3>

          <ul className="mt-5">
            {heading.addOns.map((addOn) => (
              <li
                key={addOn.label}
                className="flex items-baseline justify-between gap-4 border-t border-line py-2.5 last:pb-0"
              >
                <span className="text-sm text-text/80">{addOn.label}</span>
                <span className="font-mono text-xs tabular-nums text-text/45">
                  {addOn.meta}
                </span>
              </li>
            ))}
          </ul>
        </motion.article>

        {/* ── 02 · Full bleed ── */}
        {second && (
          <motion.article
            variants={fadeUpPlain}
            style={REVEAL}
            className={`${cardBase} min-h-[260px] bg-surface sm:col-span-5`}
          >
            <Link href={`/services/${second.slug}`} className="block h-full">
              <Image
                src={second.imageUrl}
                alt={`${second.title} — recent work`}
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Forest ink rather than pure black — the scrim stays in palette. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-text via-text/45 to-transparent"
              />
              <div className="relative flex h-full flex-col justify-end p-7 text-bg">
                <IndexRule
                  index="02"
                  label={second.durationLabel}
                  tone="text-bg/60"
                  rule="bg-bg/40"
                />
                <h3 className="mt-3 text-2xl tracking-tight sm:text-3xl">{second.title}</h3>
              </div>
            </Link>
          </motion.article>
        )}
      </MotionStagger>
    </section>
  );
}
