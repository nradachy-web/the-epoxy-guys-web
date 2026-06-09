import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FinishesShowcase } from "@/components/sections/FinishesShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Epoxy & Concrete Floor Coating Services",
  description:
    "Garage, basement, commercial, polyaspartic, polished concrete and more. Explore every epoxy and concrete coating service from The Epoxy Guys in Genesee County, MI.",
  alternates: { canonical: `${site.url}/services/` },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />
      <PageHero
        eyebrow="Our services"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        title={
          <>
            Every kind of floor coating, <span className="text-accent">done right</span>.
          </>
        }
        lead="From a one-day garage makeover to a seamless commercial kitchen, we prep it properly and finish it to last. Find the service that fits your space."
        image="/photos/service-garage.jpg"
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/quote" size="lg" icon={<Icon name="arrow" size={18} />}>
            Get my free quote
          </Button>
          <Button href={site.phoneHref} variant="outline" size="lg" icon={<Icon name="phone" size={17} />}>
            {site.phone}
          </Button>
        </div>
      </PageHero>

      <ServicesGrid heading={false} />
      <ProcessTimeline />
      <FinishesShowcase limit={8} />
      <CtaBand />
    </>
  );
}
