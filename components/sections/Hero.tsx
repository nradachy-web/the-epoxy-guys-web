import { site, googleRating } from "@/lib/site";
import { asset } from "@/lib/asset";
import { SpecTable } from "@/components/ui/Spec";

/**
 * HERO — asymmetric 42 / 58. A calm typographic spec-header on warm paper at
 * left; a full-bleed, color-graded real Epoxy Guys floor at right, bleeding off
 * the edge with no frame, no glow, no matte. A single hairline seam runs the
 * full height where paper meets photo. The review credential hangs in the left
 * gutter. The orchestrated page-load: a drafting line strikes across the top,
 * then the type cascades, then the photo settles from 1.04 to 1.0.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* full-bleed photo, pinned right, bleeding off the edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block">
        <div className="hero-photo-settle h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/photos/graded/gallery-real-02.jpg")}
            alt="A glossy flake epoxy floor by The Epoxy Guys with a mirror-like reflection, in a Genesee County garage"
            width={1400}
            height={1900}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        {/* the seam: a single hairline where paper meets photo */}
        <span className="absolute inset-y-0 left-0 w-px bg-line-2" aria-hidden />
        {/* let the paper feather into the photo so type never collides */}
        <span
          className="absolute inset-y-0 left-0 w-40"
          aria-hidden
          style={{ background: "linear-gradient(to right, var(--color-paper), transparent)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        {/* the title-block hairline + mono eyebrow that strikes across on load */}
        <div className="relative pt-28 lg:pt-32">
          <span className="hero-rule block h-px w-full bg-ink/70" aria-hidden />
          <p className="hero-settle mono-label mt-4" style={{ animationDelay: "0.45s" }}>
            Polyaspartic Floor System · {site.address.city}, Michigan
          </p>
        </div>

        <div className="relative grid items-start gap-16 pb-24 pt-10 lg:grid-cols-[42%_58%] lg:pb-36">
          {/* ---- left: the spec header ---- */}
          <div className="relative max-w-[34rem]">
            {/* review credential hung in the left gutter, vertical mono string */}
            <a
              href={googleRating.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${googleRating.score} out of 5 from ${googleRating.count} Google reviews`}
              className="absolute -left-10 top-1 hidden text-muted transition-colors hover:text-ink xl:block"
              style={{ writingMode: "vertical-rl" }}
            >
              <span className="mono-label tnum tracking-[0.2em]">
                {googleRating.score} / {googleRating.count} Google Reviews
              </span>
            </a>

            <h1 className="hero-settle display-xl mt-2 text-balance text-ink" style={{ animationDelay: "0.55s" }}>
              Coated in a day.
              <br />
              Built to last{" "}
              <span className="whitespace-nowrap">
                <span className="tnum">fifteen</span>
              </span>{" "}
              years.
            </h1>

            <p
              className="hero-settle mt-7 max-w-[52ch] text-pretty text-[1.0625rem] leading-relaxed text-ink-2"
              style={{ animationDelay: "0.62s" }}
            >
              We grind your slab to bare concrete, repair every crack, and pour a polyaspartic system
              that cures in under an hour. You park on it the same day.
            </p>

            {/* the signature spec table — replaces the badge wall and proof card */}
            <div className="hero-settle mt-9" style={{ animationDelay: "0.7s" }}>
              <SpecTable
                rows={[
                  { key: "Cure", value: "45 to 60 min" },
                  { key: "Install", value: "1 day" },
                  { key: "Warranty", value: "15 yr", accent: true },
                  {
                    key: "Rating",
                    value: (
                      <span className="tnum">
                        {googleRating.score} ★ ({googleRating.count})
                      </span>
                    ),
                  },
                ]}
              />
            </div>

            {/* one calm CTA + tabular phone */}
            <div
              className="hero-settle mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7"
              style={{ animationDelay: "0.78s" }}
            >
              <a
                href={asset("/quote/")}
                className="group inline-flex items-center justify-center gap-2.5 border border-ink bg-transparent px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Request a site visit
                <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>
                  →
                </span>
              </a>
              <a
                href={site.phoneHref}
                className="mono-label tnum text-ink transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
            </div>
          </div>

          {/* right column spacer on desktop (photo is the absolute layer);
              on mobile the graded wide crop stacks below */}
          <div className="lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/photos/graded/gallery-real-02.jpg")}
              alt="A glossy flake epoxy floor by The Epoxy Guys with a mirror-like reflection"
              width={1400}
              height={933}
              className="aspect-[3/2] w-full object-cover"
            />
            <p className="plate-caption mt-3">00 / Burton, MI · FS-01 Flake / Polyaspartic · 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
