import { useState } from "react";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { EXPERIENCE, SITE } from "@/data/portfolio";

const PREVIEW_COUNT = 4;

function ResponsibilityList({ items }: { items: readonly string[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > PREVIEW_COUNT;
  const visible = expanded ? items : items.slice(0, PREVIEW_COUNT);

  return (
    <div className="mt-5 border-t border-white/[0.08] pt-5">
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/45">Responsibilities</p>
      <ul className="space-y-2.5">
        {visible.map((item) => (
          <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-white/60 md:text-sm">
            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-pill bg-teal-300/80" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-200/85 transition hover:text-teal-100"
        >
          {expanded ? "Show fewer" : `Show all (${items.length})`}
        </button>
      ) : null}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-4 py-28 md:px-8">
      <div className="pointer-events-none absolute inset-x-[12%] top-[30%] h-[320px] rounded-pill bg-fuchsia-500/[0.06] blur-[100px]" aria-hidden />

      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[260px,minmax(0,1fr)]">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="section-intro">
            <p className="section-label">05 — Experience</p>
            <h2 className="section-heading mt-4">
              Professional <span className="text-gradient not-italic">experience.</span>
            </h2>
            <p className="section-lead mt-4">
              A summary of roles across product development, engineering, and leadership.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4 shrink-0 text-teal-200/90" aria-hidden />
              {SITE.city}, {SITE.country}
            </p>
            <div className="surface-chip mt-6 section-label text-white/50">
              <BriefcaseBusiness className="h-4 w-4 text-teal-200/90" aria-hidden /> Career timeline
            </div>
          </div>
        </div>

        <ol className="relative ml-1 space-y-6 border-l border-teal-400/25 md:ml-2 md:space-y-8">
          {EXPERIENCE.map((exp, idx) => (
            <motion.li
              key={`${exp.company}-${exp.role}-${exp.period}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
              className="relative pl-6 md:pl-8"
            >
              <span
                className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-pill border-2 border-[#07080d] bg-teal-300/85 md:-left-[6px] md:h-3 md:w-3"
                aria-hidden
              />

              <article className="surface-card p-5 md:p-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="font-display text-xl text-white md:text-2xl">{exp.role}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.28em] text-teal-200/92 md:text-sm md:tracking-[0.32em]">
                      {exp.company}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-white/50">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-teal-200/75" aria-hidden />
                      <span>
                        {exp.city}, {exp.country}
                        {exp.remote ? " · Remote" : null}
                      </span>
                    </p>
                  </div>
                  <p className="shrink-0 text-[11px] uppercase tracking-[0.24em] text-white/50 sm:pt-1 sm:text-right">
                    {exp.period}
                  </p>
                </div>

                <ResponsibilityList items={exp.responsibilities} />
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
