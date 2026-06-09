import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { MagneticButton } from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/data/portfolio";

export function Navbar({ scrollTo }: { scrollTo: (h: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (hash: string) => {
    scrollTo(hash);
    setMenuOpen(false);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 py-5 md:px-8">
      <div className="pointer-events-auto mx-auto max-w-6xl rounded-pill border border-white/[0.08] bg-[hsl(var(--glass)/0.55)] shadow-[0_16px_64px_-32px_black] backdrop-blur-xl md:backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <button
            type="button"
            className="group flex min-w-0 items-center gap-2 px-2 text-left sm:px-4"
            onClick={() => navigate("#hero")}
          >
            <BrandLogo size="sm" className="transition group-hover:border-teal-400/35" />
            <span className="hidden min-w-0 sm:block">
              <span className="block text-[11px] uppercase tracking-[0.25em] text-white/35">Portfolio</span>
              <span className="block truncate font-medium text-white/85">{SITE.name}</span>
            </span>
          </button>

          <nav className="hidden min-w-0 items-center gap-0.5 xl:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.hash}
                type="button"
                onClick={() => navigate(link.hash)}
                className="whitespace-nowrap rounded-pill px-2.5 py-2 text-xs text-white/60 transition hover:bg-white/[0.06] hover:text-white 2xl:px-3.5 2xl:text-sm"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="touch-press inline-flex rounded-surface-md border border-white/10 p-2.5 text-white/75 transition hover:bg-white/[0.06] hover:text-white active:bg-white/[0.08] active:text-white xl:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>

            <MagneticButton>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
                <a href={SITE.social.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" aria-hidden /> GitHub
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button size="sm" className="font-semibold" type="button" onClick={() => navigate("#contact")}>
                <Linkedin className="h-4 w-4 sm:hidden" aria-hidden />
                <span className="hidden sm:inline">Contact me</span>
                <span className="sm:hidden">Contact</span>
              </Button>
            </MagneticButton>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.nav
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-white/[0.08] xl:hidden"
              aria-label="Mobile navigation"
            >
              <ul className="grid grid-cols-2 gap-1 px-3 py-3 sm:grid-cols-3">
                {NAV_LINKS.map((link, idx) => (
                  <motion.li
                    key={link.hash}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.22 }}
                  >
                    <button
                      type="button"
                      onClick={() => navigate(link.hash)}
                      className="touch-press w-full rounded-surface-md px-3 py-2.5 text-left text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white active:bg-white/[0.08] active:text-white"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
