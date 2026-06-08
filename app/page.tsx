import { faqs } from "@/lib/site";
import { JsonLd, faqSchema } from "@/lib/schema";
import { Hero } from "@/components/sections/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  const homeFaqs = faqs.slice(0, 5);
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <ProofBar />
      <ServicesGrid />
      <ProcessTimeline showCta />
      <GalleryPreview limit={7} />
      <Testimonials />
      <ServiceAreaSection />
      <FaqSection faqs={homeFaqs} />
      <CtaBand />
    </>
  );
}
