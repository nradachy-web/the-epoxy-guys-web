import Link from "next/link";
import { services } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ServicesGrid({
  heading = true,
  limit,
}: {
  heading?: boolean;
  limit?: number;
}) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <Section id="services">
      <Container>
        {heading ? (
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  One crew, every kind of <span className="text-accent">concrete coating</span>.
                </>
              }
              lead="Garages, basements, businesses, and everything in between. Whatever the space, we prep it right and finish it to last."
            />
            <Button href="/services" variant="outline" size="md" icon={<Icon name="arrow" size={16} />} className="hidden md:inline-flex">
              All services
            </Button>
          </div>
        ) : null}

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <RevealItem key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-line-2 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(s.image)}
                    alt={s.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-lg bg-white/95 text-ink shadow-[var(--shadow-soft)] backdrop-blur">
                    <Icon name={s.icon} size={18} />
                  </span>
                  {i === 0 ? (
                    <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-white">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl text-ink">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.promise}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Explore
                    <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-8 md:hidden">
          <Button href="/services" variant="outline" size="md" className="w-full" icon={<Icon name="arrow" size={16} />}>
            All services
          </Button>
        </div>
      </Container>
    </Section>
  );
}
