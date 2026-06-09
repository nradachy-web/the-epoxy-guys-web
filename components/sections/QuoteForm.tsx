"use client";

import { useEffect, useState } from "react";
import { finishes, services, site } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";

function resolveService(slugOrName: string): string {
  if (!slugOrName) return "";
  const bySlug = services.find((s) => s.slug === slugOrName);
  if (bySlug) return bySlug.name;
  const byName = services.find((s) => s.name === slugOrName);
  return byName ? byName.name : "";
}

const field =
  "w-full border border-line-2 bg-surface px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30";
const label = "mono-label mb-2 block";

export function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [proj, setProj] = useState(resolveService(defaultService));

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const resolved = resolveService(q.get("service") ?? "");
    if (resolved) setProj(resolved);
    // A design handed off from the Floor Design Visualizer (?build=...)
    const build = q.get("build");
    if (build) {
      try {
        const d = JSON.parse(atob(decodeURIComponent(build)));
        const sizeLabel: Record<string, string> = { fine: '1/16"', standard: '1/8"', broad: '1/4"' };
        const lines = [
          "I designed this floor in your visualizer and would like a quote on it:",
          `• Blend: ${d.n}`,
          `• Flake size: ${sizeLabel[d.s] ?? d.s}   • Density: ${d.d}`,
          `• Polyaspartic sheen: ${d.g}%`,
          d.r ? `• Shown in: ${d.r}` : "",
          Array.isArray(d.c) ? `• Flake colors: ${d.c.map((c: { hex: string }) => c.hex).join(", ")} on a ${d.bc} base` : "",
        ].filter(Boolean);
        const el = document.getElementById("qf-message") as HTMLTextAreaElement | null;
        if (el) el.value = lines.join("\n");
        if (!resolved) setProj("Residential Epoxy Flooring");
        const fin = document.getElementById("qf-finish") as HTMLSelectElement | null;
        if (fin) fin.value = "Epoxy Flake";
      } catch {
        /* ignore malformed build */
      }
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("botcheck")) return; // honeypot
    setStatus("sending");
    const payload: Record<string, string> = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
      subject: "New quote request from miepoxyguys.com",
      from_name: "The Epoxy Guys Website",
    };
    fd.forEach((v, k) => (payload[k] = String(v)));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-line bg-surface p-8 text-center sm:p-10">
        <span className="mx-auto grid h-12 w-12 place-items-center border border-accent text-accent">
          <Icon name="check" size={24} />
        </span>
        <h3 className="head-sans mt-6 text-2xl text-ink">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-pretty text-ink-2">
          Thanks. We will reach out shortly to set up your free consultation. Need us sooner? Call
          David directly.
        </p>
        <a
          href={site.phoneHref}
          className="mono-label tnum mt-6 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
        >
          <Icon name="phone" size={16} /> {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-surface p-6 sm:p-8">
      {/* honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="qf-name">Name</label>
          <input id="qf-name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label className={label} htmlFor="qf-phone">Phone</label>
          <input id="qf-phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="(810) 000-0000" />
        </div>
        <div>
          <label className={label} htmlFor="qf-email">Email</label>
          <input id="qf-email" name="email" type="email" autoComplete="email" className={field} placeholder="you@email.com" />
        </div>
        <div>
          <label className={label} htmlFor="qf-address">Address</label>
          <input
            id="qf-address"
            name="address"
            type="text"
            autoComplete="street-address"
            className={field}
            placeholder="Street, city, ZIP"
          />
        </div>
        <div>
          <label className={label} htmlFor="qf-service">Project type</label>
          <select id="qf-service" name="project_type" className={field} value={proj} onChange={(e) => setProj(e.target.value)}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="qf-finish">Finish (optional)</label>
          <select id="qf-finish" name="finish" className={field} defaultValue="">
            <option value="">Help me choose</option>
            {finishes.map((f) => (
              <option key={f.slug} value={f.name}>{f.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={label} htmlFor="qf-message">Tell us about your space</label>
        <textarea
          id="qf-message"
          name="message"
          rows={4}
          className={field}
          placeholder="Approx. square footage, the condition of the concrete, what you have in mind..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 border border-ink bg-ink px-6 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-accent hover:border-accent disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Request my free quote"}
        {status !== "sending" ? <Icon name="arrow" size={18} /> : null}
      </button>

      {status === "error" ? (
        <div className="mt-3 flex items-center justify-center gap-2 border border-line-2 bg-surface-2 px-4 py-3 text-sm text-ink-2">
          <Icon name="phone" size={16} className="text-accent" />
          <span>
            Something went wrong. Please call us at{" "}
            <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a>.
          </span>
        </div>
      ) : (
        <p className="mt-3 text-center text-xs text-ash">
          No spam, no pressure. We usually reply the same day.
        </p>
      )}
    </form>
  );
}
