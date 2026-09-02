"use client";

import { useEffect, useRef } from "react";

/**
 * SignalField — the hero's signature.
 *
 * ~420 points open as pure noise, then ease into a real linear relationship
 * while an OLS line draws itself through them. The correlation printed in
 * the corner is computed every frame from the points actually on screen,
 * so it climbs from ~0 to its final value as the structure appears.
 *
 * Cool points are the baseline. Ember points are a "treated" group that
 * sits on a parallel line above it.
 */

type Pt = {
  fx: number; fy: number;   // from (normalized 0..1)
  tx: number; ty: number;   // to
  x: number;  y: number;    // current
  st: number;               // start time (s)
  du: number;               // duration (s)
  r: number;
  ember: boolean;
  ph: number;               // wobble phase
};

const N = 420;
const EMBER_N = 34;
const SETTLE_START = 0.45;
const SETTLE_DUR = 2.1;
const STAGGER = 0.6;
const LINE_START = 2.0;
const LINE_DUR = 1.0;

function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function targetFor(u: number, ember: boolean) {
  // The true relationship, in data space (y up). Screen y is flipped below.
  const base = 0.14 + 0.68 * u + gauss() * 0.075;
  const lift = ember ? 0.17 + gauss() * 0.03 : 0;
  const yData = Math.min(0.97, Math.max(0.03, base + lift));
  return { tx: 0.03 + u * 0.94, ty: 1 - yData };
}

function makePoints(): Pt[] {
  return Array.from({ length: N }, (_, i) => {
    const ember = i < EMBER_N;
    const { tx, ty } = targetFor(Math.random(), ember);
    return {
      fx: Math.random(),
      fy: Math.random(),
      tx,
      ty,
      x: 0,
      y: 0,
      st: SETTLE_START + Math.random() * STAGGER,
      du: SETTLE_DUR,
      r: ember ? 2.3 + Math.random() * 1.1 : 1.4 + Math.random() * 1.2,
      ember,
      ph: Math.random() * Math.PI * 2,
    };
  });
}

function fitAndCorrelate(pts: Pt[]) {
  // Pearson r and OLS on current positions, in data space (y up).
  let sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
  for (const p of pts) {
    const x = p.x;
    const y = 1 - p.y;
    sx += x; sy += y; sxx += x * x; syy += y * y; sxy += x * y;
  }
  const n = pts.length;
  const mx = sx / n;
  const my = sy / n;
  const vx = sxx / n - mx * mx;
  const vy = syy / n - my * my;
  const cov = sxy / n - mx * my;
  const r = vx > 0 && vy > 0 ? cov / Math.sqrt(vx * vy) : 0;
  const slope = vx > 0 ? cov / vx : 0;
  const intercept = my - slope * mx;
  return { r, slope, intercept };
}

export default function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rRef = useRef<HTMLSpanElement>(null);
  const nRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts = makePoints();
    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let t0 = performance.now();
    let mouse = { x: -1, y: -1, active: false };
    let frame = 0;
    let lastJump = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const step = (t: number) => {
      // Positions
      const settled = t > SETTLE_START + STAGGER + SETTLE_DUR + 0.4;
      for (const p of pts) {
        const e = easeInOut(clamp01((t - p.st) / p.du));
        p.x = p.fx + (p.tx - p.fx) * e;
        p.y = p.fy + (p.ty - p.fy) * e;
        if (settled) {
          p.x += Math.sin(t * 0.55 + p.ph) * 0.0016;
          p.y += Math.cos(t * 0.47 + p.ph) * 0.0016;
        }
      }

      // Now and then a point re-samples — the model updating.
      if (settled && !reduced && t - lastJump > 1.6 && Math.random() < 0.05) {
        const p = pts[EMBER_N + Math.floor(Math.random() * (N - EMBER_N))];
        const { tx, ty } = targetFor(Math.random(), false);
        p.fx = p.x; p.fy = p.y; p.tx = tx; p.ty = ty; p.st = t; p.du = 1.4;
        lastJump = t;
      }

      const { r, slope, intercept } = fitAndCorrelate(pts);

      // Draw
      ctx.clearRect(0, 0, W, H);

      // Faint plot grid
      ctx.strokeStyle = "rgba(242,237,227,0.035)";
      ctx.lineWidth = 1;
      const g = 96;
      ctx.beginPath();
      for (let x = g; x < W; x += g) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); }
      for (let y = g; y < H; y += g) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
      ctx.stroke();

      // Fit line — drawn from the live OLS, revealed left to right
      const lp = easeOut(clamp01((t - LINE_START) / LINE_DUR));
      if (lp > 0) {
        const x0 = 0.02;
        const x1 = 0.02 + 0.96 * lp;
        const y0 = 1 - (intercept + slope * x0);
        const y1 = 1 - (intercept + slope * x1);
        ctx.strokeStyle = `rgba(242,237,227,${0.42 * lp})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x0 * W, y0 * H);
        ctx.lineTo(x1 * W, y1 * H);
        ctx.stroke();
      }

      // Base points
      const mR = 110;
      ctx.shadowBlur = 0;
      for (const p of pts) {
        if (p.ember) continue;
        const px = p.x * W;
        const py = p.y * H;
        let boost = 0;
        if (mouse.active) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < mR) boost = 1 - d / mR;
        }
        ctx.fillStyle = `rgba(124,147,255,${0.5 + boost * 0.45})`;
        ctx.beginPath();
        ctx.arc(px, py, p.r * (1 + boost * 0.9), 0, Math.PI * 2);
        ctx.fill();
      }

      // Ember points — glow
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(245,179,66,0.85)";
      for (const p of pts) {
        if (!p.ember) continue;
        const px = p.x * W;
        const py = p.y * H;
        let boost = 0;
        if (mouse.active) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < mR) boost = 1 - d / mR;
        }
        ctx.fillStyle = `rgba(245,179,66,${0.88 + boost * 0.12})`;
        ctx.beginPath();
        ctx.arc(px, py, p.r * (1 + boost * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Annotation — cheap DOM writes, throttled
      if (frame % 4 === 0 && rRef.current && nRef.current && noteRef.current) {
        rRef.current.textContent = (r < 0 ? "−" : "") + Math.abs(r).toFixed(2);
        nRef.current.textContent = String(N);
        noteRef.current.style.opacity = t > 0.9 ? "1" : "0";
      }
      frame++;
    };

    const loop = (now: number) => {
      step((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => { mouse.active = false; };

    if (reduced) {
      // Final state, once.
      step(60);
    } else {
      t0 = performance.now();
      raf = requestAnimationFrame(loop);
      window.addEventListener("mousemove", onMove, { passive: true });
      canvas.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      <div
        ref={noteRef}
        aria-hidden="true"
        className="mono"
        style={{
          position: "absolute",
          right: "clamp(1.25rem, 5vw, 5rem)",
          bottom: "2rem",
          fontSize: "0.6875rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--paper-faint)",
          display: "flex",
          gap: "1.25rem",
          opacity: 0,
          transition: "opacity 600ms ease",
          zIndex: 3,
        }}
      >
        <span>n = <span ref={nRef} style={{ color: "var(--paper-dim)" }}>420</span></span>
        <span>r = <span ref={rRef} style={{ color: "var(--ember)" }}>0.00</span></span>
        <span>fit: OLS</span>
      </div>
    </>
  );
}
