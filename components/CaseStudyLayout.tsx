"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export type StatChip = { value: string; label: string };

export function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

type Props = {
  title: string;
  oneliner: string;
  stats: StatChip[];
  tech: string[];
  github?: string | string[];
  demo?: string;
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
  badge,
  badgeColor = "accent",
  children,
}: Props) {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main style={{ paddingBottom: "6rem" }}>
        {/* Header */}
        <section
          style={{
            paddingBlock: "5rem",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <div className="section-wrap">
            {/* Back link */}
            <Link
              href="/#work"
              className="link-underline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.06em",
                marginBottom: "2rem",
              }}
            >
              ← Back to work
            </Link>

            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: "1rem" }}
              >
                <span
                  className="section-num"
                  style={{
                    color:
                      badgeColor === "signal"
                        ? "var(--signal)"
                        : "var(--accent)",
                    border: `1px solid ${
                      badgeColor === "signal"
                        ? "var(--signal)"
                        : "var(--accent)"
                    }`,
                    padding: "0.2rem 0.6rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  {badge}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                color: "var(--ink)",
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.125rem",
                color: "var(--ink-muted)",
                lineHeight: 1.6,
                maxWidth: "680px",
                marginBottom: "2.5rem",
              }}
            >
              {oneliner}
            </motion.p>

            {/* Stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {stats.map((s) => (
                <div key={s.label} className="stat-chip">
                  <span className="stat-chip-value">{s.value}</span>
                  <span className="stat-chip-label">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Tech + links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {tech.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>

              <div
                style={{
                  width: "1px",
                  height: "20px",
                  backgroundColor: "var(--rule)",
                }}
              />

              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                >
                  Live demo →
                </a>
              )}

              {github &&
                (Array.isArray(github) ? (
                  github.map((g, i) => (
                    <a
                      key={g}
                      href={g}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                    >
                      GitHub{github.length > 1 ? ` ${i + 1}` : ""} →
                    </a>
                  ))
                ) : (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                  >
                    GitHub →
                  </a>
                ))}
            </motion.div>
          </div>
        </section>

        {/* Case study body */}
        <div className="section-wrap" style={{ marginTop: "4rem" }}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <FadeUp>
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: "1.25rem",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h2>
        {children}
      </section>
    </FadeUp>
  );
}

export function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "1.0625rem",
        color: "var(--ink)",
        lineHeight: 1.7,
        maxWidth: "720px",
        marginBottom: "1rem",
      }}
    >
      {children}
    </p>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "0 0 1rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            gap: "0.75rem",
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            color: "var(--ink)",
            lineHeight: 1.6,
            maxWidth: "720px",
          }}
        >
          <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
