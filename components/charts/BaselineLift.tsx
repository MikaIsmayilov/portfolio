"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "./useCountUp";

/**
 * BeatTheStreet — the real result. Always-beat baseline vs. the LightGBM
 * model on the 2022–2024 holdout. Numbers are the project's actual numbers.
 */
const BASELINE = 47.8;
const MODEL = 60.9;

export default function BaselineLift() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const base = useCountUp(BASELINE, inView, 1100, 150);
  const model = useCountUp(MODEL, inView, 1300, 350);
  const lift = useCountUp(MODEL - BASELINE, inView, 900, 1200);

  const W = 360;
  const H = 210;
  const left = 16;
  const right = 60;
  const track = W - left - right;
  const x = (v: number) => left + (v / 100) * track;

  const rows = [
    { y: 62, label: "Always-beat baseline", value: base, target: BASELINE, color: "var(--cool)" },
    { y: 128, label: "LightGBM · 2022–24 holdout", value: model, target: MODEL, color: "var(--ember)" },
  ];

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Bar chart: always-beat baseline 47.8% accuracy versus LightGBM model 60.9%, a 13.1 point lift."
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
    >
      <text x={left} y={20} className="mono" fill="var(--paper-faint)" fontSize="9" letterSpacing="1.4">
        TEST ACCURACY · %
      </text>

      {/* Axis ticks */}
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={40} y2={H - 30} stroke="var(--rule)" strokeWidth="1" />
          <text x={x(t)} y={H - 14} textAnchor="middle" className="mono" fill="var(--paper-faint)" fontSize="9">
            {t}
          </text>
        </g>
      ))}

      {rows.map((r, i) => (
        <g key={r.label}>
          <text x={left} y={r.y - 12} className="mono" fill="var(--paper-dim)" fontSize="9.5" letterSpacing="0.6">
            {r.label}
          </text>
          <rect x={left} y={r.y} width={track} height={16} fill="rgba(242,237,227,0.04)" />
          <motion.rect
            x={left}
            y={r.y}
            height={16}
            fill={r.color}
            initial={{ width: 0 }}
            animate={inView ? { width: x(r.target) - left } : {}}
            transition={{ duration: 1.1 + i * 0.2, delay: 0.15 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <text
            x={x(r.target) + 8}
            y={r.y + 12}
            className="mono"
            fill={r.color}
            fontSize="12"
            fontWeight={500}
          >
            {r.value.toFixed(1)}
          </text>
        </g>
      ))}

      {/* The lift */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <line
          x1={x(BASELINE)}
          x2={x(BASELINE)}
          y1={54}
          y2={158}
          stroke="var(--cool)"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity={0.7}
        />
        <line x1={x(BASELINE)} x2={x(MODEL)} y1={166} y2={166} stroke="var(--ember)" strokeWidth="1" />
        <line x1={x(MODEL)} x2={x(MODEL)} y1={162} y2={170} stroke="var(--ember)" strokeWidth="1" />
        <text
          x={(x(BASELINE) + x(MODEL)) / 2}
          y={182}
          textAnchor="middle"
          className="mono"
          fill="var(--ember)"
          fontSize="10"
          letterSpacing="1"
        >
          +{lift.toFixed(1)} PTS
        </text>
      </motion.g>
    </svg>
  );
}
