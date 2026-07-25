"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Clock } from "lucide-react";
import { TRUST } from "@/lib/services";
import QuoteForm from "./QuoteForm";

type Titles = Record<string, string>;

/**
 * Home "Request a Quote" section (#book).
 * Same UI as the service-detail personalised-quote form: Name / Email / Phone /
 * Tell us about the space. Deep-linkable via ?service=<slug> (set by the detail
 * pane / cards), which preselects the service the request is tied to.
 *
 * useSearchParams needs a Suspense boundary during static prerender.
 */
function RequestQuoteInner({ titles }: { titles: Titles }) {
  const params = useSearchParams();
  const slug = params.get("service");
  const title = slug ? titles[slug] : undefined;

  const serviceSlug = title ? slug! : "general";
  const serviceTitle = title ?? "your space";
  const selected = title ? { title } : undefined;

  return (
    <section className="mx-auto max-w-7xl px-5 py-28">
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
        <div>
          <p className="editorial-label text-xs tracking-widest text-text/50">
            Request a Quote
          </p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight text-text sm:text-5xl">
            {selected
              ? `Request your ${selected.title} quote`
              : "Request your personalised quote"}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-text/60">
            Tell us about your space. Every request is reviewed individually —
            no fixed rates, no obligation, no payment details.
          </p>
          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-text/50">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            Estimates delivered within {TRUST.responseTime}
          </div>
        </div>

        <QuoteForm serviceSlug={serviceSlug} serviceTitle={serviceTitle} />
      </div>
    </section>
  );
}

export default function BookingWizard({ titles }: { titles: Titles }) {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-7xl px-5 py-28">
          <div className="h-96 animate-pulse border border-slate-200/60 bg-white" />
        </section>
      }
    >
      <RequestQuoteInner titles={titles} />
    </Suspense>
  );
}
