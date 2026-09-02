"use client";

import Reveal from "@/components/Reveal";

const education = [
  {
    degree: "M.S. in Business Analytics",
    institution: "Boston University, Questrom School of Business",
    period: "Jan 2027",
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
    period: "Jun 2026 – Jul 2026",
    bullets: [
      "Automated recurring reporting for commercial and operations teams by building refreshable Power BI dashboards with DAX measures and Power Query transformations, replacing manual spreadsheet reporting.",
      "Supported credit-balance and arrears monitoring in line with Ofgem expectations, analyzing direct-debit levels against actual consumption to flag over- and under-set customer accounts.",
      "Queried a 572-table SQL Server reporting database and cleaned, validated, and explored large operational datasets in Python (pandas) to surface consumption and payment anomalies.",
    ],
  },
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
  "Languages & tools": ["Python", "R", "SQL", "Tableau", "Power BI", "BigQuery", "Git", "SAP", "Streamlit", "FastAPI", "Docker", "Vercel", "Supabase", "Adobe Creative Cloud", "MS Office"],
  "Python libraries": ["Pandas", "NumPy", "Scikit-learn", "XGBoost", "LightGBM", "SHAP", "pyfixest", "NetworkX", "GeoPandas", "Matplotlib", "Seaborn", "Hugging Face"],
  "Spoken languages": ["English (native)", "Russian (native)", "Azerbaijani (proficient)", "Turkish (proficient)", "Spanish (intermediate)"],
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="eyebrow"
      style={{
        color: "var(--paper-dim)",
        borderBottom: "1px solid var(--rule)",
        paddingBottom: "0.75rem",
        marginBottom: "1.5rem",
        fontFamily: "var(--font-mono)",
        lineHeight: 1,
      }}
    >
      {children}
    </h3>
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
                At a glance
              </h2>
            </div>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-line">
              Download PDF ↗
            </a>
          </div>
        </Reveal>

        {/* Education + Skills */}
        <div
          className="resume-top"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", marginBottom: "4.5rem" }}
        >
          <Reveal delay={0.05}>
            <Label>Education</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {education.map((e) => (
                <div key={e.degree}>
                  <p
                    className="display"
                    style={{ fontSize: "1.1875rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.25rem" }}
                  >
                    {e.degree}
                  </p>
                  <p className="prose" style={{ fontSize: "0.9375rem", color: "var(--paper-dim)", marginBottom: "0.6rem" }}>
                    {e.institution}
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    <span className="pill" style={{ color: "var(--ember)", borderColor: "var(--ember-dim)" }}>
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
          </Reveal>

          <Reveal delay={0.1}>
            <Label>Skills</Label>
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
          </Reveal>
        </div>

        {/* Experience — a real timeline */}
        <Reveal delay={0.1}>
          <Label>Experience</Label>
        </Reveal>
        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {experience.map((e, i) => (
            <Reveal key={e.title + e.period} as="li" delay={0.04 * i}>
              <div className="tl-row">
                <div className="tl-date">
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.06em",
                      color: e.current ? "var(--ember)" : "var(--paper-dim)",
                    }}
                  >
                    {e.period}
                  </span>
                </div>
                <div className="tl-body">
                  <span
                    aria-hidden="true"
                    className="tl-node"
                    style={{
                      backgroundColor: e.current ? "var(--ember)" : "var(--ground)",
                      borderColor: e.current ? "var(--ember)" : "var(--cool)",
                      boxShadow: e.current ? "0 0 0 4px var(--ember-dim)" : "none",
                    }}
                  />
                  <p
                    className="display"
                    style={{ fontSize: "1.1875rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.2rem" }}
                  >
                    {e.title}
                  </p>
                  <p className="prose" style={{ fontSize: "0.9375rem", color: "var(--paper-dim)", marginBottom: "0.9rem" }}>
                    {e.org} · {e.location}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {e.bullets.map((b) => (
                      <li
                        key={b}
                        className="prose"
                        style={{ display: "flex", gap: "0.7rem", fontSize: "0.9875rem", lineHeight: 1.6, maxWidth: "720px" }}
                      >
                        <span aria-hidden="true" style={{ color: "var(--ember)", flexShrink: 0 }}>—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <style>{`
        .tl-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.4rem;
        }
        .tl-body {
          position: relative;
          border-left: 1px solid var(--rule-strong);
          padding: 0 0 2.75rem 1.75rem;
        }
        .tl-node {
          position: absolute;
          left: -5px;
          top: 0.45rem;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1px solid;
        }
        .tl-date { padding-top: 0.2rem; padding-left: 1.75rem; }
        @media (min-width: 760px) {
          .resume-top { grid-template-columns: 5fr 7fr !important; gap: 5rem !important; }
          .tl-row { grid-template-columns: 200px 1fr; gap: 0; }
          .tl-date { padding-left: 0; }
        }
      `}</style>
    </section>
  );
}
