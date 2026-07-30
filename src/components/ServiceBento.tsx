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
  "group relative isolate overflow-hidden rounded-md border border-slate-200/60 " +
  "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-400/70";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="editorial-label text-xs tracking-widest opacity-70">
      {children}
    </p>
  );
}

export default function ServiceBento({
  services = [],
  heading,
}: {
  services?: BentoService[];
  heading: HomeContent["services"];
}) {
  const lead = services[0];
  const second = services[1];
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
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
            alt="Minimal, sunlit modern interior after a deep clean"
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
            <Eyebrow>Signature</Eyebrow>
            <h3 className="mt-2 max-w-[16ch] text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl">
              {lead.title}
            </h3>
            <p className="mt-3 max-w-md text-base leading-snug text-white/80">
              {lead.tagline}
            </p>
            <Link
              href={`/services/${lead.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-1 rounded-sm bg-white px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-white/90"
            >
              Start Here
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.article>

        {second && (
          <motion.article
            variants={fadeUpPlain}
            style={REVEAL}
            className={`${cardBase} aspect-square sm:aspect-auto sm:min-h-[240px] bg-white text-text`}
          >
            <Image
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80"
              alt="Detail of a spotless kitchen surface"
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
          className={`${cardBase} min-h-[180px] bg-white p-5 text-text`}
        >
          <Grain opacity={0.1} />
          <div className="relative">
            <Eyebrow>Add-ons</Eyebrow>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">
              À La Carte
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-tight text-text/70">
              <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span>Interior windows</span>
                <span className="tabular-nums">+45m</span>
              </li>
              <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span>Oven &amp; range</span>
                <span className="tabular-nums">+30m</span>
              </li>
              <li className="flex justify-between">
                <span>Wardrobe reset</span>
                <span className="tabular-nums">+60m</span>
              </li>
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
              <Eyebrow>Membership</Eyebrow>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                Recurring care, on your schedule.
              </h3>
            </div>
            <a
              href="#membership"
              className="inline-flex items-center gap-1 rounded-sm border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/70"
            >
              See plans
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.article>
      </MotionStagger>
    </section>
  );
}
