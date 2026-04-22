import { Composition } from "remotion";
import { SophiaPitch } from "./SophiaPitch";

// 7 minutes at 30fps = 12600 frames
const DURATION = 12600;
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
