"use client";

import { useState } from "react";
import { Container, Section, SheetHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The owner-produced process video (their own YouTube channel), reused from the
 * old site. Click-to-play facade: we ship only the thumbnail until the visitor
 * presses play, so it never slows the page. Squared, hairline, on-register.
 */
const VIDEO_ID = "3ERvEEud3qs";

export function ProcessVideo({
  index = "03",
  title = "The Process",
  heading = "Watch a floor go in, start to finish.",
  className = "",
}: {
  index?: string;
  title?: string;
  heading?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <Section id="video" className={className}>
      <Container>
        <SheetHeader index={index} title={title} />
        <div className="mt-12 grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
          <h2 className="head-sans max-w-2xl text-balance text-[1.9rem] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
            {heading}
          </h2>
          <p className="mono-label tnum text-muted">Run time · the full one-day system</p>
        </div>

        <Reveal className="mt-12">
          <div className="relative aspect-video w-full overflow-hidden border border-line bg-ink">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="The Epoxy Guys process video"
                allow="accelerated-detection; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 h-full w-full"
                aria-label="Play the process video"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                  alt="The Epoxy Guys process video"
                  className="absolute inset-0 h-full w-full scale-[1.35] object-cover opacity-80 transition-opacity group-hover:opacity-90"
                />
                <span className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,22,26,0.55), rgba(20,22,26,0.15))" }} />
                <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center border border-white/70 text-white transition-colors group-hover:border-accent group-hover:text-accent">
                  <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden><path d="M0 0l22 13L0 26z" /></svg>
                </span>
                <span className="mono-label absolute bottom-4 left-4 text-white/80">Play · The Epoxy Guys</span>
              </button>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
