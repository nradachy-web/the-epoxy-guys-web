import type { Metadata } from "next";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us: A Flint, MI Family Business",
  description:
    "Meet David and Michelle, the owner-operated team behind The Epoxy Guys. Rooted in Flint, hands-on on every job, and backing every floor with a 15-year warranty.",
  alternates: { canonical: `${site.url}/about/` },
};

const values = [
  { icon: "user", title: "Owner on every job", body: "David is on site for your project from prep to topcoat. The person who quotes your floor is the person who pours it." },
  { icon: "shield", title: "Prep, never skipped", body: "We diamond grind, repair, and manage moisture on every floor. It is the unglamorous step that makes the warranty real." },
  { icon: "check", title: "Honest, no pressure", body: "Clear quotes, fair pricing, and straight answers. We would rather earn a referral than push a sale." },
  { icon: "pin", title: "Local and family-owned", body: "We live and work in Genesee County. Our reputation is our neighbors, so we treat every floor like it is our own." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />
      <PageHero
        eyebrow="Our story"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        title={
          <>
            A family business built on <span className="molten-text">doing right</span> by people.
          </>
        }
        lead="The Epoxy Guys is David and Michelle Tougas, a hands-on Genesee County team that has spent decades putting customers first."
        image="/photos/service-polyaspartic.jpg"
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal className="max-w-2xl">
              <div className="space-y-5 text-pretty text-lg leading-relaxed text-mist">
                <p>
                  From a young age, David learned that service is everything. He spent his early years
                  working across Genesee, Oakland, and Lapeer counties, and he learned that building a
                  real relationship with a customer is what separates a good job from a great one. Get
                  to know what someone actually wants, deliver it within their budget, and exceed what
                  they expected.
                </p>
                <p>
                  That love of service led David into real estate and property management. Being from
                  the Flint area, he has a genuine passion for the city and its comeback. For the better
                  part of fifteen years he worked to rehabilitate housing in Flint, getting to know each
                  tenant and helping families find safe, quality places to live.
                </p>
                <p>
                  The Epoxy Guys grew straight out of that same obsession with quality and service. Today
                  David and Michelle run it as a close family business, using premium polyaspartic
                  systems and never cutting corners on prep. The goal is simple: give Genesee County
                  floors that look incredible and actually last, and treat every customer the way we
                  would want to be treated.
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-molten/20 bg-molten/[0.06] p-6">
                <p className="text-pretty text-lg italic leading-relaxed text-bone">
                  &ldquo;Quality process, quality product, quality finish. That is the whole job.&rdquo;
                </p>
                <p className="mt-3 text-sm text-ash">{site.owner.name}, {site.owner.title}</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset("/photos/real-corvette-flake-floor.jpg")} alt="Glossy flake epoxy garage floor in Genesee County" loading="lazy" className="aspect-[3/4] w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,11,0.32), transparent 50%)" }} />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/92 px-3.5 py-1.5 text-xs text-ink shadow-[var(--shadow-soft)] backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-accent" /> Flake garage floor
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-900/40">
        <Container>
          <SectionHeading align="center" eyebrow="What we stand for" title={<>The promises behind <span className="molten-text">every floor</span>.</>} />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="panel flex h-full flex-col gap-3 rounded-2xl p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-molten/25 bg-molten/10 text-molten-bright">
                    <Icon name={v.icon} size={22} />
                  </span>
                  <h3 className="font-display text-lg text-bone">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-ash">{v.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <ProcessTimeline />
      <Testimonials />
      <CtaBand />
    </>
  );
}
