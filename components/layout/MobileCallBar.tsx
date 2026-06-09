import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";

/**
 * Mobile conversion bar — kept as the conversion guardrail so the premium
 * restraint never buries the path for paid local traffic. Ink + paper, mono
 * labels, no neon. Always one tap from a call or a site visit.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] lg:hidden">
      <a
        href={site.phoneHref}
        className="flex items-center justify-center gap-2 border-r border-line py-3.5 text-ink"
      >
        <Icon name="phone" size={16} />
        <span className="mono-label tnum">{site.phone}</span>
      </a>
      <a
        href={asset("/quote/")}
        className="flex items-center justify-center gap-2 bg-ink py-3.5 text-paper"
      >
        <span className="mono-label" style={{ color: "var(--color-paper)" }}>
          Request a visit
        </span>
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
