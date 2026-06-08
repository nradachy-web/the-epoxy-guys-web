import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

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
      {/* faint warm atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "radial-gradient(55% 60% at 92% 0%, rgba(196,101,26,0.07), transparent 70%)" }}
      />
      <div
        className={`relative mx-auto grid max-w-7xl items-center gap-10 px-5 pt-32 pb-14 sm:px-8 sm:pt-36 sm:pb-[4.5rem] ${
          image ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-14" : ""
        }`}
      >
        <div>
          {breadcrumb ? (
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted">
                {breadcrumb.map((b, i) => (
                  <span key={b.href} className="flex items-center gap-1.5">
                    {i > 0 ? <Icon name="chevron" size={12} className="-rotate-90 text-faint-2" /> : null}
                    {i < breadcrumb.length - 1 ? (
                      <Link href={b.href} className="transition-colors hover:text-accent">{b.name}</Link>
                    ) : (
                      <span className="text-ink-2">{b.name}</span>
                    )}
                  </span>
                ))}
              </nav>
            </Reveal>
          ) : null}

          <Reveal delay={0.05}>
            {eyebrow ? (
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="h-px w-7 bg-accent" /> {eyebrow}
              </span>
            ) : null}
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl leading-[1.02] text-ink sm:text-5xl md:text-[3.4rem]">
              {title}
            </h1>
          </Reveal>
          {lead ? (
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-2">{lead}</p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={0.22}>{children}</Reveal> : null}
        </div>

        {image ? (
          <Reveal delay={0.12} className="hidden lg:block">
            <div className="overflow-hidden rounded-3xl border border-line-2 bg-white p-2 shadow-[var(--shadow-lift)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(image)}
                alt=""
                aria-hidden
                className="aspect-[4/3] w-full rounded-2xl object-cover"
                fetchPriority="high"
              />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
