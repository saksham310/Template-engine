import { ShieldCheck, Leaf, Users, Clock, type LucideIcon } from "lucide-react";
import Hero from "@/components/Hero";
import ServiceBento from "@/components/ServiceBento";
import BookingWizard from "@/components/BookingWizard";
import { getServiceList } from "@/payload/integration/getServiceView";
import { HOME_FEATURES, HOME_FAQS } from "@/config/site";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Leaf,
  Users,
  Clock,
};

export default async function Home() {
  const list = await getServiceList();
  const titles = Object.fromEntries(list.map((s) => [s.slug, s.title]));

  return (
    <>
      <div className="bg-bg">
        <Hero />
      </div>

      <div id="services" className="border-y border-slate-200/60 bg-white">
        <ServiceBento services={list} />
      </div>

      <section className="border-b border-slate-200/60 bg-bg">
        <div className="mx-auto max-w-7xl px-5 py-28">
          <header className="mb-10 max-w-xl">
            <p className="editorial-label text-xs tracking-widest text-text/50">
              Why Choose Us
            </p>
            <h2 className="mt-2 text-4xl tracking-tight">
              A method you can see, and measure.
            </h2>
          </header>
          <div className="grid gap-px border border-slate-200/60 bg-slate-200/60 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_FEATURES.map((f) => {
              const Icon = ICONS[f.icon] ?? ShieldCheck;
              return (
                <div key={f.title} className="bg-white p-6">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-text">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-snug text-text/60">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/60 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-28 lg:grid-cols-[1fr_1.6fr]">
          <header className="max-w-sm">
            <p className="editorial-label text-xs tracking-widest text-text/50">
              Common Questions
            </p>
            <h2 className="mt-2 text-4xl tracking-tight">
              Answered before you ask.
            </h2>
          </header>
          <dl className="divide-y divide-slate-200/60 border-t border-slate-200/60">
            {HOME_FAQS.map((faq) => (
              <div key={faq.question} className="py-5">
                <dt className="font-serif text-lg font-semibold tracking-tight text-text">
                  {faq.question}
                </dt>
                <dd className="mt-2 max-w-2xl font-serif text-[15px] leading-7 text-text/60">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div id="book" className="bg-bg">
        <BookingWizard titles={titles} />
      </div>
    </>
  );
}
