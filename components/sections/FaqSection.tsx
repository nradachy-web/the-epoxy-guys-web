import { faqs as allFaqs } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

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
    <Section className={className} id="faq">
      <Container className="max-w-3xl">
        {heading ? (
          <SectionHeading
            align="center"
            eyebrow="Good questions"
            title={
              <>
                Everything you want to know, <span className="molten-text">answered</span>.
              </>
            }
          />
        ) : null}
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left">
                <span className="font-display text-lg text-bone">{f.q}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-molten-bright transition-transform group-open:rotate-45">
                  <Icon name="close" size={16} className="rotate-45" />
                </span>
              </summary>
              <p className="pb-5 pr-2 text-pretty leading-relaxed text-ash sm:pr-12">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
