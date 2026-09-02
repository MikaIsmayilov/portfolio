"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-triggered reveal. Fades and lifts children once, the first time
 * they enter the viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  style,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: CSSProperties;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Polymorphic tag; typed as motion.div so the ref type lines up.
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
