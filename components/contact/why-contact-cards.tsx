"use client";

import { HeartHandshake, MessageSquare, Users, Zap } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { homeContent } from "@/data/site";

const whyIcons = {
  consultation: MessageSquare,
  response: Zap,
  engineers: Users,
  partnership: HeartHandshake,
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function WhyContactCards() {
  const { whyContact } = homeContent.contact;

  return (
    <motion.ul
      className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {whyContact.map((item) => {
        const Icon = whyIcons[item.icon];
        return (
          <motion.li
            key={item.title}
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 text-center shadow-sm backdrop-blur-xl transition-shadow duration-500 hover:shadow-xl"
          >
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white">
              <Icon size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-bold text-slate-900">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">{item.description}</p>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
