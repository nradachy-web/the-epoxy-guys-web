import { site, googleRating } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Container, SheetHeader } from "@/components/ui/Primitives";
import { SpecTable } from "@/components/ui/Spec";
import { Reveal } from "@/components/ui/Reveal";

/**
 * WARRANTY / SPEC CLOSE — the page closes the way it opened, like a datasheet
 * footer. A full-width final SPEC TABLE restates the facts, with copper on the
 * 15 YR figure. One calm conversion path: request a site visit, phone in
 * tabular figures. No discount banner, no neon button, no sticky nag.
 */
export function CtaBand({
  title = "Request a site visit.",
  lead = "We come to you, measure the slab, talk finishes, and give you an honest number. No pressure, and usually a one-day install.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative bg-paper py-28 sm:py-36">
      <Container>
        <SheetHeader index="08" title="Specification" folio="Datasheet · Summary" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <Reveal>
            <div>
              <h2 className="display-h2 text-balance text-ink">{title}</h2>
              <p className="mt-6 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-2">{lead}</p>

              <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
                <a
                  href={asset("/quote/")}
                  className="group inline-flex items-center justify-center gap-2.5 border border-ink px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Request a site visit
                  <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
                </a>
                <a href={site.phoneHref} className="mono-label tnum text-ink transition-colors hover:text-accent">
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div>
              <span className="mono-label">Floor System · Summary</span>
              <SpecTable
                className="mt-4"
                rows={[
                  { key: "Cure", value: "45 to 60 min" },
                  { key: "Install", value: "1 day" },
                  { key: "Warranty", value: `${site.warrantyYears} yr`, accent: true },
                  { key: "Service Area", value: site.regionShort },
                  {
                    key: "Rating",
                    value: (
                      <span className="tnum">
                        {googleRating.score} ★ ({googleRating.count})
                      </span>
                    ),
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
