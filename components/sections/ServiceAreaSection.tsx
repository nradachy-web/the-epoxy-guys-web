import Link from "next/link";
import { counties, serviceAreas, site } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ServiceAreaSection() {
  return (
    <Section id="service-area">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Where we work"
              title={
                <>
                  Proudly serving <span className="molten-text">Genesee County</span> and beyond.
                </>
              }
              lead={`Based in ${site.address.city}, we install floors across the greater Flint metro and the surrounding mid-Michigan counties.`}
            />
            <div className="mt-7 flex flex-wrap gap-2">
              {counties.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-slate-800/60 px-3 py-1 text-xs text-mist">
                  <Icon name="pin" size={13} className="text-molten" />
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/service-area" variant="outline" icon={<Icon name="arrow" size={16} />}>
                Explore service area
              </Button>
            </div>
          </div>

          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.04}>
            {serviceAreas.map((a) => (
              <RevealItem key={a.slug}>
                <Link
                  href={`/service-area/${a.slug}`}
                  className="group flex items-center gap-2 rounded-xl border border-line bg-slate-900/50 px-3.5 py-3 transition-colors hover:border-molten/40 hover:bg-slate-800/70"
                >
                  <Icon name="pin" size={15} className="text-ash transition-colors group-hover:text-molten-bright" />
                  <span className="truncate text-sm font-medium text-mist group-hover:text-bone">{a.city}</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
