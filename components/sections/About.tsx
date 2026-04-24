"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
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
            gap: "3.5rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: photo + headline */}
          <div>
            <FadeUp delay={0.05}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "360px",
                  aspectRatio: "1 / 1",
                  border: "1px solid var(--accent)",
                  marginBottom: "2rem",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/headshot.jpg"
                  alt="Mika Ismayilli"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 900px) 80vw, 360px"
                  priority
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "var(--ink)",
                  maxWidth: "380px",
                }}
              >
                Psychology taught me to ask the right questions.
                Data science helps me answer them.
              </h2>
            </FadeUp>
          </div>

          {/* Right: body copy */}
          <div>
            <FadeUp delay={0.1}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  color: "var(--ink)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
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
                {["Boston, MA", "Open to remote", "EN · RU · AZ · TR · ES"].map(
                  (tag) => (
                    <span key={tag} className="tech-pill">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 4fr 6fr !important;
          }
        }
      `}</style>
    </section>
  );
}
