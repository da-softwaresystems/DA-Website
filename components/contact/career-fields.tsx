"use client";

import { motion } from "framer-motion";
import type { ContactFormValues, FormErrors } from "@/components/contact/form-options";
import { FormField, fieldClass } from "@/components/contact/form-field";
import { FileUpload } from "@/components/contact/file-upload";

type CareerFieldsProps = {
  values: ContactFormValues;
  errors: FormErrors;
  onChange: <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => void;
  resumeFile: File | null;
  onResumeChange: (file: File | null) => void;
};

export function CareerFields({ values, errors, onChange, resumeFile, onResumeChange }: CareerFieldsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-5 overflow-hidden sm:grid-cols-2"
    >
      <FormField label="Years of Experience" htmlFor="yearsExperience" error={errors.yearsExperience}>
        <input id="yearsExperience" className={fieldClass} value={values.yearsExperience} onChange={(event) => onChange("yearsExperience", event.target.value)} placeholder="e.g. 3 years" />
      </FormField>

      <FormField label="LinkedIn Profile" htmlFor="careerLinkedin" error={errors.careerLinkedin}>
        <input id="careerLinkedin" type="url" className={fieldClass} value={values.careerLinkedin} onChange={(event) => onChange("careerLinkedin", event.target.value)} placeholder="linkedin.com/in/you" />
      </FormField>

      <div className="sm:col-span-2">
        <FileUpload
          label="Resume / CV"
          id="careerResume"
          accept=".pdf,.doc,.docx"
          hint="PDF or Word, up to 10 MB"
          file={resumeFile}
          onChange={onResumeChange}
        />
      </div>
    </motion.div>
  );
}
