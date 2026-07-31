import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { TRUST } from "@/lib/services";
import { SITE_CONFIG } from "@/config/site";
import { Grain } from "./patterns";
import { MotionWrapper } from "./MotionWrapper";
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
  const { hero, inclusions, technicalSpecs, sidebarInclusions, faqs } = service;
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
      <section className="mx-auto max-w-7xl px-5 pt-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <Image
            src={hero.imageUrl}
            alt={`${service.title} — recent work`}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
        </div>

        <MotionWrapper className="relative z-10 grid items-stretch gap-x-10 gap-y-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="-mt-16 rounded-3xl bg-panel p-7 sm:-mt-24 sm:p-10">
            <nav className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text/45">
              <Link href="/services" className="transition-colors hover:text-text">
                Services
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-accent">{service.category}</span>
            </nav>

            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-text/70">
              {hero.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-text/10 pt-6">
              {priced && (
                <p className="flex items-baseline gap-1.5 border-r border-text/10 pr-6">
                  <span className="font-mono text-2xl font-bold tabular-nums tracking-tight text-text">
                    {service.price}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text/50">
                    {service.priceUnit}
                  </span>
                </p>
              )}
              <a href="#quote" className={PILL_SOLID}>
                Request a quote
                <span aria-hidden="true">→</span>
              </a>
              <a href={TEL} className={PILL_OUTLINE}>
                <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>

          <dl className="flex flex-col justify-between lg:pt-2">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-1 items-baseline justify-between gap-4 border-b border-line py-3.5 first:border-t first:border-line"
              >
                <dt className="font-mono text-[10px] uppercase tracking-widest text-text/45">
                  {spec.label}
                </dt>
                <dd className="font-mono text-base font-semibold tabular-nums tracking-tight text-text">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </MotionWrapper>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:py-16">
        <MotionWrapper className="grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-[1.25fr_1fr]">
          <div className="p-7 sm:p-10">
            <IndexRule index="01" label="The approach" />
            <h2 className="mt-4 text-2xl leading-[1.15] tracking-tight text-text sm:text-3xl">
              What a {service.title.toLowerCase()} actually involves
            </h2>
            <p className="mt-4 font-serif text-[17px] leading-relaxed text-text/65">
              {service.marketing || service.tagline}
            </p>
          </div>

          {technicalSpecs.length > 0 && (
            <div className="border-t border-line bg-surface-muted p-7 sm:p-8 lg:border-l lg:border-t-0">
              <IndexRule index="02" label="Specification" />
              <ul className="mt-4">
                {technicalSpecs.map((spec) => (
                  <li
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0"
                  >
                    <span className="text-sm text-text/80">{spec.label}</span>
                    <span className="font-mono text-xs tabular-nums text-text/45">
                      {spec.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </MotionWrapper>
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

      {faqs.length > 0 && (
        <section className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <MotionWrapper className="lg:sticky lg:top-24 lg:self-start">
              <IndexRule index="03" label="Questions" />
              <h2 className="mt-4 text-2xl leading-[1.15] tracking-tight text-text sm:text-3xl">
                Answered before you ask
              </h2>
              <a href={TEL} className={`${PILL_OUTLINE} mt-6`}>
                <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
                {SITE_CONFIG.phone}
              </a>
            </MotionWrapper>

            <MotionWrapper className="border-t border-line">
              {faqs.map((faq, i) => (
                <details key={faq.q} open={i === 0} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-baseline gap-4 py-4 marker:hidden [&::-webkit-details-marker]:hidden">
                    <span className="flex-1 text-base font-semibold tracking-tight text-text transition-colors duration-200 group-hover:text-accent">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative block h-3 w-3 shrink-0 text-text/35 transition-transform duration-300 ease-out group-open:rotate-45 group-open:text-accent"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-text/60">
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
