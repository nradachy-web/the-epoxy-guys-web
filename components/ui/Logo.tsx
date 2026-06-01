import { asset } from "@/lib/asset";

/* The Epoxy Guys real logo (white knockout on transparent).
   - horizontal: EG monogram + wordmark lockup, for the header.
   - stacked: full logo, for the footer and roomy placements.
   - mark: monogram only. */

/* eslint-disable @next/next/no-img-element */
export function Logo({
  size = 36,
  variant = "horizontal",
  className = "",
}: {
  size?: number;
  variant?: "horizontal" | "stacked" | "mark";
  className?: string;
}) {
  if (variant === "stacked") {
    return (
      <img
        src={asset("/brand/the-epoxy-guys-logo.png")}
        alt="The Epoxy Guys"
        style={{ height: size }}
        className={`w-auto ${className}`}
      />
    );
  }
  if (variant === "mark") {
    return (
      <img
        src={asset("/brand/eg-monogram.png")}
        alt="The Epoxy Guys"
        style={{ height: size }}
        className={`w-auto ${className}`}
      />
    );
  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={asset("/brand/eg-monogram.png")} alt="" aria-hidden style={{ height: size }} className="w-auto" />
      <img
        src={asset("/brand/eg-wordmark.png")}
        alt="The Epoxy Guys"
        style={{ height: Math.round(size * 0.46) }}
        className="w-auto"
      />
    </span>
  );
}
