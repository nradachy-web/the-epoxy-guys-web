import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/ui/Reveal";

/**
 * PAGE HERO — the inner-page title block, set like the cover of a drawing sheet:
 * a hairline rule, a mono folio/breadcrumb, a calm head-sans title, and (when
 * given) a single squared plate. No rounded cards, no matte, no lift shadow.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: string;
  breadcrumb?: { name: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="pt-32 sm:pt-36">
          <span className="block h-px w-full bg-ink/70" aria-hidden />
          <Reveal>
            {breadcrumb ? (
              <nav aria-label="Breadcrumb" className="mono-label mt-4 flex flex-wrap items-center gap-2 text-muted">
                {breadcrumb.map((b, i) => (
                  <span key={b.href} className="flex items-center gap-2">
                    {i > 0 ? <span aria-hidden className="text-faint-2">/</span> : null}
                    {i < breadcrumb.length - 1 ? (
                      <Link href={b.href} className="transition-colors hover:text-accent">
                        {b.name}
                      </Link>
                    ) : (
                      <span className="text-ink-2">{b.name}</span>
                    )}
                  </span>
                ))}
              </nav>
            ) : eyebrow ? (
              <p className="mono-label mt-4">{eyebrow}</p>
            ) : null}
          </Reveal>
        </div>

        <div
          className={`grid items-end gap-12 pb-20 pt-10 sm:pb-24 sm:pt-12 ${
            image ? "lg:grid-cols-[1fr_0.82fr] lg:gap-16" : ""
          }`}
        >
          <div>
            {breadcrumb && eyebrow ? (
              <Reveal delay={0.04}>
                <p className="mono-label">{eyebrow}</p>
              </Reveal>
            ) : null}
            <Reveal delay={0.06}>
              <h1 className="head-sans mt-3 max-w-3xl text-balance text-[2.4rem] leading-[1.04] text-ink sm:text-5xl md:text-[3.3rem]">
                {title}
              </h1>
            </Reveal>
            {lead ? (
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-2">{lead}</p>
              </Reveal>
            ) : null}
            {children ? <Reveal delay={0.18}>{children}</Reveal> : null}
          </div>

          {image ? (
            <Reveal delay={0.1} className="hidden lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(image)}
                alt=""
                aria-hidden
                className="aspect-[4/3] w-full object-cover"
                fetchPriority="high"
              />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
