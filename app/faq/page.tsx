import type { Metadata } from "next";
import { faqs, site } from "@/lib/site";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Epoxy Flooring FAQ, Flint MI",
  description:
    "Answers to common questions about epoxy floors: install time, polyaspartic vs epoxy, peeling, cost, winter installs, finishes, and the areas we serve in Michigan.",
  alternates: { canonical: `${site.url}/faq/` },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "FAQ", url: "/faq" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Questions, answered"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
        title={
          <>
            The answers before you <span className="text-accent">ask</span>.
          </>
        }
        lead={`Still have a question after reading these? Call us anytime at ${site.phone}.`}
      />
      <FaqSection faqs={faqs} heading={false} />
      <CtaBand />
    </>
  );
}
