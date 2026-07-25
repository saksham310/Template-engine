import Image from "next/image";
import { Check, Star, Clock, ShieldCheck, Quote } from "lucide-react";
import { TRUST } from "@/lib/services";
import type { ServiceView } from "@/payload/integration/getServiceView";
import QuoteForm from "./QuoteForm";

/**
 * SERVICE DETAIL — Authority Page. Now driven by Payload (ServiceView).
 * 7 bespoke sections: Hero · Trust strip · Value Bento · Inclusions Matrix ·
 * Testimonial · FAQ + sticky Quote sidebar · Request-Quote form.
 */
export default function ServiceTemplate({ service }: { service: ServiceView }) {
  const { hero, inclusions, technicalSpecs, sidebarInclusions, faqs, testimonial } = service;

  return (
    <article>
      {/* 1 — HERO */}
      <header className="relative">
        <div className="relative h-[58vh] min-h-[440px] w-full overflow-hidden">
          <Image
            src={hero.imageUrl}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-5">
          <div className="relative z-10 -mt-32 max-w-4xl">
            <p className="mb-4 flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-white/80">
              Service Rating: {TRUST.rating}
              <Star className="h-3.5 w-3.5 fill-current text-white" strokeWidth={0} />
              <span className="text-white/50">({TRUST.reviewCount} Verified Reviews)</span>
            </p>
            <p className="editorial-label mb-2 text-sm text-white/90">{service.category}</p>
            <h1 className="text-5xl font-bold leading-[0.9] tracking-tighter text-white sm:text-7xl">
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-xl font-editorial text-xl italic text-white/85 sm:text-2xl">
              {hero.subheadline}
            </p>
          </div>
        </div>
      </header>

      {/* 2 — TRUST STRIP */}
      <section className="mx-auto mt-14 max-w-7xl px-5">
        <div className="grid grid-cols-2 border border-slate-200/60 lg:grid-cols-4">
          <TrustBlock invert value={TRUST.rating} label={TRUST.ratingCount} icon={<Star className="h-4 w-4 fill-current" strokeWidth={0} />} />
          <TrustBlock value={TRUST.jobs} label={TRUST.jobsLabel} />
          <TrustBlock value={TRUST.responseTime} label="Avg. quote response" icon={<Clock className="h-4 w-4" strokeWidth={2} />} />
          <TrustBlock value="100%" label={TRUST.guarantee} icon={<ShieldCheck className="h-4 w-4" strokeWidth={2} />} />
        </div>
      </section>

      {/* 3 — VALUE BENTO */}
      <section className="mx-auto max-w-7xl px-5 py-28">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr] lg:auto-rows-fr">
          {/* Col 1 — Bespoke Difference */}
          <div className="flex flex-col justify-between border border-slate-200/60 bg-white p-7">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                The Bespoke Difference
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-text">
                Not a cleaning service. A restoration standard.
              </h2>
            </div>
            <p className="mt-6 text-base leading-relaxed text-text/70">{service.marketing}</p>
          </div>

          {/* Col 2 — Finish Detail */}
          <figure className="relative min-h-[280px] overflow-hidden border border-slate-200/60">
            <Image
              src={service.macroShot}
              alt={`${service.title} finish detail`}
              fill
              sizes="(max-width: 1024px) 100vw, 28vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 bg-text px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white">
              Finish detail
            </figcaption>
          </figure>

          {/* Col 3 — Technical Specifications (label → value) */}
          <div className="flex flex-col border border-slate-200/60 bg-text text-white">
            <div className="border-b border-white/15 px-5 py-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/60">
                Technical Specifications
              </span>
            </div>
            <ul className="flex-1">
              {technicalSpecs.map((spec) => (
                <li
                  key={spec.label}
                  className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 last:border-b-0"
                >
                  <span className="font-mono text-xs text-white/50">{spec.label}</span>
                  <span className="font-mono text-xs font-medium text-white">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 — INCLUSIONS MATRIX */}
      <section className="border-y border-slate-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-28">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-xl">
              <p className="editorial-label text-xs tracking-widest text-text/50">
                Standard Inclusions
              </p>
              <h2 className="mt-2 text-4xl tracking-tight text-text">
                Every {service.title} includes.
              </h2>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-text/40">
              {String(inclusions.length).padStart(2, "0")}-point standard
            </span>
          </div>

          <ul className="mt-8 grid gap-x-10 border-t border-slate-200/60 sm:grid-cols-2">
            {inclusions.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b border-slate-200/60 py-3">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-accent/10">
                  <Check className="h-3 w-3 text-accent" strokeWidth={3} />
                </span>
                <span className="text-sm text-text/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — TESTIMONIAL */}
      <section className="mx-auto max-w-4xl px-5 py-28 text-center">
        <Quote className="mx-auto h-8 w-8 text-accent" strokeWidth={1.5} />
        <blockquote className="mt-6 font-serif text-3xl italic leading-snug text-text sm:text-4xl">
          “{testimonial.quote}”
        </blockquote>
        <figcaption className="mt-8 font-mono text-[11px] uppercase tracking-widest text-text/50">
          {testimonial.citation}
        </figcaption>
      </section>

      {/* 6 — FAQ + STICKY QUOTE SIDEBAR */}
      <section className="border-t border-slate-200/60 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="editorial-label text-xs tracking-widest text-text/50">FAQ</p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight text-text">Before you ask.</h2>
            <div className="mt-6 border-t border-slate-200/60">
              {faqs.map((faq) => (
                <details key={faq.q} className="group border-b border-slate-200/60">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left transition-colors duration-200 ease-out hover:text-accent [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-lg text-text">{faq.q}</span>
                    <span className="font-mono text-lg text-text/40 transition-transform duration-200 ease-out group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-prose pb-5 text-sm leading-relaxed text-text/60">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* STICKY — Your Quote Request */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border-2 border-text bg-white">
              <div className="bg-text px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/90">
                  Your Quote Request
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold tracking-tight text-text">{service.title}</h3>
                <p className="mt-1 text-sm text-text/60">Estimate delivered after review.</p>

                <ul className="mt-4 space-y-2 border-t border-slate-200/60 pt-4">
                  {sidebarInclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text/80">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={3} />
                      <span>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-text/40">
                          Includes:
                        </span>{" "}
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#quote"
                  className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-sm bg-text px-5 py-3.5 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-text/90"
                >
                  Request Professional Quote →
                </a>
                <p className="mt-2 text-center font-mono text-[11px] text-text/40">
                  No payment info required. Estimates delivered within {TRUST.responseTime}.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 7 — REQUEST-QUOTE FORM */}
      <section id="quote" className="scroll-mt-24 border-t border-slate-200/60 bg-bg">
        <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-8 px-5 py-28 lg:grid-cols-2">
          <div>
            <p className="editorial-label text-xs tracking-widest text-text/50">Get Started</p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight text-text">
              Request your professional quote
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
          <QuoteForm serviceSlug={service.slug} serviceTitle={service.title} />
        </div>
      </section>
    </article>
  );
}

function TrustBlock({
  value,
  label,
  icon,
  invert = false,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between gap-3 border-slate-200/60 p-5 [&:not(:last-child)]:border-r ${
        invert ? "bg-text text-white" : "bg-white text-text"
      }`}
    >
      <span className={invert ? "text-white/80" : "text-accent"}>{icon}</span>
      <div>
        <p className="font-mono text-3xl font-semibold tabular-nums tracking-tight">{value}</p>
        <p
          className={`mt-1 font-mono text-[11px] uppercase tracking-widest ${
            invert ? "text-white/50" : "text-text/50"
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
