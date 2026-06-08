import { process, site } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ProcessTimeline({ showCta = false }: { showCta?: boolean }) {
  return (
    <Section id="process" className="bg-surface-2">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={
            <>
              From bare slab to showroom floor, <span className="text-accent">in one day</span>.
            </>
          }
          lead="No mystery, no mess left behind. Here is exactly how your project goes."
        />

        <div className="relative mt-16">
          <div
            className="absolute left-0 right-0 top-7 hidden h-px md:block"
            style={{ background: "linear-gradient(to right, transparent, var(--color-line-2) 12%, var(--color-line-2) 88%, transparent)" }}
            aria-hidden
          />
          <RevealGroup className="grid gap-10 md:grid-cols-4 md:gap-6">
            {process.map((p) => (
              <RevealItem key={p.step}>
                <div className="relative">
                  <div className="flex items-center gap-4 md:block">
                    <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line-2 bg-white font-display text-lg text-accent shadow-[var(--shadow-soft)]">
                      {p.step}
                    </span>
                    <h3 className="font-display text-xl text-ink md:mt-5">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:mt-4">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {showCta ? (
          <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/quote" size="lg" icon={<Icon name="arrow" size={18} />}>
              Get my free quote
            </Button>
            <Button href={site.phoneHref} variant="outline" size="lg" icon={<Icon name="phone" size={17} />}>
              Call {site.phone}
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
