import { faqs } from "@/lib/site";
import { JsonLd, faqSchema } from "@/lib/schema";
import { Hero } from "@/components/sections/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
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
      {/* 00 hero · 01 owner · 02 the system · 03 finish systems · 04 work
          · 05 proof · 06 service area · 07 faq + spec close */}
      <Hero />
      <ProofBar />
      <ProcessTimeline />
      <ServicesGrid />
      <GalleryPreview limit={6} />
      <Testimonials />
      <ServiceAreaSection />
      <FaqSection faqs={homeFaqs} />
      <CtaBand />
    </>
  );
}
