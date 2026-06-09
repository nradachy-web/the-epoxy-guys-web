import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

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

      <Section className="bg-paper pt-0">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-8 border-t border-line pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="max-w-xl">
                <span className="mono-label">Worked with us before</span>
                <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                  We would be grateful if you shared your experience, so future neighbors know what to
                  expect from David and Michelle.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 border border-ink px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Leave a review on Facebook
                  <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>
                    →
                  </span>
                </a>
                <a
                  href={site.phoneHref}
                  className="mono-label tnum text-ink transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
