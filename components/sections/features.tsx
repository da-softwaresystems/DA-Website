"use client";

import { BrainCircuit, Building2, Cloud, Compass, Globe, HeartPulse, LifeBuoy, Layers, Search, ShieldCheck, Smartphone, Workflow } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { homeContent } from "@/data/site";
import { SectionHeader } from "@/components/sections/section-header";

const featureIcons = {
  discovery: Search,
  strategy: Compass,
  web: Globe,
  mobile: Smartphone,
  ai: BrainCircuit,
  cloud: Cloud,
  automation: Workflow,
  enterprise: Building2,
  healthcare: HeartPulse,
  qa: ShieldCheck,
  support: LifeBuoy,
  modern: Layers,
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function Features() {
  const { features } = homeContent;

  return (
    <section id="features" className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-[10%] h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[6%] h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader eyebrow="Why Businesses Choose DA Systems" title={features.title} description={features.description} />

        <motion.ul
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.items.map((feature) => {
            const Icon = featureIcons[feature.icon];
            return (
              <motion.li
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative rounded-3xl bg-gradient-to-br from-slate-200/80 to-slate-200/80 p-px transition-colors duration-500 hover:from-brand/50 hover:to-accent/50"
              >
                <div className="relative flex h-full flex-col rounded-[23px] bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-slate-900/5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white shadow-md shadow-brand/20 transition duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{feature.description}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
