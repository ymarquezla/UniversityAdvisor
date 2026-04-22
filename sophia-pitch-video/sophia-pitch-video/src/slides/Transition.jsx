import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../colors";

export const Transition = ({ label, number }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 15, 45, 60], [0.8, 1.05, 1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 10, 50, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.teal} 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      opacity,
    }}>
      <div style={{
        transform: `scale(${scale})`,
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 80, fontWeight: 900,
          color: COLORS.gold,
          lineHeight: 1,
          marginBottom: 16,
        }}>
          {number}
        </div>
        <div style={{
          fontSize: 36, fontWeight: 700,
          color: COLORS.white,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}>
          {label}
        </div>
      </div>
    </div>
  );
};
