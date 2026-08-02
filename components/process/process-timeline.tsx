"use client";

import { ClipboardList, Code2, PenTool, Rocket, Search, TestTube } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { homeContent } from "@/data/site";

const stepIcons = {
  discover: Search,
  plan: ClipboardList,
  design: PenTool,
  develop: Code2,
  test: TestTube,
  launch: Rocket,
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const horizontalLineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: EASE, delay: 0.2 } },
};

const verticalLineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.4, ease: EASE, delay: 0.2 } },
};

export function ProcessTimeline() {
  const { steps } = homeContent.process;

  return (
    <motion.ol
      className="relative mt-20 flex flex-col gap-10 lg:mt-28 lg:flex-row lg:items-start lg:gap-8"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div aria-hidden="true" className="absolute top-8 bottom-8 left-8 hidden w-px bg-slate-200 max-lg:block" />
      <motion.div
        aria-hidden="true"
        className="absolute top-8 bottom-8 left-8 hidden w-px origin-top bg-gradient-to-b from-brand to-accent max-lg:block"
        variants={verticalLineVariants}
      />

      {steps.map((step, index) => {
        const Icon = stepIcons[step.icon];
        const isLast = index === steps.length - 1;

        return (
          <motion.li key={step.number} variants={itemVariants} className="relative flex gap-5 sm:gap-6 lg:flex-1 lg:flex-col lg:gap-0">
            {!isLast && (
              <>
                <div aria-hidden="true" className="absolute top-8 left-8 hidden h-px w-[calc(100%+2rem)] bg-slate-200 lg:block" />
                <motion.div
                  aria-hidden="true"
                  className="absolute top-8 left-8 hidden h-px w-[calc(100%+2rem)] origin-left bg-gradient-to-r from-brand to-accent lg:block"
                  variants={horizontalLineVariants}
                />
              </>
            )}

            <motion.div
              whileHover={{ rotate: 6, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white shadow-lg shadow-brand/30 ring-4 ring-white lg:mx-auto"
            >
              <Icon size={26} aria-hidden="true" />
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group relative flex-1 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 text-left shadow-xl shadow-slate-900/[0.03] backdrop-blur-xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-blue-900/10 lg:mt-8 lg:w-full"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/0 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-brand/[0.06] group-hover:to-accent/[0.1] group-hover:opacity-100" />
              <span aria-hidden="true" className="pointer-events-none absolute -top-3 -right-2 text-7xl font-extrabold text-slate-100 select-none">{step.number}</span>

              <p className="relative text-[11px] font-semibold tracking-[0.18em] text-brand/80 uppercase">{step.label}</p>
              <h3 className="relative mt-2 text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="relative mt-2 text-sm leading-6 text-slate-500">{step.description}</p>
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
