import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shilpi Mishra — I design complex products that feel clear.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#F8F5EB", color: "#301448", fontFamily: "Arial, sans-serif", padding: "52px 62px", flexDirection: "column" }}>
      <div style={{ display: "flex", fontSize: 34, fontWeight: 900, letterSpacing: -1.8 }}>
        shilpi.mishra<span style={{ color: "#E5008A" }}>.</span>
      </div>
      <div style={{ display: "flex", marginTop: 62, fontSize: 14, letterSpacing: 3.1, fontWeight: 800 }}>
        DESIGNING FOR CLARITY IN COMPLEXITY
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 74, fontWeight: 900, letterSpacing: -3.9, lineHeight: 1.05, maxWidth: 750 }}>
        <span>I design complex</span>
        <span>products that feel</span>
        <span style={{ color: "#173CDE", fontStyle: "italic" }}>clear.</span>
      </div>
      <div style={{ display: "flex", marginTop: "auto", fontSize: 14, letterSpacing: 2, fontWeight: 800 }}>
        PRODUCT DESIGN  ·  ENTERPRISE UX  ·  VISUAL SYSTEMS
      </div>
      <div style={{ display: "flex", position: "absolute", left: 840, top: 135, width: 310, height: 310, borderRadius: 155, background: "#D9C8FF" }} />
      <div style={{ display: "flex", position: "absolute", left: 835, top: 170, width: 225, height: 185, borderRadius: 19, background: "#301448", transform: "rotate(-10deg)", flexDirection: "column", padding: 20 }}>
        <div style={{ display: "flex", gap: 9, marginBottom: 23 }}>
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#C4ED38" }} />
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#E5008A" }} />
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#173CDE" }} />
        </div>
        <div style={{ display: "flex", width: 150, height: 12, borderRadius: 8, background: "#806C9C", marginBottom: 15 }} />
        <div style={{ display: "flex", width: 105, height: 12, borderRadius: 8, background: "#E5008A", marginBottom: 15 }} />
        <div style={{ display: "flex", width: 172, height: 12, borderRadius: 8, background: "#806C9C" }} />
      </div>
      <div style={{ display: "flex", position: "absolute", left: 900, top: 284, width: 260, height: 240, borderRadius: 20, background: "#F8F5EB", border: "4px solid #301448", transform: "rotate(5deg)", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", height: 48, background: "#C4ED38", padding: "13px 18px", fontWeight: 800, fontSize: 15 }}>THE CLEAR VIEW</div>
        <div style={{ display: "flex", padding: 18, gap: 10 }}>
          <div style={{ display: "flex", width: 91, height: 75, background: "#D9C8FF", borderRadius: 10 }} />
          <div style={{ display: "flex", width: 91, height: 75, background: "#FCE0ED", borderRadius: 10 }} />
        </div>
        <div style={{ display: "flex", margin: "0 18px", width: 212, height: 48, background: "#EDEAFB", borderRadius: 10, alignItems: "center", padding: 10, gap: 8 }}>
          <div style={{ display: "flex", width: 32, height: 12, borderRadius: 6, background: "#173CDE" }} />
          <div style={{ display: "flex", width: 55, height: 12, borderRadius: 6, background: "#E5008A" }} />
          <div style={{ display: "flex", width: 67, height: 12, borderRadius: 6, background: "#173CDE" }} />
        </div>
      </div>
      <div style={{ display: "flex", position: "absolute", left: 1010, top: 222, width: 65, height: 16, borderRadius: 9, background: "#E5008A", transform: "rotate(40deg)" }} />
    </div>,
    { ...size }
  );
}
