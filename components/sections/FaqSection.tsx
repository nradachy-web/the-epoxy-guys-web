import { faqs as allFaqs } from "@/lib/site";
import { Container } from "@/components/ui/Primitives";

/**
 * FAQ — a quiet ruled register. Hairlines and mono indices carry it; no cards,
 * no colored chevron pills. Each row opens plainly. Native <details> so it
 * works without JS and respects reduced motion.
 */
export function FaqSection({
  faqs = allFaqs,
  heading = true,
  className = "",
}: {
  faqs?: { q: string; a: string }[];
  heading?: boolean;
  className?: string;
}) {
  return (
    <section className={`relative bg-paper py-28 sm:py-36 ${className}`} id="faq">
      <Container className="max-w-3xl">
        {heading ? (
          <div className="border-t border-line pt-4">
            <span className="mono-label">07 / Questions</span>
            <h2 className="head-sans mt-4 text-balance text-[1.9rem] text-ink sm:text-[2.4rem]">
              The things worth asking, answered plainly.
            </h2>
          </div>
        ) : null}

        <div className="mt-12">
          {faqs.map((f, i) => (
            <details key={f.q} className="group border-t border-line last:border-b">
              <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 text-left">
                <span className="mono-label tnum mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="head-sans flex-1 text-[1.05rem] text-ink">{f.q}</span>
                <span
                  className="mono-label shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="pb-6 pl-[2.6rem] pr-2 text-pretty leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
