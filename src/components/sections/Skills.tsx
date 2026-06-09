import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { OrbitIcon } from "lucide-react";
import { SKILLS, type SkillCategory } from "@/data/portfolio";
import { SkillLogo } from "@/components/skills/SkillLogo";
const ORDER: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Databases",
  "CMS",
  "Cloud/Hosting",
  "Payment Integrations",
  "AI Tools",
];

export function SkillsSection() {
  const [active, setActive] = useState<SkillCategory>("Frontend");
  const items = SKILLS[active];
  const orbit = useMemo(() => [...items], [items]);

  return (
    <section id="skills" className="relative overflow-hidden px-4 py-28 md:px-8">
      <div className="pointer-events-none absolute inset-x-10 top-[15%] h-[480px] rounded-surface-2xl bg-gradient-to-br from-teal-500/[0.06] via-transparent to-indigo-500/[0.06] blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="section-intro max-w-2xl flex-1">
            <p className="section-label">03 — Skills</p>
            <h2 className="section-heading mt-4">
              Technical expertise <span className="text-gradient not-italic">across the stack.</span>
            </h2>
            <p className="section-lead mt-4">
              Select a category to view related technologies and tools.
            </p>
          </div>
          <div className="surface-chip text-xs uppercase tracking-[0.22em] text-white/50">
            <OrbitIcon className="h-4 w-4 text-teal-200" aria-hidden />
            Skill categories
          </div>
        </div>

        <div className="mt-14 flex snap-x gap-3 overflow-x-auto pb-6 md:flex-wrap md:overflow-visible [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {ORDER.map((cat) => {
            const pressed = cat === active;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={
                  pressed
                    ? "snap-start rounded-pill border border-teal-300/50 bg-teal-400/[0.1] px-5 py-2 text-xs uppercase tracking-[0.22em] text-white md:snap-none"
                    : "snap-start rounded-pill border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-xs uppercase tracking-[0.22em] text-white/60 transition hover:border-white/20 hover:text-white md:snap-none"
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative mx-auto mt-16 grid min-h-[min(580px,95vw)] w-full max-w-[560px] place-items-center">
          <motion.div aria-hidden className="orbit-spin absolute inset-[10%] rounded-full border border-dashed border-teal-200/55" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 6, repeat: Infinity }} />

          <div aria-hidden className="absolute inset-[22%] rounded-pill bg-teal-400/[0.06] blur-[48px]" />

          {orbit.map((label, idx) => {
            const angle = (idx / orbit.length) * Math.PI * 2;
            const pct = idx % 2 === 0 ? 38 : 32;
            return (
              <motion.div
                key={`${label}-${idx}`}
                layout
                className="absolute left-1/2 top-1/2 flex w-[4.75rem] flex-col items-center gap-2"
                style={{
                  left: `${50 + Math.cos(angle) * pct}%`,
                  top: `${50 + Math.sin(angle) * pct}%`,
                  transform: "translate(-50%, -50%)",
                }}
                whileHover={{ scale: 1.06 }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-colors hover:border-teal-300/45">
                  <SkillLogo name={label} className="h-8 w-8" />
                </div>
                <span className="text-center text-[9px] font-medium uppercase leading-tight tracking-[0.12em] text-white/70">
                  {label}
                </span>
              </motion.div>
            );
          })}

          <motion.div aria-hidden className="orbit-spin absolute inset-[4%] rounded-surface-2xl border border-teal-200/35 opacity-70" animate={{ rotate: [-4, 4, -6] }} transition={{ repeat: Infinity, duration: 12 }} />
        </div>
      </div>
    </section>
  );
}
