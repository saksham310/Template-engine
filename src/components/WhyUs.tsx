"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MotionWrapper, fadeUpPlain } from "./MotionWrapper";
import type { HomeContent } from "@/payload/integration/getHomeContent";

const REVEAL = { willChange: "transform, opacity" } as const;

/** Same solid tick as the rate cards — a checklist, which is what this is. */
function Tick() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm4.1 6.6-4.9 5.6a1 1 0 0 1-1.5.03L5.4 10.7a1 1 0 1 1 1.46-1.36l1.6 1.7 4.2-4.8A1 1 0 0 1 14.1 7.6Z" />
    </svg>
  );
}

export default function WhyUs({
  content,
  imageUrl,
  imageAlt,
}: {
  content: HomeContent["features"];
  imageUrl: string;
  imageAlt: string;
}) {
  if (content.items.length === 0) return null;

  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* A room we actually cleaned does more for trust than any icon set. */}
        <MotionWrapper className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[9999px] bg-surface-muted">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 24rem, 38vw"
              className="object-cover"
            />
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-text/55">
            {String(content.items.length).padStart(2, "0")} standards, every visit
          </span>
        </MotionWrapper>

        <div>
          <MotionWrapper>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl leading-[1.05] tracking-tight text-text sm:text-5xl">
              {content.headline}{" "}
              <span className="font-editorial italic text-text/60">
                {content.headlineAccent}
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-text/60">
              {content.body}
            </p>
          </MotionWrapper>

          <div className="mt-9 space-y-5">
            {content.items.map((item) => (
              <motion.article
                key={item.title}
                variants={fadeUpPlain}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                style={REVEAL}
                className="flex gap-4"
              >
                <Tick />
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-text">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-lg text-[15px] leading-relaxed text-text/60">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
