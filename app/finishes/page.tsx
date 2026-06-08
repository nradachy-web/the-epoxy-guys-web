import type { Metadata } from "next";
import { finishes, site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
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
          <div className="space-y-20 sm:space-y-28">
            {finishes.map((f, i) => (
              <Reveal key={f.slug}>
                <article id={f.slug} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={`relative overflow-hidden rounded-3xl border border-line ${i % 2 ? "lg:order-last" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(f.image)} alt={`${f.name} epoxy floor finish`} loading="lazy" className="aspect-[5/4] w-full object-cover" />
                  </div>
                  <div>
                    <span className="eyebrow inline-flex items-center gap-2">
                      <span className="h-px w-7 bg-molten" /> {f.tagline}
                    </span>
                    <h2 className="font-display mt-3 text-3xl text-bone sm:text-4xl">{f.name}</h2>
                    <p className="mt-4 text-pretty text-lg leading-relaxed text-mist">{f.body}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-slate-800/60 px-3.5 py-1.5 text-sm text-mist">
                        <Icon name="check" size={14} className="text-molten" /> Best for: {f.bestFor}
                      </span>
                      {f.priceNote ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-molten/25 bg-molten/10 px-3.5 py-1.5 text-sm text-molten-bright">
                          <Icon name="sparkle" size={14} /> {f.priceNote}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-7">
                      <Button href={`/quote?finish=${f.slug}`} variant="outline" icon={<Icon name="arrow" size={16} />}>
                        Get this finish quoted
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Not sure which finish is right for your space?" lead="That is what the free consultation is for. We bring samples, talk through your space, and help you pick a look you will love for years." />
    </>
  );
}
