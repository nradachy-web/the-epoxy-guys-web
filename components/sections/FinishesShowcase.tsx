import Link from "next/link";
import { finishes } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function FinishesShowcase({ limit }: { limit?: number }) {
  const list = limit ? finishes.slice(0, limit) : finishes;
  return (
    <Section className="bg-slate-900/40">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Make it yours"
            title={
              <>
                Pick a finish that <span className="molten-text">turns heads</span>.
              </>
            }
            lead="Flake, metallic, quartz, glitter, polished concrete, and more. We match nearly any taste and budget, then seal it to last."
          />
          <Button href="/finishes" variant="outline" icon={<Icon name="arrow" size={16} />} className="hidden md:inline-flex">
            See all finishes
          </Button>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((f) => (
            <RevealItem key={f.slug}>
              <Link
                href={`/finishes#${f.slug}`}
                className="group relative block aspect-square min-w-0 overflow-hidden rounded-2xl border border-line transition-transform duration-500 hover:-translate-y-0.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(f.image)}
                  alt={`${f.name} epoxy finish`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(8,9,11,0.9) 5%, rgba(8,9,11,0.1) 55%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-molten-bright">
                    {f.tagline}
                  </span>
                  <h3 className="font-display mt-1 text-lg leading-tight text-bone">{f.name}</h3>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-8 md:hidden">
          <Button href="/finishes" variant="outline" className="w-full" icon={<Icon name="arrow" size={16} />}>
            See all finishes
          </Button>
        </div>
      </Container>
    </Section>
  );
}
