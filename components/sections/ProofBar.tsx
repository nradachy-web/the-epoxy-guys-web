import { valueProps } from "@/lib/site";
import { Container } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ProofBar() {
  return (
    <div className="relative border-y border-line bg-slate-900/60">
      <Container>
        <h2 className="sr-only">Why homeowners choose The Epoxy Guys</h2>
        <RevealGroup className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {valueProps.map((v) => (
            <RevealItem key={v.label}>
              <div className="flex h-full flex-col gap-3 py-7 sm:px-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-molten/25 bg-molten/10 text-molten-bright">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3 className="font-display text-lg text-bone">{v.label}</h3>
                <p className="text-sm leading-relaxed text-ash">{v.detail}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </div>
  );
}
