"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/ui/Reveal";

/**
 * FIELD FOOTAGE — a silent graded loop cut from the owners' own install video,
 * seated inside The System sheet (not a new sheet, no renumbering). Ships as a
 * 3 MB muted mp4 with a poster, so it reads like a living plate, not a player.
 * One mono toggle swaps it for the full 3:11 install film (their YouTube).
 */
const FULL_VIDEO_ID = "d3_K2XpXbvc";

export function ProcessFilm() {
  const [full, setFull] = useState(false);
  return (
    <Reveal className="mt-16 sm:mt-20">
      <figure>
        <div className="relative aspect-video w-full overflow-hidden border border-line bg-ink">
          {full ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${FULL_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="The Epoxy Guys full install video"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={asset("/video/hero-loop.mp4")}
              poster={asset("/video/hero-poster.jpg")}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Silent footage of the crew grinding, coating, and flaking a garage floor"
            />
          )}
        </div>
        <figcaption className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="plate-caption">
            Field footage / grind · pour · broadcast · topcoat
          </span>
          {full ? (
            <button onClick={() => setFull(false)} className="mono-label self-start text-ink transition-colors hover:text-accent">
              Back to the loop
            </button>
          ) : (
            <button onClick={() => setFull(true)} className="group mono-label tnum self-start text-ink transition-colors hover:text-accent">
              Watch the full install · 3:11
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
            </button>
          )}
        </figcaption>
      </figure>
    </Reveal>
  );
}
