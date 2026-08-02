"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfoPanel } from "@/components/contact/contact-info-panel";
import { InternshipBanner } from "@/components/contact/internship-banner";
import type { InquiryType } from "@/components/contact/form-options";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactMain() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("general");
  const formSectionRef = useRef<HTMLDivElement>(null);

  function applyForInternship() {
    setInquiryType("internship");
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <InternshipBanner onApply={applyForInternship} />

      <div id="contact-form" ref={formSectionRef} className="grid gap-8 scroll-mt-24 lg:grid-cols-[3fr_2fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-xl shadow-slate-900/[0.03] backdrop-blur-xl sm:p-8"
        >
          <ContactForm inquiryType={inquiryType} onInquiryTypeChange={setInquiryType} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <ContactInfoPanel />
        </motion.div>
      </div>
    </div>
  );
}
