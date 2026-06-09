import Link from "next/link";
import { finishes } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Container, Section, SheetHeader } from "@/components/ui/Primitives";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * FINISHES — a squared plate index, captioned like the work archive. No rounded
 * swatch cards or hover-lift; the plate and its mono caption do the work.
 */
export function FinishesShowcase({ limit }: { limit?: number }) {
  const list = limit ? finishes.slice(0, limit) : finishes;
  return (
    <Section className="bg-surface-2">
      <Container>
        <SheetHeader index="03" title="Finishes" />
        <div className="mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="head-sans max-w-2xl text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
            Pick a finish, then we seal it to last.
          </h2>
          <Link href="/finishes" className="mono-label link-underline text-ink hover:text-accent">
            See all finishes →
          </Link>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((f, i) => (
            <RevealItem key={f.slug}>
              <Link href={`/finishes#${f.slug}`} className="group block">
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(f.image)}
                    alt={`${f.name} epoxy finish`}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                  <h3 className="head-sans text-[0.95rem] text-ink">{f.name}</h3>
                  <span className="mono-label tnum text-muted">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="plate-caption mt-1">{f.tagline}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
