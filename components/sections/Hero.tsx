"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const SignalField = dynamic(() => import("@/components/SignalField"), {
  ssr: false,
});

const LINE_ONE = "Behavioral scientist turned data scientist.";
const LINE_TWO =
  "I use analytics and ML to answer the questions psychology taught me to ask.";

function MaskedLine({
  text,
  startDelay,
}: {
  text: string;
  startDelay: number;
}) {
  const words = text.split(" ");
  return (
    <span style={{ display: "block" }}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            paddingBottom: "0.14em",
            marginBottom: "-0.14em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              delay: startDelay + i * 0.038,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <SignalField />

      {/* Scrim so the type stays readable over the field */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(9,13,30,0.96) 0%, rgba(9,13,30,0.82) 34%, rgba(9,13,30,0.28) 62%, rgba(9,13,30,0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "28%",
          pointerEvents: "none",
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(9,13,30,0) 0%, rgba(9,13,30,0.85) 100%)",
        }}
      />

      <div
        className="wrap"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "8.5rem",
          paddingBottom: "7rem",
        }}
      >
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
            color: "var(--paper-dim)",
          }}
        >
          <span className="dot-live" />
          <span>Boston, MA · MSBA candidate, Boston University · Open to work</span>
        </motion.div>

        <motion.h1
          className="display"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(3.6rem, 10.5vw, 8.75rem)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: "var(--paper)",
            marginBottom: "2.25rem",
            fontVariationSettings: '"opsz" 96, "wdth" 88',
          }}
        >
          Mika
          <br />
          Ismayilli
        </motion.h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)",
            lineHeight: 1.32,
            color: "var(--paper)",
            maxWidth: "640px",
            marginBottom: "1.5rem",
            fontVariationSettings: '"opsz" 28',
          }}
        >
          <MaskedLine text={LINE_ONE} startDelay={0.5} />
          <MaskedLine text={LINE_TWO} startDelay={0.78} />
        </p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.35, ease: "easeOut" }}
          className="prose"
          style={{
            fontSize: "1.0625rem",
            color: "var(--paper-dim)",
            maxWidth: "520px",
            marginBottom: "2.75rem",
          }}
        >
          MSBA candidate at Boston University&apos;s Questrom School of Business
          with a BS in Psychology from Suffolk. I build models, run experiments,
          and ship tools — from causal inference studies on consumer behavior to
          a deployed ML app predicting earnings surprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }}
          style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}
        >
          <Link href="/#work" className="btn-ember">
            See the work <span aria-hidden="true">→</span>
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line"
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        className="eyebrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.6 }}
        style={{
          position: "absolute",
          left: "clamp(1.25rem, 5vw, 5rem)",
          bottom: "2rem",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "1px",
            height: "28px",
            background:
              "linear-gradient(180deg, var(--paper-faint), transparent)",
          }}
        />
        Scroll
      </motion.div>
    </section>
  );
}
