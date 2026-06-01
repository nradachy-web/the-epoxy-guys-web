import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { faqs, finishes, services, site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: `${site.url}/services/${s.slug}/` },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      url: `${site.url}/services/${s.slug}/`,
      images: [{ url: s.image, width: 1200, height: 800, alt: s.name }],
    },
  };
}

const quickFacts = [
  { icon: "clock", label: "One-day install" },
  { icon: "shield", label: `${site.warrantyYears}-year warranty` },
  { icon: "check", label: `From ${site.priceFrom} / sq ft` },
  { icon: "user", label: "Owner on every job" },
];

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = service.finishes
    .map((slug) => finishes.find((f) => f.slug === slug))
    .filter(Boolean) as typeof finishes;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const pageFaqs = faqs.slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service.slug)!,
          faqSchema(pageFaqs),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.name, url: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={service.category}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.navLabel, href: `/services/${service.slug}` },
        ]}
        title={service.headline}
        lead={service.intro}
        image={service.image}
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

      {/* problem -> outcome + quick facts */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="h-px w-7 bg-molten" /> The problem
              </span>
              <p className="mt-4 text-pretty text-2xl leading-snug text-bone sm:text-[1.7rem]">
                {service.problem}
              </p>
              <div className="mt-8 rounded-2xl border border-molten/20 bg-molten/[0.06] p-6">
                <span className="eyebrow inline-flex items-center gap-2">
                  <span className="h-px w-7 bg-molten" /> The result
                </span>
                <p className="mt-3 text-pretty text-lg leading-relaxed text-mist">{service.outcome}</p>
              </div>

              <div className="mt-10">
                <h3 className="font-display text-sm uppercase tracking-[0.18em] text-ash">Ideal for</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {service.idealFor.map((x) => (
                    <span key={x} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-slate-800/60 px-3.5 py-1.5 text-sm text-mist">
                      <Icon name="check" size={14} className="text-molten" /> {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* sticky quick-facts card */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="panel molten-edge rounded-2xl p-6">
                <h3 className="font-display text-xl text-bone">{service.name}</h3>
                <ul className="mt-5 space-y-3">
                  {quickFacts.map((q) => (
                    <li key={q.label} className="flex items-center gap-3 text-sm text-mist">
                      <span className="grid h-8 w-8 place-items-center rounded-lg border border-molten/25 bg-molten/10 text-molten-bright">
                        <Icon name={q.icon} size={16} />
                      </span>
                      {q.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2.5">
                  <Button href={`/quote?service=${service.slug}`} className="w-full" icon={<Icon name="arrow" size={16} />}>
                    Get my free quote
                  </Button>
                  <Button href={site.phoneHref} variant="phone" className="w-full" icon={<Icon name="phone" size={16} />}>
                    Call {site.phone}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* benefits */}
      <Section className="bg-slate-900/40">
        <Container>
          <SectionHeading
            eyebrow="Why it is worth it"
            title={
              <>
                What you get with <span className="molten-text">The Epoxy Guys</span>.
              </>
            }
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <RevealItem key={b.title}>
                <div className="panel flex h-full gap-4 rounded-2xl p-6">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-molten/25 bg-molten/10 text-molten-bright">
                    <Icon name="sparkle" size={18} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-bone">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ash">{b.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* related finishes */}
      {related.length ? (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Finishes"
              title={
                <>
                  Popular finishes for <span className="molten-text">this space</span>.
                </>
              }
              lead="A few of the looks customers choose for this kind of space."
            />
            <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {related.map((f) => (
                <RevealItem key={f.slug}>
                  <Link href={`/finishes#${f.slug}`} className="group relative block aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(f.image)} alt={f.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,11,0.9), transparent 60%)" }} />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-display text-lg text-bone">{f.name}</h3>
                      <p className="text-xs text-molten-bright">{f.tagline}</p>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      <ProcessTimeline />
      <Testimonials heading />

      <CtaBand title="Ready to transform your floor?" />

      <FaqSection faqs={pageFaqs} />

      {/* other services */}
      <Section className="bg-slate-900/40">
        <Container>
          <SectionHeading eyebrow="Keep exploring" title="Other services you might need" />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3">
            {others.map((o) => (
              <RevealItem key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group panel flex h-full items-start gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-slate-800 text-molten-bright">
                    <Icon name={o.icon} size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-bone">{o.navLabel}</h3>
                    <p className="mt-1 text-sm text-ash">{o.promise}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
