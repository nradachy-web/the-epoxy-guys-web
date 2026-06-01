import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "phone";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-molten focus-visible:ring-offset-2 focus-visible:ring-offset-graphite disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "sheen bg-molten-bright text-void shadow-[var(--shadow-glow)] hover:bg-white hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-line bg-slate-800/40 text-bone backdrop-blur hover:border-molten/60 hover:bg-slate-800/70 hover:-translate-y-0.5",
  ghost: "text-bone hover:text-molten-bright",
  phone:
    "border border-molten/40 bg-molten/10 text-molten-bright hover:bg-molten/20 hover:-translate-y-0.5",
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
