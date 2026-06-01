import { stats } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Container } from "@/components/ui/Primitives";
import { Counter, Parallax } from "@/components/ui/Motion";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-line">
      <Parallax className="absolute inset-0" distance={50}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/photos/texture-floor-dark.jpg")} alt="" aria-hidden className="h-[120%] w-full object-cover opacity-40" loading="lazy" />
      </Parallax>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,9,11,0.86), rgba(16,18,22,0.92))" }} />
      <Container className="relative">
        <RevealGroup className="grid grid-cols-2 gap-y-10 py-16 lg:grid-cols-4">
          {stats.map((s) => {
            const n = parseInt(s.value, 10);
            const numeric = String(n) === s.value;
            return (
              <RevealItem key={s.label}>
                <div className="text-center">
                  <div className="font-display text-5xl text-bone sm:text-6xl">
                    {numeric ? <Counter to={n} duration={Math.min(1.6, 0.5 + n * 0.06)} /> : s.value}
                    <span className="ml-1 text-2xl text-molten-bright sm:text-3xl">{s.unit}</span>
                  </div>
                  <p className="mt-2 text-sm text-ash">{s.label}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
