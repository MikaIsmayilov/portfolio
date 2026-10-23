"use client";

// Adapted from Aceternity UI's timeline: same scroll-drawn line, compacted to
// one row per entry and driven by the site tokens instead of its own header.
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export interface TimelineEntry {
  key: string;
  when: string;
  content: ReactNode;
  current?: boolean;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new ResizeObserver(() => setHeight(el.getBoundingClientRect().height));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={ref} className="relative" style={{ paddingLeft: "3.25rem" }}>
      {data.map((item) => (
        <div key={item.key} className="relative" style={{ paddingBottom: "1.75rem" }}>
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-3.25rem",
              top: "0.1rem",
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: "var(--ground)",
              display: "grid",
              placeItems: "center",
              zIndex: 1,
            }}
          >
            <span
              style={{
                width: "0.6rem",
                height: "0.6rem",
                borderRadius: "50%",
                backgroundColor: item.current ? "var(--accent)" : "var(--ground-3)",
                border: `1px solid ${item.current ? "var(--accent)" : "var(--rule-strong)"}`,
                boxShadow: item.current ? "0 0 12px var(--accent)" : "none",
              }}
            />
          </span>
          <p className="eyebrow" style={{ color: "var(--support)", marginBottom: "0.35rem" }}>
            {item.when}
          </p>
          {item.content}
        </div>
      ))}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "0.95rem",
          top: 0,
          height,
          width: 2,
          overflow: "hidden",
          background: "var(--rule)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 90%, transparent 100%)",
        }}
      >
        <motion.div
          style={{
            height: heightTransform,
            opacity: opacityTransform,
            position: "absolute",
            inset: "0 0 auto 0",
            width: 2,
            borderRadius: 999,
            background: "linear-gradient(to bottom, var(--support), var(--accent))",
          }}
        />
      </div>
    </div>
  );
};

export default Timeline;
