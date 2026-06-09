import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TESTIMONIALS } from "@/data/portfolio";

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const slides = TESTIMONIALS;

  const next = () => setI((x) => (slides.length === 0 ? x : (x + 1) % slides.length));
  const prev = () => setI((x) => (slides.length === 0 ? x : (x - 1 + slides.length) % slides.length));

  if (slides.length === 0) return null;

  const idx = i % slides.length;
  const active = slides[idx] as (typeof slides)[number];

  return (
    <section id="testimonials" className="relative px-4 py-28 md:px-8">
      <div className="pointer-events-none absolute inset-[12%] top-[38%] h-[410px] rounded-surface-2xl bg-indigo-500/[0.06] blur-[90px]" aria-hidden />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[340px,minmax(0,1fr)] lg:gap-16">
        <div className="section-intro lg:sticky lg:top-28 lg:self-start">
          <p className="section-label">08 — Testimonials</p>
          <h2 className="section-heading mt-4">
            Client <span className="text-gradient not-italic">testimonials.</span>
          </h2>
          <p className="section-lead mt-4">
            Feedback from clients and partners on recent collaborations.
          </p>
          <div className="mt-8 flex items-center gap-3 surface-card p-4">
            <div className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-surface-md border border-white/10 bg-teal-500/10 text-teal-100">
              <Quote className="h-7 w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Client feedback</p>
              <p className="mt-1 text-sm text-white/55">
                {idx + 1} of {slides.length}
              </p>
              <div className="mt-3 flex gap-2">
                <button type="button" aria-label="Previous testimonial" onClick={prev} className="inline-flex rounded-surface-md border border-white/14 p-2.5 text-teal-200 transition hover:bg-white/[0.05] hover:text-white">
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button type="button" aria-label="Next testimonial" onClick={next} className="inline-flex rounded-surface-md border border-white/14 p-2.5 text-teal-200 transition hover:bg-white/[0.05] hover:text-white">
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.article
              key={`${active.name}-${idx}`}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card p-8 md:p-12"
            >
              <p className="font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.5] text-white">{active.quote}</p>
              <footer className="mt-10 border-t border-white/[0.1] pt-8 md:mt-12 md:pt-10">
                <p className="text-base font-semibold text-white md:text-lg">{active.name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-teal-200/88 md:tracking-[0.38em]">{active.role}</p>
              </footer>
            </motion.article>
          </AnimatePresence>

          <nav className="flex flex-wrap justify-center gap-2 md:justify-start" aria-label="Testimonial slideshow">
            {slides.map((_, dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Show testimonial ${dot + 1}`}
                aria-current={dot === i ? "true" : undefined}
                onClick={() => setI(dot)}
                className={
                  dot === i
                    ? "h-2 w-8 rounded-pill bg-teal-200/80"
                    : "h-2 w-8 rounded-pill bg-white/15 transition hover:bg-white/40"
                }
              />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
