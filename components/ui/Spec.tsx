"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export type SpecRow = {
  key: string;
  value: ReactNode;
  /** copper on exactly one figure per table */
  accent?: boolean;
};

/**
 * THE SPEC TABLE — the page's recurring trust DNA. Mono field label, a
 * hairline dot-leader (drawn by the static .spec-leader pseudo-element), and a
 * tabular figure. Rows reveal top-to-bottom on scroll: the one tasteful
 * signature micro-moment.
 */
export function SpecTable({
  rows,
  className = "",
  animate = true,
}: {
  rows: SpecRow[];
  className?: string;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const stagger = reduce || !animate ? 0 : 0.08;

  return (
    <motion.dl
      className={`spec-table ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {rows.map((r) => (
        <motion.div
          key={r.key}
          className="spec-row"
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 6 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <dt className="spec-key">{r.key}</dt>
          <span className="spec-leader" aria-hidden />
          <dd className={`spec-val ${r.accent ? "spec-val--accent" : ""}`}>{r.value}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}
