"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useCountUp } from "@/components/charts/useCountUp";

export type StatChip = { value: string; label: string };

export { Reveal as FadeUp };

/** Counts up the leading number in a stat ("60.9%" → 0…60.9%). Leaves non-numeric values alone. */
function StatValue({ value, active, delay }: { value: string; active: boolean; delay: number }) {
  const match = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  const numeric = match ? parseFloat(match[1].replace(/,/g, "")) : NaN;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const useCommas = match ? match[1].includes(",") : false;
  const n = useCountUp(Number.isNaN(numeric) ? 0 : numeric, active, 1200, delay);

  if (Number.isNaN(numeric)) return <>{value}</>;
  const formatted = useCommas
    ? Math.round(n).toLocaleString("en-US")
    : n.toFixed(decimals);
  return (
    <>
      {formatted}
      {suffix}
    </>
  );
}

type Props = {
  title: string;
  oneliner: string;
  stats: StatChip[];
  tech: string[];
  github?: string | string[];
  demo?: string;
  demoLabel?: string;
  badge?: string;
  badgeColor?: "signal" | "accent";
  children: React.ReactNode;
};

export default function CaseStudyLayout({
  title,
  oneliner,
  stats,
  tech,
  github,
  demo,
  demoLabel = "Live demo",
  badge,
  badgeColor = "accent",
  children,
}: Props) {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsIn = useInView(statsRef, { once: true, margin: "-40px" });
  const live = badgeColor === "signal";

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "64px", paddingBottom: "6rem" }}>
        <section style={{ paddingBlock: "5rem 4rem", borderBottom: "1px solid var(--rule)" }}>
          <div className="wrap">
            <Link href="/#work" className="eyebrow link-draw" style={{ display: "inline-flex", gap: "0.5rem", marginBottom: "2.5rem", color: "var(--paper-dim)" }}>
              ← Back to work
            </Link>

            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: "1.25rem" }}
              >
                <span
                  className="eyebrow"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", color: live ? "var(--ember)" : "var(--cool)" }}
                >
                  {live && <span className="dot-live" />}
                  {badge}
                </span>
              </motion.div>
            )}

            <motion.h1
              className="display"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                marginBottom: "1.5rem",
                fontVariationSettings: '"opsz" 96, "wdth" 88',
              }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="prose"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              style={{ fontSize: "1.25rem", color: "var(--paper-dim)", maxWidth: "700px", marginBottom: "2.75rem" }}
            >
              {oneliner}
            </motion.p>

            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem 3rem",
                paddingBlock: "1.25rem",
                borderTop: "1px solid var(--rule)",
                borderBottom: "1px solid var(--rule)",
                marginBottom: "2.25rem",
              }}
            >
              {stats.map((s, i) => (
                <div key={s.label} style={{ minWidth: "120px" }}>
                  <div className="display" style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--ember)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.4rem", fontVariantNumeric: "tabular-nums" }}>
                    <StatValue value={s.value} active={statsIn} delay={i * 120} />
                  </div>
                  <div className="eyebrow">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", alignItems: "center" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {tech.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>

              {(demo || github) && (
                <div
                  className="cs-divider"
                  aria-hidden="true"
                  style={{ width: "1px", height: "20px", backgroundColor: "var(--rule-strong)" }}
                />
              )}
              <style>{`@media (max-width: 640px) { .cs-divider { display: none; } }`}</style>

              {demo && (
                <a href={demo} target="_blank" rel="noopener noreferrer" className="btn-ember" style={{ padding: "0.6rem 1rem" }}>
                  {demoLabel} ↗
                </a>
              )}

              {github &&
                (Array.isArray(github) ? (
                  github.map((g, i) => (
                    <a key={g} href={g} target="_blank" rel="noopener noreferrer" className="btn-line" style={{ padding: "0.6rem 1rem" }}>
                      GitHub{github.length > 1 ? ` ${i + 1}` : ""} ↗
                    </a>
                  ))
                ) : (
                  <a href={github} target="_blank" rel="noopener noreferrer" className="btn-line" style={{ padding: "0.6rem 1rem" }}>
                    GitHub ↗
                  </a>
                ))}
            </motion.div>
          </div>
        </section>

        <div className="wrap" style={{ marginTop: "4.5rem" }}>{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section
        className="cs-section"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
          marginBottom: "3.5rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <h2
          className="display"
          style={{ fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
        <div>{children}</div>
      </section>
      <style>{`
        @media (min-width: 860px) {
          .cs-section { grid-template-columns: 4fr 8fr !important; gap: 3rem !important; }
        }
      `}</style>
    </Reveal>
  );
}

/** A real screenshot with a mono caption. Framed like a plot, not a marketing image. */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure style={{ margin: "1.5rem 0 2rem" }}>
      <div
        style={{
          border: "1px solid var(--rule-strong)",
          backgroundColor: "var(--ground-2)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            width: 12,
            height: 12,
            borderTop: "1px solid var(--ember)",
            borderLeft: "1px solid var(--ember)",
            zIndex: 1,
          }}
        />
        <Image src={src} alt={alt} width={width} height={height} style={{ width: "100%", height: "auto" }} sizes="(max-width: 860px) 100vw, 760px" />
      </div>
      <figcaption className="eyebrow" style={{ marginTop: "0.6rem", letterSpacing: "0.1em", lineHeight: 1.5 }}>
        {caption}
      </figcaption>
    </figure>
  );
}

export function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="prose" style={{ fontSize: "1.125rem", maxWidth: "700px", marginBottom: "1.1rem" }}>
      {children}
    </p>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.1rem 0", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
      {items.map((item) => (
        <li key={item} className="prose" style={{ display: "flex", gap: "0.8rem", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "700px" }}>
          <span aria-hidden="true" style={{ color: "var(--ember)", flexShrink: 0 }}>—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
