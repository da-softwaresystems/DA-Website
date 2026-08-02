"use client";

import { motion } from "framer-motion";
import { BUDGET_RANGES, TIMELINES, type ContactFormValues, type FormErrors } from "@/components/contact/form-options";
import { FormField, fieldClass } from "@/components/contact/form-field";

type ProjectFieldsProps = {
  values: ContactFormValues;
  errors: FormErrors;
  onChange: <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => void;
};

export function ProjectFields({ values, errors, onChange }: ProjectFieldsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-5 overflow-hidden sm:grid-cols-2"
    >
      <FormField label="Budget Range" htmlFor="budget" hint="Optional" error={errors.budget}>
        <select id="budget" className={fieldClass} value={values.budget} onChange={(event) => onChange("budget", event.target.value)}>
          <option value="">Select a range</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Project Timeline" htmlFor="timeline" hint="Optional" error={errors.timeline}>
        <select id="timeline" className={fieldClass} value={values.timeline} onChange={(event) => onChange("timeline", event.target.value)}>
          <option value="">Select a timeline</option>
          {TIMELINES.map((timeline) => (
            <option key={timeline} value={timeline}>{timeline}</option>
          ))}
        </select>
      </FormField>
    </motion.div>
  );
}
