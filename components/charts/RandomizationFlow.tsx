"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Scarcity experiment — the design, not a made-up result.
 * 60 respondents are randomized into two arms; each rates 3 products,
 * which is how 60 becomes a 180-observation long panel.
 */
const N = 60;

export default function RandomizationFlow() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const W = 360;
  const H = 210;

  // Start: one 10×6 block on the left.
  const startPos = (i: number) => ({
    cx: 26 + (i % 10) * 9,
    cy: 58 + Math.floor(i / 10) * 11,
  });
  // End: two 10×3 blocks on the right, top = control, bottom = treatment.
  const endPos = (i: number) => {
    const arm = i % 2; // alternate assignment
    const j = Math.floor(i / 2);
    return {
      cx: 196 + (j % 10) * 9,
      cy: (arm === 0 ? 46 : 130) + Math.floor(j / 10) * 11,
    };
  };

  const dots = Array.from({ length: N }, (_, i) => i);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Diagram: 60 respondents randomized into control and scarcity-cue arms; three products each gives 180 observations."
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
    >
      <text x={16} y={20} className="mono" fill="var(--paper-faint)" fontSize="9" letterSpacing="1.4">
        RANDOMIZED ASSIGNMENT
      </text>

      {/* Left label */}
      <text x={26} y={140} className="mono" fill="var(--paper-dim)" fontSize="9.5">
        n = 60 respondents
      </text>

      {/* Arrow */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <line x1={128} x2={180} y1={88} y2={88} stroke="var(--rule-strong)" strokeWidth="1" />
        <polyline points="176,84 181,88 176,92" fill="none" stroke="var(--rule-strong)" strokeWidth="1" />
      </motion.g>

      {/* Arm labels */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <text x={196} y={36} className="mono" fill="var(--cool)" fontSize="9.5" letterSpacing="0.8">
          CONTROL · standard listing
        </text>
        <text x={196} y={120} className="mono" fill="var(--ember)" fontSize="9.5" letterSpacing="0.8">
          TREATMENT · “Only 3 left!”
        </text>
      </motion.g>

      {/* Ghost of the pooled sample, so the split stays legible after the dots leave */}
      {dots.map((i) => {
        const s = startPos(i);
        return (
          <circle
            key={`ghost-${i}`}
            cx={s.cx}
            cy={s.cy}
            r={3}
            fill="none"
            stroke="rgba(169,174,197,0.22)"
            strokeWidth="0.75"
          />
        );
      })}

      {/* Dots */}
      {dots.map((i) => {
        const s = startPos(i);
        const e = endPos(i);
        const treated = i % 2 === 1;
        return (
          <motion.circle
            key={i}
            r={3}
            initial={{ cx: s.cx, cy: s.cy, fill: "rgba(169,174,197,0.55)" }}
            animate={
              inView
                ? { cx: e.cx, cy: e.cy, fill: treated ? "#F5B342" : "#7C93FF" }
                : {}
            }
            transition={{
              duration: 0.9,
              delay: 0.35 + (i % 10) * 0.03 + Math.floor(i / 10) * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}

      {/* Panel note */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <line x1={196} x2={344} y1={176} y2={176} stroke="var(--rule)" strokeWidth="1" />
        <text x={196} y={192} className="mono" fill="var(--paper-dim)" fontSize="9.5">
          × 3 products each → 180 obs. long panel
        </text>
      </motion.g>
    </svg>
  );
}
