import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MousePointerClick, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { PROJECTS } from "@/data/portfolio";
import { tapLiftProps, useMotionProfile } from "@/hooks/useMotionProfile";
import { cardEntrance } from "@/lib/motion";

const PREVIEW_COUNT = 4;

function ResponsibilityList({ items }: { items: readonly string[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > PREVIEW_COUNT;
  const visible = expanded ? items : items.slice(0, PREVIEW_COUNT);

  return (
    <div className="border-t border-white/[0.08] pt-5">
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/45">Responsibilities</p>
      <ul className="space-y-2.5">
        {visible.map((item) => (
          <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-white/60">
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

export function ProjectsSection() {
  const { richMotion, reducedMotion, lite3d } = useMotionProfile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const scrollProjects = useCallback(
    (direction: "left" | "right") => {
      const el = scrollRef.current;
      if (!el) return;

      const card = el.querySelector("article");
      const gap = window.matchMedia("(min-width: 768px)").matches ? 40 : 32;
      const amount = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.85;

      el.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    },
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    gsap.fromTo(
      ".projects-kicker",
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.06 }
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollButtonClass =
    "inline-flex rounded-surface-md border border-white/14 bg-[#050607]/80 p-2.5 text-teal-200 backdrop-blur-sm transition hover:bg-white/[0.05] hover:text-white disabled:pointer-events-none disabled:opacity-35";

  return (
    <section id="projects" className="relative overflow-hidden px-0 py-28">
      <div className="px-4 md:px-8">
        <div className="mx-auto mb-14 flex max-w-6xl flex-wrap items-end justify-between gap-6 projects-kicker">
          <div className="section-intro max-w-2xl flex-1">
            <p className="section-label">04 — Projects</p>
            <h2 className="section-heading mt-4">
              Featured <span className="text-teal-200/90 not-italic">Projects</span>
            </h2>
            <p className="section-lead mt-4">
              Production platforms across compliance, AI, property management, e-commerce, and enterprise web
              applications.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="surface-chip text-xs uppercase tracking-[0.22em] text-white/55">
              <MousePointerClick className="h-4 w-4 text-teal-200/90" aria-hidden />
              Scroll to browse
            </div>
            <div className="flex gap-2" aria-label="Project carousel controls">
              <button
                type="button"
                aria-label="Previous projects"
                disabled={!canScrollLeft}
                onClick={() => scrollProjects("left")}
                className={scrollButtonClass}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next projects"
                disabled={!canScrollRight}
                onClick={() => scrollProjects("right")}
                className={scrollButtonClass}
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050607] to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050607] to-transparent" aria-hidden />

        <button
          type="button"
          aria-label="Previous projects"
          disabled={!canScrollLeft}
          onClick={() => scrollProjects("left")}
          className={`absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 md:left-6 md:inline-flex ${scrollButtonClass}`}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Next projects"
          disabled={!canScrollRight}
          onClick={() => scrollProjects("right")}
          className={`absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 md:right-6 md:inline-flex ${scrollButtonClass}`}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        <div
          ref={scrollRef}
          data-lenis-prevent
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-8 pb-6 pt-8 [scrollbar-width:none] md:gap-10 md:px-[max(32px,calc(50vw-38rem))] [&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((p, idx) => {
            const entrance = cardEntrance(reducedMotion, lite3d, idx);
            return (
            <motion.article
              key={p.title}
              draggable={false}
              initial={entrance.initial}
              whileInView={entrance.whileInView}
              viewport={{ once: true, amount: 0.25 }}
              transition={entrance.transition}
              {...tapLiftProps(richMotion)}
              className="surface-card relative flex w-[82vw] max-w-xl shrink-0 snap-center flex-col overflow-hidden transition hover:border-teal-200/25 active:border-teal-200/25"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-20%,rgba(45,212,191,0.32),transparent_55%)]" aria-hidden />

              <div className="relative flex flex-col gap-6 p-8 md:p-10">
                <div className="flex items-center gap-4 text-teal-200/90">
                  <Sparkles className="h-5 w-5 shrink-0" aria-hidden />
                  <span className="text-[10px] uppercase tracking-[0.32em] text-white/55">
                    {p.featured ? "Featured" : "Case study"}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-3xl text-white md:text-[2.2rem]">{p.title}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-teal-200/90">{p.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{p.description}</p>
                </div>

                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/45">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-pill border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <ResponsibilityList items={p.responsibilities} />
              </div>
            </motion.article>
          );
          })}
        </div>
      </div>
    </section>
  );
}
