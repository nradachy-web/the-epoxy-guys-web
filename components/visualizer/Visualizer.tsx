"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FlakeRenderer } from "@/lib/visualizer/renderer";
import { scenes as presetScenes, type Scene, type Corner } from "@/lib/visualizer/scenes";
import {
  presets, palette, baseCoats, families, sizeMeta, densityMeta,
  type Blend, type FlakeSize, type Density,
} from "@/lib/visualizer/blends";
import { asset } from "@/lib/asset";

const SIZES: FlakeSize[] = ["fine", "standard", "broad"];
const DENSITIES: Density[] = ["light", "standard", "full"];

function encodeBuild(b: Blend, gloss: number, scene: string) {
  const data = { n: b.name, bc: b.baseCoat, c: b.chips, s: b.size, d: b.density, g: Math.round(gloss * 100), r: scene };
  return encodeURIComponent(btoa(JSON.stringify(data)));
}

export default function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<FlakeRenderer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [swatches, setSwatches] = useState<Record<string, string>>({});
  const [currentSwatch, setCurrentSwatch] = useState<string>("");
  const [cal, setCal] = useState(false); // ?cal debug: overlay the floor quad
  useEffect(() => { setCal(new URLSearchParams(window.location.search).has("cal")); }, []);

  const [scene, setScene] = useState<Scene>(presetScenes[0]);
  const [blend, setBlend] = useState<Blend>(presets[0]);
  const [gloss, setGloss] = useState(presets[0].gloss);
  const [tab, setTab] = useState<"presets" | "custom" | "rooms">("presets");
  const [familyFilter, setFamilyFilter] = useState<string>("All");

  // upload + corner marking
  const [marking, setMarking] = useState<{ url: string; w: number; h: number } | null>(null);
  const [markCorners, setMarkCorners] = useState<Corner[]>([[0.06, 0.92], [0.94, 0.92], [0.72, 0.58], [0.28, 0.58]]);

  // init renderer + pre-render the real flake swatches for the whole catalog
  useEffect(() => {
    if (!canvasRef.current) return;
    try {
      const r = new FlakeRenderer(canvasRef.current);
      rendererRef.current = r;
      const sw: Record<string, string> = {};
      for (const p of presets) sw[p.slug] = r.swatchDataURL(p, 240);
      setSwatches(sw);
    } catch (e) {
      setError(e instanceof Error ? e.message : "WebGL2 is not available in this browser.");
    }
    return () => { rendererRef.current?.dispose(); rendererRef.current = null; };
  }, []);

  // load scene
  useEffect(() => {
    const r = rendererRef.current;
    if (!r || error) return;
    let alive = true;
    setReady(false);
    r.loadScene(scene.image, scene.corners, scene.tile, scene.wallReject ?? 1.2)
      .then(() => {
        if (!alive) return;
        setCurrentSwatch(r.swatchDataURL(blend, 240)); // renders flake into the FBO
        r.composite(gloss);
        setReady(true);
      })
      .catch((e) => setError(String(e?.message || e)));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  // flake recipe changed -> regen swatch (also fills the FBO) + repaint floor
  useEffect(() => {
    const r = rendererRef.current;
    if (!r || !ready || error) return;
    setCurrentSwatch(r.swatchDataURL(blend, 240));
    r.composite(gloss);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blend, ready]);

  // gloss only -> recomposite (cheap, no flake re-render)
  useEffect(() => {
    const r = rendererRef.current;
    if (r && ready && !error) r.composite(gloss);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gloss]);

  const loadPreset = (p: Blend) => { setBlend(p); setGloss(p.gloss); };
  const patch = (u: Partial<Blend>) => setBlend((b) => ({ ...b, ...u, name: "Custom Blend", code: "EG-000" }));

  // ---- upload flow ----
  const onUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setMarking({ url, w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
  }, []);
  const applyUpload = () => {
    if (!marking) return;
    const up: Scene = {
      slug: "upload", name: "Your Room", code: "00",
      image: marking.url, corners: markCorners as [Corner, Corner, Corner, Corner], tile: 12,
    };
    setMarking(null);
    setScene(up);
    setTab("presets");
  };

  const filtered = familyFilter === "All" ? presets : presets.filter((p) => p.family === familyFilter);

  return (
    <div className="grid min-h-[calc(100svh-4rem)] grid-cols-1 lg:grid-cols-[1fr_25rem]">
      {/* ---- viewport ---- */}
      <div className="relative flex items-center justify-center overflow-hidden bg-[#0d0e10] p-4 sm:p-8">
        {error ? (
          <div className="max-w-sm text-center">
            <p className="mono-label text-white/60">Visualizer unavailable</p>
            <p className="mt-3 text-pretty text-white/80">{error}</p>
          </div>
        ) : (
          <figure className="relative w-full max-w-5xl">
            <div className="relative">
              <canvas ref={canvasRef} className="block h-auto w-full" />
              {cal && (
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {Array.from({ length: 19 }, (_, i) => (i + 1) * 5).map((p) => (
                    <g key={p}>
                      <line x1={p} y1={0} x2={p} y2={100} stroke="#22d3ee" strokeWidth={p % 10 === 0 ? 0.18 : 0.07} opacity="0.5" />
                      <line x1={0} y1={p} x2={100} y2={p} stroke="#22d3ee" strokeWidth={p % 10 === 0 ? 0.18 : 0.07} opacity="0.5" />
                    </g>
                  ))}
                  <polygon points={scene.corners.map((c) => `${c[0] * 100},${c[1] * 100}`).join(" ")} fill="none" stroke="#f43f5e" strokeWidth="0.4" />
                  {scene.corners.map((c, i) => (
                    <circle key={i} cx={c[0] * 100} cy={c[1] * 100} r="1.0" fill="#f43f5e" />
                  ))}
                </svg>
              )}
            </div>
            <figcaption className="mono-label mt-3 flex items-center justify-between text-white/55">
              <span>{scene.code} / {scene.name.toUpperCase()} · {blend.name.toUpperCase()}</span>
              <span className="tnum">{Math.round(gloss * 100)}% SHEEN</span>
            </figcaption>
            {!ready && <div className="absolute inset-0 grid place-items-center"><span className="mono-label text-white/50">Rendering…</span></div>}
          </figure>
        )}
      </div>

      {/* ---- control rail ---- */}
      <aside className="flex flex-col border-t border-line bg-paper lg:border-l lg:border-t-0">
        {/* current blend preview */}
        <div className="flex items-center gap-3 border-b border-line p-4">
          {currentSwatch ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentSwatch} alt="" className="h-14 w-14 shrink-0 border border-line-2 object-cover" />
          ) : (
            <span className="h-14 w-14 shrink-0 border border-line-2" style={swatchStyle(blend)} />
          )}
          <div className="min-w-0">
            <div className="truncate text-[0.95rem] text-ink">{blend.name}</div>
            <div className="mono-label text-muted">
              {blend.code} · {sizeMeta[blend.size].label} · {glossLabel(gloss)}
            </div>
          </div>
        </div>
        {/* tabs */}
        <div className="grid grid-cols-3 border-b border-line">
          {(["presets", "custom", "rooms"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`mono-label border-r border-line py-4 last:border-r-0 transition-colors ${tab === t ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"}`}
            >
              {t === "presets" ? "Blends" : t === "custom" ? "Customize" : "Room"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {tab === "presets" && (
            <div>
              <div className="flex flex-wrap gap-1.5">
                {["All", ...families].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFamilyFilter(f)}
                    className={`border px-2.5 py-1 text-xs transition-colors ${familyFilter === f ? "border-ink bg-ink text-paper" : "border-line-2 text-ink-2 hover:border-ink"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-5">
                {filtered.map((p) => {
                  const active = blend.name === p.name && blend.code === p.code;
                  return (
                    <button key={p.slug} onClick={() => loadPreset(p)} className="group text-left">
                      {swatches[p.slug] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={swatches[p.slug]}
                          alt={`${p.name} flake blend`}
                          className={`block aspect-square w-full border object-cover transition-transform group-hover:scale-[1.02] ${active ? "border-accent" : "border-line-2"}`}
                        />
                      ) : (
                        <span className={`block aspect-square w-full border ${active ? "border-accent" : "border-line-2"}`} style={swatchStyle(p)} />
                      )}
                      <span className="mt-2 block text-[0.8rem] leading-tight text-ink">{p.name}</span>
                      <span className="mono-label text-muted">{p.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "custom" && (
            <div className="space-y-7">
              <Field label="Base coat">
                <div className="flex flex-wrap gap-1.5">
                  {baseCoats.map((c) => (
                    <button key={c.hex} onClick={() => patch({ baseCoat: c.hex })} title={c.name}
                      className={`h-7 w-7 border ${blend.baseCoat === c.hex ? "border-accent" : "border-line-2"}`}
                      style={{ background: c.hex }} />
                  ))}
                </div>
              </Field>

              <Field label={`Flake colors · ${blend.chips.length}/5`}>
                <div className="space-y-2.5">
                  {(() => {
                    const total = blend.chips.reduce((s, c) => s + c.weight, 0) || 1;
                    return blend.chips.map((ch, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="h-6 w-6 shrink-0 border border-line-2" style={{ background: ch.hex }} />
                        <input type="range" min={1} max={20} value={Math.round(ch.weight * 20)}
                          onChange={(e) => { const c = [...blend.chips]; c[i] = { ...c[i], weight: +e.target.value / 20 }; patch({ chips: c }); }}
                          className="flex-1 accent-[var(--color-accent)]" />
                        <span className="mono-label tnum w-9 text-right text-ink-2">{Math.round((ch.weight / total) * 100)}%</span>
                        {blend.chips.length > 1 && (
                          <button onClick={() => patch({ chips: blend.chips.filter((_, j) => j !== i) })} aria-label="Remove color" className="mono-label text-muted transition-colors hover:text-accent">✕</button>
                        )}
                      </div>
                    ));
                  })()}
                </div>
                {blend.chips.length < 5 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
                    {palette.map((c) => (
                      <button key={c.hex} title={c.name} onClick={() => patch({ chips: [...blend.chips, { hex: c.hex, weight: 0.3 }] })}
                        className="h-6 w-6 border border-line-2 transition-transform hover:scale-110" style={{ background: c.hex }} />
                    ))}
                  </div>
                )}
              </Field>

              <Field label="Flake size">
                <Segmented options={SIZES.map((s) => ({ v: s, label: sizeMeta[s].label }))} value={blend.size} onChange={(v) => patch({ size: v as FlakeSize })} />
              </Field>
              <Field label="Broadcast density">
                <Segmented options={DENSITIES.map((d) => ({ v: d, label: d[0].toUpperCase() + d.slice(1) }))} value={blend.density} onChange={(v) => patch({ density: v as Density })} />
              </Field>
            </div>
          )}

          {tab === "rooms" && (
            <div className="space-y-3">
              {presetScenes.map((s) => (
                <button key={s.slug} onClick={() => setScene(s)}
                  className={`flex w-full items-center gap-3 border p-2 text-left transition-colors ${scene.slug === s.slug ? "border-accent" : "border-line-2 hover:border-ink"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.name} className="h-14 w-20 shrink-0 object-cover" />
                  <span>
                    <span className="block text-[0.9rem] text-ink">{s.name}</span>
                    <span className="mono-label text-muted">Environment {s.code}</span>
                  </span>
                </button>
              ))}
              <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 border border-dashed border-line-2 py-4 text-ink-2 transition-colors hover:border-accent hover:text-accent">
                <span className="mono-label">Upload your room →</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
              </label>
            </div>
          )}
        </div>

        {/* ---- gloss + build summary + CTA ---- */}
        <div className="border-t border-line p-6">
          <Field label={`Polyaspartic sheen · ${glossLabel(gloss)}`}>
            <input type="range" min={0} max={100} value={Math.round(gloss * 100)} onChange={(e) => setGloss(+e.target.value / 100)} className="w-full accent-[var(--color-accent)]" />
          </Field>
          <dl className="mt-5 space-y-0 border-t border-line">
            <Spec k="Blend" v={blend.name} />
            <Spec k="Flake size" v={sizeMeta[blend.size].label} />
            <Spec k="Density" v={densityMeta[blend.density].label} />
            <Spec k="Sheen" v={`${Math.round(gloss * 100)}%`} accent />
            <Spec k="Warranty" v="15 yr" />
          </dl>
          <a
            href={asset(`/quote/?finish=epoxy-flake&build=${encodeBuild(blend, gloss, scene.name)}`)}
            className="group mt-5 flex w-full items-center justify-center gap-2.5 border border-ink bg-ink px-6 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:border-accent hover:bg-accent"
          >
            Request this floor
            <span className="transition-transform duration-300 group-hover:translate-x-[3px]" aria-hidden>→</span>
          </a>
        </div>
      </aside>

      {/* ---- upload corner-marking overlay ---- */}
      {marking && (
        <CornerMarker
          marking={marking}
          corners={markCorners}
          setCorners={setMarkCorners}
          onCancel={() => setMarking(null)}
          onApply={applyUpload}
        />
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mono-label block">{label}</span>
      <div className="mt-3">{children}</div>
    </div>
  );
}
function Spec({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-t border-line py-2.5 first:border-t-0">
      <span className="mono-label text-muted">{k}</span>
      <span className={`text-[0.95rem] ${accent ? "text-accent" : "text-ink"} tnum`}>{v}</span>
    </div>
  );
}
function Segmented({ options, value, onChange }: { options: { v: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-3 border border-line-2">
      {options.map((o, i) => (
        <button key={o.v} onClick={() => onChange(o.v)}
          className={`mono-label py-2.5 ${i > 0 ? "border-l border-line-2" : ""} ${value === o.v ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function glossLabel(g: number) { return g < 0.33 ? "Matte" : g < 0.66 ? "Satin" : "High gloss"; }

/** A pure-CSS approximation of a blend, for static swatch chips (no GL needed). */
const SWATCH_SPOTS: [number, number][] = [
  [16, 22], [58, 14], [83, 34], [34, 46], [70, 58], [12, 64], [46, 80], [88, 78], [28, 8], [62, 90],
];
function swatchStyle(b: Blend): React.CSSProperties {
  const chips = b.chips.length ? b.chips : [{ hex: "#ccc", weight: 1 }];
  const grads = SWATCH_SPOTS.map((s, i) => {
    const c = chips[i % chips.length].hex;
    return `radial-gradient(circle at ${s[0]}% ${s[1]}%, ${c} 0 6%, transparent 7%)`;
  });
  return { backgroundColor: b.baseCoat, backgroundImage: grads.join(","), backgroundSize: "40% 40%" };
}

function CornerMarker({
  marking, corners, setCorners, onCancel, onApply,
}: {
  marking: { url: string; w: number; h: number };
  corners: Corner[];
  setCorners: (c: Corner[]) => void;
  onCancel: () => void;
  onApply: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const drag = useRef<number | null>(null);
  const move = (clientX: number, clientY: number) => {
    const el = boxRef.current; if (el == null || drag.current == null) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
    const next = corners.slice() as Corner[];
    next[drag.current] = [x, y];
    setCorners(next);
  };
  const labels = ["Front L", "Front R", "Back R", "Back L"];
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4">
      <div className="w-full max-w-3xl border border-line bg-paper p-5">
        <p className="mono-label">Mark the floor · drag the 4 corners onto your floor</p>
        <div
          ref={boxRef}
          className="relative mt-4 select-none touch-none"
          style={{ aspectRatio: `${marking.w} / ${marking.h}` }}
          onPointerMove={(e) => move(e.clientX, e.clientY)}
          onPointerUp={() => (drag.current = null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={marking.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points={corners.map((c) => `${c[0] * 100},${c[1] * 100}`).join(" ")} fill="rgba(196,101,26,0.18)" stroke="#c4651a" strokeWidth="0.4" />
          </svg>
          {corners.map((c, i) => (
            <button
              key={i}
              onPointerDown={(e) => { drag.current = i; (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
              className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center border border-paper bg-accent text-[0.6rem] font-bold text-white"
              style={{ left: `${c[0] * 100}%`, top: `${c[1] * 100}%` }}
              aria-label={labels[i]}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="mono-label text-muted">1 Front-left · 2 Front-right · 3 Back-right · 4 Back-left</span>
          <div className="flex gap-3">
            <button onClick={onCancel} className="mono-label text-ink-2 hover:text-ink">Cancel</button>
            <button onClick={onApply} className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:bg-accent">
              Apply <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
