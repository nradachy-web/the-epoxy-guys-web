import type { Metadata } from "next";
import Link from "next/link";
import { counties, serviceAreas, site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section, SheetHeader } from "@/components/ui/Primitives";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Service Area: Epoxy Flooring Across Genesee County, MI",
  description:
    "The Epoxy Guys install epoxy and concrete floors across Flint, Grand Blanc, Fenton, Davison, Burton, Flushing, Swartz Creek, Linden, Clio, Lapeer and the surrounding mid-Michigan area.",
  alternates: { canonical: `${site.url}/service-area/` },
};

export default function ServiceAreaHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Area", url: "/service-area" },
        ])}
      />
      <PageHero
        eyebrow="Where we work"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Service Area", href: "/service-area" },
        ]}
        title={
          <>
            Serving the <span className="molten-text">Flint metro</span> and mid-Michigan.
          </>
        }
        lead={`Based in ${site.address.city}, we bring one-day floors to homes and businesses across Genesee County and the counties around it.`}
      />

      <Section>
        <Container>
          <SheetHeader index="01" title="Towns We Cover" />
          <div className="mt-12 max-w-2xl">
            <h2 className="head-sans text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
              A short drive from Burton, in every direction.
            </h2>
            <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
              We keep our range tight on purpose, so the owner is on every job. Pick a town below to read
              how we work in your area, or call and we will tell you straight if you are in range.
            </p>
          </div>

          {/* the towns as a quiet ruled register: one hairline row per town */}
          <RevealGroup className="mt-16 sm:mt-20">
            {serviceAreas.map((a, i) => (
              <RevealItem key={a.slug} className="border-t border-line last:border-b">
                <Link
                  href={`/service-area/${a.slug}`}
                  className="group grid items-baseline gap-x-6 gap-y-3 py-8 sm:grid-cols-[3.5rem_minmax(0,12rem)_1fr_auto] sm:py-10"
                >
                  <span className="mono-label tnum text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="head-sans text-xl text-ink transition-colors group-hover:text-accent sm:text-[1.4rem]">
                      {a.city}
                    </h3>
                    <p className="mono-label mt-1.5">{a.county}</p>
                  </div>
                  <p className="max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                    {a.blurb}
                  </p>
                  <span className="mono-label inline-flex items-center gap-2 text-ink transition-colors group-hover:text-accent sm:justify-self-end">
                    {a.city} floors
                    <span
                      className="transition-transform duration-300 group-hover:translate-x-[3px]"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <section className="relative bg-paper">
        <Container>
          <div className="border-t border-line pt-28 sm:pt-36">
            <SheetHeader index="02" title="Counties Served" />
            <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-20">
              {/* the counties as a quiet ruled list, not glowing chips */}
              <ul className="border-t border-line">
                {counties.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <span className="head-sans text-[1.05rem] text-ink">{c}</span>
                    <span className="mono-label tnum">
                      {String(i + 1).padStart(2, "0")} / {counties.length}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="lg:pt-2">
                <p className="text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                  Not sure if you are in our range? Call us and we will tell you straight. If you are
                  nearby, we will come take a look.
                </p>
                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
                  <a
                    href={site.phoneHref}
                    className="mono-label tnum text-ink transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
