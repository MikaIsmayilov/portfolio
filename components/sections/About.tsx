"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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

export default function About() {
  return (
    <section
      id="about"
      style={{ paddingBlock: "6rem", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="section-wrap">
        <FadeUp>
          <span className="section-num" style={{ display: "block", marginBottom: "1rem" }}>
            02 / About
          </span>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Headline */}
          <FadeUp delay={0.05}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "var(--ink)",
                maxWidth: "560px",
              }}
            >
              Psychology taught me to ask the right questions.
              Data science helps me answer them.
            </h2>
          </FadeUp>

          {/* Body copy */}
          <div>
            <FadeUp delay={0.1}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  color: "var(--ink)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
                  maxWidth: "640px",
                }}
              >
                I started in psychology — four years at Suffolk University
                studying how people actually make decisions, graduating{" "}
                <em>magna cum laude</em> with a minor in business analytics.
                Somewhere between my stats classes and my senior thesis, I
                realized the questions I cared about were data questions.
                I&apos;m now an MSBA candidate at Boston University&apos;s
                Questrom School of Business, finishing January 2027.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  color: "var(--ink)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
                  maxWidth: "640px",
                }}
              >
                My work sits at the intersection of behavioral science and data
                science. I&apos;ve run randomized experiments on consumer
                behavior, built causal inference pipelines in Python, shipped a
                full-stack ML app predicting earnings surprises, and analyzed
                everything from Formula 1 lap times to global semiconductor
                trade. I speak five languages and I still get the biggest rush
                from the moment a messy dataset turns into a clear answer.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  color: "var(--ink)",
                  lineHeight: 1.7,
                  maxWidth: "640px",
                }}
              >
                I&apos;m looking for data science, ML, and analytics roles where
                I can bring a behavioral lens to the problem. If that&apos;s
                you, say hi.
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "Boston, MA",
                  "Open to remote",
                  "EN · RU · AZ · TR · ES",
                ].map((tag) => (
                  <span key={tag} className="tech-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 5fr 7fr !important;
          }
        }
      `}</style>
    </section>
  );
}
