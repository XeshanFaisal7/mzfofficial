import { useEffect, useState } from "react";

export type MotionProfile = {
  reducedMotion: boolean;
  coarsePointer: boolean;
  narrowViewport: boolean;
  richMotion: boolean;
  smoothScroll: boolean;
  lite3d: boolean;
};

function detectMotionProfile(): MotionProfile {
  if (typeof window === "undefined") {
    return {
      reducedMotion: false,
      coarsePointer: false,
      narrowViewport: false,
      richMotion: true,
      smoothScroll: true,
      lite3d: false,
    };
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrowViewport = window.matchMedia("(max-width: 767px)").matches;
  const richMotion = !reducedMotion && !coarsePointer;
  const smoothScroll = richMotion;
  const lite3d = reducedMotion || coarsePointer || narrowViewport;

  return {
    reducedMotion,
    coarsePointer,
    narrowViewport,
    richMotion,
    smoothScroll,
    lite3d,
  };
}

export function useMotionProfile(): MotionProfile {
  const [profile, setProfile] = useState(detectMotionProfile);

  useEffect(() => {
    const queries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(max-width: 767px)"),
    ];

    const update = () => setProfile(detectMotionProfile());
    queries.forEach((mq) => mq.addEventListener("change", update));
    return () => queries.forEach((mq) => mq.removeEventListener("change", update));
  }, []);

  return profile;
}

type TapLiftOptions = {
  hoverY?: number;
  tapScale?: number;
  tapY?: number;
};

/** Hover lift on desktop; tap feedback on touch devices. */
export function tapLiftProps(richMotion: boolean, options: TapLiftOptions = {}) {
  const { hoverY = -4, tapScale = 0.985, tapY = -2 } = options;

  return richMotion
    ? {
        whileHover: { y: hoverY, transition: { type: "spring", stiffness: 260, damping: 20 } },
        whileTap: { scale: tapScale },
      }
    : {
        whileTap: { scale: tapScale, y: tapY, transition: { type: "spring", stiffness: 420, damping: 28 } },
      };
}
