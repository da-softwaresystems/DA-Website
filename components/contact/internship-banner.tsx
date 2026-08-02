"use client";

import { CheckCircle2, GraduationCap, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { homeContent } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

type InternshipBannerProps = {
  onApply: () => void;
};

export function InternshipBanner({ onApply }: InternshipBannerProps) {
  const { internshipBanner } = homeContent.contact;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mb-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand via-indigo-600 to-purple-600 p-8 text-white shadow-2xl shadow-brand/25 sm:p-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-400/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
        <motion.span
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-xl"
        >
          <GraduationCap size={30} aria-hidden="true" />
        </motion.span>

        <div>
          <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
            <Rocket size={22} aria-hidden="true" className="shrink-0 text-sky-200" />
            {internshipBanner.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">{internshipBanner.description}</p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {internshipBanner.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-white/90">
                <CheckCircle2 size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-sky-200" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <button
            type="button"
            onClick={onApply}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep shadow-lg shadow-black/10 transition duration-300 hover:shadow-[0_0_0_4px_rgba(255,255,255,0.25)]"
          >
            Apply for Internship
          </button>
          <a
            href={internshipBanner.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white hover:bg-white/10"
          >
            {internshipBanner.secondaryCta.label}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
