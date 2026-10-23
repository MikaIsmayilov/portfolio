"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { DiscoverButton } from "@/components/ui/discover-button";

const LiquidMetal = dynamic(() => import("@/components/ui/liquid-metal"), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

// Some browsers have WebGL off (no GPU acceleration, blocklisted drivers).
// The shader then draws nothing, so fall back to a CSS gradient orb.
function useWebGL() {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    setSupported(!!(canvas.getContext("webgl2") || canvas.getContext("webgl")));
  }, []);
  return supported;
}

export default function Hero() {
  const webgl = useWebGL();
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Liquid-metal orb, masked to a soft circle */}
      <div aria-hidden="true" className="hero-orb" style={{ position: "absolute", zIndex: 0 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            overflow: "hidden",
            maskImage: "radial-gradient(circle, #000 55%, transparent 71%)",
            WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 71%)",
          }}
        >
          {webgl && (
            <LiquidMetal
              shape="circle"
              colorBack="#1B1830"
              colorTint="#C4B5FD"
              speed={0.3}
              repetition={2}
              distortion={0.08}
              shift={0}
              softness={0.6}
              contour={0}
            />
          )}
          {webgl === false && <div className="hero-orb-fallback" />}
        </motion.div>
      </div>

      {/* Scrim so the type stays readable over the orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(19,17,31,1) 0%, rgba(19,17,31,0.9) 38%, rgba(19,17,31,0.1) 70%, rgba(19,17,31,0) 100%)",
        }}
      />

      <div
        className="wrap"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "8.5rem",
          paddingBottom: "6rem",
        }}
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
            color: "var(--support)",
          }}
        >
          <span className="dot-live" />
          Boston, MA · MSBA, Boston University · Open to work
        </motion.p>

        <motion.h1
          className="display"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease }}
          style={{
            fontSize: "clamp(2.75rem, 6.2vw, 5.75rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            color: "var(--paper)",
            marginBottom: "2rem",
          }}
        >
          I ask why people <br className="hero-break" />
          do things, then <br className="hero-break" />
          <FlipWords
            words={["measure", "predict", "explain"]}
            duration={2600}
            className="hero-flip"
          />{" "}
          it.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="prose"
          style={{
            fontSize: "clamp(1.125rem, 1.8vw, 1.4rem)",
            lineHeight: 1.5,
            color: "var(--paper-dim)",
            maxWidth: "580px",
            marginBottom: "2.75rem",
          }}
        >
          Behavioral scientist turned data scientist. I use analytics and ML to
          answer the questions psychology taught me to ask.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
          style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <DiscoverButton label="See the work" href="/#work" />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        .hero-orb { width: 110vw; height: 110vw; right: -55vw; top: -5vw; opacity: 0.35; }
        .hero-flip { color: var(--accent); }
        .hero-orb-fallback {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background:
            radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.55), transparent 35%),
            radial-gradient(circle at 70% 75%, rgba(19, 17, 31, 0.85), transparent 55%),
            conic-gradient(from 200deg, #2A2350, #C4B5FD, #F4F0FF, #6B5BB8, #FFB59A 58%, #FFF1EA, #8B7BD8, #1D1838, #2A2350);
          filter: blur(2px);
          animation: hero-orb-spin 40s linear infinite;
        }
        @keyframes hero-orb-spin { to { rotate: 360deg; } }
        .hero-break { display: none; }
        @media (min-width: 900px) {
          .hero-orb { width: min(46vw, 680px); height: min(46vw, 680px); right: -4vw; top: 50%; translate: 0 -50%; opacity: 0.8; }
          .hero-break { display: inline; }
        }
      `}</style>
    </section>
  );
}
