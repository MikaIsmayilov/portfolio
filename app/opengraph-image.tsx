import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mika Ismayilli — Data Scientist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#F4F6F8",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "0.12em",
            color: "#445670",
            marginBottom: "24px",
            textTransform: "uppercase",
          }}
        >
          PORTFOLIO
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#0A1628",
            lineHeight: 1.0,
            marginBottom: "20px",
          }}
        >
          Mika Ismayilli
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 300,
            color: "#445670",
            lineHeight: 1.3,
            maxWidth: "700px",
          }}
        >
          Behavioral scientist turned data scientist.
          Analytics · ML · Causal Inference.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            fontSize: "14px",
            color: "#1F5FFF",
            letterSpacing: "0.06em",
          }}
        >
          MSBA · Boston University
        </div>
      </div>
    ),
    size
  );
}
