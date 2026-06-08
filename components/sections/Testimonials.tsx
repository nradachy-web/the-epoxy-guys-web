import { googleRating, testimonials } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8z" />
        </svg>
      ))}
    </div>
  );
}

export function RatingBadge() {
  return (
    <a
      href={googleRating.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 shadow-[var(--shadow-soft)] transition-colors hover:border-line-2"
    >
      <span className="font-display text-xl text-ink">{googleRating.score}</span>
      <Stars size={16} />
      <span className="text-sm font-medium text-ink-2">{googleRating.count} Google reviews</span>
    </a>
  );
}

export function Testimonials({ heading = true }: { heading?: boolean }) {
  return (
    <Section className="bg-surface-2">
      <Container>
        {heading ? (
          <SectionHeading
            align="center"
            eyebrow="In their words"
            title={
              <>
                Rated <span className="text-accent">5.0</span> by Genesee County neighbors.
              </>
            }
          />
        ) : null}
        <div className="mt-6 flex justify-center">
          <RatingBadge />
        </div>
        <RevealGroup className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.name}>
              <figure className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-soft)]">
                <Stars />
                <blockquote className="mt-4 flex-1 text-pretty text-[0.95rem] leading-relaxed text-ink-2">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{t.name}</span>
                    <span className="block text-xs text-muted">{t.detail}</span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-10 text-center">
          <a
            href={googleRating.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-strong"
          >
            Read all {googleRating.count} reviews on Google
            <Icon name="arrow" size={15} />
          </a>
        </div>
      </Container>
    </Section>
  );
}
