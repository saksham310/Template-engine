"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, DURATION } from "./MotionWrapper";
import HeroQuoteBar from "./HeroQuoteBar";
import { GridPattern } from "./patterns";
import { SITE_CONFIG } from "@/config/site";
import type { ServiceListItem } from "@/payload/integration/getServiceView";
import type { HomeContent } from "@/payload/integration/getHomeContent";

const fade = (delay: number, duration = DURATION) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE, delay },
  },
});

/**
 * Arch mask — the crown is a true semicircle (radius = half the width), so the
 * shape stays a proper arch at every breakpoint instead of a rounded rectangle.
 * With a cut-out subject on transparency, drop the mask and use `object-contain`
 * so the figure itself breaks the panel edge.
 */
const PHOTO_FRAME = "overflow-hidden rounded-t-[9999px]";

/**
 * Panel texture: a surveyor's grid with an oversized brand letterform cropped
 * by the panel edge — architectural rather than decorative, and it fills the
 * space the hero buttons used to occupy.
 */
function PanelPattern() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-surface">
      <GridPattern id="hero-grid" />

      <span className="absolute -bottom-[22%] -left-[3%] select-none font-editorial text-[26rem] leading-none text-surface/50 sm:text-[38rem]">
        {SITE_CONFIG.name.charAt(0)}
      </span>
    </div>
  );
}

/**
 * Sets the business name in the accent colour where it appears in the intro
 * line, as in the reference. Copy without the name renders unchanged.
 */
function IntroLine({ body }: { body: string }) {
  const name = SITE_CONFIG.name;
  const at = body.indexOf(name);
  if (at === -1) return <>{body}</>;

  return (
    <>
      {body.slice(0, at)}
      <span className="font-semibold text-accent">{name}</span>
      {body.slice(at + name.length)}
    </>
  );
}

export default function Hero({
  content,
  services,
}: {
  content: HomeContent["hero"];
  services: ServiceListItem[];
}) {
  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative isolate overflow-hidden rounded-3xl bg-panel">
        <PanelPattern />

        <div className="relative grid gap-10 px-6 pt-14 pb-24 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-6 lg:px-14 lg:pt-24 lg:pb-32">
          {/* No buttons here — the bar below the panel is the hero's action.
              Extra bottom padding keeps the text column optically centred
              against the photo now that the CTA no longer fills the space. */}
          <div className="max-w-2xl lg:pb-24">
            <motion.h1
              className="text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-6xl lg:text-7xl"
              initial="hidden"
              animate="visible"
              variants={fade(0)}
              style={{ willChange: "transform, opacity" }}
            >
              {content.headline}
            </motion.h1>

            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-text/70 sm:text-lg"
              initial="hidden"
              animate="visible"
              variants={fade(0.1)}
              style={{ willChange: "transform, opacity" }}
            >
              <IntroLine body={content.body} />
            </motion.p>
          </div>

          {/* Anchored to the panel floor so the subject rises out of the bar
              below rather than sitting in a slot beside the text. */}
          <motion.div
            className={`relative mx-auto aspect-[3/4] w-full max-w-sm self-end lg:-mb-32 lg:mx-0 lg:h-[560px] lg:max-w-none ${PHOTO_FRAME}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={content.imageUrl}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover object-bottom"
              priority
            />
          </motion.div>
        </div>
      </div>

      <HeroQuoteBar services={services} />
    </section>
  );
}
