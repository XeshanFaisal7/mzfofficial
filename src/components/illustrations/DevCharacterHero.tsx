import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

function DevCharacterSvg() {
  return (
    <svg
      viewBox="0 0 360 420"
      className="h-full w-full overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="dev-hood" x1="90" y1="0" x2="280" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f172a" />
          <stop offset="0.45" stopColor="#134e4a" />
          <stop offset="1" stopColor="#022c22" />
        </linearGradient>
        <linearGradient id="dev-face" x1="130" y1="120" x2="230" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fecdd3" stopOpacity={0.35} />
          <stop offset="1" stopColor="#cbd5e1" stopOpacity={0.55} />
        </linearGradient>
        <linearGradient id="dev-screen" x1="172" y1="248" x2="268" y2="332" gradientUnits="userSpaceOnUse">
          <stop stopColor="#042f2e" />
          <stop offset="0.35" stopColor="#0d9488" />
          <stop offset="1" stopColor="#67f5dd" />
        </linearGradient>
        <filter id="dev-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dev-char-shadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#020617" floodOpacity={0.55} />
        </filter>
      </defs>

      {/* Ambient halo */}
      <ellipse cx={180} cy={210} rx={118} ry={146} fill="url(#dev-hood)" opacity={0.14} />

      {/* Hoodie + shoulders */}
      <path
        filter="url(#dev-char-shadow)"
        d="M64 308c8-72 48-128 116-150s152-8 196 38c36 44 40 108-4 168-48 64-132 86-204 66-84-22-120-78-104-122z"
        fill="url(#dev-hood)"
        stroke="#2dd4bf"
        strokeOpacity={0.24}
        strokeWidth={1.25}
      />

      {/* Head */}
      <circle cx={174} cy={158} r={62} fill="url(#dev-face)" stroke="#94a3b8" strokeOpacity={0.25} strokeWidth={1} />
      {/* Hair fringe */}
      <path
        d="M126 146c28-54 134-72 174 2 8 18 6 40-22 54-62-62-138-76-152-56z"
        fill="#1e293b"
        opacity={0.92}
      />
      {/* Glasses */}
      <g stroke="#e2e8f0" strokeWidth={4} strokeLinecap="round" opacity={0.9}>
        <rect x={124} y={152} width={44} height={32} rx={10} fill="rgba(15,23,42,0.25)" />
        <rect x={182} y={152} width={44} height={32} rx={10} fill="rgba(15,23,42,0.25)" />
        <path d="M168 166h14" opacity={0.8} />
      </g>

      {/* Laptop */}
      <g filter="url(#dev-soft-glow)">
        <path
          d="M154 294l84-96c16-14 52-16 74 6l62 134c16 62-154 154-226 134-74-96-74-174 6-178z"
          fill="#1e293b"
          opacity={0.95}
          stroke="#334155"
          strokeWidth={1}
        />
        <path d="M168 274l134-118 62 154-228 118z" fill="url(#dev-screen)" opacity={0.92} />
        {/* Code lines on screen */}
        <g stroke="#99f6e4" strokeWidth={2.4} strokeLinecap="round" opacity={0.85}>
          <path d="M194 232l-10 10 10 10" />
          <path d="M262 232l10 10-10 10" />
          <path d="M218 242h20" opacity={0.55} />
          <path d="M210 256h36" opacity={0.35} />
        </g>
        <path
          d="M130 334c84-24 190-40 214-10l-12 14c-120-40-190-12-194 8l-8-12z"
          fill="#0f172a"
          stroke="#475569"
          strokeWidth={1}
        />
      </g>

      {/* Hands / sleeves */}
      <ellipse cx={118} cy={312} rx={28} ry={20} fill="#134e4a" opacity={0.9} />
      <ellipse cx={262} cy={318} rx={26} ry={18} fill="#134e4a" opacity={0.9} />
    </svg>
  );
}

function FloatingGlyphs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <motion.div
        className="absolute -right-[8%] top-[14%] text-4xl font-mono font-bold text-teal-300/85 drop-shadow-[0_0_24px_rgba(45,212,191,0.55)]"
        animate={{ y: [0, -14, 0], rotateZ: [-8, -2, -8], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {"</>"}
      </motion.div>
      <motion.div
        className="absolute left-[-12%] top-[38%] rounded-lg border border-violet-400/55 bg-violet-500/15 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-violet-200/95 shadow-[0_0_34px_-4px_violet]"
        animate={{ x: [0, 10, 0], opacity: [0.45, 0.92, 0.45] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
      >
        TS
      </motion.div>
      <motion.div
        className="absolute right-[4%] bottom-[26%] h-14 w-[3px] rounded-full bg-gradient-to-b from-transparent via-teal-300 to-transparent"
        animate={{ scaleY: [0.85, 1.2, 0.85], opacity: [0.35, 0.95, 0.35] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

type DevCharacterHeroProps = {
  className?: string;
};

/**
 * Vector dev mascot + staged 3D-style motion (tilt springs, float, halo).
 * Decorative — keep aria-hidden on parent wrappers in layout.
 */
export function DevCharacterHero({ className }: DevCharacterHeroProps) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 54, damping: 18, mass: 0.45 });
  const sy = useSpring(my, { stiffness: 54, damping: 18, mass: 0.45 });

  const rotateY = useTransform(sx, [-1, 1], reduce ? [0, 0] : [-14, 14]);
  const rotateX = useTransform(sy, [-1, 1], reduce ? [0, 0] : [10, -10]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mx.set(Math.max(-1, Math.min(1, (e.clientX - w / 2) / (w / 2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - h / 2) / (h / 2))));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <div className={cn("relative isolate", className)} aria-hidden>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-[18%] rounded-[40px] bg-gradient-to-br from-teal-400/35 via-transparent to-violet-500/25 blur-[50px]"
        animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.65, 0.95, 0.65] }}
        transition={reduce ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingGlyphs />

      <motion.div
        className="relative mx-auto aspect-[360/420] w-full max-w-[min(100%,340px)] [perspective:1400px] md:max-w-[380px]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={
          reduce
            ? undefined
            : {
                translateY: [0, -10, -4, 0],
              }
        }
        transition={reduce ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Stack depth layers */}
        <motion.div
          className="absolute inset-[12%] -z-10 rounded-[32px] border border-teal-400/30 bg-teal-500/10 backdrop-blur-sm"
          style={{ transform: "translateZ(-36px)", transformStyle: "preserve-3d" }}
          animate={reduce ? undefined : { opacity: [0.35, 0.72, 0.35], scale: [0.96, 1.02, 0.96] }}
          transition={reduce ? undefined : { duration: 10, repeat: Infinity }}
        />

        <motion.div
          className="relative h-full w-full drop-shadow-[0_30px_80px_-20px_rgba(45,212,191,0.45)]"
          style={{ transformStyle: "preserve-3d" }}
          animate={reduce ? undefined : { rotateZ: [0, 0.8, 0, -0.8, 0] }}
          transition={reduce ? undefined : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <DevCharacterSvg />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -inset-4 -z-20 rounded-[48px] border border-dashed border-white/15 opacity-70"
          style={{ transform: "translateZ(-56px) rotateX(12deg)" }}
          animate={reduce ? undefined : { rotateZ: [0, 3, 0, -3, 0] }}
          transition={reduce ? undefined : { duration: 22, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
