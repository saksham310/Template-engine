"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { requestQuote, type QuoteState } from "@/payload/integration/requestQuote";
import { EASE } from "./MotionWrapper";

const SLIDE = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: EASE },
  style: { willChange: "transform, opacity" },
} as const;

type Props = {
  serviceSlug: string;
  serviceTitle: string;
  /** Seeded from the hero quote bar. Editable — it is only a starting point. */
  defaultMessage?: string;
};

const FIELD =
  "w-full rounded-sm border border-line bg-surface px-3 py-2.5 text-sm text-text " +
  "placeholder:text-text/40 focus:border-accent focus:outline-none transition-colors duration-200 ease-out";

/**
 * Request-Quote form. Submits via the `requestQuote` Server Action, which saves
 * a Lead to Payload (SQLite) and logs an email stub. Instrument styling.
 */
export default function QuoteForm({ serviceSlug, serviceTitle, defaultMessage }: Props) {
  const [state, formAction, isPending] = useActionState<QuoteState, FormData>(
    requestQuote,
    { status: "idle" },
  );

  if (state.status === "success") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="success"
          {...SLIDE}
          className="flex flex-col items-center gap-3 border border-line bg-surface p-8 text-center"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent/10 text-accent">
            <Check className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <h3 className="font-serif text-xl text-text">Request received.</h3>
          <p className="max-w-sm text-sm text-text/60">{state.message}</p>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.form key="form" {...SLIDE} action={formAction} className="grid gap-3">
      {/* Service context — resolved to a relationship server-side */}
      <input type="hidden" name="serviceSlug" value={serviceSlug} />
      <input type="hidden" name="serviceTitle" value={serviceTitle} />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-text/50">
            Name *
          </span>
          <input name="name" required autoComplete="name" className={FIELD} placeholder="Jane Doe" />
        </label>
        <label className="grid gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-text/50">
            Email *
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
            placeholder="jane@studio.com"
          />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-text/50">
          Phone
        </span>
        <input name="phone" type="tel" autoComplete="tel" className={FIELD} placeholder="+1 555 000 0000" />
      </label>
      <label className="grid gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-text/50">
          Tell us about the space
        </span>
        <textarea
          name="message"
          rows={3}
          defaultValue={defaultMessage}
          className={`${FIELD} resize-none`}
          placeholder={`e.g. 3-bed apartment, ${serviceTitle.toLowerCase()}, available weekday mornings`}
        />
      </label>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-sm bg-text px-6 py-3 text-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-text/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Sending…
          </>
        ) : (
          <>
            Request Personalized Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </>
        )}
      </button>
      <p className="text-center font-mono text-[11px] text-text/40">
        No payment required. We&apos;ll contact you within 60 minutes.
      </p>
    </motion.form>
  );
}
