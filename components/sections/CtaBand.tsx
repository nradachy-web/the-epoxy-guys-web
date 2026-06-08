import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({
  title = "Ready for a floor built to last?",
  lead = "Book a free, no-pressure consultation. We will measure your space, talk finishes, and give you an honest quote, usually with a one-day install.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/photos/cta-dusk.jpg")} alt="" className="h-full w-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(20,22,26,0.94) 0%, rgba(20,22,26,0.82) 55%, rgba(20,22,26,0.7) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(50% 60% at 92% 0%, rgba(196,101,26,0.22), transparent 70%)" }} />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="max-w-2xl">
          <span className="eyebrow inline-flex items-center gap-2 text-accent">
            <span className="h-px w-7 bg-accent" /> Free consultation
          </span>
          <h2 className="font-display mt-4 text-balance text-4xl text-white sm:text-5xl">{title}</h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-white/75">{lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/quote" size="lg" icon={<Icon name="arrow" size={18} />}>
              Get my free quote
            </Button>
            <a
              href={site.phoneHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              <Icon name="phone" size={17} />
              Call {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
