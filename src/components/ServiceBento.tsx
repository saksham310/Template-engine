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

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Grain({ opacity = 0.14 }: { opacity?: number }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{ backgroundImage: GRAIN, opacity }}
    />
  );
}

const cardBase =
  "group relative isolate overflow-hidden rounded-md border border-line " +
  "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-line-strong";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="editorial-label text-xs tracking-widest opacity-70">
      {children}
    </p>
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
    <section className="mx-auto max-w-7xl px-5 py-16 sm:py-28">
      <MotionWrapper className="mb-7 max-w-xl">
        <Eyebrow>{heading.eyebrow}</Eyebrow>
        <h2 className="mt-2 text-3xl tracking-tight sm:text-4xl">
          {heading.headline}
        </h2>
      </MotionWrapper>

      <MotionStagger className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[minmax(0,auto)]">
        <motion.article
          variants={fadeUpPlain}
          style={REVEAL}
          className={`${cardBase} aspect-[4/5] sm:aspect-auto sm:col-span-2 sm:row-span-2 sm:min-h-[440px] text-white`}
        >
          <Image
            src={lead.imageUrl}
            alt={`${lead.title} — recent work`}
            fill
            sizes="(max-width: 640px) 100vw, 66vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            priority
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
          />
          <Grain opacity={0.12} />

          <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
            <Eyebrow>{heading.leadBadge}</Eyebrow>
            <h3 className="mt-2 max-w-[16ch] text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl">
              {lead.title}
            </h3>
            <p className="mt-3 max-w-md text-base leading-snug text-white/80">
              {lead.tagline}
            </p>
            <Link
              href={`/services/${lead.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-1 rounded-sm bg-surface px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface/90"
            >
              {heading.leadCtaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.article>

        {second && (
          <motion.article
            variants={fadeUpPlain}
            style={REVEAL}
            className={`${cardBase} aspect-square sm:aspect-auto sm:min-h-[240px] bg-surface text-text`}
          >
            <Image
              src={second.imageUrl}
              alt={`${second.title} — recent work`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"
            />
            <Grain />
            <Link
              href={`/services/${second.slug}`}
              className="relative flex h-full flex-col justify-end p-5"
            >
              <Eyebrow>{second.category}</Eyebrow>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">{second.title}</h3>
            </Link>
          </motion.article>
        )}

        <motion.article
          variants={fadeUpPlain}
          style={REVEAL}
          className={`${cardBase} min-h-[180px] bg-surface p-5 text-text`}
        >
          <Grain opacity={0.1} />
          <div className="relative">
            <Eyebrow>{heading.addOnsBadge}</Eyebrow>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">
              {heading.addOnsTitle}
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-tight text-text/70">
              {heading.addOns.map((addOn, i) => (
                <li
                  key={addOn.label}
                  className={`flex justify-between ${
                    i < heading.addOns.length - 1
                      ? "border-b border-line pb-1.5"
                      : ""
                  }`}
                >
                  <span>{addOn.label}</span>
                  <span className="tabular-nums">{addOn.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        <motion.article
          variants={fadeUpPlain}
          style={REVEAL}
          className={`${cardBase} sm:col-span-3 min-h-[120px] bg-text text-white`}
        >
          <Grain opacity={0.18} />
          <div className="relative flex h-full flex-col items-start justify-between gap-3 p-6 sm:flex-row sm:items-center">
            <div>
              <Eyebrow>{heading.membershipBadge}</Eyebrow>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                {heading.membershipTitle}
              </h3>
            </div>
            <Link
              href={heading.membershipCtaHref}
              className="inline-flex items-center gap-1 rounded-sm border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/70"
            >
              {heading.membershipCtaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.article>
      </MotionStagger>
    </section>
  );
}
