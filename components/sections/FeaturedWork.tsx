"use client";

import Reveal from "@/components/Reveal";
import Link from "next/link";
import type { ReactNode } from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import BaselineLift from "@/components/charts/BaselineLift";
import RandomizationFlow from "@/components/charts/RandomizationFlow";
import RequirementCoverage from "@/components/charts/RequirementCoverage";
import WardrobeGrid from "@/components/charts/WardrobeGrid";

type Status = { label: string; kind: "live" | "team" | "wip" };

type Study = {
  slug: string;
  href?: string;
  title: string;
  oneliner: string;
  finding: string;
  headline: { value: string; label: string };
  tech: string[];
  role: string;
  status: Status;
  chart: ReactNode;
};

const studies: Study[] = [
  {
    slug: "beatthestreet",
    title: "BeatTheStreet",
    status: { label: "Live", kind: "live" },
    role: "Solo build · deployed",
    oneliner:
      "A full-stack ML app that predicts quarterly earnings surprises — beat, meet, or miss — for US public companies, trained on 104,938 observations from 2005 to 2024.",
    finding: "60.9% on a strict 2022–24 holdout · +13 pts over the always-beat baseline",
    headline: { value: "60.9%", label: "2022–24 holdout accuracy" },
    tech: ["LightGBM", "SHAP", "FastAPI", "React", "Docker", "WRDS"],
    chart: <BaselineLift />,
  },
  {
    slug: "job-agent",
    title: "Job Agent",
    status: { label: "Open source", kind: "team" },
    role: "Solo rebuild · 46 commits",
    oneliner:
      "An AI job agent anyone can install by talking to Claude. It scores each posting on how many of its real requirements your resume covers, flags jobs you can't legally take in the US or Canada, and tailors a one-page resume for the ones worth it.",
    finding: "Keyword matching → requirement coverage · US + Canada · 224 tests",
    headline: { value: "224", label: "automated tests" },
    tech: ["Claude Code", "Next.js", "Cloudflare Workers", "D1", "TypeScript"],
    chart: <RequirementCoverage />,
  },
  {
    slug: "scarcity-experiment",
    title: "Scarcity Messaging Experiment",
    status: { label: "Causal inference", kind: "team" },
    role: "Team · modeling & regression lead",
    oneliner:
      "A randomized online experiment testing whether “Only 3 left!” causally raises purchase intent — analyzed with covariate-adjusted OLS, product fixed effects, and respondent-clustered errors.",
    finding: "Significant lift in purchase intent and urgency (p < 0.05) · larger for impulsive shoppers",
    headline: { value: "p < 0.05", label: "lift in purchase intent" },
    tech: ["Python", "pyfixest", "Qualtrics", "pandas"],
    chart: <RandomizationFlow />,
  },
  {
    slug: "aurelian",
    title: "Aurelian",
    status: { label: "In development", kind: "wip" },
    role: "Solo build · 470+ commits",
    oneliner:
      "An AI stylist that knows your wardrobe. Photograph your clothes and it catalogs them, finds the gaps, plans weather-aware packing for trips, and answers style questions with your real closet as context.",
    finding: "11 Claude-backed edge functions · Stripe billing with credit gating · 58 automated tests",
    headline: { value: "11", label: "Claude-backed edge functions" },
    tech: ["Claude Haiku 4.5", "Supabase", "React 19", "Stripe"],
    chart: <WardrobeGrid />,
  },
];

function StatusMark({ status }: { status: Status }) {
  const color = status.kind === "live" ? "var(--accent)" : status.kind === "wip" ? "var(--support)" : "var(--paper-faint)";
  return (
    <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", color }}>
      {status.kind === "live" && <span className="dot-live" />}
      {status.label}
    </span>
  );
}

function StudyText({ study, index }: { study: Study; index: number }) {
  const href = study.href ?? `/work/${study.slug}`;
  const external = !!study.href;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <span className="eyebrow" style={{ color: "var(--support)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <StatusMark status={study.status} />
        <span className="eyebrow">{study.role}</span>
      </div>
      <h3
        className="display"
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          marginBottom: "1.1rem",
        }}
      >
        {study.title}
      </h3>
      <p className="prose" style={{ color: "var(--paper-dim)", maxWidth: "540px", marginBottom: "1.25rem" }}>
        {study.oneliner}
      </p>
      <p
        className="mono"
        style={{
          fontSize: "0.8125rem",
          color: "var(--accent)",
          marginBottom: "1.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <span aria-hidden="true" style={{ width: "14px", height: "1px", background: "var(--accent)", flex: "none" }} />
        {study.finding}
      </p>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="btn-pill study-link"
      >
        Read the case study <span aria-hidden="true">{external ? "↗" : "→"}</span>
      </Link>
    </div>
  );
}

function StudyPanel({ study }: { study: Study }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "clamp(1.5rem, 3vw, 2.25rem)",
        borderRadius: "22px",
        border: "1px solid var(--rule-strong)",
        background: "linear-gradient(135deg, #2A2452 0%, var(--ground-2) 60%, #3A2530 130%)",
        boxShadow: "0 40px 80px -30px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <StatusMark status={study.status} />
        <div style={{ textAlign: "right" }}>
          <p
            className="display"
            style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}
          >
            {study.headline.value}
          </p>
          <p className="eyebrow" style={{ marginTop: "0.5rem" }}>
            {study.headline.label}
          </p>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", minHeight: 0 }}>{study.chart}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {study.tech.map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

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
                Four studies, four kinds of question.
              </h2>
            </div>
            <p
              className="prose"
              style={{ color: "var(--paper-dim)", maxWidth: "380px", fontSize: "1rem" }}
            >
              A prediction problem, a tool people install, a causal question, and a product. Each chart is
              drawn from the project&apos;s real numbers.
            </p>
          </div>
        </Reveal>

        <StickyScroll
          content={studies.map((s, i) => ({
            key: s.slug,
            body: <StudyText study={s} index={i} />,
            panel: <StudyPanel study={s} />,
          }))}
        />
      </div>
    </section>
  );
}
