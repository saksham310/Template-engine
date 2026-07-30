import Hero from "@/components/Hero";
import ServiceBento from "@/components/ServiceBento";
import PricingCards from "@/components/PricingCards";
import WhyUs from "@/components/WhyUs";
import FaqSection from "@/components/FaqSection";
import BookingWizard from "@/components/BookingWizard";
import { getServiceList } from "@/payload/integration/getServiceView";
import { getHomeContent } from "@/payload/integration/getHomeContent";

export default async function Home() {
  const [list, content] = await Promise.all([getServiceList(), getHomeContent()]);
  const titles = Object.fromEntries(list.map((s) => [s.slug, s.title]));

  return (
    <>
      <div className="bg-bg">
        <Hero content={content.hero} services={list} />
      </div>

      <div id="services" className="border-y border-line bg-surface">
        <ServiceBento services={list} heading={content.services} />
      </div>

      <PricingCards services={list} content={content.pricing} />

      <WhyUs
        content={content.features}
        imageUrl={list[0]?.imageUrl ?? content.hero.imageUrl}
        imageAlt={list[0] ? `${list[0].title} — recent work` : content.hero.imageAlt}
      />

      <FaqSection content={content.faq} />

      <div id="book" className="bg-bg">
        <BookingWizard titles={titles} copy={content.quote} />
      </div>
    </>
  );
}
