import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type HeroExperienceValue = {
  /** 0–1: how far user has moved through the hero (scroll). */
  scrollPhase: number;
};

const HeroExperienceContext = createContext<HeroExperienceValue>({ scrollPhase: 0 });

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/** Drives cinematic camera / lighting linked to hero scroll position. */
export function HeroExperienceProvider({ children }: { children: ReactNode }) {
  const [scrollPhase, setScrollPhase] = useState(0);

  useEffect(() => {
    const tick = () => {
      const el = document.getElementById("hero");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const span = Math.max(r.height + vh * 0.65, 1);
      const t = (-r.top + vh * 0.4) / span;
      setScrollPhase(clamp01(t));
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  const v = useMemo(() => ({ scrollPhase }), [scrollPhase]);

  return <HeroExperienceContext.Provider value={v}>{children}</HeroExperienceContext.Provider>;
}

export function useHeroExperience() {
  return useContext(HeroExperienceContext);
}
