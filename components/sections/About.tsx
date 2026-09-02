"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "2.5rem" }}>
            About
          </p>
        </Reveal>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
        >
          {/* Photo + pull-quote */}
          <div>
            <Reveal delay={0.05}>
              <figure style={{ margin: 0, maxWidth: "380px" }}>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 5",
                    border: "1px solid var(--rule-strong)",
                    overflow: "hidden",
                    backgroundColor: "var(--ground-2)",
                  }}
                >
                  {/* Plot-corner tick */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      width: 14,
                      height: 14,
                      borderTop: "1px solid var(--ember)",
                      borderLeft: "1px solid var(--ember)",
                      zIndex: 2,
                    }}
                  />
                  <Image
                    src="/headshot.jpg"
                    alt="Mika Ismayilli"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                      filter: "saturate(0.92) contrast(1.02)",
                    }}
                    sizes="(max-width: 900px) 80vw, 380px"
                    priority
                  />
                </div>
                <figcaption
                  className="eyebrow"
                  style={{ marginTop: "0.75rem", letterSpacing: "0.12em" }}
                >
                  Boston, MA · Questrom School of Business
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)",
                  fontWeight: 600,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "var(--paper)",
                  maxWidth: "380px",
                  marginTop: "2.25rem",
                }}
              >
                Psychology taught me to ask the right questions.{" "}
                <span style={{ color: "var(--ember)" }}>Data science helps me answer them.</span>
              </h2>
            </Reveal>
          </div>

          {/* Prose */}
          <div style={{ maxWidth: "620px" }}>
            <Reveal delay={0.1}>
              <p className="prose" style={{ marginBottom: "1.5rem", fontSize: "1.1875rem" }}>
                I started in psychology — four years at Suffolk University
                studying how people actually make decisions, graduating{" "}
                <em>magna cum laude</em>{" "}with a minor in business analytics.
                Somewhere between my stats classes and my senior thesis, I
                realized the questions I cared about were data questions.
                I&apos;m now an MSBA candidate at Boston University&apos;s
                Questrom School of Business, finishing January 2027.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="prose" style={{ marginBottom: "1.5rem", fontSize: "1.1875rem" }}>
                My work sits at the intersection of behavioral science and data
                science. I&apos;ve run randomized experiments on consumer
                behavior, built causal inference pipelines in Python, shipped a
                full-stack ML app predicting earnings surprises, and analyzed
                everything from Formula 1 lap times to global semiconductor
                trade. I speak five languages and I still get the biggest rush
                from the moment a messy dataset turns into a clear answer.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="prose" style={{ fontSize: "1.1875rem" }}>
                I&apos;m looking for data science, ML, and analytics roles where
                I can bring a behavioral lens to the problem. If that&apos;s
                you, say hi.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div
                style={{
                  marginTop: "2.25rem",
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {["Boston, MA", "Open to remote", "EN · RU · AZ · TR · ES"].map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid { grid-template-columns: 5fr 7fr !important; gap: 5rem !important; }
        }
      `}</style>
    </section>
  );
}
