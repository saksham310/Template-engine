"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, DURATION } from "./MotionWrapper";
import type { HomeContent } from "@/payload/integration/getHomeContent";

const fade = (delay: number, duration = DURATION) => ({
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE, delay },
  },
});

export default function Hero({ content }: { content: HomeContent["hero"] }) {
  return (
    <section className="relative isolate overflow-visible">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-5 pt-28 pb-16 sm:pt-36 sm:pb-20 lg:grid-cols-[65fr_35fr] lg:gap-8 lg:pt-40 lg:pb-24">
        <div className="relative z-10 lg:pr-6">
          <motion.p
            className="editorial-label mb-4 text-sm text-text/60 sm:text-base"
            initial="hidden"
            animate="visible"
            variants={fade(0)}
            style={{ willChange: "transform, opacity" }}
          >
            {content.eyebrow}
          </motion.p>

          <motion.h1
            className="relative z-10 mb-[-24px] max-w-[14ch] text-5xl font-bold leading-[0.9] tracking-tighter sm:mb-[-32px] sm:text-7xl lg:mb-[-40px] lg:text-8xl"
            initial="hidden"
            animate="visible"
            variants={fade(0.08)}
            style={{ willChange: "transform, opacity" }}
          >
            {content.headline}
          </motion.h1>

          <motion.div
            className="mt-12 max-w-xl sm:mt-14 lg:mt-[64px]"
            initial="hidden"
            animate="visible"
            variants={fade(0.18)}
            style={{ willChange: "transform, opacity" }}
          >
            <p className="text-base leading-relaxed text-text/70 sm:text-lg sm:leading-snug">
              {content.body}
            </p>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <Link
                href={content.primaryHref}
                className="flex w-full items-center justify-center rounded-sm bg-text px-6 py-4 text-base font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-text/90 sm:w-auto sm:py-3.5"
              >
                {content.primaryLabel}
              </Link>

              <Link
                href={content.secondaryHref}
                className="group inline-flex items-center justify-center gap-1 text-base font-medium text-text underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {content.secondaryLabel}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative -mt-8 sm:-mt-4 lg:mt-0">
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-slate-200/60 sm:aspect-[3/4]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: 0.12 }}
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={content.imageUrl}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 left-3 w-[260px] max-w-[85%] rounded-md border border-slate-200/60 bg-white/80 p-4 backdrop-blur-sm sm:w-[280px] lg:-bottom-6 lg:-left-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: 0.28 }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium text-text">
                {content.statusText}
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-slate-200/60 pt-2">
              <span className="editorial-label text-xs text-text/60">
                {content.statusMetricLabel}
              </span>
              <span className="text-sm font-semibold tabular-nums text-text">
                {content.statusMetricValue}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
