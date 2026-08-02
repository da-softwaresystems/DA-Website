"use client";

import { Eye, Gem, HeartHandshake, Lightbulb, ShieldCheck, Target, TrendingUp, Users } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { homeContent } from "@/data/site";
import { SectionHeader } from "@/components/sections/section-header";

const valueIcons = {
  innovation: Lightbulb,
  responsibility: ShieldCheck,
  teamwork: Users,
  improvement: TrendingUp,
  customer: HeartHandshake,
  quality: Gem,
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.4, ease: EASE, delay: 0.2 } },
};

export function About() {
  const { about } = homeContent;

  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mist blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow={about.eyebrow} title={about.title} />

        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center">
          {about.story.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-8 text-slate-600">{paragraph}</p>
          ))}
        </div>

        <motion.ol
          className="relative mt-24 space-y-14 lg:space-y-20"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-4 w-px bg-slate-200 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-brand to-accent lg:left-1/2 lg:-translate-x-1/2"
            variants={lineVariants}
          />

          {about.timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            const card = (
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-xl shadow-slate-900/[0.03] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-sm font-bold tracking-[0.2em] text-transparent uppercase">{item.year}</span>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
              </div>
            );

            return (
              <motion.li key={item.title} variants={itemVariants} className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:pl-0">
                <span aria-hidden="true" className="absolute top-1.5 left-4 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-br from-brand to-accent ring-4 ring-white lg:left-1/2" />
                {isEven ? (
                  <>
                    <div className="lg:pr-12 lg:text-right">{card}</div>
                    <div className="hidden lg:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block" />
                    <div className="lg:pl-12">{card}</div>
                  </>
                )}
              </motion.li>
            );
          })}
        </motion.ol>

        <div className="mx-auto mt-24 grid max-w-4xl gap-6 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-xl shadow-slate-900/[0.03] backdrop-blur-xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white shadow-lg shadow-brand/25">
              <Target size={22} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">Mission</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{about.mission}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-xl shadow-slate-900/[0.03] backdrop-blur-xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white shadow-lg shadow-brand/25">
              <Eye size={22} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">Vision</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{about.vision}</p>
          </motion.div>
        </div>

        <motion.ul
          className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {about.values.map((value) => {
            const Icon = valueIcons[value.icon];
            return (
              <motion.li
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-shadow duration-500 hover:shadow-xl"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white transition duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{value.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-500">{value.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
