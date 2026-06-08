import { asset } from "@/lib/asset";

/* The Epoxy Guys real logo.
   tone="ink"   → dark knockout, for light backgrounds (header, body).
   tone="white" → white knockout, for dark backgrounds (footer, CTA band).
   - horizontal: EG monogram + wordmark lockup, for the header.
   - stacked: full logo, for the footer and roomy placements.
   - mark: monogram only. */

const files = {
  ink: {
    logo: "/brand/the-epoxy-guys-logo-ink.png",
    monogram: "/brand/eg-monogram-ink.png",
    wordmark: "/brand/eg-wordmark-ink.png",
  },
  white: {
    logo: "/brand/the-epoxy-guys-logo.png",
    monogram: "/brand/eg-monogram.png",
    wordmark: "/brand/eg-wordmark.png",
  },
} as const;

/* eslint-disable @next/next/no-img-element */
export function Logo({
  size = 36,
  variant = "horizontal",
  tone = "ink",
  className = "",
}: {
  size?: number;
  variant?: "horizontal" | "stacked" | "mark";
  tone?: "ink" | "white";
  className?: string;
}) {
  const f = files[tone];
  if (variant === "stacked") {
    return (
      <img src={asset(f.logo)} alt="The Epoxy Guys" style={{ height: size }} className={`w-auto ${className}`} />
    );
  }
  if (variant === "mark") {
    return (
      <img src={asset(f.monogram)} alt="The Epoxy Guys" style={{ height: size }} className={`w-auto ${className}`} />
    );
  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={asset(f.monogram)} alt="" aria-hidden style={{ height: size }} className="w-auto" />
      <img src={asset(f.wordmark)} alt="The Epoxy Guys" style={{ height: Math.round(size * 0.46) }} className="w-auto" />
    </span>
  );
}
