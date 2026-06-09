import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function usePortfolioLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) {
  const frame = useRef<number>(0);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || coarsePointer) {
      setLenis(null);
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      orientation: "vertical",
    });
    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      frame.current = requestAnimationFrame(raf);
    }
    frame.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame.current);
      instance.destroy();
      setLenis(null);
    };
  }, [enabled]);

  const value = useMemo(() => lenis, [lenis]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
