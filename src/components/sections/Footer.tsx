import type { ComponentType } from "react";
import { BriefcaseBusiness, Facebook, Github, Instagram, Linkedin, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";
import { MagneticButton } from "@/components/MagneticButton";
import { QUICK_LINKS, SITE, SOCIAL_LINKS } from "@/data/portfolio";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<(typeof SOCIAL_LINKS)[number]["key"], ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  indeed: BriefcaseBusiness,
  instagram: Instagram,
  facebook: Facebook,
  x: XIcon,
};

export function FooterSection({ scrollTo }: { scrollTo: (hash: string) => void }) {
  return (
    <footer className="relative border-t border-white/[0.08] px-4 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-x-[20%] -top-[120px] h-[200px] bg-gradient-to-t from-teal-500/[0.06] to-transparent blur-3xl" aria-hidden />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <MagneticButton strength={0.2}>
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                onClick={() => scrollTo("#hero")}
                className="group flex min-h-[52px] items-center gap-4 text-left"
              >
                <BrandLogo size="md" />
                <span>
                  <span className="block text-xs uppercase tracking-[0.28em] text-white/40">Portfolio</span>
                  <span className="font-display text-2xl text-white">{SITE.name}</span>
                </span>
              </motion.button>
            </MagneticButton>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              Full-stack software engineering with a focus on quality, performance, and user experience.
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4 shrink-0 text-teal-200/90" aria-hidden />
              {SITE.city}, {SITE.country}
            </p>
            <p className="font-display text-xl text-white lg:text-2xl">
              Ready to <span className="text-gradient not-italic">work together?</span>
            </p>
          </div>

          <nav aria-label="Quick links">
            <p className="section-label mb-5 text-white/45">Quick links</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.hash}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.hash)}
                    className="text-left text-sm text-white/65 transition hover:text-teal-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social media">
            <p className="section-label mb-5 text-white/45">Social media</p>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ key, label, href }) => {
                const Icon = SOCIAL_ICONS[key];
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="neon-border inline-flex w-full items-center gap-3 rounded-surface-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/75 transition hover:border-teal-200/35 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-teal-200/95" aria-hidden />
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/35">
            &copy; {new Date().getFullYear()} · {SITE.name}
          </p>
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="text-sm text-teal-200/90 transition hover:text-teal-100"
          >
            Get in touch →
          </button>
        </div>
      </div>
    </footer>
  );
}
