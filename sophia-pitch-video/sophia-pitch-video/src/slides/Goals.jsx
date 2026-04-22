import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp } from "../animations";
import { COLORS } from "../colors";

const goals = [
  {
    step: "01",
    title: "Graduate in Data Science & AI",
    desc: "Build a rigorous foundation in machine learning, data engineering, and applied AI",
    icon: "🎓",
  },
  {
    step: "02",
    title: "Work Across European Tech",
    desc: "Leverage trilingual skills (German · English · Spanish) in EU tech ecosystem",
    icon: "🌍",
  },
  {
    step: "03",
    title: "Build Intelligent Systems",
    desc: "Create AI-powered products that solve real problems for real people",
    icon: "🤖",
  },
];

export const Goals = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: COLORS.white,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(90deg, ${COLORS.accent}, #F5C842)`,
        padding: "36px 80px",
        opacity: fadeIn(f, 0, 20),
        transform: `translateY(${slideUp(fps, f, 0)}px)`,
        display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ fontSize: 48 }}>🚀</div>
        <div>
          <div style={{ color: "rgba(0,0,0,0.5)", fontSize: 16, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
            Step 4
          </div>
          <div style={{ color: COLORS.darkGray, fontSize: 48, fontWeight: 800 }}>How SEAMIC Aligns With My Goals</div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ flex: 1, padding: "50px 100px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }}>
        {goals.map((g, i) => (
          <div key={g.step} style={{
            display: "flex", gap: 32, alignItems: "center",
            transform: `translateY(${slideUp(fps, f, 0, i * 15)}px)`,
            opacity: fadeIn(f, i * 15, 20),
          }}>
            {/* Step number */}
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.blue})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: COLORS.white, fontSize: 24, fontWeight: 900,
              flexShrink: 0,
              boxShadow: `0 4px 20px ${COLORS.blue}40`,
            }}>
              {g.step}
            </div>

            {/* Connector line */}
            {i < goals.length - 1 && (
              <div style={{
                position: "absolute",
                left: 139, top: 80 + i * 128,
                width: 2, height: 64,
                background: `linear-gradient(${COLORS.blue}, ${COLORS.teal})`,
                opacity: 0.3,
              }} />
            )}

            {/* Content */}
            <div style={{
              flex: 1,
              background: COLORS.lightGray,
              borderRadius: 16,
              padding: "24px 32px",
              display: "flex", gap: 20, alignItems: "center",
              borderLeft: `4px solid ${COLORS.blue}`,
            }}>
              <span style={{ fontSize: 40 }}>{g.icon}</span>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.navy, marginBottom: 6 }}>
                  {g.title}
                </div>
                <div style={{ fontSize: 18, color: "#555", lineHeight: 1.5 }}>
                  {g.desc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{
        padding: "24px 80px 40px",
        textAlign: "center",
        opacity: fadeIn(f, 50, 25),
        transform: `translateY(${slideUp(fps, f, 0, 50)}px)`,
      }}>
        <div style={{
          display: "inline-block",
          background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.blue})`,
          color: COLORS.white,
          fontSize: 22, fontWeight: 700,
          padding: "16px 48px",
          borderRadius: 50,
          boxShadow: `0 4px 20px ${COLORS.blue}40`,
        }}>
          SEAMIC is exactly the foundation I need. Thank you for considering my application. 🙏
        </div>
      </div>
    </div>
  );
};
