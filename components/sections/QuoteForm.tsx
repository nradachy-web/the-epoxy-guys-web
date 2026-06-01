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
  "w-full rounded-xl border border-line bg-slate-800/60 px-4 py-3 text-[0.95rem] text-bone placeholder:text-ash transition focus:border-molten/50 focus:outline-none focus:ring-2 focus:ring-molten/25";
const label = "mb-1.5 block text-sm font-medium text-mist";

export function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [proj, setProj] = useState(resolveService(defaultService));

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("service");
    const resolved = resolveService(param ?? "");
    if (resolved) setProj(resolved);
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
      <div className="panel molten-edge rounded-2xl p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-molten/15 text-molten-bright">
          <Icon name="check" size={28} />
        </span>
        <h3 className="font-display mt-5 text-2xl text-bone">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-pretty text-mist">
          Thanks. We will reach out shortly to set up your free consultation. Need us sooner? Call
          David directly.
        </p>
        <a
          href={site.phoneHref}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-molten/40 bg-molten/10 px-5 py-2.5 text-sm font-semibold text-molten-bright"
        >
          <Icon name="phone" size={16} /> {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel rounded-2xl p-6 sm:p-8">
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
        className="sheen mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-molten-bright px-6 py-3.5 font-semibold text-void shadow-[var(--shadow-glow)] transition hover:bg-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Request my free quote"}
        {status !== "sending" ? <Icon name="arrow" size={18} /> : null}
      </button>

      {status === "error" ? (
        <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-bone/40 bg-bone/[0.06] px-4 py-3 text-sm text-bone">
          <Icon name="phone" size={16} className="text-molten-bright" />
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
