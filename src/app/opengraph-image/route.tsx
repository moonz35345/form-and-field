import { ImageResponse } from "next/og";
const alt = "Form & Field — Homes, reconsidered.";
const size = { width: 1200, height: 630 };
const contentType = "image/png";
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#243c32",
        color: "#f6f3ec",
      }}
    >
      <div style={{ fontSize: 32, display: "flex" }}>
        form & field{" "}
        <span style={{ fontSize: 14, marginLeft: 460, letterSpacing: 3 }}>
          HOMES, RECONSIDERED.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "serif",
          fontSize: 86,
          lineHeight: 1.1,
        }}
      >
        <span>A home that feels</span>
        <span>more like you.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 20,
          letterSpacing: 3,
          color: "#d3c7ad",
        }}
      >
        THOUGHTFUL RENOVATION. TIMELESS LIVING.
      </div>
    </div>,
    size,
  );
}

export const dynamic = "force-static";
