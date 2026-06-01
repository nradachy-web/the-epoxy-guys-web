import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Reviews & Testimonials, Genesee County MI",
  description:
    "Read what Genesee County homeowners say about their epoxy floors from The Epoxy Guys. Real reviews on metallic basements, ceramic carpet garages, and more.",
  alternates: { canonical: `${site.url}/reviews/` },
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Reviews", url: "/reviews" },
        ])}
      />
      <PageHero
        eyebrow="Customer reviews"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Reviews", href: "/reviews" },
        ]}
        title={
          <>
            Don&apos;t take our word for it. <span className="molten-text">Take theirs</span>.
          </>
        }
        lead="Customer service is our top priority. Here is what a few of our Genesee County customers had to say about working with David and Michelle."
      />

      <Testimonials heading={false} />

      <Section className="pt-0">
        <Container className="max-w-2xl text-center">
          <p className="text-pretty text-mist">
            Worked with us before? We would be grateful if you shared your experience so future
            neighbors know what to expect.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.facebook} external variant="outline" icon={<Icon name="arrow" size={16} />}>
              Leave a review on Facebook
            </Button>
            <Button href={site.phoneHref} variant="phone" icon={<Icon name="phone" size={16} />}>
              {site.phone}
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
