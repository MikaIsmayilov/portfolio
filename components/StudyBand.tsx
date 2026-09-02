"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export type Status = { label: string; kind: "live" | "team" | "wip" };

export type Study = {
  slug: string;
  href?: string;
  title: string;
  oneliner: string;
  finding: string;
  tech: string[];
  role: string;
  status: Status;
  chart: ReactNode;
};

function StatusMark({ status }: { status: Status }) {
  if (status.kind === "live") {
    return (
      <span
        className="eyebrow"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", color: "var(--ember)" }}
      >
        <span className="dot-live" />
        {status.label}
      </span>
    );
  }
  return (
    <span
      className="eyebrow"
      style={{ color: status.kind === "wip" ? "var(--cool)" : "var(--paper-faint)" }}
    >
      {status.label}
    </span>
  );
}

export default function StudyBand({ study, index }: { study: Study; index: number }) {
  const href = study.href ?? `/work/${study.slug}`;
  const external = !!study.href;

  return (
    <Reveal as="article" delay={0.05}>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="study"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
          paddingBlock: "clamp(2.5rem, 5vw, 3.75rem)",
          borderTop: index === 0 ? "1px solid var(--rule-strong)" : "1px solid var(--rule)",
          textDecoration: "none",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.4rem" }}>
            <StatusMark status={study.status} />
            <span className="eyebrow">{study.role}</span>
          </div>

          <h3
            className="display study-title"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              marginBottom: "1.1rem",
              display: "inline-flex",
              alignItems: "baseline",
              gap: "0.6rem",
              transition: "color 220ms var(--ease-out)",
            }}
          >
            {study.title}
            <span
              aria-hidden="true"
              className="study-arrow"
              style={{
                fontSize: "0.6em",
                color: "var(--paper-faint)",
                transition: "transform 260ms var(--ease-out), color 220ms",
              }}
            >
              {external ? "↗" : "→"}
            </span>
          </h3>

          <p className="prose" style={{ color: "var(--paper-dim)", maxWidth: "560px", marginBottom: "1.25rem" }}>
            {study.oneliner}
          </p>

          <p
            className="mono"
            style={{
              fontSize: "0.8125rem",
              color: "var(--ember)",
              marginBottom: "1.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span aria-hidden="true" style={{ width: "14px", height: "1px", background: "var(--ember)" }} />
            {study.finding}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {study.tech.map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          className="study-panel"
          style={{
            backgroundColor: "var(--ground-2)",
            border: "1px solid var(--rule)",
            padding: "1.5rem",
            display: "flex",
            alignItems: "center",
            transition: "border-color 260ms var(--ease-out), transform 260ms var(--ease-out)",
          }}
        >
          {study.chart}
        </div>
      </Link>

      <style>{`
        @media (min-width: 880px) {
          .study { grid-template-columns: 7fr 5fr !important; gap: 4rem !important; align-items: center; }
        }
        .study:hover .study-title { color: var(--ember); }
        .study:hover .study-arrow { transform: translateX(6px); color: var(--ember); }
        .study:hover .study-panel { border-color: var(--cool-dim); transform: translateY(-3px); }
      `}</style>
    </Reveal>
  );
}
