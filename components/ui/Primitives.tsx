import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-7xl px-6 sm:px-10 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-28 sm:py-36 lg:py-44 ${className}`}>
      {children}
    </section>
  );
}

/**
 * SHEET HEADER — every section opens like a drawing sheet: a full-width
 * hairline rule with a mono section index hung at the left ("02 — THE SYSTEM")
 * and a quiet sheet folio at the right ("SHEET 03 / 07"). The rule and index
 * arrive together so each section reads as a new sheet being laid down.
 */
export function SheetHeader({
  index,
  title,
  className = "",
}: {
  index: string;
  title: string;
  /** accepted for back-compat but intentionally not rendered (folios were
   *  contradicting the left index); the index alone numbers each sheet. */
  folio?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="border-t border-line pt-4">
        <div className="flex items-baseline justify-between gap-6">
          <span className="index-label">
            {index} <span className="text-muted">/ {title}</span>
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/* legacy eyebrow — re-skinned to the mono register, kept for inner pages */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`mono-label ${className}`}>{children}</span>;
}

/**
 * SectionHeading — asymmetric by default. The display heading uses the
 * grotesque (head-sans), NOT Fraunces, to preserve serif scarcity. Serif is
 * opted into explicitly via `serif` only where the brief allows it.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  serif = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  serif?: boolean;
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow ? <span className="mono-label">{eyebrow}</span> : null}
      <h2
        className={`${serif ? "display-h2" : "head-sans text-[1.9rem] sm:text-[2.4rem] md:text-[2.75rem]"} ${
          eyebrow ? "mt-4" : ""
        } text-balance text-ink`}
      >
        {title}
      </h2>
      {lead ? <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">{lead}</p> : null}
    </div>
  );
}

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-2 ${className}`}
    >
      {children}
    </span>
  );
}
