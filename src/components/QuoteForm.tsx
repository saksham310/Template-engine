"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { requestQuote, type QuoteState } from "@/payload/integration/requestQuote";
import { HERO_BAR } from "@/config/site";
import { EASE } from "./MotionWrapper";

const SLIDE = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: EASE },
  style: { willChange: "transform, opacity" },
} as const;

export type QuoteContext = {
  serviceSlug: string;
  serviceTitle: string;
  source: "service-detail" | "home" | "contact";
  location?: string;
  propertyType?: string;
};

type Props = { context: QuoteContext };

const FIELD =
  "w-full rounded-sm border border-line bg-surface px-3 py-2.5 text-sm text-text " +
  "placeholder:text-text/40 focus:border-accent focus:outline-none transition-colors duration-200 ease-out";

const LABEL = "font-mono text-[11px] uppercase tracking-widest text-text/50";

export default function QuoteForm({ context }: Props) {
  const [state, formAction, isPending] = useActionState<QuoteState, FormData>(
    requestQuote,
    { status: "idle" },
  );
  const pathname = usePathname();

  const knownService = context.serviceSlug !== "general" && context.serviceTitle;

  if (state.status === "success") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="success"
          {...SLIDE}
          className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface p-8 text-center"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Check className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-text">
            Request received.
          </h3>
          <p className="max-w-sm text-sm text-text/60">{state.message}</p>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.form key="form" {...SLIDE} action={formAction} className="grid gap-3">
      <input type="hidden" name="serviceSlug" value={context.serviceSlug} />
      <input type="hidden" name="serviceTitle" value={context.serviceTitle} />
      <input type="hidden" name="source" value={context.source} />
      <input type="hidden" name="sourcePath" value={pathname} />

      {knownService && (
        <p className="flex flex-wrap items-center gap-2 rounded-full border border-line bg-surface-muted px-4 py-2.5 text-sm text-text/70">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text/45">
            Quoting
          </span>
          <span className="font-semibold text-text">{context.serviceTitle}</span>
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={LABEL}>Name *</span>
          <input name="name" required autoComplete="name" className={FIELD} placeholder="Jane Doe" />
        </label>
        <label className="grid gap-1.5">
          <span className={LABEL}>Email *</span>
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

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={LABEL}>Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={FIELD}
            placeholder="+1 555 000 0000"
          />
        </label>
        <label className="grid gap-1.5">
          <span className={LABEL}>Suburb</span>
          <input
            name="location"
            autoComplete="address-level2"
            defaultValue={context.location}
            className={FIELD}
            placeholder="Where the work is"
          />
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className={LABEL}>Property type</span>
        <select
          name="propertyType"
          defaultValue={context.propertyType ?? ""}
          className={FIELD}
        >
          <option value="">Select a property type</option>
          {HERO_BAR.propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1.5">
        <span className={LABEL}>Anything else we should know?</span>
        <textarea
          name="message"
          rows={3}
          className={`${FIELD} resize-none`}
          placeholder={
            knownService
              ? `e.g. access details, timing, condition — ${context.serviceTitle.toLowerCase()}`
              : "e.g. 3-bed apartment, available weekday mornings"
          }
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
        className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-text px-6 py-3.5 text-sm font-semibold text-bg transition-colors duration-200 ease-out hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Sending…
          </>
        ) : (
          <>
            Request my quote
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </>
        )}
      </button>
    </motion.form>
  );
}
