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
    <section className="relative overflow-hidden border-b border-line bg-void">
      {image ? (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(image)} alt="" aria-hidden className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(8,9,11,0.95), rgba(8,9,11,0.7) 60%, rgba(8,9,11,0.45))" }} />
          <div className="grain absolute inset-0" />
        </div>
      ) : (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/photos/texture-floor-dark.jpg")} alt="" aria-hidden className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,9,11,0.85), var(--color-graphite))" }} />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 sm:px-8 sm:pt-36 sm:pb-20">
        {breadcrumb ? (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-ash">
              {breadcrumb.map((b, i) => (
                <span key={b.href} className="flex items-center gap-1.5">
                  {i > 0 ? <Icon name="chevron" size={12} className="-rotate-90 text-faint" /> : null}
                  {i < breadcrumb.length - 1 ? (
                    <Link href={b.href} className="transition-colors hover:text-molten-bright">{b.name}</Link>
                  ) : (
                    <span className="text-mist">{b.name}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        ) : null}

        <Reveal delay={0.05}>
          {eyebrow ? (
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-7 bg-molten" /> {eyebrow}
            </span>
          ) : null}
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl leading-[1.02] text-bone sm:text-5xl md:text-[3.4rem]">
            {title}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-mist">{lead}</p>
          </Reveal>
        ) : null}
        {children ? <Reveal delay={0.22}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
