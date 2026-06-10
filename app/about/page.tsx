import type { Metadata } from "next";
import { site, googleRating } from "@/lib/site";
import { asset } from "@/lib/asset";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProcessVideo } from "@/components/sections/ProcessVideo";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section, SheetHeader } from "@/components/ui/Primitives";
import { SpecTable } from "@/components/ui/Spec";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us: A Flint, MI Family Business",
  description:
    "Meet David and Michelle, the owner-operated team behind The Epoxy Guys. Rooted in Flint, hands-on on every job, and backing every floor with a 15-year warranty.",
  alternates: { canonical: `${site.url}/about/` },
};

const values = [
  { no: "01", title: "Owner on every job", body: "David is on site for your project from prep to topcoat. The person who quotes your floor is the person who pours it." },
  { no: "02", title: "Prep, never skipped", body: "We diamond grind, repair, and manage moisture on every floor. It is the unglamorous step that makes the warranty real." },
  { no: "03", title: "Honest, no pressure", body: "Clear quotes, fair pricing, and straight answers. We would rather earn a referral than push a sale." },
  { no: "04", title: "Local and family-owned", body: "We live and work in Genesee County. Our reputation is our neighbors, so we treat every floor like it is our own." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />
      <PageHero
        eyebrow="Our story"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        title={
          <>
            A family business built on <span className="molten-text">doing right</span> by people.
          </>
        }
        lead="The Epoxy Guys is David and Michelle Tougas, a hands-on Genesee County team that has spent decades putting customers first."
        image="/photos/service-polyaspartic.jpg"
      />

      {/* ---- the owner story: asymmetric, hairline structure, one serif moment ---- */}
      <Section className="bg-paper">
        <Container>
          <SheetHeader index="01" title="The Owners" />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal className="max-w-2xl">
              <div className="space-y-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                <p>
                  From a young age, David learned that service is everything. He spent his early years
                  working across Genesee, Oakland, and Lapeer counties, and he learned that building a
                  real relationship with a customer is what separates a good job from a great one. Get
                  to know what someone actually wants, deliver it within their budget, and exceed what
                  they expected.
                </p>
                <p>
                  That love of service led David into real estate and property management. Being from
                  the Flint area, he has a genuine passion for the city and its comeback. For the better
                  part of fifteen years he worked to rehabilitate housing in Flint, getting to know each
                  tenant and helping families find safe, quality places to live.
                </p>
                <p>
                  The Epoxy Guys grew straight out of that same obsession with quality and service. Today
                  David and Michelle run it as a close family business, using premium polyaspartic
                  systems and never cutting corners on prep. The goal is simple: give Genesee County
                  floors that look incredible and actually last, and treat every customer the way we
                  would want to be treated.
                </p>
              </div>

              {/* the page's single serif moment: the owner pull-quote */}
              <blockquote className="mt-12 border-t border-line pt-8">
                <p className="display-quote text-balance text-2xl text-ink sm:text-[1.7rem]">
                  &ldquo;Quality process, quality product, quality finish. That is the whole job.&rdquo;
                </p>
                <footer className="mono-label mt-5">
                  {site.owner.name} <span className="text-muted">/ {site.owner.title}</span>
                </footer>
              </blockquote>
            </Reveal>

            <Reveal>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/photos/graded/about-crew.jpg")}
                  alt="The Epoxy Guys crew staging materials outside a garage job"
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
                <figcaption className="plate-caption mt-3">
                  01 / Genesee County, MI · On the job
                </figcaption>
              </figure>

              {/* real facts as a datasheet, not floating badges */}
              <div className="mt-10">
                <SpecTable
                  rows={[
                    { key: "Owner on site", value: "Every job" },
                    { key: "Based in", value: `${site.address.city}, MI` },
                    { key: "Warranty", value: `${site.warrantyYears} yr`, accent: true },
                    {
                      key: "Google",
                      value: (
                        <span className="tnum">
                          {googleRating.score} ★ ({googleRating.count})
                        </span>
                      ),
                    },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- what we stand for: numbered hairline list, no cards ---- */}
      <Section className="bg-surface">
        <Container>
          <SheetHeader index="02" title="What We Stand For" />
          <div className="mt-12 max-w-2xl">
            <h2 className="head-sans text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
              The promises behind every floor.
            </h2>
          </div>

          <ol className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-2">
            {values.map((v) => (
              <li key={v.title} className="border-t border-line pt-6">
                <Reveal>
                  <span className="mono-label tnum text-accent">
                    {v.no} <span className="text-muted">/ 04</span>
                  </span>
                  <h3 className="head-sans mt-3 text-2xl text-ink sm:text-[1.7rem]">{v.title}</h3>
                  <p className="mt-4 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                    {v.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* one calm CTA, restated plainly */}
          <div className="mt-20 flex flex-col items-start gap-5 border-t border-line pt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
              Talk to the owner who will be standing on your floor.
            </p>
            <div className="flex items-center gap-7">
              <a
                href={asset("/quote/")}
                className="group inline-flex items-center gap-2.5 border border-ink px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Request a site visit
                <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
              </a>
              <a href={site.phoneHref} className="mono-label tnum text-ink transition-colors hover:text-accent">
                {site.phone}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <ProcessVideo index="03" title="The Process" heading="Watch a floor go in, start to finish." className="bg-surface" />
      <ProcessTimeline film={false} />
      <Testimonials />
      <CtaBand />
    </>
  );
}
