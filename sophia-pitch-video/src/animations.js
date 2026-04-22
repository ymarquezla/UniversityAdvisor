import { interpolate, spring } from "remotion";

export const fadeIn = (frame, start, duration = 20) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const slideUp = (fps, frame, start, delay = 0) =>
  spring({ fps, frame, from: 40, to: 0, config: { damping: 14 }, delay: start + delay });

export const scaleIn = (fps, frame, start, delay = 0) =>
  spring({ fps, frame, from: 0.8, to: 1, config: { damping: 12 }, delay: start + delay });
