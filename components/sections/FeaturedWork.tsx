"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";

const tier1: Project[] = [
  {
    slug: "beatthestreet",
    title: "BeatTheStreet",
    oneliner:
      "Full-stack ML app predicting quarterly earnings surprises (beat/meet/miss) for US public companies. 60.9% accuracy on a strict 2022–2024 holdout — a 13-point lift over the always-beat baseline.",
    tech: ["LightGBM", "SHAP", "FastAPI", "React", "Docker", "WRDS"],
    role: "Solo project",
    badge: "Live",
    badgeColor: "signal",
    miniViz: "sparkline",
  },
  {
    slug: "scarcity-experiment",
    title: "Scarcity Messaging Experiment",
    oneliner:
      "Randomized online experiment testing whether 'Only 3 left!' causally increases purchase intent — analyzed with OLS, product fixed effects, and heterogeneous treatment effects.",
    tech: ["Python", "pyfixest", "Qualtrics", "pandas"],
    role: "Team · modeling & regression lead",
    miniViz: "bars",
  },
  {
    slug: "aurelian",
    title: "Aurelian",
    oneliner:
      "An AI-powered personal styling assistant I'm building in my spare time — no professor assigned it, no grade attached.",
    tech: ["LLM", "TBD"],
    role: "Solo project · personal initiative",
    badge: "In progress",
    miniViz: "shimmer",
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

export default function FeaturedWork() {
  return (
    <section
      id="work"
      style={{ paddingBlock: "6rem", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="section-wrap">
        <FadeUp>
          <span
            className="section-num"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            01 / Work
          </span>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "var(--ink)",
              marginBottom: "3rem",
              maxWidth: "560px",
            }}
          >
            Featured projects
          </h2>
        </FadeUp>

        {/* Large asymmetric card for BeatTheStreet */}
        <div style={{ marginBottom: "1.5rem" }}>
          <ProjectCard project={tier1[0]} large />
        </div>

        {/* Two-column grid for the other two */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
          }}
          className="tier1-grid"
        >
          {tier1.slice(1).map((p) => (
            <ProjectCard key={p.slug} project={p} large={false} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .tier1-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
