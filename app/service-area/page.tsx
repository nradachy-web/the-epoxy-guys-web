import type { Metadata } from "next";
import Link from "next/link";
import { counties, serviceAreas, site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
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
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((a) => (
              <RevealItem key={a.slug}>
                <Link
                  href={`/service-area/${a.slug}`}
                  className="group panel molten-edge flex h-full flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-molten/25 bg-molten/10 text-molten-bright">
                      <Icon name="pin" size={20} />
                    </span>
                    <div>
                      <h2 className="font-display text-xl text-bone">{a.city}</h2>
                      <p className="text-xs text-ash">{a.county}</p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ash">{a.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-molten-bright">
                    {a.city} epoxy floors
                    <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-12 rounded-2xl border border-line bg-slate-900/50 p-7">
            <h3 className="font-display text-sm uppercase tracking-[0.18em] text-ash">Counties we serve</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {counties.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-slate-800/60 px-3.5 py-1.5 text-sm text-mist">
                  <Icon name="pin" size={13} className="text-molten" /> {c}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-ash">
              Not sure if you are in our range? Call us at{" "}
              <a href={site.phoneHref} className="text-molten-bright">{site.phone}</a>. If you are nearby, we will come take a look.
            </p>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
