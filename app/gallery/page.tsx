import type { Metadata } from "next";
import { site, googleRating } from "@/lib/site";
import { asset } from "@/lib/asset";
import { galleryItems } from "@/lib/gallery";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section, SheetHeader } from "@/components/ui/Primitives";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Project Gallery: Epoxy & Concrete Floors in Genesee County",
  description:
    "See garage, basement, commercial, metallic, flake and glitter floors by The Epoxy Guys across Flint, Grand Blanc and the greater Genesee County, MI area.",
  alternates: { canonical: `${site.url}/gallery/` },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ])}
      />
      <PageHero
        eyebrow="Recent work"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
        title={
          <>
            A gallery of floors we are <span className="molten-text">proud</span> of.
          </>
        }
        lead="Garages, basements, businesses, and showpiece finishes from across the Flint metro."
        image="/photos/gallery-real-01.jpg"
      />

      <Section>
        <Container>
          <SheetHeader index="01" title="The Archive" />
          <div className="mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="head-sans max-w-2xl text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
              The full working archive of Genesee County floors.
            </h2>
            <span className="mono-label tnum">
              {String(galleryItems.length).padStart(2, "0")} plates of {googleRating.count}+
            </span>
          </div>

          <RevealGroup
            className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.04}
          >
            {galleryItems.map((it, i) => (
              <RevealItem key={it.src} className={it.wide ? "sm:col-span-2" : ""}>
                <figure className="group block">
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(`/photos/graded/${it.src.replace("/photos/", "")}`)}
                      alt={it.alt}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="plate-caption mt-3">
                    {String(i + 1).padStart(2, "0")} / {it.tag} · Genesee County, MI
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-16 border-t border-line pt-8">
            <p className="max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
              Want to see more of our work, or talk through a finish for your space?
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={asset("/quote/")}
                className="group inline-flex items-center gap-2.5 border border-ink px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Request a site visit
                <span className="transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label link-underline text-ink"
              >
                Follow us on Facebook →
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
