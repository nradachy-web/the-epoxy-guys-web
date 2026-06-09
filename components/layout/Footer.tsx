import Link from "next/link";
import { services, serviceAreas, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

/**
 * CONTACT / FOOTER — one cohesive close. One phone number, one address, the
 * four-word nav echoed as a sheet index, and the inner-page links demoted to
 * a quiet register. No duplicated nav bars, no bolted-on social-icon soup.
 */
export function Footer() {
  const year = 2026;
  return (
    <footer id="contact" className="relative border-t border-line bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
        <span className="mono-label">Contact · The Epoxy Guys</span>

        <div className="mt-8 grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-20">
          {/* identity + the one set of contact facts */}
          <div>
            <Logo size={56} variant="stacked" />
            <p className="mt-6 max-w-xs text-pretty leading-relaxed text-ink-2">
              {site.regionShort}&rsquo;s owner-operated epoxy and concrete coating specialists.
              One-day floors, prepped right, backed for {site.warrantyYears} years.
            </p>

            <dl className="mt-8 space-y-3 border-t border-line pt-6">
              <div className="flex items-baseline gap-4">
                <dt className="mono-label w-20 shrink-0">Phone</dt>
                <dd>
                  <a href={site.phoneHref} className="tnum link-underline text-ink">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-4">
                <dt className="mono-label w-20 shrink-0">Email</dt>
                <dd>
                  <a href={site.emailHref} className="link-underline text-ink">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-4">
                <dt className="mono-label w-20 shrink-0">Shop</dt>
                <dd className="tnum text-ink">{site.address.full}</dd>
              </div>
              <div className="flex items-baseline gap-4">
                <dt className="mono-label w-20 shrink-0">Hours</dt>
                <dd className="text-ink">{site.hours}</dd>
              </div>
            </dl>
          </div>

          <FooterCol
            title="System"
            links={services.slice(0, 6).map((s) => ({ label: s.navLabel, href: `/services/${s.slug}` }))}
          />
          <FooterCol
            title="Service Area"
            links={[
              ...serviceAreas.slice(0, 6).map((a) => ({ label: a.city, href: `/service-area/${a.slug}` })),
              { label: "All areas", href: "/service-area" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="mono-label">
            © {year} {site.trademark}
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <Link href="/faq" className="mono-label text-muted transition-colors hover:text-ink">
              FAQ
            </Link>
            <Link href="/finishes" className="mono-label text-muted transition-colors hover:text-ink">
              Finishes
            </Link>
            <a
              href={site.facebook}
              rel="noopener noreferrer"
              target="_blank"
              className="mono-label text-muted transition-colors hover:text-ink"
            >
              Facebook
            </a>
            <a
              href="https://modernapexstrategies.com"
              rel="noopener noreferrer"
              target="_blank"
              className="mono-label text-muted transition-colors hover:text-ink"
            >
              Modern Apex
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
      <h3 className="mono-label">{title}</h3>
      <ul className="mt-5 space-y-3 border-t border-line pt-5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[0.95rem] text-ink-2 transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
