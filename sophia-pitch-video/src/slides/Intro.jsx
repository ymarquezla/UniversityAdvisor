import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp, scaleIn } from "../animations.js";
import { COLORS } from "../colors.js";

export const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = fadeIn(frame, 0, 30);
  const logoY = slideUp(fps, frame, 0, 0);
  const nameY = slideUp(fps, frame, 0, 8);
  const taglineY = slideUp(fps, frame, 0, 18);
  const pillScale = scaleIn(fps, frame, 0, 30);
  const nameOpacity = fadeIn(frame, 8, 25);
  const tagOpacity = fadeIn(frame, 18, 25);
  const pillOpacity = fadeIn(frame, 28, 20);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 60%, ${COLORS.teal} 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: bgOpacity,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.08)", top: -150, right: -100 }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.06)", bottom: -100, left: -80 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: COLORS.gold, transform: `translateY(${logoY}px)` }} />

      <div style={{ transform: `translateY(${logoY}px)`, opacity: fadeIn(frame, 0, 20), marginBottom: 32, background: "rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 24px", border: "1px solid rgba(255,255,255,0.2)" }}>
        <span style={{ color: COLORS.gold, fontSize: 18, fontWeight: 700, letterSpacing: 3 }}>SEAMIC · UPV VALENCIA</span>
      </div>

      <div style={{ transform: `translateY(${nameY}px)`, opacity: nameOpacity, textAlign: "center" }}>
        <div style={{ fontSize: 96, fontWeight: 800, color: COLORS.white, letterSpacing: -2, lineHeight: 1, textShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>Sophia</div>
        <div style={{ fontSize: 32, fontWeight: 400, color: "rgba(255,255,255,0.75)", marginTop: 12, letterSpacing: 6, textTransform: "uppercase" }}>Application · 2025</div>
      </div>

      <div style={{ transform: `translateY(${taglineY}px)`, opacity: tagOpacity, marginTop: 40, fontSize: 24, color: "rgba(255,255,255,0.85)", fontStyle: "italic", maxWidth: 700, textAlign: "center", lineHeight: 1.5 }}>
        "AI & Data Science · Trilingual · EU Citizen"
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 48, transform: `scale(${pillScale})`, opacity: pillOpacity }}>
        {["🇩🇪 German", "🇬🇧 English", "🇪🇸 Spanish C1"].map((lang) => (
          <div key={lang} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 50, padding: "10px 24px", color: COLORS.white, fontSize: 20, fontWeight: 600 }}>
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
};
