"use client";

import { motion } from "framer-motion";
import { PRIORITIES, type ContactFormValues, type FormErrors } from "@/components/contact/form-options";
import { FormField, fieldClass } from "@/components/contact/form-field";

type SupportFieldsProps = {
  values: ContactFormValues;
  errors: FormErrors;
  onChange: <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => void;
};

export function SupportFields({ values, errors, onChange }: SupportFieldsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-5 overflow-hidden sm:grid-cols-2"
    >
      <FormField label="Product / System Name" htmlFor="productName" error={errors.productName}>
        <input id="productName" className={fieldClass} value={values.productName} onChange={(event) => onChange("productName", event.target.value)} placeholder="e.g. Hospital Management System" />
      </FormField>

      <FormField label="Priority" htmlFor="priority" error={errors.priority}>
        <select id="priority" className={fieldClass} value={values.priority} onChange={(event) => onChange("priority", event.target.value)}>
          <option value="">Select priority</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>
      </FormField>
    </motion.div>
  );
}
