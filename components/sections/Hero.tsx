"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const ScatterViz = dynamic(() => import("@/components/ScatterViz"), {
  ssr: false,
});

const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionDiv = motion.div;

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "grid",
        gridTemplateColumns: "1fr",
        alignItems: "center",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="section-wrap" style={{ paddingBlock: "6rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left: copy */}
          <div style={{ maxWidth: "720px" }}>
            <MotionDiv
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ marginBottom: "1.5rem" }}
            >
              <span
                className="section-num"
                style={{ display: "block", marginBottom: "0.75rem" }}
              >
                00 / Hello
              </span>
            </MotionDiv>

            <MotionH1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 6vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                color: "var(--ink)",
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              Mika Ismayilli
            </MotionH1>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--ink)",
                lineHeight: 1.3,
                marginBottom: "1rem",
                maxWidth: "600px",
              }}
            >
              Behavioral scientist turned data scientist.
              <br />
              I use analytics and ML to answer the questions
              psychology taught me to ask.
            </MotionP>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 400,
                color: "var(--ink-muted)",
                lineHeight: 1.6,
                marginBottom: "2.5rem",
                maxWidth: "520px",
              }}
            >
              MSBA candidate at Boston University&apos;s Questrom School of Business
              with a BS in Psychology from Suffolk. I build models, run
              experiments, and ship tools — from causal inference studies on
              consumer behavior to deployed ML apps predicting earnings surprises.
            </MotionP>

            <MotionDiv
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55, ease: "easeOut" }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <Link href="/#work" className="btn-accent">
                See the work
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Download résumé
              </a>
            </MotionDiv>
          </div>

          {/* Right: scatter viz */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
            style={{
              height: "340px",
              border: "1px solid var(--rule)",
              backgroundColor: "var(--bg-panel)",
              position: "relative",
              overflow: "hidden",
            }}
            className="scatter-panel"
          >
            <div
              className="section-num"
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                zIndex: 1,
              }}
            >
              live · model space
            </div>
            <ScatterViz />
          </MotionDiv>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 7fr 5fr !important;
          }
          .scatter-panel {
            height: 420px !important;
          }
        }
      `}</style>
    </section>
  );
}
