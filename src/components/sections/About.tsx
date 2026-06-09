import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ABOUT_HIGHLIGHTS, ABOUT_STATS, SITE } from "@/data/portfolio";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

function StatValue({ raw, suffix }: { raw: string; suffix: string }) {
  const n = /^[0-9]+$/.test(raw) ? Number.parseInt(raw, 10) : null;
  if (n != null && !Number.isNaN(n)) {
    return (
      <>
        <AnimatedCounter target={n} suffix={suffix} />
      </>
    );
  }
  return (
    <>
      {raw}
      {suffix}
    </>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-28 md:px-8">
      <div className="pointer-events-none absolute -left-20 top-28 h-[420px] w-[420px] rounded-full bg-teal-500/[0.07] blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute right-[-90px] bottom-10 h-[360px] w-[360px] rounded-full bg-violet-600/[0.08] blur-[100px]" aria-hidden />

      <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12%" }}>
        <div className="mx-auto max-w-6xl">
          <motion.p variants={item} className="section-label">
            02 — About
          </motion.p>

          <motion.div variants={item} className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="space-y-8">
              <div className="section-intro">
                <h2 className="section-heading">
                  Building reliable systems{" "}
                  <span className="text-gradient not-italic">with attention to detail.</span>
                </h2>
                <p className="section-lead mt-6 max-w-xl">
                  I translate business requirements into clear roadmaps, architecture, and measurable outcomes. I
                  deliver quickly while maintaining quality and stability. Based in {SITE.city}, {SITE.country}, working
                  with clients globally.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {ABOUT_STATS.map((s) => (
                  <article key={s.label} className="surface-stat transition hover:border-teal-300/25">
                    <div className="font-display text-3xl text-white md:text-[2.125rem]">
                      <StatValue raw={s.value} suffix={s.suffix} />
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/50">{s.label}</p>
                  </article>
                ))}
              </div>
            </div>

            <motion.ol variants={item} className="relative space-y-5 lg:mt-0" aria-label="About pillars">
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-teal-400/60 via-teal-300/25 to-transparent" aria-hidden />

              {ABOUT_HIGHLIGHTS.map((h) => (
                <motion.li key={h.title} variants={item} className="relative surface-card p-6 pl-14">
                  <span className="absolute left-5 top-7 h-3 w-3 rounded-pill border border-teal-200/70 bg-teal-300/75" aria-hidden />
                  <h3 className="text-lg font-medium text-white">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{h.body}</p>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none mx-auto mt-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
    </section>
  );
}
