import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "phone";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  // amber conversion button
  primary:
    "bg-accent text-white shadow-[var(--shadow-glow)] hover:bg-accent-strong hover:-translate-y-0.5 active:translate-y-0",
  // clean ink-outlined secondary
  outline:
    "border border-line-2 bg-white text-ink shadow-[var(--shadow-soft)] hover:border-ink/30 hover:bg-surface-2 hover:-translate-y-0.5",
  ghost: "text-ink hover:text-accent",
  // solid charcoal — used for the call action so it pairs with the amber quote button
  phone:
    "bg-ink text-white hover:bg-[#000] hover:-translate-y-0.5 active:translate-y-0",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  external,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  ariaLabel?: string;
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {icon ? <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span> : null}
    </>
  );
  if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}
