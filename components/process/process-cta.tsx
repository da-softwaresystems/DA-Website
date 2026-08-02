"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { homeContent } from "@/data/site";

export function ProcessCta() {
  const { cta } = homeContent.process;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-brand px-8 py-14 text-center shadow-2xl shadow-blue-900/20 sm:px-16 sm:py-16 lg:mt-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />

      <h3 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">{cta.title}</h3>
      <p className="relative mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">{cta.description}</p>

      <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
        <a href={cta.primaryCta.href} className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-900 shadow-lg shadow-black/10 transition duration-300 hover:shadow-[0_0_0_4px_rgba(14,165,233,0.35)]">
          {cta.primaryCta.label}
          <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        <a href={cta.secondaryCta.href} className="rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition duration-300 hover:border-white/60 hover:bg-white/5">
          {cta.secondaryCta.label}
        </a>
      </div>
    </motion.div>
  );
}
