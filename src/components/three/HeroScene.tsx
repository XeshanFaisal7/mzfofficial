import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const CyberDeveloperWorkspace = lazy(() =>
  import("@/components/three/CyberDeveloperWorkspace").then((m) => ({
    default: m.CyberDeveloperWorkspace,
  }))
);

type Quality = {
  bloom: boolean;
  particles: number;
  stars: number;
  dpr: [number, number];
};

function detectQuality(): Quality {
  if (typeof window === "undefined") {
    return { bloom: false, particles: 320, stars: 500, dpr: [1, 1.25] };
  }

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const threads = navigator.hardwareConcurrency ?? 4;
  const lowCpu = threads < 8;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMem = typeof deviceMemory === "number" && deviceMemory < 8;

  if (coarse || reduced) {
    return { bloom: false, particles: 120, stars: 200, dpr: [1, 1] };
  }

  if (lowCpu || lowMem) {
    return { bloom: false, particles: 220, stars: 360, dpr: [1, 1.1] };
  }

  const dpr = Math.min(window.devicePixelRatio ?? 1.5, 1.35);
  return { bloom: true, particles: 420, stars: 650, dpr: [1, dpr] };
}

/** WebGL hero — pauses when off-screen and scales quality to device capability. */
export function HeroCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [quality, setQuality] = useState<Quality>(() => detectQuality());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const bump = () => setQuality(detectQuality());
    window.addEventListener("resize", bump);
    return () => window.removeEventListener("resize", bump);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setVisible(entry.isIntersecting);
      },
      { rootMargin: "80px 0px", threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 z-0 [&_canvas]:!block [&_canvas]:h-full [&_canvas]:w-full"
    >
      <Canvas
        dpr={quality.dpr}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: quality.dpr[1] > 1,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        shadows={false}
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <CyberDeveloperWorkspace
            bloom={quality.bloom}
            particles={quality.particles}
            stars={quality.stars}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
