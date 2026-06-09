import { lazy, Suspense, useEffect, useMemo, useState } from "react";

import { CommandPalette } from "@/components/CommandPalette";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll, usePortfolioLenis } from "@/hooks/useLenis";
import { createScrollNav } from "@/hooks/usePortfolioNav";
import { useCommandPalette } from "@/hooks/useCommandPalette";

import { Hero } from "@/components/sections/Hero";

const ProjectsSection = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({ default: m.ProjectsSection }))
);
const AboutSection = lazy(() =>
  import("@/components/sections/About").then((m) => ({ default: m.AboutSection }))
);
const SkillsSection = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.SkillsSection }))
);
const ExperienceSection = lazy(() =>
  import("@/components/sections/Experience").then((m) => ({ default: m.ExperienceSection }))
);
const CertificationsSection = lazy(() =>
  import("@/components/sections/Certifications").then((m) => ({ default: m.CertificationsSection }))
);
const ServicesSection = lazy(() =>
  import("@/components/sections/Services").then((m) => ({ default: m.ServicesSection }))
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/Testimonials").then((m) => ({ default: m.TestimonialsSection }))
);
const ContactSection = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.ContactSection }))
);
const FooterSection = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.FooterSection }))
);

export default function App() {
  /** Splash overlay only — main UI always mounts so we never get a blank page if exit callbacks misfire. */
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => document.documentElement.classList.toggle("custom-cursor-root", mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <SmoothScroll>
      <PortfolioShell />
      {splash ? <LoadingScreen onDone={() => setSplash(false)} /> : null}
    </SmoothScroll>
  );
}

function PortfolioShell() {
  const lenis = usePortfolioLenis();
  const scrollTo = useMemo(() => createScrollNav(lenis), [lenis]);
  const [cmdOpen, setCmdOpen] = useState(false);

  useCommandPalette(cmdOpen, setCmdOpen, {
    onEasterGlow: () => {
      document.documentElement.style.setProperty("--glow", "296 94% 60%");
      scrollTo("#skills");
    },
  });

  return (
    <>
      <a
        href="#hero"
        className="fixed left-4 top-4 z-[260] rounded-full bg-teal-400 px-5 py-2 text-xs font-medium text-slate-950 opacity-0 transition focus-visible:opacity-100 focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080d]"
      >
        Skip to content
      </a>

      <CustomCursor />

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} onNavigate={scrollTo} />

      <Navbar scrollTo={scrollTo} />

      <main className="relative isolate">
        <Hero scrollTo={scrollTo} />
        <Suspense fallback={null}>
          <ProjectsSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <CertificationsSection />
          <ServicesSection />
          <TestimonialsSection />
          <ContactSection />
          <FooterSection scrollTo={scrollTo} />
        </Suspense>
      </main>
    </>
  );
}
