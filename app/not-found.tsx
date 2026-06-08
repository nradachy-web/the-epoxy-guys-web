import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70svh] place-items-center overflow-hidden bg-paper px-5 pt-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "radial-gradient(50% 50% at 50% 30%, rgba(196,101,26,0.08), transparent 70%)" }}
      />
      <div className="relative text-center">
        <p className="font-display text-7xl text-accent sm:text-8xl">404</p>
        <h1 className="font-display mt-4 text-3xl text-ink">This floor does not exist.</h1>
        <p className="mx-auto mt-3 max-w-md text-pretty text-ink-2">
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
