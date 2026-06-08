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
    <section className="relative overflow-hidden bg-paper">
      {/* faint warm atmosphere, no flat fill */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 55% at 88% 8%, rgba(196,101,26,0.07), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-36 lg:pb-24">
        {/* ---- copy ---- */}
        <div className="max-w-xl">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-7 bg-accent" />
              {site.regionShort} &middot; Epoxy &amp; concrete coatings
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="font-display mt-5 text-balance text-[2.7rem] leading-[0.98] text-ink sm:text-6xl md:text-[4.1rem]">
              Epoxy floors that look like <span className="text-accent">glass</span>, installed in a day.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-2">
              From cracked, oil-stained concrete to a showroom floor you are proud to leave open. Our
              polyaspartic systems cure in {site.cure}, so most garages, basements, and shops are done in a
              single day, and backed for {site.warrantyYears} years.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/quote" size="lg" icon={<Icon name="arrow" size={18} />}>
                Get my free quote
              </Button>
              <Button href={site.phoneHref} variant="phone" size="lg" icon={<Icon name="phone" size={17} />}>
                {site.phone}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <RatingBadge />
              <span className="text-sm font-medium text-muted">Owner-operated in {site.address.city}, MI</span>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-7">
              {badges.map((b) => (
                <li key={b.label} className="flex items-center gap-2 text-sm font-semibold text-ink-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-tint text-accent">
                    <Icon name={b.icon} size={15} />
                  </span>
                  {b.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---- photo ---- */}
        <Reveal delay={0.12} className="relative">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-line-2 bg-white p-2 shadow-[var(--shadow-lift)]">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${asset("/photos/hero-main-1280.webp")} 1280w, ${asset("/photos/hero-main.webp")} 1920w`}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/photos/hero-main.jpg")}
                  alt="Finished two-car garage with a glossy flake epoxy floor in Genesee County, Michigan"
                  width={1920}
                  height={1080}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                  fetchPriority="high"
                />
              </picture>
            </div>

            {/* honest caption chip */}
            <span className="absolute left-5 top-5 rounded-full bg-white/92 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-[var(--shadow-soft)] backdrop-blur">
              Real customer floor
            </span>

            {/* floating proof card */}
            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-[var(--shadow-lift)] sm:flex">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-white">
                <Icon name="clock" size={20} />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg text-ink">Done in a day</span>
                <span className="block text-xs text-muted">Cures in {site.cure}</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
