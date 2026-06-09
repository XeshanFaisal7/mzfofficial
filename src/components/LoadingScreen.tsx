import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { useMotionProfile } from "@/hooks/useMotionProfile";

const EXIT_MS = 650;

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { richMotion } = useMotionProfile();
  const [show, setShow] = useState(true);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) {
      const backup = window.setTimeout(finish, EXIT_MS);
      return () => window.clearTimeout(backup);
    }
  }, [show, finish]);

  return (
    <AnimatePresence onExitComplete={finish} mode="wait">
      {show ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[hsl(var(--background))] grain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            animate={richMotion ? { rotateX: [0, 12, 0], rotateY: [0, -12, 0] } : undefined}
            transition={richMotion ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
          >
            <BrandLogo size="lg" className="shadow-glow-sm" />
          </motion.div>
          <motion.p
            className="mt-8 section-label text-white/45"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Loading portfolio
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
