import { AbsoluteFill, Sequence } from "remotion";
import { Intro } from "./slides/Intro.jsx";
import { Background } from "./slides/Background.jsx";
import { WhySEAMIC } from "./slides/WhySEAMIC.jsx";
import { Goals } from "./slides/Goals.jsx";
import { Transition } from "./slides/Transition.jsx";

// Total: ~14400 frames = ~8 min at 30fps
// 0     - 2700: Intro (1:30)
// 2700  - 2760: Transition
// 2760  - 6810: Background (2:15)
// 6810  - 6870: Transition
// 6870  - 10920: Why SEAMIC (2:15)
// 10920 - 10980: Transition
// 10980 - 14130: Goals (1:45)

export const SophiaPitch = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={2700}>
        <Intro />
      </Sequence>

      <Sequence from={2700} durationInFrames={60}>
        <Transition number="02" label="My Background" />
      </Sequence>

      <Sequence from={2760} durationInFrames={4050}>
        <Background />
      </Sequence>

      <Sequence from={6810} durationInFrames={60}>
        <Transition number="03" label="Why SEAMIC" />
      </Sequence>

      <Sequence from={6870} durationInFrames={4050}>
        <WhySEAMIC />
      </Sequence>

      <Sequence from={10920} durationInFrames={60}>
        <Transition number="04" label="My Goals" />
      </Sequence>

      <Sequence from={10980} durationInFrames={3150}>
        <Goals />
      </Sequence>
    </AbsoluteFill>
  );
};
