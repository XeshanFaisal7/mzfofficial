import type { TargetAndTransition, Transition } from "framer-motion";

const spring: Transition = { type: "spring", stiffness: 260, damping: 24 };

export function sectionReveal(reducedMotion: boolean): {
  initial: TargetAndTransition;
  whileInView: TargetAndTransition;
  transition: Transition;
} {
  if (reducedMotion) {
    return {
      initial: { opacity: 1, y: 0, rotateY: 0, x: 0 },
      whileInView: { opacity: 1, y: 0, rotateY: 0, x: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  };
}

export function cardEntrance(reducedMotion: boolean, lite3d: boolean, index: number) {
  if (reducedMotion) {
    return {
      initial: { opacity: 1, x: 0, rotateY: 0 },
      whileInView: { opacity: 1, x: 0, rotateY: 0 },
      transition: { duration: 0 },
    };
  }

  if (lite3d) {
    return {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: Math.min(index * 0.04, 0.24), ease: [0.16, 1, 0.3, 1] },
    };
  }

  return {
    initial: { opacity: 0, x: 70, rotateY: -10 },
    whileInView: { opacity: 1, x: 0, rotateY: 0 },
    transition: { ...spring, stiffness: 120, damping: 18, delay: Math.min(index * 0.05, 0.4) },
  };
}
