import {
  Layers,
  Layout,
  Palette,
  Plug,
  Server,
  ShoppingBag,
  Sparkles,
  TabletSmartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import type { JSX } from "react";
import { SERVICES } from "@/data/portfolio";

const ICONS: Record<(typeof SERVICES)[number]["icon"], JSX.Element> = {
  layers: <Layers className="h-6 w-6" aria-hidden />,
  monitor: <TabletSmartphone className="h-6 w-6" aria-hidden />,
  server: <Server className="h-6 w-6" aria-hidden />,
  plug: <Plug className="h-6 w-6" aria-hidden />,
  layout: <Layout className="h-6 w-6" aria-hidden />,
  sparkles: <Sparkles className="h-6 w-6" aria-hidden />,
  palette: <Palette className="h-6 w-6" aria-hidden />,
  "shopping-bag": <ShoppingBag className="h-6 w-6" aria-hidden />,
};

export function ServicesSection() {
  return (
    <section id="services" className="relative px-4 py-28 md:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="section-intro max-w-2xl flex-1">
            <p className="section-label">07 — Services</p>
            <h2 className="section-heading mt-4">
              Professional <span className="text-gradient not-italic">services.</span>
            </h2>
            <p className="section-lead mt-4 max-w-xl">
              Flexible service offerings tailored to your project requirements.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:[perspective:1200px]">
          {SERVICES.map((s, idx) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.45, delay: idx * 0.035 }}
              whileHover={{ translateY: -3 }}
              className="surface-card group relative px-9 py-8 transition hover:border-teal-200/25"
            >
              <div className="relative flex gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-surface-lg bg-teal-400/12 text-teal-50">
                  {ICONS[s.icon]}
                </div>
                <div>
                  <p className="font-display text-2xl text-white">{s.title}</p>
                  <p className="mt-3 max-w-xl text-sm text-white/60">{s.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
