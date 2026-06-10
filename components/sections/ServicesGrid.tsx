import Link from "next/link";
import { asset } from "@/lib/asset";
import { Container, SheetHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * FINISH SYSTEMS (Sheet 03) — a named, coded catalogue index, NOT a chip grid.
 * Each system is a full-bleed in-situ plate at 3:2 with a hairline spec-table
 * caption (system code · town · finish · year). Asymmetric widths and generous
 * pacing: a human composed this, not a 4-up icon row.
 * (Filename kept as ServicesGrid to avoid churn in page.tsx imports.)
 */

type System = {
  code: string;
  name: string;
  finish: string;
  town: string;
  /** only set when the job's year is actually known */
  year?: string;
  body: string;
  bestFor: string;
  href: string;
  image: string;
  alt: string;
  /** layout span on the editorial grid */
  wide?: boolean;
};

const systems: System[] = [
  {
    code: "FS-01",
    name: "Flake / Polyaspartic",
    finish: "Decorative flake",
    town: "Genesee County, MI",
    body: "The garage favorite. Vinyl flake broadcast into the base for color, traction, and a surface that hides the years, sealed under polyaspartic.",
    bestFor: "Garages · Basements · High-traffic rooms",
    href: "/services/garage-floor-coatings",
    image: "/photos/graded/gallery-real-12.jpg",
    alt: "A finished garage with a gray flake polyaspartic floor and a car lift",
    wide: true,
  },
  {
    code: "FS-02",
    name: "Metallic",
    finish: "Pigmented metallic",
    town: "Genesee County, MI",
    body: "The marble look at a fraction of the cost. Metallic pigments flow into three-dimensional effects, no two floors ever exactly alike.",
    bestFor: "Showpiece garages · Retail · Man caves",
    href: "/finishes#metallic",
    image: "/photos/graded/gallery-real-27.jpg",
    alt: "A pigmented metallic epoxy floor flowing through a commercial lounge",
  },
  {
    code: "FS-03",
    name: "Solid Industrial",
    finish: "Solid color / clear",
    town: "Genesee County, MI",
    body: "Seamless, sanitary, and built to take a beating. The commercial workhorse for shops, kitchens, and warehouses, with anti-slip where it counts.",
    bestFor: "Commercial · Shops · Warehouses",
    href: "/services/commercial-industrial-epoxy",
    image: "/photos/graded/gallery-real-11.jpg",
    alt: "A solid red epoxy floor in a working auto shop with vehicle lifts",
  },
  {
    code: "FS-04",
    name: "Polished Concrete",
    finish: "Ground & polished",
    town: "Genesee County, MI",
    body: "Refine the slab you already own. Mechanically ground to a smooth, reflective sheen, eco-friendly and nearly maintenance-free.",
    bestFor: "Retail · Offices · Modern interiors",
    href: "/services/polished-concrete",
    image: "/photos/graded/finish-polished.jpg",
    alt: "A reflective polished concrete floor running through a commercial hall",
  },
];

function PlateRow({ s, i }: { s: System; i: number }) {
  // alternate which side the caption hangs on for editorial rhythm
  const reverse = i % 2 === 1;
  return (
    <Reveal>
      <Link href={s.href} className="group block">
        <figure
          className={`grid items-end gap-7 lg:gap-12 ${
            reverse ? "lg:grid-cols-[0.34fr_0.66fr]" : "lg:grid-cols-[0.66fr_0.34fr]"
          }`}
        >
          <div className={`relative overflow-hidden ${reverse ? "lg:order-2" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(s.image)}
              alt={s.alt}
              loading="lazy"
              className="aspect-[3/2] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          </div>

          <figcaption className={`${reverse ? "lg:order-1 lg:text-right" : ""}`}>
            <span className="mono-label tnum">
              {s.code} · {s.town}
              {s.year ? ` · ${s.year}` : ""}
            </span>
            <h3 className="head-sans mt-3 text-2xl text-ink sm:text-[1.75rem]">{s.name}</h3>
            <p className="mt-3 max-w-sm text-pretty leading-relaxed text-ink-2 lg:inline-block">{s.body}</p>
            <p className={`mono-label mt-5 border-t border-line pt-4 ${reverse ? "lg:text-right" : ""}`}>
              {s.bestFor}
            </p>
          </figcaption>
        </figure>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section id="finishes" className="relative bg-paper py-28 sm:py-36">
      <Container>
        {heading ? <SheetHeader index="03" title="Finish Systems" folio="Sheet 04 / 07" /> : null}
        <div className={`flex flex-col items-start justify-between gap-6 md:flex-row md:items-end ${heading ? "mt-12" : ""}`}>
          <h2 className="head-sans max-w-2xl text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
            Four systems. Every one poured to spec.
          </h2>
          <Link
            href="/finishes"
            className="mono-label link-underline hidden text-ink md:inline-block"
          >
            Full catalogue →
          </Link>
        </div>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {systems.map((s, i) => (
            <PlateRow key={s.code} s={s} i={i} />
          ))}
        </div>

        <div className="mt-16 md:hidden">
          <Link href="/finishes" className="mono-label link-underline text-ink">
            Full catalogue →
          </Link>
        </div>
      </Container>
    </section>
  );
}
