import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, Cpu, Radar } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { HERO_ROLES, SITE } from "@/data/portfolio";

const HeroCanvas = lazy(() =>
  import("@/components/three/HeroScene").then((m) => ({ default: m.HeroCanvas }))
);

export function Hero({ scrollTo }: { scrollTo: (h: string) => void }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % HERO_ROLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[84svh] flex-col overflow-hidden pb-20 pt-28 md:min-h-[82svh] md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-radial-glow" aria-hidden />

      {/* Static light pools — avoids expensive animated blur repaints */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="absolute left-[-14%] top-[22%] h-[380px] w-[380px] rounded-full bg-teal-400/14 blur-[80px] md:h-[460px] md:w-[460px]" />
        <div className="absolute right-[-18%] top-[6%] h-[440px] w-[440px] rounded-full bg-violet-500/10 blur-[80px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[length:72px_72px] bg-grid-fade opacity-45 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]"
        aria-hidden
      />

      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Left-heavy fade — keeps copy readable; 3D developer stays on the right */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-[#07080d] via-[#07080d]/82 to-[#07080d]/20 md:via-[#07080d]/68 md:to-transparent"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[38%] max-h-[420px] bg-gradient-to-t from-[#07080d] via-[#07080d]/45 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 md:px-8 lg:max-w-7xl">
        <div className="mt-auto">
          <div className="relative max-w-xl md:max-w-2xl">
          <motion.p
            className="section-label mb-6 inline-flex items-center gap-3 surface-chip shadow-glow-sm backdrop-blur-md"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <Radar className="h-3 w-3 text-teal-300" aria-hidden />
            Available for projects
          </motion.p>

          <motion.h1
            className="font-display text-[clamp(2.6rem,6vw,4.55rem)] leading-[1.02] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="block text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.85 }}
            >
              {SITE.name}
            </motion.span>
            <span className="mt-4 block bg-gradient-to-r from-white via-teal-100/95 to-teal-200/90 bg-clip-text text-transparent">
              {SITE.role}
            </span>
          </motion.h1>

          <motion.div
            className="mt-10 flex flex-wrap gap-5 text-xl text-teal-100/90 md:text-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.85 }}
          >
            <Cpu className="mt-2 h-6 w-6 text-teal-300/70" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.p
                key={HERO_ROLES[roleIndex]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -22 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[20ch] font-medium"
              >
                {HERO_ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="mt-6 max-w-prose text-sm leading-relaxed text-white/60 md:text-[15px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
          >
            {SITE.tagline}
          </motion.p>

          <motion.p
            className="mt-3 text-xs uppercase tracking-[0.24em] text-white/45"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.85 }}
          >
            {SITE.city}, {SITE.country}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-row flex-wrap items-center gap-2.5 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.85 }}
          >
            <MagneticButton>
              <Button
                className="h-11 justify-between gap-2 rounded-pill px-4 text-sm font-semibold shadow-glow-sm sm:px-5"
                type="button"
                onClick={() => scrollTo("#contact")}
              >
                Schedule a consultation
                <ArrowDownRight className="h-4 w-4 shrink-0" aria-hidden />
              </Button>
            </MagneticButton>
            <Button
              variant="outline"
              className="h-11 rounded-pill border-white/20 bg-[#090a10]/75 px-4 text-sm font-medium text-white backdrop-blur-md hover:bg-white/[0.08] sm:px-5"
              type="button"
              onClick={() => scrollTo("#projects")}
            >
              View portfolio
            </Button>
          </motion.div>
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to projects"
        onClick={() => scrollTo("#projects")}
        className="absolute bottom-6 right-4 z-20 flex flex-col items-end gap-3 md:bottom-8 md:right-8 lg:right-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        <span className="section-label text-right text-white/45">Scroll to explore</span>
        <motion.span
          className="h-16 w-[2px] rounded-pill bg-gradient-to-b from-teal-200/80 via-white/70 to-transparent"
          animate={{ scaleY: [0.94, 1, 0.94] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-hidden
        />
      </motion.button>
    </section>
  );
}
