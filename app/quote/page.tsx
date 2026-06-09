import type { Metadata } from "next";
import { site, valueProps } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { Container, Section } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Get a Free Epoxy Floor Quote",
  description:
    "Request a free, no-pressure epoxy floor consultation in Genesee County, MI. Garage, basement, commercial and decorative floors, installed in a day with a 15-year warranty.",
  alternates: { canonical: `${site.url}/quote/` },
};

export default function QuotePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Free Quote", url: "/quote" },
        ])}
      />
      <PageHero
        eyebrow="Free consultation"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Free Quote", href: "/quote" },
        ]}
        title={
          <>
            Get your free, no-pressure <span className="text-accent">quote</span>.
          </>
        }
        lead="A few quick details is all we need. We will reach out to schedule a free on-site consultation, bring samples, and give you an honest price."
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="lg:order-last">
              <QuoteForm />
            </div>
            <aside className="lg:order-first">
              <div className="border-t border-line pt-4">
                <span className="index-label">
                  01 <span className="text-muted">/ What to expect</span>
                </span>
              </div>
              <ul className="mt-10">
                {valueProps.map((v, i) => (
                  <li
                    key={v.label}
                    className="flex gap-5 border-t border-line py-6 first:border-t-0 first:pt-0"
                  >
                    <span className="mono-label tnum mt-1 shrink-0 text-muted">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2.5">
                        <Icon name={v.icon} size={17} className="shrink-0 translate-y-0.5 text-accent" />
                        <h3 className="head-sans text-[1.05rem] text-ink">{v.label}</h3>
                      </div>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{v.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 border border-line bg-surface p-6">
                <p className="mono-label">Prefer to talk it through</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                  Call David directly for an honest read on your space.
                </p>
                <a
                  href={site.phoneHref}
                  className="mono-label tnum mt-4 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
                >
                  <Icon name="phone" size={16} /> {site.phone}
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
