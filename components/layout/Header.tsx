"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { finishes, services, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

const primaryNav = [
  { label: "Services", href: "/services", panel: "services" as const },
  { label: "Finishes", href: "/finishes", panel: "finishes" as const },
  { label: "Gallery", href: "/gallery" },
  { label: "Service Area", href: "/service-area" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo size={scrolled ? 36 : 40} />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setPanel(null)}>
          {primaryNav.map((item) => (
            <div key={item.href} className="relative" onMouseEnter={() => setPanel(item.panel ?? null)}>
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-mist transition-colors hover:text-bone"
              >
                {item.label}
                {item.panel ? <Icon name="chevron" size={14} className="text-ash" /> : null}
              </Link>

              {item.panel === "services" && panel === "services" ? (
                <div className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3">
                  <div className="panel grid grid-cols-2 gap-1 rounded-2xl p-3 shadow-[var(--shadow-lift)]">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-700/50"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-slate-800 text-molten-bright">
                          <Icon name={s.icon} size={18} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-bone">{s.navLabel}</span>
                          <span className="block truncate text-xs text-ash">{s.category}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {item.panel === "finishes" && panel === "finishes" ? (
                <div className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3">
                  <div className="panel grid gap-0.5 rounded-2xl p-3 shadow-[var(--shadow-lift)]">
                    {finishes.map((f) => (
                      <Link
                        key={f.slug}
                        href={`/finishes#${f.slug}`}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-700/50"
                      >
                        <span className="text-sm font-medium text-bone">{f.name}</span>
                        <span className="text-xs text-ash">{f.tagline}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-bone transition-colors hover:text-molten-bright"
          >
            <Icon name="phone" size={16} className="text-molten" />
            {site.phone}
          </a>
          <Button href="/quote" size="sm">
            Free Quote
          </Button>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-bone lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      {/* mobile menu */}
      {open ? (
        <div className="glass max-h-[calc(100svh-4.25rem)] overflow-y-auto border-t border-line lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-4">
            {primaryNav.map((item) => (
              <div key={item.href} className="border-b border-line/70">
                {item.panel ? (
                  <>
                    <button
                      onClick={() => setMobileSub((p) => (p === item.panel ? null : item.panel!))}
                      className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium text-bone"
                    >
                      {item.label}
                      <Icon
                        name="chevron"
                        size={18}
                        className={`text-ash transition-transform ${mobileSub === item.panel ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileSub === item.panel ? (
                      <div className="pb-3 pl-1">
                        {(item.panel === "services" ? services : finishes).map((x) => (
                          <Link
                            key={x.slug}
                            href={item.panel === "services" ? `/services/${x.slug}` : `/finishes#${x.slug}`}
                            onClick={() => setOpen(false)}
                            className="-mx-1 block rounded-lg px-1 py-3 text-base text-mist active:bg-slate-700/40"
                          >
                            {"navLabel" in x ? x.navLabel : x.name}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 text-base font-medium text-bone"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-5 flex flex-col gap-3">
              <Button href="/quote" size="lg" className="w-full">
                Get My Free Quote
              </Button>
              <Button href={site.phoneHref} variant="phone" size="lg" className="w-full" icon={<Icon name="phone" size={16} />}>
                Call {site.phone}
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
