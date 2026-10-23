"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/Reveal";
import { Timeline } from "@/components/ui/timeline";

const education = [
  {
    degree: "M.S. in Business Analytics",
    institution: "Boston University, Questrom School of Business",
    period: "Aug 2025 – Jan 2027",
    notes: ["In progress"],
  },
  {
    degree: "B.S. in Psychology, Minor in Business Analytics",
    institution: "Suffolk University, Boston, MA",
    period: "Sep 2023 – May 2025",
    notes: ["Magna Cum Laude", "Dean's List"],
  },
];

const certifications = [
  { name: "Introduction to Statistics", issuer: "Stanford University", date: "Aug 2025" },
  { name: "Python Data Structures", issuer: "University of Michigan", date: "Aug 2025" },
  { name: "Programming for Everybody (Getting Started with Python)", issuer: "University of Michigan", date: "Aug 2025" },
];

const experience = [
  {
    title: "Admissions Ambassador, M.S. in Business Analytics",
    org: "Boston University, Questrom School of Business",
    location: "Boston, MA",
    period: "Oct 2025 – Present",
    current: true,
    bullets: [
      "Selected as an Admissions Ambassador for BU's M.S. in Business Analytics program, representing it to prospective students weighing the degree against other analytics programs.",
      "Serve as a current-student point of contact, giving first-hand perspective on the curriculum, the pre-program analytics bootcamp, and the LAUNCH experience.",
    ],
  },
  {
    title: "Data Analysis Intern",
    org: "Outfox Energy (Redfish Systems)",
    location: "Leicester, UK (Remote)",
    period: "Jun 2026 – Aug 2026",
    bullets: [
      "Automated recurring reporting for commercial and operations teams by building refreshable Power BI dashboards with DAX measures and Power Query transformations, replacing manual spreadsheet reporting.",
      "Supported credit-balance and arrears monitoring in line with Ofgem expectations, analyzing direct-debit levels against actual consumption to flag over- and under-set customer accounts.",
      "Queried a 572-table SQL Server reporting database and cleaned, validated, and explored large operational datasets in Python (pandas) to surface consumption and payment anomalies.",
    ],
  },
  {
    title: "Sales Management Intern",
    org: "Daikin Azerbaijan (NEP Engineering)",
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
      "Supported 50+ Black-owned businesses through technical assistance and connections to funding, including Cambridge Savings Bank and the City of Cambridge.",
      "Managed Equity Fund application cycle — reviewed 40+ applications annually, developed individualized success plans with 10–15 grantees.",
      "Created newsletters and campaigns that drove a 30% increase in digital engagement for CSBBN member businesses.",
      "Cultivated partnerships across 5+ affiliate organizations, widening access to resources that address the operational and strategic needs of Black entrepreneurs.",
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
  "Languages & tools": ["Python", "R", "SQL", "Tableau", "Power BI", "BigQuery", "Git", "SAP", "Streamlit", "FastAPI", "Docker", "Vercel", "Supabase", "MS Office"],
  "Python libraries": ["Pandas", "NumPy", "Scikit-learn", "XGBoost", "LightGBM", "SHAP", "PyTorch", "Hugging Face Transformers", "Sentence-Transformers", "FAISS", "NetworkX", "GeoPandas", "Matplotlib", "Seaborn", "pyfixest"],
  "Additional tools": ["Qualtrics", "Jupyter", "WRDS", "FRED", "React", "TypeScript", "Vite", "Tailwind", "Adobe Creative Cloud"],
  "Spoken languages": ["English (native)", "Russian (native)", "Azerbaijani (proficient)", "Turkish (proficient)", "Spanish (intermediate)"],
};

// One line per role or school, scannable at a glance; full detail lives in
// the drawers below.
const summary: { key: string; when: string; title: string; org: string; kind: "Work" | "School"; current?: boolean }[] = [
  { key: "outfox", when: "2026", title: "Data Analysis Intern", org: "Outfox Energy · Power BI, SQL Server, pandas", kind: "Work" },
  { key: "bu", when: "2025 – now", title: "M.S. Business Analytics + Admissions Ambassador", org: "Boston University, Questrom", kind: "School", current: true },
  { key: "daikin", when: "2025", title: "Sales Management Intern", org: "Daikin Azerbaijan · +30% average contract value", kind: "Work" },
  { key: "sbn", when: "2024 – 25", title: "Business Support Coordinator & Intern", org: "Sustainable Business Network of MA · 50+ businesses supported", kind: "Work" },
  { key: "clf", when: "2024", title: "Research Intern", org: "Cambridge Local First", kind: "Work" },
  { key: "suffolk", when: "2023 – 25", title: "B.S. Psychology, Minor in Business Analytics", org: "Suffolk University · Magna Cum Laude", kind: "School" },
];

const skillCount = Object.entries(skills)
  .filter(([category]) => category !== "Spoken languages")
  .reduce((n, [, items]) => n + items.length, 0);

function Drawer({ title, count, children }: { title: string; count: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = `drawer-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div style={{ borderBottom: "1px solid var(--rule)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="drawer-btn"
      >
        <span style={{ display: "flex", alignItems: "baseline", gap: "0.85rem", flexWrap: "wrap" }}>
          <span className="display" style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
            {title}
          </span>
          <span className="eyebrow">{count}</span>
        </span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="drawer-plus"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0.5rem 0.25rem 2rem" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Kind({ kind }: { kind: "Work" | "School" }) {
  const work = kind === "Work";
  return (
    <span
      className="eyebrow"
      style={{
        fontSize: "0.625rem",
        padding: "0.15rem 0.5rem",
        borderRadius: 999,
        marginLeft: "0.6rem",
        verticalAlign: "middle",
        color: work ? "var(--accent)" : "var(--support)",
        backgroundColor: work ? "var(--accent-dim)" : "var(--support-dim)",
      }}
    >
      {kind}
    </span>
  );
}

export default function ResumeBlock() {
  return (
    <section id="resume" className="section">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>
                Résumé
              </p>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.0,
                }}
              >
                The path so far.
              </h2>
            </div>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-pill">
              Download PDF <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>

        <div className="resume-grid">
          <Timeline
            data={summary.map((e) => ({
              key: e.key,
              when: e.when,
              current: e.current,
              content: (
                <>
                  <p className="display" style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                    {e.title}
                    <Kind kind={e.kind} />
                  </p>
                  <p className="prose" style={{ fontSize: "0.9375rem", color: "var(--paper-dim)", marginTop: "0.2rem" }}>
                    {e.org}
                  </p>
                </>
              ),
            }))}
          />

          <div style={{ borderTop: "1px solid var(--rule)" }}>
            <Drawer title="Experience details" count={`${experience.length} roles`}>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "2rem" }}>
                {experience.map((e) => (
                  <li key={e.title + e.period}>
                    <p className="mono" style={{ fontSize: "0.75rem", letterSpacing: "0.06em", color: e.current ? "var(--accent)" : "var(--support)", marginBottom: "0.35rem" }}>
                      {e.period}
                    </p>
                    <p className="display" style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.2rem" }}>
                      {e.title}
                    </p>
                    <p className="prose" style={{ fontSize: "0.9375rem", color: "var(--paper-dim)", marginBottom: "0.75rem" }}>
                      {e.org} · {e.location}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                      {e.bullets.map((b) => (
                        <li key={b} className="prose" style={{ display: "flex", gap: "0.7rem", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                          <span aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Drawer>

            <Drawer title="Skills" count={`${skillCount} tools · ${skills["Spoken languages"].length} languages`}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <p className="eyebrow" style={{ marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
                      {category}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {items.map((item) => (
                        <span key={item} className="pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Drawer>

            <Drawer title="Education details" count={`${education.length} schools`}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {education.map((e) => (
                  <div key={e.degree}>
                    <p className="display" style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.25rem" }}>
                      {e.degree}
                    </p>
                    <p className="prose" style={{ fontSize: "0.9375rem", color: "var(--paper-dim)", marginBottom: "0.6rem" }}>
                      {e.institution}
                    </p>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      <span className="pill" style={{ color: "var(--accent)", borderColor: "var(--accent-dim)" }}>
                        {e.period}
                      </span>
                      {e.notes.map((n) => (
                        <span key={n} className="pill">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Drawer>

            <Drawer title="Certifications" count={`${certifications.length}`}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {certifications.map((c) => (
                  <div key={c.name}>
                    <p className="display" style={{ fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.25rem" }}>
                      {c.name}
                    </p>
                    <p className="prose" style={{ fontSize: "0.9375rem", color: "var(--paper-dim)" }}>
                      {c.issuer} · {c.date}
                    </p>
                  </div>
                ))}
              </div>
            </Drawer>
          </div>
        </div>
      </div>

      <style>{`
        .resume-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: start; }
        .drawer-btn {
          display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 1rem;
          padding: 1.25rem 0.25rem; background: none; border: none; cursor: pointer; color: inherit; text-align: left;
        }
        .drawer-plus {
          display: grid; place-items: center; flex: none; width: 2rem; height: 2rem; border-radius: 50%;
          border: 1px solid var(--rule-strong); color: var(--accent); font-family: var(--font-mono), monospace; font-size: 1.1rem;
          transition: border-color 220ms var(--ease-out);
        }
        .drawer-btn:hover .drawer-plus { border-color: var(--accent); }
        @media (min-width: 960px) {
          .resume-grid { grid-template-columns: 6fr 5fr; gap: 5rem; }
        }
      `}</style>
    </section>
  );
}
