import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import Visualizer from "@/components/visualizer/Visualizer";

export const metadata: Metadata = {
  title: "Floor Design Visualizer: Build Your Flake Floor",
  description:
    "Design your epoxy flake floor in a real room. Pick a blend or build your own, set the polyaspartic sheen, even upload your own garage, then request the exact floor from The Epoxy Guys.",
  alternates: { canonical: `${site.url}/visualizer/` },
};

export default function VisualizerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Visualizer", url: "/visualizer" },
        ])}
      />
      <div className="pt-16">
        <Visualizer />
      </div>
    </>
  );
}
