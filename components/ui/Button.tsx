import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "phone";
type Size = "sm" | "md" | "lg";

/**
 * Button — re-skinned to the Engineered Precision register: squared edges,
 * hairline borders, ink-on-paper, copper only on hover. No rounded-full pills,
 * no amber glow, no lift shadow. Same API so inner pages stay coherent.
 */
const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.8rem]",
  md: "px-5 py-3 text-[0.9rem]",
  lg: "px-6 py-3.5 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  // the primary action: ink box, copper on hover
  primary: "border border-ink bg-transparent text-ink hover:border-accent hover:text-accent",
  // secondary: hairline box
  outline: "border border-line-2 bg-transparent text-ink hover:border-ink",
  ghost: "text-ink hover:text-accent",
  // phone: solid ink
  phone: "bg-ink text-paper hover:bg-[#000]",
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
      {icon ? <span className="transition-transform duration-300 group-hover:translate-x-[3px]">{icon}</span> : null}
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
