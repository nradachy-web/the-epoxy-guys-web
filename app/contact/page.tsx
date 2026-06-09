import type { Metadata } from "next";
import { counties, site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { Container, Section } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Contact Us | Flint & Grand Blanc, MI",
  description:
    "Call 810-441-4494 or request a free consultation online. The Epoxy Guys install one-day epoxy and concrete floors across Genesee County, MI.",
  alternates: { canonical: `${site.url}/contact/` },
};

const details = [
  { label: "Call or text", value: site.phone, href: site.phoneHref, mono: true },
  { label: "Email", value: site.email, href: site.emailHref },
  { label: "Hours", value: site.hours },
  { label: "Based in", value: site.address.full },
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
            Let&apos;s talk about your <span className="text-accent">floor</span>.
          </>
        }
        lead="Free consultation, honest quote, no pressure. Call David directly or send a few details and we will reach out the same day."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* ---- left: the contact datasheet ---- */}
            <div>
              <span className="mono-label">Direct line</span>

              {/* phone/email/hours/address as a ruled key-value sheet */}
              <dl className="mt-7 border-t border-line">
                {details.map((d, i) => (
                  <div
                    key={d.label}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-5"
                  >
                    <dt className="mono-label shrink-0 text-muted">{d.label}</dt>
                    <dd className="min-w-0 text-right">
                      {d.href ? (
                        <a
                          href={d.href}
                          className={
                            d.mono
                              ? "mono-label tnum text-ink transition-colors hover:text-accent"
                              : "head-sans text-[1.05rem] text-ink transition-colors hover:text-accent"
                          }
                        >
                          {d.value}
                        </a>
                      ) : (
                        <span className="head-sans text-[1.05rem] text-ink">{d.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* counties served, squared hairline mono chips */}
              <div className="mt-12">
                <span className="mono-label">Counties served</span>
                <div className="mt-5 flex flex-wrap gap-2">
                  {counties.map((c) => (
                    <span
                      key={c}
                      className="mono-label border border-line px-3 py-1.5 text-ink-2"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- right: the request form ---- */}
            <div className="border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-20 lg:pt-0">
              <span className="index-label">
                Request <span className="text-muted">/ Free quote</span>
              </span>
              <h2 className="head-sans mt-6 text-[1.9rem] text-ink sm:text-[2.4rem]">
                Request your free quote
              </h2>
              <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                Tell us about your space and we will be in touch the same day.
              </p>
              <div className="mt-9">
                <QuoteForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
