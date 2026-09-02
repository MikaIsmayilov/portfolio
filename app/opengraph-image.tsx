import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mika Ismayilli — Data Scientist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  // A tiny deterministic scatter with a fitted line, echoing the site's hero.
  const pts: { x: number; y: number; ember: boolean }[] = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 90; i++) {
    const u = rnd();
    const ember = i % 9 === 0;
    const noise = (rnd() - 0.5) * 0.28;
    const yData = 0.15 + 0.7 * u + noise + (ember ? 0.16 : 0);
    pts.push({ x: 640 + u * 500, y: 560 - yData * 470, ember });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#090D1E",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <line x1="640" y1="500" x2="1150" y2="130" stroke="rgba(242,237,227,0.35)" strokeWidth="1.5" />
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.ember ? 5 : 3.5}
              fill={p.ember ? "#F5B342" : "rgba(124,147,255,0.6)"}
            />
          ))}
        </svg>

        <div
          style={{
            position: "absolute",
            left: 80,
            top: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 16,
            letterSpacing: 4,
            color: "#A9AEC5",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#F5B342" }} />
          BOSTON, MA · MSBA · OPEN TO WORK
        </div>

        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 140,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 104, fontWeight: 800, color: "#F2EDE3", lineHeight: 0.95, letterSpacing: -4 }}>
            Mika
          </div>
          <div style={{ fontSize: 104, fontWeight: 800, color: "#F2EDE3", lineHeight: 0.95, letterSpacing: -4 }}>
            Ismayilli
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 80,
            fontSize: 26,
            color: "#A9AEC5",
            maxWidth: 560,
          }}
        >
          Behavioral scientist turned data scientist.
        </div>

        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 80,
            fontSize: 16,
            letterSpacing: 4,
            color: "#6B7292",
          }}
        >
          n = 90 · r = 0.87 · FIT: OLS
        </div>
      </div>
    ),
    size
  );
}
