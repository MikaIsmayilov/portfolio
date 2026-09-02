"use client";

import Reveal from "@/components/Reveal";
import StudyBand from "@/components/StudyBand";
import type { Study } from "@/components/StudyBand";
import BaselineLift from "@/components/charts/BaselineLift";
import RandomizationFlow from "@/components/charts/RandomizationFlow";
import WardrobeGrid from "@/components/charts/WardrobeGrid";

const studies: Study[] = [
  {
    slug: "beatthestreet",
    title: "BeatTheStreet",
    status: { label: "Live", kind: "live" },
    role: "Solo build · deployed",
    oneliner:
      "A full-stack ML app that predicts quarterly earnings surprises — beat, meet, or miss — for US public companies, trained on 104,938 observations from 2005 to 2024.",
    finding: "60.9% on a strict 2022–24 holdout · +13 pts over the always-beat baseline",
    tech: ["LightGBM", "SHAP", "FastAPI", "React", "Docker", "WRDS"],
    chart: <BaselineLift />,
  },
  {
    slug: "scarcity-experiment",
    title: "Scarcity Messaging Experiment",
    status: { label: "Causal inference", kind: "team" },
    role: "Team · modeling & regression lead",
    oneliner:
      "A randomized online experiment testing whether “Only 3 left!” causally raises purchase intent — analyzed with covariate-adjusted OLS, product fixed effects, and respondent-clustered errors.",
    finding: "Significant lift in purchase intent and urgency (p < 0.05) · larger for impulsive shoppers",
    tech: ["Python", "pyfixest", "Qualtrics", "pandas"],
    chart: <RandomizationFlow />,
  },
  {
    slug: "aurelian",
    title: "Aurelian",
    status: { label: "Private beta", kind: "wip" },
    role: "Solo build · 470+ commits",
    oneliner:
      "An AI stylist that knows your wardrobe. Photograph your clothes and it catalogs them, finds the gaps, plans weather-aware packing for trips, and answers style questions with your real closet as context.",
    finding: "11 Claude-backed edge functions · Stripe billing with credit gating · 58 automated tests",
    tech: ["Claude Haiku 4.5", "Supabase", "React 19", "Stripe"],
    chart: <WardrobeGrid />,
  },
];

export default function FeaturedWork() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>
                Selected work
              </p>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                  fontWeight: 700,
                  lineHeight: 1.0,
                  maxWidth: "640px",
                }}
              >
                Three studies, three kinds of question.
              </h2>
            </div>
            <p
              className="prose"
              style={{ color: "var(--paper-dim)", maxWidth: "380px", fontSize: "1rem" }}
            >
              A prediction problem, a causal one, and a product. Each chart on
              the right is drawn from the project&apos;s real numbers.
            </p>
          </div>
        </Reveal>

        <div>
          {studies.map((s, i) => (
            <StudyBand key={s.slug} study={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
