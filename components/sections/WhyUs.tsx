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
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-last lg:order-first">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/photos/graded/gallery-real-02.jpg")}
                alt="A glossy flake epoxy garage floor with a mirror-like reflection in Genesee County"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="plate-caption mt-3 flex items-center justify-between border-t border-line pt-3">
                <span>Flake garage floor · {site.regionShort}</span>
                <span className="tnum text-accent">{site.warrantyYears} yr warranty</span>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Why The Epoxy Guys"
              title={
                <>
                  A floor is only as good as the <span className="text-accent">people pouring it</span>.
                </>
              }
              lead="We are a Genesee County family business, David and Michelle, with a simple promise: prep it right, finish it beautifully, and stand behind it."
            />
            <RevealGroup className="mt-10">
              {reasons.map((r, i) => (
                <RevealItem key={r.title}>
                  <div className="flex gap-5 border-t border-line py-5">
                    <span className="mono-label tnum mt-1 text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="head-sans text-lg text-ink">{r.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">{r.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Button href="/quote" icon={<Icon name="arrow" size={16} />}>
                Request a site visit
              </Button>
              <Button href="/about" variant="ghost">
                Meet the team
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
