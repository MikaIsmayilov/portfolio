"use client";

// Adapted from ObsidianUI's liquid-metal (MIT). Only the base shader wrapper
// is kept; the shape is exposed so the hero can render a circular blob.
import { memo } from "react";
import type { CSSProperties } from "react";
import { LiquidMetal as LiquidMetalShader } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface LiquidMetalProps {
  colorBack?: string;
  colorTint?: string;
  speed?: number;
  repetition?: number;
  distortion?: number;
  scale?: number;
  shape?: "none" | "circle" | "daisy" | "diamond" | "metaballs";
  /** Chromatic fringe on the edges; 0 turns it off. */
  shift?: number;
  /** Blur between the metal bands (0 to 1). */
  softness?: number;
  /** Distortion strength along the shape edge (0 to 1). */
  contour?: number;
  className?: string;
  style?: CSSProperties;
}

export const LiquidMetal = memo(function LiquidMetal({
  colorBack = "#aaaaac",
  colorTint = "#ffffff",
  speed = 0.5,
  repetition = 4,
  distortion = 0.1,
  scale = 1,
  shape = "none",
  shift = 0.3,
  softness = 0,
  contour = 0.4,
  className,
  style,
}: LiquidMetalProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden", className)} style={style}>
      <LiquidMetalShader
        colorBack={colorBack}
        colorTint={colorTint}
        speed={reduceMotion ? 0 : speed}
        repetition={repetition}
        distortion={distortion}
        softness={softness}
        contour={contour}
        shiftRed={shift}
        shiftBlue={-shift}
        angle={45}
        shape={shape}
        scale={scale}
        fit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});

export default LiquidMetal;
