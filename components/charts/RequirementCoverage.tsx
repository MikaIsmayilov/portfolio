"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/components/charts/useCountUp";

/**
 * Job Agent — how a posting gets scored: the description is split into
 * sections, each requirement line is checked against the resume, and unmet
 * lines become gaps. Illustrative posting; no metrics claimed.
 */
type Line = { section: string; text: string; state: "met" | "gap" | "skip" };

const LINES: Line[] = [
  { section: "REQ", text: "SQL and Python for analysis", state: "met" },
  { section: "REQ", text: "Dashboards in Power BI or Tableau", state: "met" },
  { section: "REQ", text: "Design and read A/B tests", state: "met" },
  { section: "PREF", text: "Experience with dbt", state: "gap" },
  { section: "EEO", text: "Equal opportunity employer…", state: "skip" },
];

const SCORE = 78;

export default function RequirementCoverage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const scoreDelay = 0.3 + LINES.length * 0.22;
  const score = useCountUp(SCORE, inView, 900, scoreDelay * 1000);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <div
        className="mono"
        style={{
          fontSize: "0.5625rem",
          letterSpacing: "0.14em",
          color: "var(--paper-faint)",
          marginBottom: "0.9rem",
        }}
      >
        POSTING → REQUIREMENTS CHECKED AGAINST RESUME
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {LINES.map((l, i) => {
          const color =
            l.state === "met" ? "var(--ember)" : l.state === "gap" ? "var(--cool)" : "var(--paper-faint)";
          const mark = l.state === "met" ? "✓" : l.state === "gap" ? "gap" : "skip";
          return (
            <motion.div
              key={l.text}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: l.state === "skip" ? 0.45 : 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.22 }}
              className="mono"
              style={{
                display: "grid",
                gridTemplateColumns: "2.6rem 1fr auto",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.45rem 0.6rem",
                fontSize: "0.6875rem",
                border: "1px solid var(--rule)",
                borderLeft: `2px solid ${color}`,
                color: "var(--paper-dim)",
                textDecoration: l.state === "skip" ? "line-through" : "none",
              }}
            >
              <span style={{ fontSize: "0.5625rem", letterSpacing: "0.12em", color: "var(--paper-faint)" }}>
                {l.section}
              </span>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {l.text}
              </span>
              <span style={{ color, fontSize: "0.625rem", letterSpacing: "0.08em" }}>{mark}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: scoreDelay, duration: 0.4 }}
        className="mono"
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: "0.5625rem",
          letterSpacing: "0.12em",
          color: "var(--paper-faint)",
        }}
      >
        <span>3 OF 3 REQUIRED COVERED · 1 GAP</span>
        <span>
          FIT{" "}
          <span style={{ color: "var(--ember)", fontSize: "1.25rem", letterSpacing: "0" }}>
            {Math.round(score)}
          </span>
        </span>
      </motion.div>
    </div>
  );
}
