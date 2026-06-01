import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70svh] place-items-center overflow-hidden px-5 pt-28">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/photos/texture-floor-dark.jpg")} alt="" aria-hidden className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,9,11,0.8), var(--color-graphite))" }} />
      </div>
      <div className="relative text-center">
        <p className="font-display text-7xl text-molten-bright sm:text-8xl">404</p>
        <h1 className="font-display mt-4 text-3xl text-bone">This floor does not exist.</h1>
        <p className="mx-auto mt-3 max-w-md text-pretty text-mist">
          The page you are looking for moved or was never poured. Let us point you back to solid ground.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" icon={<Icon name="arrow" size={16} />}>Back home</Button>
          <Button href={site.phoneHref} variant="outline" icon={<Icon name="phone" size={16} />}>Call {site.phone}</Button>
        </div>
      </div>
    </section>
  );
}
