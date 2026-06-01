import type { MetadataRoute } from "next";
import { finishes, services, serviceAreas, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPaths = ["", "/services", "/finishes", "/gallery", "/about", "/reviews", "/faq", "/service-area", "/contact", "/quote"];
  const now = new Date("2026-06-01");

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}/`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  for (const s of services) {
    entries.push({ url: `${base}/services/${s.slug}/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 });
  }
  for (const a of serviceAreas) {
    entries.push({ url: `${base}/service-area/${a.slug}/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  // finishes live as anchors on /finishes; no separate URLs needed
  void finishes;

  return entries;
}
