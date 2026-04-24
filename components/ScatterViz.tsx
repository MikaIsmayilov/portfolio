"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
};

function randBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const POINT_COUNT = 60;
const ACCENT_COUNT = 12;

function initPoints(w: number, h: number): Point[] {
  return Array.from({ length: POINT_COUNT }, (_, i) => ({
    x: randBetween(0.05 * w, 0.95 * w),
    y: randBetween(0.05 * h, 0.95 * h),
    vx: randBetween(-0.18, 0.18),
    vy: randBetween(-0.18, 0.18),
    r: randBetween(2.5, 5.5),
    accent: i < ACCENT_COUNT,
  }));
}

export default function ScatterViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      pointsRef.current = initPoints(canvas.offsetWidth, canvas.offsetHeight);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const pts = pointsRef.current;

      // Draw faint connecting lines between nearby accent points
      for (let i = 0; i < pts.length; i++) {
        if (!pts[i].accent) continue;
        for (let j = i + 1; j < pts.length; j++) {
          if (!pts[j].accent) continue;
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(31, 95, 255, ${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw points
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.accent
          ? "rgba(31, 95, 255, 0.75)"
          : "rgba(68, 86, 112, 0.35)";
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Occasional random jump
        if (Math.random() < 0.002) {
          p.vx = randBetween(-0.18, 0.18);
          p.vy = randBetween(-0.18, 0.18);
        }

        // Bounce off walls
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.x = Math.max(0, Math.min(W, p.x));
        p.y = Math.max(0, Math.min(H, p.y));
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!motionQuery.matches) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Static snapshot
      draw();
      cancelAnimationFrame(rafRef.current);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
