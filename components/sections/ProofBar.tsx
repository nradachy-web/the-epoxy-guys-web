import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Container, SheetHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * OWNER'S NOTE (Sheet 01) — a short first-person paragraph from David Tougas
 * against the candid crew-on-the-job photo. One Fraunces pull-line. The
 * strongest anti-slop, human signal: a real person, a real shop, a real town.
 * (Filename kept as ProofBar to avoid churn in page.tsx imports.)
 */
export function ProofBar() {
  return (
    <section id="owner" className="relative bg-paper py-24 sm:py-32">
      <Container>
        <SheetHeader index="01" title="The Owner" folio="Sheet 02 / 07" />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="display-quote text-balance text-[1.65rem] text-ink sm:text-[2rem]">
                &ldquo;I grind every slab to bare concrete, and I&rsquo;m on every job.&rdquo;
              </p>

              <div className="mt-8 space-y-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-2">
                <p>
                  I&rsquo;m {site.owner.name}. {site.legalName} is a {site.regionShort} family
                  business, my wife {site.owner.partner} and me. We are not a franchise and we do not
                  hand your floor to a rotating crew of subs.
                </p>
                <p>
                  The coating is the easy part. The floor lasts or fails on the prep, the diamond
                  grind, the crack repair, the moisture check, so that is the part I refuse to rush.
                  Do it right once and it carries a {site.warrantyYears}-year warranty.
                </p>
              </div>

              <div className="mt-9 grid max-w-md grid-cols-2 gap-x-10 gap-y-1 border-t border-line pt-5">
                <span className="mono-label">Owner / Operator</span>
                <span className="text-[0.95rem] font-medium text-ink">{site.owner.name}</span>
                <span className="mono-label mt-2">Based</span>
                <span className="mt-2 text-[0.95rem] font-medium text-ink tnum">
                  {site.address.full}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/photos/graded/gallery-real-06.jpg")}
                alt="The Epoxy Guys crew, in branded shirts, rolling a basecoat onto a prepped garage slab"
                width={1500}
                height={1000}
                loading="lazy"
                className="w-full object-cover"
              />
              <figcaption className="plate-caption mt-3">
                01 / On the job · {site.address.city}, MI · Basecoat
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
