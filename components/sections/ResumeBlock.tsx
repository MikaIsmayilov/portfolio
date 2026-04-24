"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

const education = [
  {
    degree: "Master of Science in Business Analytics (MSBA)",
    institution: "Boston University, Questrom School of Business",
    period: "Expected Jan 2027",
    note: "In progress",
  },
  {
    degree: "Bachelor of Science in Psychology",
    institution: "Suffolk University",
    period: "May 2025",
    note: "Magna Cum Laude · Minor in Business Analytics",
  },
];

const experience = [
  {
    title: "Graduate Student",
    org: "Boston University",
    period: "2025 – present",
    note: "Coursework in ML, causal inference, data engineering",
  },
  {
    title: "Research & Experimentation",
    org: "BA830 Team Project",
    period: "2026",
    note: "Randomized experiment design, fixed-effects regression",
  },
];

const skills = {
  Languages: ["Python", "SQL", "TypeScript", "R (familiar)"],
  "ML / Stats": ["LightGBM", "scikit-learn", "SHAP", "pyfixest", "VADER"],
  "Data & APIs": ["pandas", "numpy", "WRDS", "FRED", "yfinance"],
  Infrastructure: ["FastAPI", "Docker", "Vercel", "HuggingFace Spaces"],
  Visualization: ["Tableau", "Recharts", "Matplotlib", "Seaborn"],
};

export default function ResumeBlock() {
  return (
    <section
      id="resume"
      style={{ paddingBlock: "6rem", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="section-wrap">
        <FadeUp>
          <span
            className="section-num"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            04 / Résumé
          </span>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "var(--ink)",
              }}
            >
              Résumé at a glance
            </h2>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Download PDF
            </a>
          </div>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
          className="resume-grid"
        >
          {/* Education */}
          <FadeUp delay={0.1}>
            <div>
              <h3
                className="section-num"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--accent)",
                  letterSpacing: "0.12em",
                  marginBottom: "1.25rem",
                  borderBottom: "1px solid var(--rule)",
                  paddingBottom: "0.5rem",
                }}
              >
                Education
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {education.map((e) => (
                  <div key={e.degree}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        color: "var(--ink)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {e.degree}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--ink-muted)",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {e.institution}
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span className="tech-pill">{e.period}</span>
                      <span className="tech-pill">{e.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Experience */}
          <FadeUp delay={0.12}>
            <div>
              <h3
                className="section-num"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--accent)",
                  letterSpacing: "0.12em",
                  marginBottom: "1.25rem",
                  borderBottom: "1px solid var(--rule)",
                  paddingBottom: "0.5rem",
                }}
              >
                Experience
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {experience.map((e) => (
                  <div key={e.title}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        color: "var(--ink)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {e.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--ink-muted)",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {e.org} · {e.period}
                    </p>
                    <span className="tech-pill">{e.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Skills */}
          <FadeUp delay={0.14}>
            <div>
              <h3
                className="section-num"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--accent)",
                  letterSpacing: "0.12em",
                  marginBottom: "1.25rem",
                  borderBottom: "1px solid var(--rule)",
                  paddingBottom: "0.5rem",
                }}
              >
                Skills
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <p
                      className="section-num"
                      style={{
                        marginBottom: "0.4rem",
                        color: "var(--ink-muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {category}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {items.map((item) => (
                        <span key={item} className="tech-pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .resume-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 960px) {
          .resume-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
