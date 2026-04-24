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
    degree: "M.S. in Business Analytics",
    institution: "Boston University, Questrom School of Business",
    period: "Dec 2026",
    notes: ["3.2 GPA", "In progress"],
  },
  {
    degree: "B.S. in Psychology, Minor in Business Analytics",
    institution: "Suffolk University, Boston, MA",
    period: "May 2025",
    notes: ["3.7 GPA", "Magna Cum Laude", "Dean's List"],
  },
];

const experience = [
  {
    title: "Sales Management Intern",
    org: "NEP Engineering",
    location: "Baku, Azerbaijan",
    period: "Jun 2025 – Aug 2025",
    bullets: [
      "Developed and executed sales strategies for technical and engineering solutions, driving new client acquisitions across energy, infrastructure, and industrial sectors.",
      "Nurtured 15 major client accounts; built partnerships with government bodies and international contractors, increasing average contract values by 30%.",
      "Led a sales team of five, improving pipeline visibility and forecasting accuracy.",
    ],
  },
  {
    title: "Business Support Coordinator",
    org: "Sustainable Business Network of Massachusetts",
    location: "Cambridge, MA",
    period: "Sep 2024 – Jun 2025",
    bullets: [
      "Supported 50 Black-owned businesses through technical assistance and connections to funding, including Cambridge Savings Bank and the City of Cambridge.",
      "Managed Equity Fund application cycle — reviewed 40 applications annually, developed individualized success plans with 10–15 grantees.",
      "Created newsletters and campaigns that drove a 30% increase in digital engagement for CSBBN member businesses.",
    ],
  },
  {
    title: "Business Support Intern",
    org: "Sustainable Business Network of Massachusetts",
    location: "Cambridge, MA",
    period: "Jun 2024 – Sep 2024",
    bullets: [
      "Evaluated 20+ businesses across Cambridge for grant eligibility, ensuring compliance with equity-focused criteria.",
    ],
  },
  {
    title: "Research Intern",
    org: "Cambridge Local First",
    location: "Cambridge, MA",
    period: "Jan 2024 – May 2024",
    bullets: [
      "Contributed to the Resilient Economies Internship — researched strategies for community campaigns, enhancing local engagement by 25%.",
      "Measured and evaluated campaign impact on community awareness, delivering actionable insights to improve outreach effectiveness.",
    ],
  },
];

const skills = {
  "Languages & Tools": ["Python", "R", "SQL", "Tableau", "Power BI", "BigQuery", "Git", "Streamlit"],
  "Python Libraries": ["Pandas", "NumPy", "Scikit-learn", "XGBoost", "SHAP", "NetworkX", "Matplotlib", "Seaborn", "Hugging Face"],
  "Spoken Languages": ["English (native)", "Russian (native)", "Azerbaijani (proficient)", "Turkish (proficient)", "Spanish (intermediate)"],
};

export default function ResumeBlock() {
  return (
    <section
      id="resume"
      style={{ paddingBlock: "6rem", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="section-wrap">
        <FadeUp>
          <span className="section-num" style={{ display: "block", marginBottom: "1rem" }}>
            05 / Résumé
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
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Download PDF
            </a>
          </div>
        </FadeUp>

        {/* Education + Skills row */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", marginBottom: "3rem" }}
          className="resume-top-grid"
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
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--ink)", marginBottom: "0.2rem" }}>
                      {e.degree}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "0.4rem" }}>
                      {e.institution}
                    </p>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      <span className="tech-pill">{e.period}</span>
                      {e.notes.map((n) => <span key={n} className="tech-pill">{n}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Skills */}
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
                Skills
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <p className="section-num" style={{ marginBottom: "0.4rem", color: "var(--ink-muted)", letterSpacing: "0.08em" }}>
                      {category}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {items.map((item) => <span key={item} className="tech-pill">{item}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Experience — full width */}
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
              Experience
            </h3>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}
              className="experience-grid"
            >
              {experience.map((e) => (
                <div key={e.title + e.period}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.15rem" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--ink)" }}>
                      {e.title}
                    </p>
                    <span className="tech-pill">{e.period}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "0.6rem" }}>
                    {e.org} · {e.location}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {e.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--ink)", lineHeight: 1.6 }}>
                        <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      <style>{`
        @media (min-width: 700px) {
          .resume-top-grid { grid-template-columns: 1fr 1fr !important; }
          .experience-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
