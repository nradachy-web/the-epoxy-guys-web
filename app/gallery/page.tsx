import type { Metadata } from "next";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { galleryItems } from "@/lib/gallery";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section } from "@/components/ui/Primitives";
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
          <RevealGroup className="grid grid-cols-2 gap-3 [grid-auto-rows:11rem] sm:grid-cols-3 sm:[grid-auto-rows:13rem] lg:grid-cols-4" stagger={0.04}>
            {galleryItems.map((it) => (
              <RevealItem key={it.src} className={it.wide ? "col-span-2 row-span-2" : ""}>
                <figure className="group relative h-full min-w-0 overflow-hidden rounded-xl border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(it.src)} alt={it.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(8,9,11,0.85), transparent 60%)" }} />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold uppercase tracking-wide text-bone opacity-0 transition-opacity group-hover:opacity-100">
                    {it.tag}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-8 text-center text-sm text-ash">
            Want to see more of our work, or talk through a finish for your space?{" "}
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="text-molten-bright underline">Follow us on Facebook</a>{" "}
            or <a href={asset("/quote/")} className="text-molten-bright underline">request a free quote</a>.
          </p>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
