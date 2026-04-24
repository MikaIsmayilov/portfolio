"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";

const tier2: Project[] = [
  {
    slug: "f1-analysis",
    title: "F1 Performance Analysis",
    oneliner:
      "Three decades of Formula 1 data analyzed for driver performance, constructor dominance, and circuit effects — with interactive Tableau dashboards.",
    tech: ["Python", "SQL", "Tableau Public"],
    role: "Project manager",
    href: "https://github.com/MikaIsmayilov/Analyzing_Formula_One_Performance_Data_BA775_B09",
  },
  {
    slug: "airbnb-boston",
    title: "Airbnb Boston Price & Booking",
    oneliner:
      "End-to-end supervised ML pipeline on 3,500+ Boston listings: regression for nightly price and classification for 30-day booking likelihood.",
    tech: ["scikit-learn", "Python", "pandas"],
    role: "Classification track lead",
    href: "https://github.com/MikaIsmayilov/Boston_AirBnB_Price_Analytics_BA810_A07",
  },
  {
    slug: "alone-tv",
    title: "Alone TV — Survival Patterns",
    oneliner:
      "Unsupervised learning on History Channel's Alone contestants — K-Means, PCA, and hierarchical clustering to segment by behavioral and demographic traits.",
    tech: ["scikit-learn", "Python", "Jupyter"],
    role: "Item-category analysis",
    href: "https://github.com/MikaIsmayilov/B02_Alone_TVShow_Unsupervised_Project",
  },
  {
    slug: "semiconductor-trade",
    title: "Semiconductor Trade Resilience",
    oneliner:
      "Multi-source analysis of global semiconductor trade (UN COMTRADE + wafer fault rates + SOXX index) mapping supply-chain dependencies and fragile nodes.",
    tech: ["Python", "NetworkX", "GeoPandas"],
    role: "Data cleaning & pipeline lead",
    href: "https://github.com/MikaIsmayilov/Semicondictor_Trade_Resilience_BA780_A04",
  },
];

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

export default function MoreProjects() {
  return (
    <section
      id="more-projects"
      style={{ paddingBlock: "6rem", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="section-wrap">
        <FadeUp>
          <span
            className="section-num"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            03 / Coursework
          </span>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: "0.75rem",
            }}
          >
            More projects
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--ink-muted)",
              marginBottom: "3rem",
              maxWidth: "520px",
            }}
          >
            Real work with real results — coursework projects from my MSBA and
            BS programs.
          </p>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
          className="tier2-grid"
        >
          {tier2.map((p, i) => (
            <ProjectCard key={p.slug} project={p} large={false} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .tier2-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
