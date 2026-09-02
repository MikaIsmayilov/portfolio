"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Aurelian — a wardrobe being scanned into structured data, then three
 * pieces picked for an occasion. Illustrative; no metrics claimed.
 */
const SWATCHES = [
  "#1F2A44", "#C19A6B", "#6B7A4B", "#E8DCC4", "#3A3A3A", "#6E2B3A", "#4A6FA5", "#F4F1EA",
  "#161616", "#A5472B", "#9AA88B", "#8C8C8C", "#2E4A62", "#D9B99B", "#5A5F3F", "#B8B2A7",
  "#0F1A2B", "#7A5C3E", "#C9C2B4", "#4F3B2E", "#8A9BB0", "#E2C9A0", "#3D4B3A", "#A6A6A6",
  "#22304A", "#D4A373", "#556B2F", "#EFE6D6", "#2B2B2B", "#7B2D3B", "#3F6E9A", "#C4B7A6",
];
const PICKED = [0, 13, 22];

export default function WardrobeGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <div
        className="mono"
        style={{
          fontSize: "0.5625rem",
          letterSpacing: "0.14em",
          color: "var(--paper-faint)",
          marginBottom: "0.9rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>WARDROBE · 32 ITEMS SCANNED</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.4 }}
          style={{ color: "var(--ember)" }}
        >
          OCCASION: DINNER → 3 PICKS
        </motion.span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: "6px",
        }}
      >
        {SWATCHES.map((c, i) => {
          const picked = PICKED.includes(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      scale: 1,
                      boxShadow: picked
                        ? "0 0 0 1.5px #F5B342, 0 0 14px rgba(245,179,66,0.45)"
                        : "0 0 0 0px rgba(0,0,0,0)",
                    }
                  : {}
              }
              transition={{
                opacity: { duration: 0.35, delay: 0.1 + i * 0.03 },
                scale: { duration: 0.35, delay: 0.1 + i * 0.03 },
                boxShadow: { duration: 0.4, delay: 1.5 + PICKED.indexOf(i) * 0.15 },
              }}
              style={{
                aspectRatio: "1 / 1",
                backgroundColor: c,
                borderRadius: "2px",
                border: "1px solid rgba(242,237,227,0.06)",
              }}
            />
          );
        })}
      </div>

      <div
        className="mono"
        style={{
          marginTop: "0.9rem",
          fontSize: "0.5625rem",
          letterSpacing: "0.12em",
          color: "var(--paper-faint)",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span>category</span>
        <span>color</span>
        <span>pattern</span>
        <span>material</span>
        <span>season</span>
        <span>formality</span>
      </div>
    </div>
  );
}
