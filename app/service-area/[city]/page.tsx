import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { faqs, services, serviceAreas, site } from "@/lib/site";
import { JsonLd, breadcrumbSchema, cityServiceSchema, faqSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section, SheetHeader } from "@/components/ui/Primitives";
import { SpecTable } from "@/components/ui/Spec";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) return {};
  return {
    title: `Epoxy Floor Coatings in ${area.city}, MI | Garage, Basement & Commercial`,
    description: `One-day epoxy and concrete floor coatings in ${area.city}, ${area.county}. Garage floors, basements, commercial, polished concrete. 15-year warranty. Free quote from The Epoxy Guys.`,
    alternates: { canonical: `${site.url}/service-area/${area.slug}/` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) notFound();

  const nearby = serviceAreas.filter((a) => a.slug !== area.slug).slice(0, 5);
  const topServices = services.slice(0, 6);
  const pageFaqs = faqs.slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          cityServiceSchema(area.slug)!,
          faqSchema(pageFaqs),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service Area", url: "/service-area" },
            { name: area.city, url: `/service-area/${area.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`${area.county}, Michigan`}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Service Area", href: "/service-area" },
          { name: area.city, href: `/service-area/${area.slug}` },
        ]}
        title={
          <>
            Epoxy &amp; concrete floors in <span className="molten-text">{area.city}</span>, MI.
          </>
        }
        lead={area.blurb}
        image={area.image}
      >
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
          <Button href="/quote" size="lg" icon={<span aria-hidden>→</span>}>
            Request a site visit
          </Button>
          <a href={site.phoneHref} className="mono-label tnum text-ink transition-colors hover:text-accent">
            {site.phone}
          </a>
        </div>
      </PageHero>

      <Section>
        <Container>
          <SheetHeader index="01" title={`In ${area.city}`} />
          <div className="mt-12 grid gap-12 lg:grid-cols-[58%_42%] lg:gap-16">
            <div className="max-w-2xl">
              <h2 className="head-sans text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
                The same owner-on-site care, on every {area.city} slab.
              </h2>
              <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                Whether you are upgrading a garage in {area.city}, finishing a basement, or coating a
                commercial floor, The Epoxy Guys bring the same care to every job. We diamond grind and
                prep the slab properly, install premium polyaspartic systems that cure in {site.cure}, and
                back the finished floor with a {site.warrantyYears}-year warranty. Most homeowner projects
                are done in a single day, and we phase larger commercial jobs around your hours.
              </p>
            </div>
            <div className="lg:pt-2">
              <span className="mono-label">The system</span>
              <SpecTable
                className="mt-4"
                rows={[
                  { key: "Cure", value: site.cure },
                  { key: "Install", value: "1 day" },
                  { key: "Warranty", value: `${site.warrantyYears} yr`, accent: true },
                  { key: "County", value: area.county },
                ]}
              />
            </div>
          </div>

          <div className="mt-20 border-t border-line pt-4">
            <span className="index-label">
              02 <span className="text-muted">/ What we install for {area.city}</span>
            </span>
          </div>
          <RevealGroup className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {topServices.map((s) => (
              <RevealItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start gap-3.5 bg-surface p-6 transition-colors hover:bg-surface-2"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-line bg-paper text-ink transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon name={s.icon} size={19} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="head-sans text-base text-ink transition-colors group-hover:text-accent">
                      {s.navLabel}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{s.promise}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Testimonials />

      <Section className="pt-0">
        <Container>
          <div className="border-t border-line pt-4">
            <span className="mono-label">Nearby areas we serve</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/service-area/${n.slug}`}
                className="group inline-flex items-center gap-2 border border-line bg-surface px-3.5 py-2 text-sm text-ink-2 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name="pin" size={13} className="text-muted transition-colors group-hover:text-accent" /> {n.city}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title={`Ready for a new floor in ${area.city}?`} />
      <FaqSection faqs={pageFaqs} />
    </>
  );
}
