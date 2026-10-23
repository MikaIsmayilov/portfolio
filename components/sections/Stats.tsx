"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

const stats = [
  { value: 104938, decimals: 0, suffix: "", label: "Earnings observations modeled" },
  { value: 60.9, decimals: 1, suffix: "%", label: "BeatTheStreet holdout accuracy" },
  { value: 470, decimals: 0, suffix: "+", label: "Commits · Aurelian" },
  { value: 224, decimals: 0, suffix: "", label: "Tests · Job Agent" },
];

export default function Stats() {
  return (
    <section
      aria-label="Highlights"
      style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="wrap stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="stat-cell"
            style={{ paddingBlock: "clamp(1.75rem, 4vw, 2.75rem)", paddingInline: i % 2 ? "1.5rem 0" : "0 1.5rem" }}
          >
            <p
              className="display"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              <NumberTicker value={s.value} decimalPlaces={s.decimals} delay={i * 0.12} />
              {s.suffix && (
                <span style={{ fontSize: "0.45em", color: "var(--paper-faint)", marginLeft: "0.15em" }}>
                  {s.suffix}
                </span>
              )}
            </p>
            <p className="eyebrow">{s.label}</p>
          </div>
        ))}
      </div>

      <style>{`
        .stat-cell + .stat-cell { border-left: 1px solid var(--rule); }
        .stat-cell:nth-child(3) { border-left: none; border-top: 1px solid var(--rule); }
        .stat-cell:nth-child(4) { border-top: 1px solid var(--rule); }
        @media (min-width: 900px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .stat-cell { padding-inline: 1.75rem !important; }
          .stat-cell:first-child { padding-left: 0 !important; }
          .stat-cell:nth-child(3) { border-left: 1px solid var(--rule); border-top: none; }
          .stat-cell:nth-child(4) { border-top: none; }
        }
      `}</style>
    </section>
  );
}
