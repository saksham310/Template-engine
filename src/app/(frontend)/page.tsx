import { ShieldCheck, Leaf, Users, Clock, Sparkles, type LucideIcon } from "lucide-react";
import Hero from "@/components/Hero";
import ServiceBento from "@/components/ServiceBento";
import BookingWizard from "@/components/BookingWizard";
import { getServiceList } from "@/payload/integration/getServiceView";
import { getHomeContent } from "@/payload/integration/getHomeContent";
import { MotionWrapper, MotionStagger, MotionItem } from "@/components/MotionWrapper";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Leaf,
  Users,
  Clock,
  Sparkles,
};

export default async function Home() {
  const [list, content] = await Promise.all([getServiceList(), getHomeContent()]);
  const titles = Object.fromEntries(list.map((s) => [s.slug, s.title]));

  return (
    <>
      <div className="bg-bg">
        <Hero content={content.hero} />
      </div>

      <div id="services" className="border-y border-line bg-surface">
        <ServiceBento services={list} heading={content.services} />
      </div>

      <section className="border-b border-line bg-bg">
        <div className="mx-auto max-w-7xl px-5 py-28">
          <MotionWrapper className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="editorial-label text-xs tracking-widest text-accent">
                {content.features.eyebrow}
              </span>
              <span className="h-px w-16 bg-fill-mid" />
            </div>
            <h2 className="mt-5 text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              {content.features.headline}{" "}
              <span className="font-editorial italic text-text/70">
                {content.features.headlineAccent}
              </span>
            </h2>
            <p className="mt-5 font-serif text-lg leading-8 text-text/60">
              {content.features.body}
            </p>
          </MotionWrapper>

          <MotionStagger className="mt-16 grid sm:grid-cols-2 sm:gap-x-16">
            {content.features.items.map((f, i) => {
              const Icon = ICONS[f.icon] ?? ShieldCheck;
              return (
                <MotionItem
                  key={f.title}
                  className="group flex gap-6 border-t border-line py-9"
                >
                  <span className="font-editorial text-6xl leading-[0.8] text-fill-mid transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-accent" strokeWidth={2} />
                      <h3 className="text-lg font-bold tracking-tight text-text">
                        {f.title}
                      </h3>
                    </div>
                    <p className="mt-3 font-serif text-[15px] leading-7 text-text/60">
                      {f.description}
                    </p>
                  </div>
                </MotionItem>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 lg:grid-cols-[0.8fr_1.6fr]">
          <header className="self-start lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="editorial-label text-xs tracking-widest text-accent">
                {content.faq.eyebrow}
              </span>
              <span className="h-px w-16 bg-fill-mid" />
            </div>
            <h2 className="mt-4 text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              {content.faq.headline}{" "}
              <span className="font-editorial italic text-text/70">
                {content.faq.headlineAccent}
              </span>
            </h2>
            <p className="mt-5 max-w-xs font-serif text-base leading-7 text-text/60">
              {content.faq.body}
            </p>
            <a
              href={content.faq.ctaHref}
              className="group mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-text/60 transition-colors hover:text-text"
            >
              {content.faq.ctaLabel}
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </header>

          <MotionStagger className="border-t border-line">
            {content.faq.items.map((faq, i) => (
              <MotionItem key={faq.question}>
              <details
                open={i === 0}
                className="group border-b border-line"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-4 py-6 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-xs tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-serif text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent group-open:text-text">
                    {faq.question}
                  </span>
                  <span className="relative mt-1.5 h-4 w-4 shrink-0 text-text/40 transition-transform duration-300 ease-out group-open:rotate-45 group-open:text-accent">
                    <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pl-9 font-serif text-[15px] leading-7 text-text/60">
                  {faq.answer}
                </p>
              </details>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <div id="book" className="bg-bg">
        <BookingWizard titles={titles} copy={content.quote} />
      </div>
    </>
  );
}
