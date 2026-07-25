import Hero from "@/components/Hero";
import ServiceBento from "@/components/ServiceBento";
import BookingWizard from "@/components/BookingWizard";
import { getServiceList } from "@/payload/integration/getServiceView";

/**
 * HOME — architectural assembly. Header + footer are global (see layout.tsx).
 *
 * Rhythm: Hero (spacious, py-40, bg) → Bento (spacious wide, white band) →
 * Booking (dense quote form, bg) — bands split by 1px slate-200/60 hairlines.
 */
export default async function Home() {
  const list = await getServiceList();
  const titles = Object.fromEntries(list.map((s) => [s.slug, s.title]));

  return (
    <>
      <div className="bg-bg">
        <Hero />
      </div>

      <div id="services" className="border-y border-slate-200/60 bg-white">
        <ServiceBento />
      </div>

      <div id="book" className="bg-bg">
        <BookingWizard titles={titles} />
      </div>
    </>
  );
}
