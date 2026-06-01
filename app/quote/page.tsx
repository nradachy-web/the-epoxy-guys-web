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
            Get your free, no-pressure <span className="molten-text">quote</span>.
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
              <h2 className="font-display text-2xl text-bone">What to expect</h2>
              <ul className="mt-6 space-y-5">
                {valueProps.map((v) => (
                  <li key={v.label} className="flex gap-4">
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-molten/25 bg-molten/10 text-molten-bright">
                      <Icon name={v.icon} size={19} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-bone">{v.label}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ash">{v.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-molten/20 bg-molten/[0.06] p-6">
                <p className="text-sm text-mist">Prefer to talk it through? Call David directly.</p>
                <a href={site.phoneHref} className="mt-2 flex items-center gap-2 font-display text-2xl text-bone hover:text-molten-bright">
                  <Icon name="phone" size={20} className="text-molten" /> {site.phone}
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
