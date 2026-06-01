import type { Metadata } from "next";
import { counties, site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { Container, Section } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact Us | Flint & Grand Blanc, MI",
  description:
    "Call 810-441-4494 or request a free consultation online. The Epoxy Guys install one-day epoxy and concrete floors across Genesee County, MI.",
  alternates: { canonical: `${site.url}/contact/` },
};

const details = [
  { icon: "phone", label: "Call or text", value: site.phone, href: site.phoneHref },
  { icon: "check", label: "Email", value: site.email, href: site.emailHref },
  { icon: "clock", label: "Hours", value: site.hours },
  { icon: "pin", label: "Based in", value: `${site.address.full}, serving the Flint metro` },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Get in touch"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        title={
          <>
            Let&apos;s talk about your <span className="molten-text">floor</span>.
          </>
        }
        lead="Free consultation, honest quote, no pressure. Call David directly or send a few details and we will reach out the same day."
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <div className="space-y-4">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-4 rounded-2xl border border-line bg-slate-900/50 p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-molten/25 bg-molten/10 text-molten-bright">
                      <Icon name={d.icon} size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-ash">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="font-display text-lg text-bone hover:text-molten-bright">{d.value}</a>
                      ) : (
                        <p className="font-display text-lg text-bone">{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-line bg-slate-900/50 p-5">
                <p className="text-xs uppercase tracking-wider text-ash">Counties served</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {counties.map((c) => (
                    <span key={c} className="rounded-full border border-line bg-slate-800/60 px-3 py-1 text-xs text-mist">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-bone">Request your free quote</h2>
              <p className="mt-2 text-sm text-ash">Tell us about your space and we will be in touch.</p>
              <div className="mt-5">
                <QuoteForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
