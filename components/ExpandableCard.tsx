"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export type ExpandableProject = {
  slug: string;
  title: string;
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
}: {
  project: ExpandableProject;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        style={{
          backgroundColor: "var(--bg-panel)",
          border: "1px solid var(--rule)",
          overflow: "hidden",
          transition: "border-color 200ms",
          borderColor: open ? "var(--accent)" : "var(--rule)",
        }}
      >
        {/* Card header — always visible, click to toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
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
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "0.5rem",
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: "var(--ink-muted)",
                lineHeight: 1.55,
                marginBottom: "1rem",
              }}
            >
              {project.oneliner}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
              {project.tech.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
            <p className="section-num" style={{ color: "var(--ink-muted)", letterSpacing: "0.06em" }}>
              {project.role}
            </p>
          </div>

          {/* Toggle arrow */}
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.25rem",
              color: open ? "var(--accent)" : "var(--ink-muted)",
              flexShrink: 0,
              marginTop: "0.1rem",
            }}
          >
            →
          </motion.span>
        </button>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
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
                {/* Images */}
                {project.images && project.images.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: project.images.length > 1 ? "1fr 1fr" : "1fr",
                      gap: "0.75rem",
                    }}
                  >
                    {project.images.map((img) => (
                      <figure key={img.src} style={{ margin: 0 }}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "16/9",
                            border: "1px solid var(--accent)",
                            overflow: "hidden",
                            backgroundColor: "var(--bg)",
                          }}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            style={{ objectFit: "cover", objectPosition: "top" }}
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        {img.caption && (
                          <figcaption
                            className="section-num"
                            style={{
                              marginTop: "0.35rem",
                              letterSpacing: "0.06em",
                              color: "var(--ink-muted)",
                            }}
                          >
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}

                {/* Extended text */}
                {project.extended && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      color: "var(--ink)",
                      lineHeight: 1.7,
                    }}
                  >
                    {project.extended}
                  </p>
                )}

                {/* Links */}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent"
                      style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.demo2 ? "Dashboard 1 →" : "View →"}
                    </a>
                  )}
                  {project.demo2 && (
                    <a
                      href={project.demo2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent"
                      style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Dashboard 2 →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
