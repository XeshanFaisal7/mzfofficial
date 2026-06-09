import { Award, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/data/portfolio";

function StatusBadge({ status }: { status: "Completed" | "Ongoing" }) {
  const completed = status === "Completed";

  return (
    <span
      className={
        completed
          ? "rounded-pill border border-teal-300/35 bg-teal-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-teal-100/90"
          : "rounded-pill border border-amber-300/35 bg-amber-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-100/90"
      }
    >
      {status}
    </span>
  );
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative px-4 py-28 md:px-8">
      <div className="pointer-events-none absolute inset-x-[8%] top-[18%] h-[360px] rounded-surface-2xl bg-cyan-500/[0.05] blur-[100px]" aria-hidden />

      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[260px,minmax(0,1fr)]">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="section-intro">
            <p className="section-label">06 — Certifications</p>
            <h2 className="section-heading mt-4">
              Professional <span className="text-gradient not-italic">certifications.</span>
            </h2>
            <p className="section-lead mt-4">
              Formal training and courses across web development, design, and AI engineering.
            </p>
            <div className="surface-chip mt-6 section-label text-white/50">
              <Award className="h-4 w-4 text-teal-200/90" aria-hidden /> Learning path
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.article
              key={cert.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
              className={`surface-card flex flex-col p-6 md:p-8${idx === CERTIFICATIONS.length - 1 ? " md:col-span-2" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl leading-snug text-white md:text-[1.35rem]">{cert.title}</h3>
                <StatusBadge status={cert.status} />
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.28em] text-white/40">{cert.organizationLabel}</dt>
                  <dd className="mt-1 text-white/75">{cert.organization}</dd>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.28em] text-white/40">Duration</dt>
                    <dd className="mt-1 text-white/70">{cert.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.28em] text-white/40">Location</dt>
                    <dd className="mt-1 flex items-center gap-1.5 text-white/70">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-teal-200/75" aria-hidden />
                      {cert.location}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/45">Key skills</p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-pill border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/65"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
