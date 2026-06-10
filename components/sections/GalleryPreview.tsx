import Link from "next/link";
import { asset } from "@/lib/asset";
import { googleRating } from "@/lib/site";
import { Container, SheetHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * WORK (Sheet 04) — a monograph archive. Every plate is the same enforced 3:2
 * crop, captioned as a print plate with a running mono index (NN — TOWN, MI ·
 * SYSTEM · YEAR). Varied widths and intentional offsets turn a gallery dump
 * into a classified archive that quietly proves the 86-job volume.
 * (Filename kept as GalleryPreview to avoid churn in page.tsx imports.)
 */

type Plate = {
  n: string;
  src: string;
  alt: string;
  town: string;
  system: string;
  /** only set when the job's year is actually known */
  year?: string;
  /** grid span class for editorial rhythm */
  span: string;
  offset?: string;
};

const plates: Plate[] = [
  {
    n: "02",
    src: "/photos/graded/gallery-real-34.jpg",
    alt: "A silver Porsche parked on a glossy flake epoxy garage floor",
    town: "Genesee County, MI",
    system: "FS-01 Flake",
    span: "lg:col-span-7",
  },
  {
    n: "03",
    src: "/photos/graded/gallery-real-36.jpg",
    alt: "A metallic epoxy floor in a finished basement bar",
    town: "Genesee County, MI",
    system: "FS-02 Metallic",
    span: "lg:col-span-5",
    offset: "lg:mt-20",
  },
  {
    n: "04",
    src: "/photos/graded/gallery-real-37.jpg",
    alt: "A copper glitter epoxy floor in a commercial reception area",
    town: "Genesee County, MI",
    system: "Glitter",
    span: "lg:col-span-5",
  },
  {
    n: "05",
    src: "/photos/graded/gallery-real-35.jpg",
    alt: "Two sports cars parked on a clean speckled garage floor",
    town: "Genesee County, MI",
    system: "FS-01 Flake",
    span: "lg:col-span-7",
    offset: "lg:-mt-12",
  },
  {
    n: "06",
    src: "/photos/graded/real-corvette-flake-floor.jpg",
    alt: "A sports car parked on a glossy flake epoxy garage floor",
    town: "Fenton, MI",
    system: "FS-01 Flake",
    year: "2025",
    span: "lg:col-span-7",
  },
  {
    n: "07",
    src: "/photos/graded/gallery-real-38.jpg",
    alt: "An organized finished garage with a gray flake epoxy floor",
    town: "Genesee County, MI",
    system: "FS-01 Flake",
    span: "lg:col-span-5",
    offset: "lg:mt-16",
  },
];

export function GalleryPreview({ limit = 6 }: { limit?: number }) {
  const items = plates.slice(0, limit);
  return (
    <section id="work" className="relative bg-paper py-28 sm:py-36">
      <Container>
        <SheetHeader index="04" title="The Work" folio="Sheet 05 / 07" />
        <div className="mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="head-sans max-w-2xl text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
            A working archive of Genesee County floors.
          </h2>
          <span className="mono-label tnum">Plates 02-{String(items.length + 1).padStart(2, "0")} of {googleRating.count}+</span>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12">
          {items.map((p) => (
            <Reveal key={p.n} className={`${p.span} ${p.offset ?? ""}`}>
              <Link href="/gallery" className="group block">
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(p.src)}
                    alt={p.alt}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <p className="plate-caption mt-3">
                  {p.n} / {p.town} · {p.system}
                  {p.year ? ` · ${p.year}` : ""}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <Link href="/gallery" className="mono-label link-underline text-ink">
            View the full archive →
          </Link>
        </div>
      </Container>
    </section>
  );
}
