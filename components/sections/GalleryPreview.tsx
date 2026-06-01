import Link from "next/link";
import { galleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function GalleryPreview({ limit = 7, heading = true }: { limit?: number; heading?: boolean }) {
  const items = galleryItems.slice(0, limit);
  return (
    <Section id="gallery">
      <Container>
        {heading ? (
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Recent work"
              title={
                <>
                  Floors we are <span className="molten-text">proud</span> to put our name on.
                </>
              }
              lead="A look at the finishes, spaces, and details our customers chose."
            />
            <Button href="/gallery" variant="outline" icon={<Icon name="arrow" size={16} />} className="hidden md:inline-flex">
              Full gallery
            </Button>
          </div>
        ) : null}

        <RevealGroup
          className="mt-12 grid grid-cols-2 gap-3 [grid-auto-rows:10rem] sm:grid-cols-3 sm:[grid-auto-rows:12rem] lg:grid-cols-4"
          stagger={0.05}
        >
          {items.map((it) => (
            <RevealItem key={it.src} className={it.wide ? "col-span-2 row-span-2" : ""}>
              <Link
                href="/gallery"
                className="group relative block h-full min-w-0 overflow-hidden rounded-xl border border-line"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(it.src)}
                  alt={it.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
                  style={{ background: "linear-gradient(to top, rgba(8,9,11,0.8), transparent 55%)" }}
                />
                <span className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold uppercase tracking-wide text-bone opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                  {it.tag}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-8 md:hidden">
          <Button href="/gallery" variant="outline" className="w-full" icon={<Icon name="arrow" size={16} />}>
            Full gallery
          </Button>
        </div>
      </Container>
    </Section>
  );
}
