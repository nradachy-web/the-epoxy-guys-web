"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icons";

/**
 * Header — four-word global nav. The restraint IS the professionalism signal;
 * Services, Finishes, FAQ and Financing live in the body now. Mono labels, a
 * hairline that only appears on scroll, ink-on-paper, one quiet text CTA.
 */
const primaryNav = [
  { label: "Work", href: "/gallery" },
  { label: "System", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-colors duration-300 ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo size={scrolled ? 32 : 36} />
        </Link>

        {/* desktop nav — four words, mono */}
        <nav className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono-label link-underline text-ink transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={site.phoneHref}
            className="mono-label tnum text-ink transition-colors hover:text-accent"
          >
            {site.phone}
          </a>
          <a
            href={asset("/quote/")}
            className="group inline-flex items-center gap-2 border border-ink px-4 py-2 text-[0.8rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Request a visit
            <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center border border-line text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </div>

      {/* mobile menu */}
      {open ? (
        <div className="glass max-h-[calc(100svh-4.25rem)] overflow-y-auto border-t border-line lg:hidden">
          <nav className="mx-auto max-w-7xl px-6 py-4">
            {primaryNav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-4"
              >
                <span className="mono-label tnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="head-sans text-lg text-ink">{item.label}</span>
              </Link>
            ))}
            <div className="mt-7 flex flex-col gap-3">
              <a
                href={asset("/quote/")}
                onClick={() => setOpen(false)}
                className="group inline-flex items-center justify-center gap-2.5 border border-ink px-6 py-3.5 text-[0.95rem] font-medium text-ink"
              >
                Request a site visit
                <span aria-hidden>→</span>
              </a>
              <a
                href={site.phoneHref}
                className="mono-label tnum inline-flex items-center justify-center gap-2 border border-line py-3.5 text-ink"
              >
                <Icon name="phone" size={15} /> {site.phone}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
