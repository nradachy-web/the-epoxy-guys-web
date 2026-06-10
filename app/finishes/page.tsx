import type { Metadata } from "next";
import { finishes, site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section } from "@/components/ui/Primitives";
import { SpecTable } from "@/components/ui/Spec";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Epoxy Floor Finishes: Flake, Metallic, Quartz, Glitter & More",
  description:
    "Explore epoxy and concrete floor finishes from The Epoxy Guys: flake, metallic, ceramic carpet quartz, glitter, solid color, polished concrete, stained concrete, and custom logos.",
  alternates: { canonical: `${site.url}/finishes/` },
};

export default function FinishesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Finishes", url: "/finishes" },
        ])}
      />
      <PageHero
        eyebrow="The look"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Finishes", href: "/finishes" },
        ]}
        title={
          <>
            One floor system, <span className="molten-text">endless</span> finishes.
          </>
        }
        lead="From a simple clear coat to a flowing metallic showpiece, choose the finish that fits your space, your style, and your budget. Every one is sealed to last."
        image="/photos/service-garage.jpg"
      />

      <Section>
        <Container>
          <ol>
            {finishes.map((f, i) => {
              const no = String(i + 1).padStart(2, "0");
              return (
                <li
                  key={f.slug}
                  id={f.slug}
                  className="scroll-mt-28 border-t border-line py-14 first:border-t-0 sm:py-20"
                >
                  <Reveal>
                    <article
                      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                        i % 2 ? "lg:[&>figure]:order-last" : ""
                      }`}
                    >
                      <figure className="overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset(f.image)}
                          alt={`${f.name} epoxy floor finish`}
                          width={1200}
                          height={960}
                          loading="lazy"
                          className="aspect-[5/4] w-full object-cover"
                        />
                        <figcaption className="plate-caption mt-3">
                          {no} / Genesee County, MI &middot; {f.name}
                        </figcaption>
                      </figure>
                      <div className="lg:px-2">
                        <span className="mono-label tnum text-accent">
                          {no} <span className="text-muted">/ {f.tagline}</span>
                        </span>
                        <h2 className="head-sans mt-3 text-[1.9rem] text-ink sm:text-[2.4rem]">{f.name}</h2>
                        <p className="mt-4 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                          {f.body}
                        </p>
                        <div className="mt-7">
                          <SpecTable
                            rows={[
                              { key: "Best for", value: f.bestFor },
                              ...(f.priceNote
                                ? [{ key: "Pricing", value: f.priceNote, accent: true }]
                                : []),
                            ]}
                          />
                        </div>
                        <div className="mt-8">
                          <a
                            href={asset(`/quote/?finish=${f.slug}`)}
                            className="group inline-flex items-center gap-2.5 border border-ink px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                          >
                            Request a site visit
                            <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>
                              →
                            </span>
                          </a>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      <CtaBand title="Not sure which finish is right for your space?" lead="That is what the free consultation is for. We bring samples, talk through your space, and help you pick a look you will love for years." />
    </>
  );
}
