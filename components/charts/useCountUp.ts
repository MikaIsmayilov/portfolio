"use client";

import { useEffect, useState } from "react";

/** Animates 0 → target once `active` flips true. Returns the current value. */
export function useCountUp(target: number, active: boolean, duration = 1100, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start - delay) / duration);
      if (t < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const e = 1 - Math.pow(1 - t, 3);
      setValue(target * e);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, delay]);

  return value;
}
