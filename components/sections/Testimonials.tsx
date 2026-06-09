import { googleRating, testimonials } from "@/lib/site";
import { Container, SheetHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/** Compact tabular credential line, reused in the hero and elsewhere. */
export function RatingBadge() {
  return (
    <a
      href={googleRating.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mono-label tnum link-underline inline-flex items-center gap-2 text-ink"
    >
      {googleRating.score} ★ · {googleRating.count} Google Reviews
    </a>
  );
}

/**
 * PROOF (Sheet 05) — editorial, not badges. ONE real review pulled large in
 * Fraunces (the one allowed serif moment in the lower page) with first name +
 * town, plus a quiet tabular credential. A short secondary index of three more
 * verbatim lines sits beneath as a ruled register. No star carousel, no badge
 * soup, no widget that breaks the system.
 */
export function Testimonials({ heading = true }: { heading?: boolean }) {
  const lead = testimonials[0]; // Sally, "looked like a Lexus showroom floor"
  const more = testimonials.slice(1, 4);
  return (
    <section id="reviews" className="relative bg-surface-2 py-28 sm:py-36">
      <Container>
        {heading ? <SheetHeader index="05" title="In Their Words" folio="Sheet 06 / 07" /> : null}

        <Reveal className={heading ? "mt-16" : ""}>
          <figure className="max-w-4xl">
            <blockquote className="display-quote text-balance text-[1.8rem] text-ink sm:text-[2.6rem] sm:leading-[1.12]">
              &ldquo;If you want a floor to look like a Lexus showroom floor, David is the guy to see.
              Both are extremely knowledgeable and willing to do whatever it takes to make you a
              satisfied customer.&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-5">
              <span className="head-sans text-[0.95rem] text-ink">{lead.name}</span>
              <span className="mono-label">{lead.detail}</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* secondary register of verbatim lines */}
        <div className="mt-20 grid gap-px sm:grid-cols-3">
          {more.map((t, i) => (
            <Reveal key={t.name} delay={0.06 * i}>
              <div className="flex h-full flex-col border-t border-line pt-6">
                <p className="flex-1 text-pretty text-[0.95rem] leading-relaxed text-ink-2 sm:pr-6">
                  &ldquo;{t.quote.length > 168 ? t.quote.slice(0, 165).replace(/\s+\S*$/, "").trimEnd() + "…" : t.quote}&rdquo;
                </p>
                <p className="mt-5 flex items-baseline gap-3">
                  <span className="head-sans text-sm text-ink">{t.name}</span>
                  <span className="mono-label">{t.detail}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-7">
          <RatingBadge />
          <a
            href={googleRating.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label text-muted transition-colors hover:text-ink"
          >
            Read all {googleRating.count} on Google →
          </a>
        </div>
      </Container>
    </section>
  );
}
