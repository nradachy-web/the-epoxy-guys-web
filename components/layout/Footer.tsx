import Link from "next/link";
import { finishes, services, serviceAreas, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icons";

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo size={72} variant="stacked" />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-ash">
              {site.trademark} are {site.regionShort}&apos;s owner-operated epoxy and concrete
              coating specialists. One-day floors, done right, backed for {site.warrantyYears} years.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href={site.phoneHref} className="flex items-center gap-2.5 text-bone hover:text-molten-bright">
                <Icon name="phone" size={16} className="text-molten" /> {site.phone}
              </a>
              <a href={site.emailHref} className="flex items-center gap-2.5 text-mist hover:text-bone">
                <Icon name="check" size={16} className="text-molten" /> {site.email}
              </a>
              <p className="flex items-center gap-2.5 text-mist">
                <Icon name="pin" size={16} className="text-molten" /> {site.address.full}
              </p>
              <p className="flex items-center gap-2.5 text-mist">
                <Icon name="clock" size={16} className="text-molten" /> {site.hours}
              </p>
            </div>
          </div>

          <FooterCol title="Services" links={services.map((s) => ({ label: s.navLabel, href: `/services/${s.slug}` }))} />
          <FooterCol title="Finishes" links={finishes.slice(0, 6).map((f) => ({ label: f.name, href: `/finishes#${f.slug}` }))} />
          <FooterCol
            title="Service Area"
            links={[
              ...serviceAreas.slice(0, 6).map((a) => ({ label: a.city, href: `/service-area/${a.slug}` })),
              { label: "All areas", href: "/service-area" },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 text-sm text-ash sm:flex-row sm:items-center">
          <p>
            &copy; {year} {site.trademark}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/faq" className="hover:text-mist">FAQ</Link>
            <Link href="/contact" className="hover:text-mist">Contact</Link>
            <a href={site.facebook} className="hover:text-mist" rel="noopener noreferrer" target="_blank">Facebook</a>
            <a
              href="https://modernapexstrategies.com"
              rel="noopener noreferrer"
              target="_blank"
              className="text-ash hover:text-mist"
            >
              Site by Modern Apex Strategies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-sm text-ash transition-colors hover:text-molten-bright">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
