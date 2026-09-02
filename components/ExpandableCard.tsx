"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export type ExpandableProject = {
  slug: string;
  title: string;
  course: string;
  oneliner: string;
  tech: string[];
  role: string;
  github?: string;
  demo?: string;
  demo2?: string;
  images?: { src: string; alt: string; caption?: string }[];
  extended?: string;
};

export default function ExpandableCard({
  project,
  index,
}: {
  project: ExpandableProject;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState(false);
  const panelId = `${project.slug}-panel`;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        gridColumn: open ? "1 / -1" : undefined,
        backgroundColor: open ? "var(--ground-2)" : "transparent",
        border: "1px solid",
        borderColor: open ? "var(--cool-dim)" : "var(--rule)",
        transition: "border-color 220ms var(--ease-out), background-color 220ms",
      }}
      className="xcard"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "start",
          gap: "1rem",
          width: "100%",
          padding: "1.75rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: "inherit",
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: "0.9rem" }}>
            {project.course}
          </p>
          <h3
            className="display"
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "0.6rem",
            }}
          >
            {project.title}
          </h3>
          <p
            className="prose"
            style={{
              fontSize: "1rem",
              color: "var(--paper-dim)",
              lineHeight: 1.55,
              marginBottom: "1.1rem",
            }}
          >
            {project.oneliner}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.85rem" }}>
            {project.tech.map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>
          <p className="eyebrow" style={{ color: "var(--paper-dim)" }}>
            {project.role}
          </p>
        </div>

        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0, color: open ? "#F5B342" : "#6B7292" }}
          transition={{ duration: 0.25 }}
          className="mono"
          style={{ fontSize: "1.375rem", lineHeight: 1, marginTop: "0.1rem" }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                borderTop: "1px solid var(--rule)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {project.images && project.images.length > 0 && (
                <div
                  className="xcard-images"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "0.85rem",
                  }}
                >
                  {project.images.map((img) => (
                    <figure key={img.src} style={{ margin: 0 }}>
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "16/9",
                          border: "1px solid var(--rule-strong)",
                          overflow: "hidden",
                          backgroundColor: "var(--ground)",
                        }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          style={{ objectFit: "cover", objectPosition: "top" }}
                          sizes="(max-width: 760px) 100vw, 50vw"
                        />
                      </div>
                      {img.caption && (
                        <figcaption className="eyebrow" style={{ marginTop: "0.5rem", letterSpacing: "0.1em" }}>
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}

              {project.extended && (
                <p className="prose" style={{ fontSize: "1.0625rem", maxWidth: "760px" }}>
                  {project.extended}
                </p>
              )}

              <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-line"
                    style={{ padding: "0.6rem 1rem" }}
                  >
                    GitHub ↗
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ember"
                    style={{ padding: "0.6rem 1rem" }}
                  >
                    {project.demo2 ? "Dashboard 1 ↗" : "View ↗"}
                  </a>
                )}
                {project.demo2 && (
                  <a
                    href={project.demo2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ember"
                    style={{ padding: "0.6rem 1rem" }}
                  >
                    Dashboard 2 ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .xcard:hover { border-color: var(--rule-strong); }
        @media (min-width: 760px) {
          .xcard-images { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}
