import { useCurrentFrame, AbsoluteFill, Series } from "remotion";
import { Intro } from "./slides/Intro";
import { Background } from "./slides/Background";
import { WhySEAMIC } from "./slides/WhySEAMIC";
import { Goals } from "./slides/Goals";
import { Transition } from "./slides/Transition";

// Timing at 30fps
// Intro: 0:00 - 1:00 (1800 frames)
// Transition: 1:00 - 1:02 (60 frames)
// Background: 1:02 - 3:00 (1740 frames)
// Transition: 3:00 - 3:02 (60 frames)
// Why SEAMIC: 3:02 - 5:00 (1740 frames)
// Transition: 5:00 - 5:02 (60 frames)
// Goals: 5:02 - 7:00 (1740 frames)

export const SophiaPitch = () => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={1800}>
          <Intro />
        </Series.Sequence>

        <Series.Sequence durationInFrames={60}>
          <Transition number="02" label="My Background" />
        </Series.Sequence>

        <Series.Sequence durationInFrames={1740}>
          <Background />
        </Series.Sequence>

        <Series.Sequence durationInFrames={60}>
          <Transition number="03" label="Why SEAMIC" />
        </Series.Sequence>

        <Series.Sequence durationInFrames={1740}>
          <WhySEAMIC />
        </Series.Sequence>

        <Series.Sequence durationInFrames={60}>
          <Transition number="04" label="My Goals" />
        </Series.Sequence>

        <Series.Sequence durationInFrames={1740}>
          <Goals />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
