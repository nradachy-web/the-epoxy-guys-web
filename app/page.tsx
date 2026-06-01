import { faqs, finishes, serviceAreas } from "@/lib/site";
import { JsonLd, faqSchema } from "@/lib/schema";
import { Hero } from "@/components/sections/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
import { Marquee } from "@/components/ui/Motion";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { FinishesShowcase } from "@/components/sections/FinishesShowcase";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { WhyUs } from "@/components/sections/WhyUs";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  const homeFaqs = faqs.slice(0, 6);
  const marquee = [
    ...finishes.map((f) => f.name),
    ...serviceAreas.map((a) => a.city),
  ];
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <ProofBar />
      <div className="border-b border-line bg-void py-5">
        <Marquee items={marquee} />
      </div>
      <ServicesGrid />
      <StatsBand />
      <FinishesShowcase limit={8} />
      <ProcessTimeline showCta />
      <WhyUs />
      <GalleryPreview limit={7} />
      <Testimonials />
      <ServiceAreaSection />
      <FaqSection faqs={homeFaqs} />
      <CtaBand />
    </>
  );
}
