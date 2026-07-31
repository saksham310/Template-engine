 import Image from "next/image";
import { Phone } from "lucide-react";
import { TRUST } from "@/lib/services";
import { SITE_CONFIG } from "@/config/site";
import { GridPattern, Grain } from "./patterns";
import { MotionWrapper, MotionStagger, MotionItem } from "./MotionWrapper";
import QuoteForm from "./QuoteForm";
import type { ServiceView } from "@/payload/integration/getServiceView";

const TEL = `tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`;

const PILL_SOLID =
  "inline-flex items-center gap-1.5 rounded-full bg-text px-6 py-3 text-sm font-semibold " +
  "text-bg transition-colors duration-200 ease-out hover:bg-accent";

const PILL_OUTLINE =
  "inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 " +
  "font-mono text-xs font-bold tabular-nums text-text transition-colors duration-200 " +
  "ease-out hover:bg-text hover:text-bg";

function Tick({ className = "text-accent" }: { className?: string }) {
  return (
    <svg
      className={`mt-0.5 h-4 w-4 shrink-0 ${className}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm4.1 6.6-4.9 5.6a1 1 0 0 1-1.5.03L5.4 10.7a1 1 0 1 1 1.46-1.36l1.6 1.7 4.2-4.8A1 1 0 0 1 14.1 7.6Z" />
    </svg>
  );
}

function IndexRule({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-text/45">
      <span className="tabular-nums">{index}</span>
      <span className="h-px w-6 bg-line-strong/40" />
      <span>{label}</span>
    </div>
  );
}

export default function ServiceTemplate({ service }: { service: ServiceView }) {
  const { hero, inclusions, technicalSpecs, sidebarInclusions, faqs, testimonial } = service;
  const priced = Boolean(service.price);

  const specs = [
    { value: service.durationLabel, label: "Typical time on site" },
    { value: TRUST.responseTime, label: "Average quote response" },
    { value: `${String(inclusions.length).padStart(2, "0")}-point`, label: "Standard checklist" },
    { value: TRUST.jobs, label: TRUST.jobsLabel },
  ];

  const assurances = [
    `Reply within ${TRUST.responseTime}`,
    "No payment details required",
    TRUST.guarantee,
  ];

  return (
    <article>
      <section className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="relative isolate overflow-hidden rounded-3xl bg-panel">
          {/* Same surveyor's grid as the home panel, but the letterform is the
              service's own initial so the two pages don't read as one template. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-surface">
            <GridPattern id="service-grid" />
            <span className="absolute -bottom-[24%] -left-[3%] select-none font-editorial text-[24rem] leading-none text-surface/50 sm:text-[34rem]">
              {service.title.charAt(0)}
            </span>
          </div>

          <div className="relative grid gap-10 px-6 pt-12 pb-20 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-6 lg:px-14 lg:pt-20 lg:pb-28">
            <div className="max-w-2xl lg:pb-20">
              <MotionWrapper>
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {service.category}
                </p>
                <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-6xl">
                  {hero.headline}
                </h1>
                <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-text/70">
                  {hero.subheadline}
                </p>
              </MotionWrapper>

              <MotionWrapper delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#quote" className={PILL_SOLID}>
                  Request a quote
                  <span aria-hidden="true">→</span>
                </a>
                <a href={TEL} className={PILL_OUTLINE}>
                  <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
                  {SITE_CONFIG.phone}
                </a>
              </MotionWrapper>

              {priced && (
                <MotionWrapper delay={0.15}>
                  <p className="mt-5 font-mono text-xs uppercase tracking-widest text-text/50">
                    From{" "}
                    <span className="text-base font-bold tabular-nums text-text">
                      {service.price}
                    </span>{" "}
                    {service.priceUnit}
                  </p>
                </MotionWrapper>
              )}
            </div>

            {/* Arch, used once on the page — the shape idea, not a motif. */}
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm self-end overflow-hidden rounded-t-[9999px] lg:-mb-28 lg:mx-0 lg:h-[520px] lg:max-w-none">
              <Image
                src={hero.imageUrl}
                alt={`${service.title} — recent work`}
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-12 sm:pt-16">
        <MotionWrapper className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-4">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="border-b border-line px-6 py-6 last:border-b-0 even:border-l sm:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0"
            >
              <p className="font-mono text-2xl font-semibold tracking-tight tabular-nums text-text">
                {spec.value}
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-text/45">
                {spec.label}
              </p>
            </div>
          ))}
        </MotionWrapper>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <MotionStagger className="grid grid-cols-1 gap-3 sm:grid-cols-12">
          <MotionItem className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-8 sm:col-span-7 sm:p-10">
            <div>
              <IndexRule index="01" label="The approach" />
              <h2 className="mt-4 text-3xl leading-[1.1] tracking-tight text-text sm:text-4xl">
                What a {service.title.toLowerCase()} actually involves
              </h2>
            </div>
            <p className="mt-6 max-w-lg font-serif text-[17px] leading-relaxed text-text/65">
              {service.marketing || service.tagline}
            </p>
          </MotionItem>

          {technicalSpecs.length > 0 && (
            <MotionItem className="rounded-3xl border border-line bg-surface-muted px-7 pb-7 pt-6 sm:col-span-5">
              <IndexRule index="02" label="Specification" />
              <ul className="mt-5">
                {technicalSpecs.map((spec) => (
                  <li
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 border-t border-line py-2.5 last:pb-0"
                  >
                    <span className="text-sm text-text/80">{spec.label}</span>
                    <span className="font-mono text-xs tabular-nums text-text/45">
                      {spec.value}
                    </span>
                  </li>
                ))}
              </ul>
            </MotionItem>
          )}
        </MotionStagger>
      </section>

      {inclusions.length > 0 && (
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
            <MotionWrapper className="max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Standard inclusions
              </p>
              <h2 className="mt-4 text-3xl leading-[1.05] tracking-tight text-text sm:text-5xl">
                Every visit covers{" "}
                <span className="font-editorial italic text-text/60">all of it.</span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text/60">
                Nothing below is an upgrade or an add-on. It is what the quoted
                price already includes.
              </p>
            </MotionWrapper>

            <MotionWrapper className="mt-10 rounded-3xl border border-line bg-bg px-6 py-3 sm:px-8">
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-line py-3.5 last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
                  >
                    <Tick />
                    <span className="text-[15px] leading-snug text-text/75">{item}</span>
                  </li>
                ))}
              </ul>
            </MotionWrapper>
          </div>
        </section>
      )}

      {testimonial.quote && (
        <section className="relative isolate overflow-hidden bg-surface-warm">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(55% 50% at 50% 35%, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0) 70%)",
            }}
          />
          <Grain opacity={0.07} />

          <MotionWrapper className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
            <blockquote className="font-editorial text-2xl italic leading-snug text-text sm:text-4xl">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-8 font-mono text-[10px] uppercase tracking-widest text-text/45">
              {testimonial.citation}
            </figcaption>
          </MotionWrapper>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="border-y border-line bg-bg">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
            <MotionWrapper className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Questions
              </p>
              <h2 className="mt-4 text-3xl leading-[1.05] tracking-tight text-text sm:text-5xl">
                Before you{" "}
                <span className="font-editorial italic text-text/60">ask.</span>
              </h2>
            </MotionWrapper>

            <MotionWrapper className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface">
              {faqs.map((faq, i) => (
                <details key={faq.q} open={i === 0} className="group border-b border-line last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 transition-colors duration-200 hover:bg-surface-muted marker:hidden sm:px-7 [&::-webkit-details-marker]:hidden">
                    <span className="flex-1 text-base font-semibold tracking-tight text-text sm:text-lg">
                      {faq.q}
                    </span>
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-text/50 transition-colors duration-300 ease-out group-hover:border-line-strong group-open:border-accent group-open:bg-accent group-open:text-white">
                      <span className="relative block h-3.5 w-3.5 transition-transform duration-300 ease-out group-open:rotate-45">
                        <span className="absolute left-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-current" />
                        <span className="absolute left-1/2 top-0 h-3.5 w-px -translate-x-1/2 bg-current" />
                      </span>
                    </span>
                  </summary>
                  <p className="max-w-2xl px-6 pb-6 text-[15px] leading-relaxed text-text/60 sm:px-7">
                    {faq.a}
                  </p>
                </details>
              ))}
            </MotionWrapper>
          </div>
        </section>
      )}

      <section id="quote" className="relative isolate scroll-mt-24 overflow-hidden bg-surface-warm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 45% at 50% 30%, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0) 70%)",
          }}
        />
        <Grain opacity={0.07} />

        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <MotionWrapper className="lg:sticky lg:top-24">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Get started
            </p>
            <h2 className="mt-4 text-3xl leading-[1.05] tracking-tight text-text sm:text-5xl">
              Request your {service.title.toLowerCase()} quote
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text/60">
              {priced
                ? `Published rate ${service.price} ${service.priceUnit}. Send your details and we'll confirm the exact scope and total before anyone books.`
                : "Tell us about your space and we'll come back with an exact figure — no obligation, no payment details."}
            </p>

            <ul className="mt-7 space-y-3">
              {assurances.map((line) => (
                <li key={line} className="flex items-center gap-3 text-[15px] text-text/70">
                  <Tick className="mt-0 text-accent" />
                  {line}
                </li>
              ))}
            </ul>

            {sidebarInclusions.length > 0 && (
              <div className="mt-7 rounded-3xl border border-line bg-surface p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-text/45">
                  Included in this service
                </p>
                <ul className="mt-4 space-y-2.5">
                  {sidebarInclusions.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-snug text-text/70">
                      <Tick className="text-text/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a href={TEL} className={`${PILL_OUTLINE} mt-7`}>
              <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
              {SITE_CONFIG.phone}
            </a>
          </MotionWrapper>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <QuoteForm
              context={{
                serviceSlug: service.slug,
                serviceTitle: service.title,
                source: "service-detail",
              }}
            />
          </div>
        </div>
      </section>
    </article>
  );
}
