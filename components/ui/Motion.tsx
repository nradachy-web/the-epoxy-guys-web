"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Parallax: shifts children vertically as the section scrolls through view. */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/** Animated count-up that fires when scrolled into view. */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  const display = Number.isInteger(to) ? Math.round(val).toString() : val.toFixed(0);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** A subtle scroll progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{
        scaleX: reduce ? scrollYProgress : scaleX,
        background: "var(--color-ink)",
      }}
      className="fixed left-0 top-0 z-[60] h-px w-full origin-left"
    />
  );
}

/** Draggable before/after image comparison slider. */
export function BeforeAfter({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
  className = "",
}: {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    x.set(p);
    setPos(p);
  };

  useEffect(() => {
    const up = () => (dragging.current = false);
    const mv = (e: PointerEvent) => dragging.current && move(e.clientX);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointermove", mv);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointermove", mv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden rounded-2xl ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
    >
      {/* after (full) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={afterAlt} className="block h-full w-full object-cover" draggable={false} />
      {/* before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" style={{ width: ref.current?.clientWidth ?? "100%", maxWidth: "none" }} draggable={false} />
        <span className="absolute left-3 top-3 rounded-full bg-void/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-bone">Before</span>
      </div>
      <span className="absolute right-3 top-3 rounded-full bg-molten/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-void">After</span>
      {/* handle */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-bone/90" />
        <div className="absolute top-1/2 -ml-5 -mt-5 grid h-10 w-10 -translate-y-0 place-items-center rounded-full border border-bone/60 bg-void/70 backdrop-blur">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-bone">
            <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Infinite horizontal marquee for trust words / city names. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`group relative flex overflow-hidden ${className}`} aria-hidden>
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-sm font-medium uppercase tracking-[0.18em] text-ash">
            {it}
            <span className="text-molten">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
