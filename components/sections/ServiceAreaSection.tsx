import Link from "next/link";
import { serviceAreas, counties, site } from "@/lib/site";
import { Container, SheetHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SERVICE AREA — a quiet ruled register of towns, not a chip grid with glow.
 * Set as an indexed list, the way a spec sheet would catalogue its locations.
 */
export function ServiceAreaSection() {
  return (
    <section id="service-area" className="relative bg-surface-2 py-28 sm:py-36">
      <Container>
        <SheetHeader index="06" title="Service Area" folio="Sheet 07 / 07" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div>
              <h2 className="head-sans max-w-md text-balance text-[1.9rem] text-ink sm:text-[2.4rem]">
                Based in {site.address.city}. Working across mid-Michigan.
              </h2>
              <p className="mt-5 max-w-sm text-pretty leading-relaxed text-ink-2">
                We install floors across the greater Flint metro and the surrounding counties.
              </p>
              <div className="mt-8 flex flex-col gap-1 border-t border-line pt-5">
                {counties.map((c) => (
                  <span key={c} className="mono-label py-1">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {serviceAreas.map((a, i) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-area/${a.slug}`}
                    className="group flex items-baseline gap-4 border-t border-line py-3.5 transition-colors hover:text-accent"
                  >
                    <span className="mono-label tnum">{String(i + 1).padStart(2, "0")}</span>
                    <span className="head-sans text-[1.05rem] text-ink transition-colors group-hover:text-accent">
                      {a.city}
                    </span>
                    <span className="mono-label ml-auto opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
