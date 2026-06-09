import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import { cn } from "@/lib/utils";

export function MagneticButton({
  className,
  children,
  strength = 0.35,
}: {
  className?: string;
  children: ReactNode;
  strength?: number;
}) {
  const { richMotion } = useMotionProfile();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handle = (e: React.MouseEvent) => {
    if (!richMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={richMotion ? { scale: 0.97 } : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.4 }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
