import { Composition } from "remotion";
import { SophiaPitch } from "./SophiaPitch.jsx";

// Total: 14130 frames ≈ 7:51 at 30fps
const DURATION = 14130;
const FPS = 30;

export const RemotionRoot = () => {
  return (
    <Composition
      id="SophiaPitch"
      component={SophiaPitch}
      durationInFrames={DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
