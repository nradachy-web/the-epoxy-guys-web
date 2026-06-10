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
import { Container, Section, SheetHeader } from "@/components/ui/Primitives";
import { SpecTable } from "@/components/ui/Spec";
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
    <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
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
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
          <Link
            href="/quote"
            className="group inline-flex items-center gap-2.5 border border-ink px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Request a site visit
            <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
          </Link>
          <a href={site.phoneHref} className="mono-label tnum text-ink transition-colors hover:text-accent">
            {site.phone}
          </a>
        </div>
      </PageHero>

      {/* PROBLEM + AGITATE: a squared figure beside a measured problem statement */}
      <Section className="bg-paper">
        <Container>
          <SheetHeader index="01" title="The Problem" />
          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="head-sans text-balance text-[1.6rem] leading-snug text-ink sm:text-[1.9rem]">
                {service.problem}
              </p>

              <div className="mt-9 border-t border-line pt-5">
                <span className="mono-label inline-flex items-center gap-2 text-accent">
                  <Icon name="clock" size={14} /> What it costs to wait
                </span>
                <p className="mt-3 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">{media.stakes}</p>
              </div>

              <div className="mt-9 border-t border-line pt-5">
                <span className="mono-label">Common for</span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.idealFor.map((x) => (
                    <span
                      key={x}
                      className="inline-flex items-center border border-line bg-surface px-3 py-1.5 text-sm text-ink-2"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Reveal className="order-first lg:order-last">
              <figure className="overflow-hidden">
                {media.video ? (
                  <video
                    className="aspect-[4/5] w-full object-cover"
                    src={asset(media.video)}
                    poster={asset(media.gallery[0])}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={`Silent footage of ${service.name.toLowerCase()} by The Epoxy Guys`}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(media.gallery[0])}
                    alt={`${service.name} by The Epoxy Guys`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                )}
                <figcaption className="plate-caption mt-3">
                  01 / Genesee County, MI · {service.navLabel}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* THE FIX: a full-bleed graded plate, text seated on a bottom gradient */}
      <section className="relative h-[52vh] min-h-[340px] overflow-hidden">
        <Parallax className="absolute inset-0" distance={60}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(media.gallery[1])} alt="" aria-hidden className="h-[118%] w-full object-cover" loading="lazy" />
        </Parallax>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,16,18,0.85), rgba(15,16,18,0.25) 55%, transparent)" }} />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-12 sm:px-10">
          <Reveal className="max-w-2xl">
            <span className="mono-label text-white/70">The fix</span>
            <p className="head-sans mt-3 text-balance text-[1.7rem] leading-tight text-white sm:text-[2.2rem] md:text-[2.6rem]">
              {service.promise}
            </p>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS: a ruled spec list, mono-indexed, no cards */}
      <Section className="bg-paper">
        <Container>
          <SheetHeader index="02" title="What You Get" />
          <div className="mt-12 max-w-2xl">
            <h2 className="head-sans text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
              What you get with The Epoxy Guys.
            </h2>
            <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
              No shortcuts, no surprises, and a floor engineered to outlast cheap epoxy by years.
            </p>
          </div>
          <RevealGroup className="mt-16 grid gap-x-14 gap-y-0 sm:grid-cols-2">
            {service.benefits.map((b, i) => (
              <RevealItem key={b.title}>
                <div className="border-t border-line py-7">
                  <span className="mono-label tnum text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="head-sans mt-3 text-xl text-ink">{b.title}</h3>
                  <p className="mt-2 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">{b.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* FEATURED REVIEW (social proof) */}
      <Section className="bg-surface">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Stars />
            </div>
            <blockquote className="head-sans mt-6 text-balance text-[1.5rem] leading-snug text-ink sm:text-[1.9rem]">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="mono-label text-ink">{featured.name}</span>
              <span className="plate-caption">{featured.detail}</span>
            </div>
            <a
              href={googleRating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 mono-label tnum text-ink transition-colors hover:text-accent"
            >
              {googleRating.score} stars / {googleRating.count} Google reviews
              <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
            </a>
          </Reveal>
        </Container>
      </Section>

      {/* RELATED FINISHES */}
      {related.length ? (
        <Section className="bg-paper">
          <Container>
            <SheetHeader index="03" title="Finishes" />
            <div className="mt-12 max-w-2xl">
              <h2 className="head-sans text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
                Popular finishes for this space.
              </h2>
              <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                A few of the looks customers choose for this kind of project.
              </p>
            </div>
            <RevealGroup className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {related.map((f, i) => (
                <RevealItem key={f.slug}>
                  <Link href={`/finishes#${f.slug}`} className="group block min-w-0">
                    <figure className="overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(f.image)}
                        alt={f.name}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <figcaption className="plate-caption mt-3 transition-colors group-hover:text-accent">
                        {String(i + 1).padStart(2, "0")} / {f.name} · {f.tagline}
                      </figcaption>
                    </figure>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      {/* GUARANTEE / OFFER (risk reversal) */}
      <Section className="bg-surface">
        <Container>
          <SheetHeader index="04" title="The Guarantee" />
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <h2 className="head-sans text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
                Your floor, guaranteed.
              </h2>
              <p className="mt-5 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                No risk to find out. The terms we stand behind, in writing, before any work begins.
              </p>
              <div className="mt-10">
                <SpecTable
                  rows={[
                    { key: "Warranty", value: `${site.warrantyYears} yr`, accent: true },
                    { key: "On site", value: "Owner, every job" },
                    { key: "Quote", value: "Free, no deposit" },
                  ]}
                />
              </div>
            </div>

            <RevealGroup>
              {guarantees.map((g) => (
                <RevealItem key={g.title}>
                  <div className="flex gap-5 border-t border-line py-7">
                    <span className="mt-0.5 shrink-0 text-accent">
                      <Icon name={g.icon} size={20} />
                    </span>
                    <div>
                      <h3 className="head-sans text-xl text-ink">{g.title}</h3>
                      <p className="mt-2 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">{g.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="mt-14 flex flex-col items-start gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:gap-7">
            <Link
              href={`/quote?service=${service.slug}`}
              className="group inline-flex items-center gap-2.5 border border-ink px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Request a site visit
              <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
            </Link>
            <a href={site.phoneHref} className="mono-label tnum text-ink transition-colors hover:text-accent">
              {site.phone}
            </a>
          </div>
        </Container>
      </Section>

      {/* THE RESULT (transformation close) */}
      <section className="relative border-y border-line bg-paper">
        <Container className="max-w-3xl py-24 text-center sm:py-28">
          <Reveal>
            <span className="mono-label">The result</span>
            <p className="head-sans mt-6 text-balance text-[1.9rem] leading-[1.18] text-ink sm:text-[2.4rem] md:text-[2.8rem]">
              {service.outcome}
            </p>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={pageFaqs} />

      <CtaBand title="Ready to transform your floor?" />

      {/* OTHER SERVICES */}
      <Section className="bg-surface">
        <Container>
          <SheetHeader index="05" title="Keep Exploring" />
          <div className="mt-12 max-w-2xl">
            <h2 className="head-sans text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
              Other services you might need.
            </h2>
          </div>
          <RevealGroup className="mt-12 grid gap-x-14 sm:grid-cols-3">
            {others.map((o) => (
              <RevealItem key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group flex h-full flex-col border-t border-line py-7">
                  <span className="text-accent">
                    <Icon name={o.icon} size={22} />
                  </span>
                  <h3 className="head-sans mt-4 text-xl text-ink transition-colors group-hover:text-accent">
                    {o.navLabel}
                  </h3>
                  <p className="mt-2 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">{o.promise}</p>
                  <span className="mono-label mt-5 inline-flex items-center gap-2 text-ink transition-colors group-hover:text-accent">
                    View service
                    <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
