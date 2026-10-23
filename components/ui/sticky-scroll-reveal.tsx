"use client";

// Adapted from Aceternity UI's sticky-scroll-reveal. Tracks page scroll
// (upstream scrolls an inner box), takes rich nodes for both columns, and
// below lg shows each panel inline under its text instead of pinning it.
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export type StickyScrollItem = {
  key: string;
  body: ReactNode;
  panel: ReactNode;
};

export const StickyScroll = ({
  content,
  panelClassName,
}: {
  content: StickyScrollItem[];
  panelClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(content.length - 1, Math.floor(latest * content.length));
    setActiveCard(Math.max(0, index));
  });

  return (
    <div ref={ref} className="relative grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div>
        {content.map((item, index) => (
          <div
            key={item.key}
            className={cn(
              "py-12 transition-opacity duration-300 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center lg:py-0",
              activeCard !== index && "lg:opacity-30"
            )}
          >
            {item.body}
            <div className="mt-8 lg:hidden">{item.panel}</div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        <div className={cn("sticky top-[15vh] h-[70vh] max-h-[560px]", panelClassName)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={content[activeCard].key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {content[activeCard].panel}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StickyScroll;
