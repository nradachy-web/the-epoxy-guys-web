import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Container, SheetHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessFilm } from "@/components/sections/ProcessFilm";

/**
 * THE SYSTEM (Sheet 02) — the install read as a measured sequence of six plates,
 * bare slab to park-in-a-day. Calm and exact, not a scroll-jack: alternating
 * full-bleed graded plates and a ruled spec caption, one step per band, with the
 * copper accent on the step index alone. "Measured, not marketed."
 */

type Step = {
  no: string;
  title: string;
  body: string;
  spec: string;
  image: string;
  alt: string;
};

const steps: Step[] = [
  {
    no: "01",
    title: "Diamond grind",
    body: "We open the slab to bare concrete with diamond grinders, so the coating bonds mechanically, not with a liquid etch shortcut.",
    spec: "Profile · CSP 2-3",
    image: "/photos/graded/process-grind.jpg",
    alt: "A crew member running a diamond grinder across a bare garage slab",
  },
  {
    no: "02",
    title: "Crack & pit repair",
    body: "Every crack gets chased and filled, every salt pit patched, every old failure ground out. The floor is made sound before a single coat.",
    spec: "Repair · Full slab",
    image: "/photos/graded/process-crack.jpg",
    alt: "A crew member chasing and filling cracks in a concrete slab before coating",
  },
  {
    no: "03",
    title: "Basecoat",
    body: "We lay the pigmented epoxy basecoat by hand, edge to edge, while the crew keeps a wet edge so it cures as one continuous film.",
    spec: "Coat · 1 of 2",
    image: "/photos/graded/process-base.jpg",
    alt: "A crew member rolling the pigmented basecoat across a prepped slab",
  },
  {
    no: "04",
    title: "Flake broadcast",
    body: "Decorative flake is broadcast into the wet base to refusal, adding color, traction, and a surface that hides the years.",
    spec: "Broadcast · To refusal",
    image: "/photos/graded/process-broadcast.jpg",
    alt: "The crew broadcasting decorative flake into a wet epoxy basecoat",
  },
  {
    no: "05",
    title: "Polyaspartic topcoat",
    body: "A UV-stable polyaspartic topcoat seals it all under glass. It resists hot tires, oil, salt, and stains, and it never yellows.",
    spec: "Cure · 45 to 60 min",
    image: "/photos/graded/process-top.jpg",
    alt: "A crew member pulling the clear polyaspartic topcoat with a squeegee",
  },
  {
    no: "06",
    title: "Park in 24 hours",
    body: "Because polyaspartic cures in under an hour, you walk on it the same evening and park on it within a day. We clean up like we were never there.",
    spec: "Service · 15-year warranty",
    image: "/photos/graded/process-cure.jpg",
    alt: "A bright finished garage with a gray flake floor, cured and ready to park on",
  },
];

export function ProcessTimeline({ film = true }: { film?: boolean }) {
  return (
    <section id="process" className="relative bg-paper">
      <Container>
        <div className="pt-28 sm:pt-36">
          <SheetHeader index="02" title="The System" />
          <div className="mt-12 max-w-2xl">
            <h2 className="head-sans text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
              One slab, one day, in six measured steps.
            </h2>
            <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
              No mystery, and no mess left behind. From a bare, pitted slab to a floor you park a car on
              the next morning, here is exactly how it goes.
            </p>
          </div>

          {film ? <ProcessFilm /> : null}
        </div>

        <ol className="mt-20 sm:mt-24">
          {steps.map((s, i) => (
            <li key={s.no} className="border-t border-line py-14 first:border-t-0 sm:py-20">
              <Reveal>
                <div
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                    i % 2 ? "md:[&>figure]:order-last" : ""
                  }`}
                >
                  <figure className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(s.image)}
                      alt={s.alt}
                      width={1200}
                      height={800}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </figure>
                  <div className="md:px-2">
                    <span className="mono-label tnum text-accent">
                      {s.no} <span className="text-muted">/ 06</span>
                    </span>
                    <h3 className="head-sans mt-3 text-2xl text-ink sm:text-[1.7rem]">{s.title}</h3>
                    <p className="mt-4 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                      {s.body}
                    </p>
                    <p className="mono-label mt-6 border-t border-line pt-4">{s.spec}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>

      {/* one calm CTA, restated plainly after the system */}
      <Container>
        <div className="flex flex-col items-start gap-5 border-t border-line py-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="display-quote max-w-md text-balance text-2xl text-ink">
            From bare slab to a floor you park on, in a day.
          </p>
          <div className="flex items-center gap-7">
            <a
              href={asset("/quote/")}
              className="group inline-flex items-center gap-2.5 border border-ink px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Request a site visit
              <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
            </a>
            <a href={site.phoneHref} className="mono-label tnum text-ink transition-colors hover:text-accent">
              {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
