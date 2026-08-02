"use client";

import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { SKILLS, type ContactFormValues, type FormErrors } from "@/components/contact/form-options";
import { FormField, fieldClass } from "@/components/contact/form-field";
import { FileUpload } from "@/components/contact/file-upload";
import { MultiSelect } from "@/components/contact/multi-select";

type InternshipFieldsProps = {
  values: ContactFormValues;
  errors: FormErrors;
  onChange: <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => void;
  resumeFile: File | null;
  onResumeChange: (file: File | null) => void;
};

export function InternshipFields({ values, errors, onChange, resumeFile, onResumeChange }: InternshipFieldsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-2xl border border-brand/20 bg-brand/[0.03] p-6"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white">
          <GraduationCap size={18} aria-hidden="true" />
        </span>
        <h3 className="font-bold text-slate-900">Internship Application Details</h3>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField label="College / University" htmlFor="college" error={errors.college}>
          <input id="college" className={fieldClass} value={values.college} onChange={(event) => onChange("college", event.target.value)} />
        </FormField>

        <FormField label="Degree / Branch" htmlFor="degree" error={errors.degree}>
          <input id="degree" className={fieldClass} value={values.degree} onChange={(event) => onChange("degree", event.target.value)} placeholder="e.g. B.Tech Computer Science" />
        </FormField>

        <FormField label="Current Year / Graduation Year" htmlFor="graduationYear" error={errors.graduationYear}>
          <input id="graduationYear" className={fieldClass} value={values.graduationYear} onChange={(event) => onChange("graduationYear", event.target.value)} placeholder="e.g. Final Year, 2026" />
        </FormField>

        <FormField label="Portfolio / GitHub Profile" htmlFor="portfolio" hint="Optional" error={errors.portfolio}>
          <input id="portfolio" type="url" className={fieldClass} value={values.portfolio} onChange={(event) => onChange("portfolio", event.target.value)} placeholder="github.com/you" />
        </FormField>

        <FormField label="LinkedIn Profile" htmlFor="internLinkedin" hint="Optional" error={errors.internLinkedin}>
          <input id="internLinkedin" type="url" className={fieldClass} value={values.internLinkedin} onChange={(event) => onChange("internLinkedin", event.target.value)} placeholder="linkedin.com/in/you" />
        </FormField>

        <FileUpload label="Resume Upload (PDF)" id="internResume" accept=".pdf" hint="PDF, up to 10 MB" file={resumeFile} onChange={onResumeChange} />

        <div className="sm:col-span-2">
          <MultiSelect label="Skills" options={SKILLS} selected={values.skills} onChange={(next) => onChange("skills", next)} />
        </div>

        <div className="sm:col-span-2">
          <FormField label="Why do you want to intern at DA Software Systems?" htmlFor="whyIntern" error={errors.whyIntern}>
            <textarea id="whyIntern" rows={4} className={fieldClass} value={values.whyIntern} onChange={(event) => onChange("whyIntern", event.target.value)} />
          </FormField>
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">We review every application carefully. Shortlisted candidates will be contacted via email or phone.</p>
    </motion.div>
  );
}
