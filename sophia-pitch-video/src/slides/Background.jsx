import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp } from "../animations.js";
import { COLORS } from "../colors.js";

const stats = [
  { icon: "📊", label: "GPA", value: "3.2" },
  { icon: "📐", label: "Math", value: "Pre-Calculus" },
  { icon: "💻", label: "Coding", value: "Python · React" },
  { icon: "📝", label: "SAT", value: "1200" },
];

const advantages = [
  { icon: "🇩🇪", title: "EU Citizenship", desc: "German passport — EU tuition rates, no visa needed" },
  { icon: "🌍", title: "Trilingual", desc: "German native · English fluent · Spanish C1" },
  { icon: "🤖", title: "Tech Skills", desc: "Python & React projects, passionate about AI" },
];

export const Background = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: "100%", height: "100%", background: COLORS.lightGray, fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.blue})`, padding: "36px 80px", transform: `translateY(${slideUp(fps, frame, 0)}px)`, opacity: fadeIn(frame, 0, 20), display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ fontSize: 48 }}>👩‍💻</div>
        <div>
          <div style={{ color: COLORS.gold, fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Step 2</div>
          <div style={{ color: COLORS.white, fontSize: 48, fontWeight: 800 }}>My Background</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, gap: 0 }}>
        <div style={{ flex: 1, padding: "40px 50px", borderRight: `3px solid ${COLORS.blue}20` }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.navy, marginBottom: 28, opacity: fadeIn(frame, 10, 20), textTransform: "uppercase", letterSpacing: 2 }}>Academic Profile</div>
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, transform: `translateY(${slideUp(fps, frame, 0, i * 8)}px)`, opacity: fadeIn(frame, 15 + i * 8, 20), background: COLORS.white, borderRadius: 12, padding: "18px 24px", boxShadow: "0 2px 12px rgba(0,0,51,0.08)", borderLeft: `4px solid ${COLORS.accent}` }}>
              <span style={{ fontSize: 36 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 14, color: "#666", fontWeight: 600, letterSpacing: 1 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.navy }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1.2, padding: "40px 50px" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.navy, marginBottom: 28, opacity: fadeIn(frame, 10, 20), textTransform: "uppercase", letterSpacing: 2 }}>Key Advantages</div>
          {advantages.map((a, i) => (
            <div key={a.title} style={{ marginBottom: 28, transform: `translateY(${slideUp(fps, frame, 0, 20 + i * 10)}px)`, opacity: fadeIn(frame, 20 + i * 10, 20), background: COLORS.white, borderRadius: 16, padding: "24px 28px", boxShadow: "0 2px 16px rgba(0,0,51,0.08)", display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontSize: 40, width: 60, height: 60, background: `${COLORS.blue}15`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{a.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.navy, marginBottom: 6 }}>{a.title}</div>
                <div style={{ fontSize: 17, color: "#555", lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
