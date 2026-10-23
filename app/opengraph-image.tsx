import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mika Ismayilli — Data Scientist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the hero: same headline, type and orb. The orb is a pre-rendered
// PNG because the OG renderer can't draw conic gradients, masks or blur.
export default async function OGImage() {
  const [display, mono, orb] = await Promise.all([
    readFile(join(process.cwd(), "assets/BricolageGrotesque-ExtraBold-SemiCondensed.ttf")),
    readFile(join(process.cwd(), "assets/IBMPlexMono-Medium.ttf")),
    readFile(join(process.cwd(), "assets/og-orb.png")),
  ]);
  const orbSrc = `data:image/png;base64,${orb.toString("base64")}`;

  const line = { display: "flex", fontSize: 86, lineHeight: 0.95, letterSpacing: -3, color: "#F3F0FA" } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#13111F",
          fontFamily: "Bricolage",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={orbSrc} width={620} height={620} style={{ position: "absolute", right: -150, top: 5 }} alt="" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, #13111F 0%, rgba(19,17,31,0.92) 45%, rgba(19,17,31,0.1) 75%, rgba(19,17,31,0) 100%)",
          }}
        />

        <div style={{ position: "absolute", left: 80, top: 72, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "Plex Mono",
              fontSize: 17,
              letterSpacing: 2.7,
              color: "#FFB59A",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#C4B5FD" }} />
            BOSTON, MA · MSBA, BOSTON UNIVERSITY · OPEN TO WORK
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
            <div style={line}>I ask why people</div>
            <div style={line}>do things, then</div>
            <div style={line}>
              <span style={{ color: "#C4B5FD" }}>measure</span>
              <span style={{ marginLeft: 16 }}>it.</span>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", left: 80, bottom: 64, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.6, color: "#F3F0FA" }}>Mika Ismayilli</div>
          <div style={{ display: "flex", fontFamily: "Plex Mono", fontSize: 16, letterSpacing: 2.2, color: "#8A84A6" }}>
            · DATA SCIENTIST
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, style: "normal", weight: 800 },
        { name: "Plex Mono", data: mono, style: "normal", weight: 500 },
      ],
    }
  );
}
