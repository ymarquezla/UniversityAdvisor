import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp, scaleIn } from "../animations.js";
import { COLORS } from "../colors.js";

const reasons = [
  { icon: "🔬", title: "Applied AI & Data Science", desc: "Hands-on, industry-focused curriculum — not just theory", color: "#0055A4" },
  { icon: "🌆", title: "Valencia's Tech Ecosystem", desc: "Growing hub for European tech startups and innovation", color: "#0096A0" },
  { icon: "🗣️", title: "Perfect Language Fit", desc: "Spanish C1 means I can fully integrate — academically and socially", color: "#E8A020" },
  { icon: "🏛️", title: "UPV's Strong Reputation", desc: "Top-ranked Spanish technical university, globally recognized", color: "#003366" },
];

export const WhySEAMIC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: "100%", height: "100%", background: `linear-gradient(160deg, ${COLORS.darkGray} 0%, #0D2137 100%)`, fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "36px 80px", opacity: fadeIn(frame, 0, 20), transform: `translateY(${slideUp(fps, frame, 0)}px)`, borderBottom: "2px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ fontSize: 48 }}>❤️</div>
        <div>
          <div style={{ color: COLORS.gold, fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Step 3</div>
          <div style={{ color: COLORS.white, fontSize: 48, fontWeight: 800 }}>Why SEAMIC Attracts Me</div>
        </div>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: "40px 60px" }}>
        {reasons.map((r, i) => {
          const delay = (i % 2) * 10 + Math.floor(i / 2) * 20;
          return (
            <div key={r.title} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderTop: `4px solid ${r.color}`, borderRadius: 16, padding: "32px", transform: `translateY(${slideUp(fps, frame, 0, delay)}px) scale(${scaleIn(fps, frame, 0, delay)})`, opacity: fadeIn(frame, delay, 20) }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{r.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.white, marginBottom: 10 }}>{r.title}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{r.desc}</div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "24px 80px 36px", opacity: fadeIn(frame, 60, 25), textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ color: COLORS.gold, fontSize: 20, fontStyle: "italic", fontWeight: 500 }}>
          "Valencia isn't just where I want to study — it's where I want to build my future."
        </span>
      </div>
    </div>
  );
};
