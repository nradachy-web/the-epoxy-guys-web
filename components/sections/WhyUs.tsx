import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const reasons = [
  {
    title: "The owner is on your job",
    body: "You hire David, you get David. He is on site for your project, not a rotating crew of subs who never see your floor again.",
  },
  {
    title: "Prep is never skipped",
    body: "We diamond grind every slab, chase cracks, and manage moisture. That bond is the difference between a 15-year floor and a peeling mess.",
  },
  {
    title: "Polyaspartic, not cheap epoxy",
    body: "Our topcoats cure in under an hour and never yellow, so we finish in a day and your floor outlasts box-store kits by years.",
  },
  {
    title: "Honest quotes, fair price",
    body: "A free in-home consultation, a clear price, and no pressure. Coatings start around " + site.priceFrom + " per square foot.",
  },
];

export function WhyUs() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-last lg:order-first">
            <div className="relative overflow-hidden rounded-3xl border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/photos/real-corvette-flake-floor.jpg")}
                alt="Glossy flake epoxy garage floor with a sports car parked on the reflective surface"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,11,0.6), transparent 50%)" }} />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-void/70 px-3.5 py-1.5 text-xs font-medium text-bone backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-molten" />
                Flake garage floor, Genesee County
              </div>
            </div>
            {/* floating badge */}
            <div className="absolute -right-3 -top-5 hidden rounded-2xl border border-molten/30 bg-graphite px-5 py-4 shadow-[var(--shadow-lift)] sm:block">
              <div className="font-display text-3xl text-molten-bright">{site.warrantyYears}-yr</div>
              <div className="text-xs text-ash">warranty, every floor</div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Why The Epoxy Guys"
              title={
                <>
                  A floor is only as good as the <span className="molten-text">people pouring it</span>.
                </>
              }
              lead="We are a Genesee County family business, David and Michelle, with a simple promise: prep it right, finish it beautifully, and stand behind it."
            />
            <RevealGroup className="mt-8 space-y-5">
              {reasons.map((r) => (
                <RevealItem key={r.title}>
                  <div className="flex gap-4">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-molten/30 bg-molten/10 text-molten-bright">
                      <Icon name="check" size={16} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-bone">{r.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ash">{r.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/quote" icon={<Icon name="arrow" size={16} />}>
                Get my free quote
              </Button>
              <Button href="/about" variant="outline">
                Meet the team
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
