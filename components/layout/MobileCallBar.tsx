import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";

/** Fixed conversion bar on mobile: call + quote always one tap away. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-line bg-line pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgba(24,26,30,0.4)] lg:hidden">
      <a
        href={site.phoneHref}
        className="flex items-center justify-center gap-2 bg-ink py-3.5 text-sm font-semibold text-white"
      >
        <Icon name="phone" size={17} />
        Call Now
      </a>
      <a
        href={asset("/quote/")}
        className="flex items-center justify-center gap-2 bg-accent py-3.5 text-sm font-semibold text-white"
      >
        <Icon name="sparkle" size={17} />
        Free Quote
      </a>
    </div>
  );
}
