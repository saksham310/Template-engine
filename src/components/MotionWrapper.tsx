"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Motion system — minimal. Quiet fade + small lift, one easeOut curve.
 * No blur, no scale, no long sequences. Transform + opacity only (GPU, no flicker).
 */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = 0.5;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};

/** Alias kept for callers; identical to fadeUp (no blur anywhere). */
export const fadeUpPlain = fadeUp;

const willChange = { willChange: "transform, opacity" } as const;

/**
 * Scroll-triggered reveal. Fades + slides up when it enters the viewport, once.
 */
export function MotionWrapper({
  children,
  className,
  delay = 0,
  y = 8,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section";
}) {
  const Comp = as === "section" ? motion.section : motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION, ease: EASE, delay },
        },
      }}
      style={willChange}
    >
      {children}
    </Comp>
  );
}

/**
 * Stagger container — reveals children sequentially on scroll-in.
 * Pair with <MotionItem> children.
 */
export function MotionStagger({
  children,
  className,
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Drop-in replacement for a div inside a <MotionStagger>. Inherits the
 * fadeUp variant; the parent controls timing.
 */
export function MotionItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp} style={willChange}>
      {children}
    </motion.div>
  );
}
