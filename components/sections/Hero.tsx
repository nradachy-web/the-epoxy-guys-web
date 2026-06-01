import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { RatingBadge } from "@/components/sections/Testimonials";

const badges = [
  { icon: "clock", label: "One-day install" },
  { icon: "shield", label: "15-year warranty" },
  { icon: "user", label: "Owner on every job" },
  { icon: "check", label: "Free consultation" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-void">
      {/* background */}
      <div className="absolute inset-0">
        <picture>
          <source
            type="image/webp"
            srcSet={`${asset("/photos/hero-main-1280.webp")} 1280w, ${asset("/photos/hero-main.webp")} 1920w`}
            sizes="100vw"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/photos/hero-main.jpg")}
            alt="Finished two-car garage with a glossy flake epoxy floor"
            width={1920}
            height={1080}
            className="h-full w-full animate-kenburns object-cover"
            fetchPriority="high"
          />
        </picture>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, rgba(8,9,11,0.93) 0%, rgba(8,9,11,0.66) 46%, rgba(8,9,11,0.34) 82%, rgba(8,9,11,0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to top, var(--color-graphite), transparent)" }}
        />
        <div className="grain absolute inset-0" />
      </div>

      {/* content */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-20 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-7 bg-molten" />
              Genesee County&apos;s epoxy &amp; concrete coating specialists
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-balance text-5xl leading-[0.98] text-bone sm:text-6xl md:text-7xl">
              Epoxy floors that look like <span className="molten-text">glass</span>, installed in a day.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist sm:text-xl">
              From cracked, oil-stained concrete to a showroom floor you are proud to leave open.
              Our polyaspartic systems cure in {site.cure}, so most garages, basements, and shops are
              done in a single day, and backed for {site.warrantyYears} years.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/quote" size="lg" icon={<Icon name="arrow" size={18} />}>
                Get my free quote
              </Button>
              <Button href={site.phoneHref} variant="outline" size="lg" icon={<Icon name="phone" size={17} />}>
                {site.phone}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-7">
              <RatingBadge />
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {badges.map((b) => (
                <li key={b.label} className="flex items-center gap-2 text-sm font-medium text-mist">
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-molten/30 bg-molten/10 text-molten-bright">
                    <Icon name={b.icon} size={15} />
                  </span>
                  {b.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute inset-x-0 bottom-5 hidden justify-center sm:flex">
        <span className="flex flex-col items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-ash">
          Scroll
          <span className="h-9 w-5 rounded-full border border-line p-1">
            <span className="block h-2 w-full animate-float rounded-full bg-molten" />
          </span>
        </span>
      </div>
    </section>
  );
}
