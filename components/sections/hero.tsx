"use client";

import { ArrowRight, Cloud, Code2, Cpu, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { homeContent, siteConfig } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const floatingChips = [
  { icon: Code2, label: "Clean Architecture", className: "left-[6%] top-[18%]", duration: 6, delay: 0 },
  { icon: Cpu, label: "AI-Powered", className: "right-[8%] top-[12%]", duration: 7, delay: 0.4 },
  { icon: Cloud, label: "Cloud-Native", className: "left-[10%] bottom-[16%]", duration: 6.5, delay: 0.8 },
  { icon: Sparkles, label: "Enterprise-Grade", className: "right-[6%] bottom-[20%]", duration: 7.5, delay: 1.2 },
];

export function Hero() {
  const { hero } = homeContent;
  const yearsOfExperience = new Date().getFullYear() - new Date(siteConfig.founded).getFullYear();

  const stats = [
    { label: "Years of Experience", value: `${yearsOfExperience}+` },
    { label: "Projects Delivered", value: hero.stats.projectsDelivered },
    { label: "Technologies", value: hero.stats.technologies },
    { label: "Client Satisfaction", value: hero.stats.clientSatisfaction },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist via-white to-white pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 left-1/4 h-[28rem] w-[28rem] rounded-full bg-brand/15 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-[8%] h-[24rem] w-[24rem] rounded-full bg-accent/20 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {floatingChips.map(({ icon: Icon, label, className, duration, delay }) => (
        <motion.div
          key={label}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 hidden items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl md:flex ${className}`}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-accent text-white">
            <Icon size={16} />
          </span>
          <span className="text-sm font-semibold text-slate-700">{label}</span>
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
        >
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href={hero.primaryCta.href} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-deep px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition duration-300 hover:shadow-xl hover:shadow-brand/35">
            {hero.primaryCta.label}
            <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href={hero.secondaryCta.href} className="rounded-full border border-slate-300 bg-white/60 px-7 py-3.5 font-semibold text-slate-900 backdrop-blur transition duration-300 hover:border-brand hover:text-brand">
            {hero.secondaryCta.label}
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:grid-cols-4 sm:p-8"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="bg-gradient-to-r from-brand to-accent bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">{stat.value}</dd>
              <dt className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
