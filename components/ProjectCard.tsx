"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export type Project = {
  slug: string;
  title: string;
  oneliner: string;
  tech: string[];
  role: string;
  badge?: string;
  badgeColor?: "signal" | "accent";
  miniViz?: "sparkline" | "bars" | "shimmer";
  href?: string;
};

function Sparkline() {
  const [animated, setAnimated] = useState(false);
  const points = [20, 35, 25, 50, 38, 60, 45, 65, 55, 70];
  const w = 100;
  const h = 40;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map((v) => h - (v / 80) * h);
  const d = xs
    .map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: "100%", height: "40px", overflow: "visible" }}
      onMouseEnter={() => setAnimated(true)}
    >
      <motion.path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </svg>
  );
}

function BarChart() {
  const [animated, setAnimated] = useState(false);
  const bars = [
    { label: "Control", value: 42, color: "var(--ink-muted)" },
    { label: "Treatment", value: 68, color: "var(--accent)" },
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-end",
        height: "40px",
      }}
      onMouseEnter={() => setAnimated(true)}
    >
      {bars.map((bar) => (
        <div
          key={bar.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            flex: 1,
          }}
        >
          <div
            style={{
              width: "100%",
              background: "var(--rule)",
              height: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: bar.color,
              }}
              initial={{ height: 0 }}
              animate={animated ? { height: `${bar.value}%` } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <span
            className="section-num"
            style={{ fontSize: "0.5rem", letterSpacing: "0.06em" }}
          >
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ShimmerBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.2rem 0.6rem",
        border: "1px solid var(--signal)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--signal)",
          animation: "pulse 2s infinite",
        }}
      />
      <span
        className="section-num"
        style={{ color: "var(--signal)", letterSpacing: "0.08em" }}
      >
        In progress
      </span>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

export default function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  const cardHref = project.href ?? `/work/${project.slug}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={cardHref} style={{ display: "block", textDecoration: "none" }}>
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            backgroundColor: "var(--bg-panel)",
            border: "1px solid var(--rule)",
            padding: large ? "2.5rem" : "1.75rem",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            height: "100%",
          }}
        >
          {/* Accent line draw on hover */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "var(--accent)",
              transformOrigin: "left",
            }}
          />

          {/* Badge */}
          {project.badge === "In progress" ? (
            <div style={{ marginBottom: "1rem" }}>
              <ShimmerBadge />
            </div>
          ) : project.badge ? (
            <div style={{ marginBottom: "1rem" }}>
              <span
                className="section-num"
                style={{
                  color:
                    project.badgeColor === "signal"
                      ? "var(--signal)"
                      : "var(--accent)",
                  border: `1px solid ${
                    project.badgeColor === "signal"
                      ? "var(--signal)"
                      : "var(--accent)"
                  }`,
                  padding: "0.15rem 0.5rem",
                  letterSpacing: "0.08em",
                }}
              >
                {project.badge}
              </span>
            </div>
          ) : null}

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: large ? "1.625rem" : "1.25rem",
              fontWeight: 700,
              color: "var(--ink)",
              marginBottom: "0.5rem",
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--ink-muted)",
              lineHeight: 1.55,
              marginBottom: "1.5rem",
            }}
          >
            {project.oneliner}
          </p>

          {/* Mini viz */}
          {project.miniViz && (
            <div style={{ marginBottom: "1.5rem" }}>
              {project.miniViz === "sparkline" && <Sparkline />}
              {project.miniViz === "bars" && <BarChart />}
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              marginBottom: "1rem",
            }}
          >
            {project.tech.map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>

          <p
            className="section-num"
            style={{ color: "var(--ink-muted)", letterSpacing: "0.06em" }}
          >
            {project.role}
          </p>

          <motion.div
            animate={{
              color: hovered ? "var(--accent)" : "var(--ink-muted)",
            }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: large ? "2.5rem" : "1.75rem",
              right: large ? "2rem" : "1.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "1.25rem",
            }}
          >
            →
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
