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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/photos/cta-dusk.jpg")} alt="" aria-hidden className="h-full w-full object-cover grayscale" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(8,9,11,0.95), rgba(8,9,11,0.88))" }} />
        <div className="grain absolute inset-0" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="max-w-2xl">
          <span className="eyebrow inline-flex items-center gap-2">
            <span className="h-px w-7 bg-molten" /> Free consultation
          </span>
          <h2 className="font-display mt-4 text-balance text-4xl text-bone sm:text-5xl">{title}</h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-mist">{lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/quote" size="lg" icon={<Icon name="arrow" size={18} />}>
              Get my free quote
            </Button>
            <Button href={site.phoneHref} variant="outline" size="lg" icon={<Icon name="phone" size={17} />}>
              Call {site.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
