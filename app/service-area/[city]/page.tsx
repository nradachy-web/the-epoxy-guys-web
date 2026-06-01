import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { faqs, services, serviceAreas, site } from "@/lib/site";
import { JsonLd, breadcrumbSchema, cityServiceSchema, faqSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
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

      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-pretty text-lg leading-relaxed text-mist">
              Whether you are upgrading a garage in {area.city}, finishing a basement, or coating a
              commercial floor, The Epoxy Guys bring the same owner-on-site care to every job. We
              diamond grind and prep the slab properly, install premium polyaspartic systems that cure
              in {site.cure}, and back the finished floor with a {site.warrantyYears}-year warranty.
              Most homeowner projects are done in a single day, and we phase larger commercial jobs around your hours.
            </p>
          </div>

          <SectionHeading className="mt-14" eyebrow="What we install" title={<>Floor coatings for {area.city} homes &amp; businesses.</>} />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topServices.map((s) => (
              <RevealItem key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group panel flex h-full items-start gap-3.5 rounded-2xl p-5 transition-transform hover:-translate-y-1">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-slate-800 text-molten-bright">
                    <Icon name={s.icon} size={19} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base text-bone">{s.navLabel}</h3>
                    <p className="mt-1 text-sm text-ash">{s.promise}</p>
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
          <h3 className="font-display text-sm uppercase tracking-[0.18em] text-ash">Nearby areas we serve</h3>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {nearby.map((n) => (
              <Link key={n.slug} href={`/service-area/${n.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-slate-800/60 px-3.5 py-1.5 text-sm text-mist transition-colors hover:border-molten/40 hover:text-bone">
                <Icon name="pin" size={13} className="text-molten" /> {n.city}
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
