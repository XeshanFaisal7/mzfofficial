import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Seated developer with laptop — used as hero background focal art. */
function DeveloperCodingSvg() {
  return (
    <svg
      viewBox="0 0 360 420"
      className="h-full w-full overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-dev-hood" x1="90" y1="0" x2="280" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f172a" />
          <stop offset="0.45" stopColor="#134e4a" />
          <stop offset="1" stopColor="#022c22" />
        </linearGradient>
        <linearGradient id="hero-dev-face" x1="130" y1="120" x2="230" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fecdd3" stopOpacity={0.4} />
          <stop offset="1" stopColor="#cbd5e1" stopOpacity={0.6} />
        </linearGradient>
        <linearGradient id="hero-dev-screen" x1="172" y1="248" x2="268" y2="332" gradientUnits="userSpaceOnUse">
          <stop stopColor="#042f2e" />
          <stop offset="0.35" stopColor="#0d9488" />
          <stop offset="1" stopColor="#67f5dd" />
        </linearGradient>
        <filter id="hero-dev-shadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#020617" floodOpacity={0.65} />
        </filter>
      </defs>

      <ellipse cx={180} cy={215} rx={130} ry={155} fill="url(#hero-dev-hood)" opacity={0.18} />

      <path
        filter="url(#hero-dev-shadow)"
        d="M64 308c8-72 48-128 116-150s152-8 196 38c36 44 40 108-4 168-48 64-132 86-204 66-84-22-120-78-104-122z"
        fill="url(#hero-dev-hood)"
        stroke="#2dd4bf"
        strokeOpacity={0.28}
        strokeWidth={1.25}
      />

      <circle cx={174} cy={158} r={62} fill="url(#hero-dev-face)" stroke="#94a3b8" strokeOpacity={0.3} strokeWidth={1} />
      <path
        d="M126 146c28-54 134-72 174 2 8 18 6 40-22 54-62-62-138-76-152-56z"
        fill="#1e293b"
        opacity={0.92}
      />

      <g stroke="#e2e8f0" strokeWidth={4} strokeLinecap="round" opacity={0.92}>
        <rect x={124} y={152} width={44} height={32} rx={10} fill="rgba(15,23,42,0.35)" />
        <rect x={182} y={152} width={44} height={32} rx={10} fill="rgba(15,23,42,0.35)" />
        <path d="M168 166h14" opacity={0.85} />
      </g>

      <g>
        <path
          d="M154 294l84-96c16-14 52-16 74 6l62 134c16 62-154 154-226 134-74-96-74-174 6-178z"
          fill="#1e293b"
          opacity={0.96}
          stroke="#334155"
          strokeWidth={1}
        />
        <path d="M168 274l134-118 62 154-228 118z" fill="url(#hero-dev-screen)" opacity={0.94} />
        <g stroke="#99f6e4" strokeWidth={2.6} strokeLinecap="round" opacity={0.9}>
          <path d="M194 232l-10 10 10 10" />
          <path d="M262 232l10 10-10 10" />
          <path d="M218 242h20" opacity={0.6} />
          <path d="M210 256h36" opacity={0.4} />
          <path d="M222 268h28" opacity={0.3} />
        </g>
        <path
          d="M130 334c84-24 190-40 214-10l-12 14c-120-40-190-12-194 8l-8-12z"
          fill="#0f172a"
          stroke="#475569"
          strokeWidth={1}
        />
      </g>

      <ellipse cx={118} cy={312} rx={28} ry={20} fill="#134e4a" opacity={0.92} />
      <ellipse cx={262} cy={318} rx={26} ry={18} fill="#134e4a" opacity={0.92} />

      {/* Desk hint */}
      <path
        d="M48 352h264"
        stroke="#334155"
        strokeOpacity={0.45}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

type HeroDeveloperBackdropProps = {
  className?: string;
};

export function HeroDeveloperBackdrop({ className }: HeroDeveloperBackdropProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative", className)} aria-hidden>
      <div className="pointer-events-none absolute inset-[8%] rounded-surface-2xl bg-gradient-to-br from-teal-500/10 via-transparent to-violet-500/8 blur-3xl" />

      <motion.div
        className="relative mx-auto aspect-[360/420] w-[min(92vw,380px)] sm:w-[min(72vw,440px)] md:w-[min(48vw,520px)] lg:w-[min(42vw,580px)] xl:w-[min(38vw,640px)]"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <DeveloperCodingSvg />
      </motion.div>
    </div>
  );
}
