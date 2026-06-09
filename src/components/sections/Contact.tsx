import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, MessageCircleWarning, Phone, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagneticButton } from "@/components/MagneticButton";
import { SITE } from "@/data/portfolio";

export function ContactSection() {
  const [status, setStatus] = useState<"" | "sending" | "ok" | "error">("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          budget: data.get("budget"),
          dream: data.get("dream"),
        }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to send your message.");
      }

      form.reset();
      setStatus("ok");
      window.setTimeout(() => setStatus(""), 3200);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to send your message.");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-28 pb-36 md:px-8 md:pb-40">
      <div className="pointer-events-none absolute -left-[10%] bottom-[-20%] h-[620px] w-[620px] rounded-pill bg-gradient-to-br from-teal-500/[0.1] via-transparent to-fuchsia-500/[0.08] blur-[100px]" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.92fr,minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-20">
          <motion.div initial={{ opacity: 0.4, translateY: 24 }} whileInView={{ opacity: 1, translateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="section-intro">
              <div className="section-label flex flex-wrap items-center gap-3">
                <Radar className="h-5 w-5 text-teal-200/80" aria-hidden />
                09 — Contact
              </div>
              <p className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-white">
                Let&apos;s discuss <span className="text-gradient not-italic">your project.</span>
              </p>

              <p className="section-lead mt-6">
                Schedule a consultation for project planning, advisory work, or full development. Pricing is provided
                after an initial discovery call.
              </p>

              <div className="surface-card mt-8 divide-y divide-white/[0.08] p-0">
                <div className="flex items-start gap-3 px-5 py-4 md:px-6">
                  <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-teal-200/90" aria-hidden />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Phone</p>
                    <p className="mt-1 text-sm text-white/85">
                      {SITE.phones.map((p, i) => (
                        <span key={p.number}>
                          {i > 0 ? " · " : null}
                          <a className="transition hover:text-teal-200" href={p.href}>
                            {p.number}
                          </a>
                          <span className="text-white/45"> ({p.label})</span>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 px-5 py-4 md:px-6">
                  <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-teal-200/90" aria-hidden />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Email</p>
                    <a className="mt-1 block text-sm text-white/85 transition hover:text-teal-200" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 px-5 py-4 md:px-6">
                  <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-teal-200/90" aria-hidden />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">City</p>
                    <p className="mt-1 text-sm text-white/85">{SITE.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 px-5 py-4 md:px-6">
                  <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-teal-200/90" aria-hidden />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Country</p>
                    <p className="mt-1 text-sm text-white/85">{SITE.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 px-5 py-4 md:px-6">
                  <MessageCircleWarning className="mt-0.5 h-[18px] w-[18px] shrink-0 text-teal-200/90" aria-hidden />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Availability</p>
                    <p className="mt-1 text-sm text-white/85">{SITE.availability}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-pill border border-white/[0.12] bg-white/[0.03] px-5 text-xs font-medium uppercase tracking-[0.2em] text-white/75 transition hover:border-teal-200/35 hover:bg-white/[0.06]"
                  href={`mailto:${SITE.email}`}
                >
                  <Mail className="h-4 w-4 text-teal-200/93" aria-hidden />
                  Email
                </a>
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-pill border border-white/[0.12] bg-white/[0.03] px-5 text-xs font-medium uppercase tracking-[0.2em] text-white/75 transition hover:border-teal-200/35 hover:bg-white/[0.06]"
                  href={SITE.phones[0]?.href ?? "tel:+923046888676"}
                >
                  <Phone className="h-4 w-4 text-teal-200/93" aria-hidden />
                  Phone
                </a>
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-pill border border-teal-300/20 bg-teal-300/[0.1] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-100 transition hover:bg-teal-300/[0.14]"
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4 text-teal-100/93" aria-hidden />
                  Connect on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            className="surface-form px-6 py-8 md:px-10 md:py-12 lg:px-12"
            initial={{ opacity: 0, translateY: 40 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid gap-[22px]">
              <fieldset className="grid gap-3">
                <label className="text-[13px] font-medium uppercase tracking-[0.28em] text-white/60" htmlFor="name">
                  Name
                </label>
                <Input id="name" name="name" autoComplete="name" required placeholder="Your full name" />
              </fieldset>
              <fieldset className="grid gap-3">
                <label className="text-[13px] font-medium uppercase tracking-[0.28em] text-white/60" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                />
              </fieldset>
              <fieldset className="grid gap-3">
                <label className="text-[13px] font-medium uppercase tracking-[0.28em] text-white/60" htmlFor="company">
                  Company
                </label>
                <Input id="company" name="company" placeholder="Company or organization" />
              </fieldset>

              <fieldset className="grid gap-3">
                <label className="text-[13px] font-medium uppercase tracking-[0.28em] text-white/60" htmlFor="budget">
                  Project budget
                </label>
                <Input id="budget" name="budget" placeholder="e.g. $1000 – $50000" />
              </fieldset>

              <fieldset className="grid gap-3">
                <label className="text-[13px] font-medium uppercase tracking-[0.28em] text-white/60" htmlFor="dream">
                  Project details
                </label>
                <textarea
                  id="dream"
                  name="dream"
                  required
                  rows={7}
                  className="w-full resize-y rounded-surface-lg border border-white/10 bg-white/[0.04] px-5 py-4 text-[15px] text-white outline-none placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-teal-400/35 md:px-6 md:py-5"
                  placeholder="Please describe your project goals, timeline, and requirements."
                />
              </fieldset>

              <div className="mt-2 flex flex-col items-start gap-4 border-t border-white/[0.08] pt-6">
                <MagneticButton>
                  <Button type="submit" className="h-12 rounded-pill px-8 text-[15px]" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Submit inquiry"}
                  </Button>
                </MagneticButton>
                {status === "ok" ? (
                  <motion.p
                    animate={{ opacity: [0.2, 1] }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                    className="text-sm text-teal-200"
                  >
                    Message sent. I will respond within 2 hours.
                  </motion.p>
                ) : status === "error" ? (
                  <p className="text-sm text-red-300">{errorMessage}</p>
                ) : (
                  <p className="text-[11px] uppercase tracking-[0.32em] text-white/50">
                    Typical response time: within 2 hours
                  </p>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
