import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  faqs,
  finishes,
  googleRating,
  serviceMedia,
  services,
  site,
  testimonials,
} from "@/lib/site";
import { asset } from "@/lib/asset";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Motion";

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

const guarantees = [
  { icon: "shield", title: `${site.warrantyYears}-year warranty`, body: "Prep done right and premium polyaspartic coatings, backed in writing for fifteen years." },
  { icon: "user", title: "Owner on every job", body: "David is on site for your project. You deal with the owner, not a rotating crew of subs." },
  { icon: "check", title: "Free, no-pressure quote", body: "We measure, bring samples, and give you an honest price. No deposit to find out." },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-molten-bright" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8z" />
        </svg>
      ))}
    </div>
  );
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const media = serviceMedia[service.slug];
  const featured =
    testimonials.find((t) =>
      (t.quote + " " + t.detail).toLowerCase().includes(media.reviewMatch),
    ) ?? testimonials[0];
  const related = service.finishes
    .map((s) => finishes.find((f) => f.slug === s))
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

      {/* PROBLEM + AGITATE, with a framed photo */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="h-px w-7 bg-molten" /> The problem
              </span>
              <p className="mt-4 text-pretty text-2xl leading-snug text-bone sm:text-[1.8rem]">
                {service.problem}
              </p>
              <div className="mt-7 rounded-2xl border border-line bg-slate-900/50 p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ash">
                  <Icon name="clock" size={15} className="text-molten-bright" /> What it costs to wait
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-mist">{media.stakes}</p>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="text-sm font-medium text-ash">Common for:</span>
                {service.idealFor.map((x) => (
                  <span key={x} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-slate-800/60 px-3 py-1 text-sm text-mist">
                    {x}
                  </span>
                ))}
              </div>
            </div>

            <Reveal className="relative order-first lg:order-last">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(media.gallery[0])} alt={`${service.name} by The Epoxy Guys`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,11,0.5), transparent 55%)" }} />
                <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-void/70 text-molten-bright backdrop-blur">
                  <Icon name={service.icon} size={24} />
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* CINEMATIC PARALLAX BAND with the promise */}
      <section className="relative h-[52vh] min-h-[340px] overflow-hidden">
        <Parallax className="absolute inset-0" distance={60}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(media.gallery[1])} alt="" aria-hidden className="h-[118%] w-full object-cover" loading="lazy" />
        </Parallax>
        <div className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(8,9,11,0.85), rgba(8,9,11,0.5) 60%, rgba(8,9,11,0.7))" }} />
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">The fix</span>
            <p className="font-display mt-3 text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
              {service.promise}
            </p>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why it is worth it"
            title={
              <>
                What you get with <span className="molten-text">The Epoxy Guys</span>.
              </>
            }
            lead="No shortcuts, no surprises, and a floor engineered to outlast cheap epoxy by years."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <RevealItem key={b.title}>
                <div className="panel sheen flex h-full gap-4 rounded-2xl p-6">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-molten/25 bg-molten/10 text-molten-bright">
                    <Icon name="check" size={18} />
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

      {/* FEATURED REVIEW (social proof) */}
      <Section className="bg-slate-900/40">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Stars />
            </div>
            <blockquote className="font-display mt-6 text-balance text-2xl leading-snug text-bone sm:text-[1.8rem]">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="text-sm font-semibold text-bone">{featured.name}</span>
              <span className="text-xs text-ash">{featured.detail}</span>
            </div>
            <a
              href={googleRating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-molten-bright hover:text-bone"
            >
              {googleRating.score} stars from {googleRating.count} Google reviews
              <Icon name="arrow" size={15} />
            </a>
          </Reveal>
        </Container>
      </Section>

      {/* RELATED FINISHES */}
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
              lead="A few of the looks customers choose for this kind of project."
            />
            <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {related.map((f) => (
                <RevealItem key={f.slug}>
                  <Link href={`/finishes#${f.slug}`} className="group relative block aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border border-line transition-transform duration-500 hover:-translate-y-0.5">
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

      {/* GUARANTEE / OFFER (risk reversal) */}
      <Section className="bg-slate-900/40">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="No risk to find out"
            title={
              <>
                Your floor, <span className="molten-text">guaranteed</span>.
              </>
            }
          />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {guarantees.map((g) => (
              <RevealItem key={g.title}>
                <div className="panel molten-edge flex h-full flex-col gap-3 rounded-2xl p-6 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-molten/25 bg-molten/10 text-molten-bright">
                    <Icon name={g.icon} size={22} />
                  </span>
                  <h3 className="font-display text-lg text-bone">{g.title}</h3>
                  <p className="text-sm leading-relaxed text-ash">{g.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={`/quote?service=${service.slug}`} size="lg" icon={<Icon name="arrow" size={18} />}>
              Get my free quote
            </Button>
            <Button href={site.phoneHref} variant="outline" size="lg" icon={<Icon name="phone" size={17} />}>
              Call {site.phone}
            </Button>
          </div>
        </Container>
      </Section>

      {/* THE RESULT (dark transformation close) */}
      <section className="relative overflow-hidden border-y border-line bg-void">
        <div className="grain absolute inset-0" />
        <Container className="relative max-w-3xl py-24 text-center sm:py-28">
          <Reveal>
            <span className="eyebrow">The result</span>
            <p className="font-display mt-6 text-balance text-3xl leading-[1.18] text-bone sm:text-4xl md:text-[2.9rem]">
              {service.outcome}
            </p>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={pageFaqs} />

      <CtaBand title="Ready to transform your floor?" />

      {/* OTHER SERVICES */}
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
