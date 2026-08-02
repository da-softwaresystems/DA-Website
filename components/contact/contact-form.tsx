"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  INQUIRY_TYPES,
  MESSAGE_MAX_LENGTH,
  PREFERRED_CONTACT_METHODS,
  PROJECT_INQUIRY_TYPES,
  initialFormValues,
  validateContactForm,
  type ContactFormValues,
  type FormErrors,
  type InquiryType,
} from "@/components/contact/form-options";
import { FormField, fieldClass } from "@/components/contact/form-field";
import { FileUpload } from "@/components/contact/file-upload";
import { ProjectFields } from "@/components/contact/project-fields";
import { SupportFields } from "@/components/contact/support-fields";
import { CareerFields } from "@/components/contact/career-fields";
import { InternshipFields } from "@/components/contact/internship-fields";
import type { ContactApiResponse } from "@/types/contact";

type ContactFormProps = {
  inquiryType: InquiryType;
  onInquiryTypeChange: (value: InquiryType) => void;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EASE = [0.16, 1, 0.3, 1] as const;

const DEFAULT_ERROR_MESSAGE = "We couldn't send your message right now. Please try again shortly.";

export function ContactForm({ inquiryType, onInquiryTypeChange }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");

  function handleChange<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateContactForm(values);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setStatus("error");
      setFeedback("Please check the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");

    const payload = new FormData();
    payload.set("name", values.name);
    payload.set("email", values.email);
    payload.set("phone", values.phone);
    payload.set("company", values.company);
    payload.set("inquiryType", inquiryType);
    payload.set("subject", values.subject);
    payload.set("message", values.message);
    payload.set("preferredContact", values.preferredContact);
    payload.set("budget", values.budget);
    payload.set("timeline", values.timeline);
    payload.set("consent", String(values.consent));

    const fileToSend = resume ?? attachment;
    if (fileToSend) payload.set("attachment", fileToSend);

    try {
      const response = await fetch("/api/contact", { method: "POST", body: payload });
      const result = (await response.json()) as ContactApiResponse;

      if (!result.ok) {
        setStatus("error");
        setFeedback(result.message || DEFAULT_ERROR_MESSAGE);
        if (result.errors) setErrors(result.errors as FormErrors);
        return;
      }

      setStatus("success");
      setFeedback(result.message);
      setValues(initialFormValues);
      setErrors({});
      setAttachment(null);
      setResume(null);
      onInquiryTypeChange("general");
    } catch {
      setStatus("error");
      setFeedback(DEFAULT_ERROR_MESSAGE);
    }
  }

  const showProjectFields = PROJECT_INQUIRY_TYPES.includes(inquiryType);
  const showSupportFields = inquiryType === "technical-support";
  const showCareerFields = inquiryType === "career";
  const showInternshipFields = inquiryType === "internship";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            className={fieldClass}
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
          />
        </FormField>

        <FormField label="Email Address" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            type="email"
            className={fieldClass}
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
        </FormField>

        <FormField label="Phone Number" htmlFor="phone" hint="Optional" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            className={fieldClass}
            value={values.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            autoComplete="tel"
          />
        </FormField>

        <FormField label="Company / Organization" htmlFor="company" hint="Optional" error={errors.company}>
          <input id="company" className={fieldClass} value={values.company} onChange={(event) => handleChange("company", event.target.value)} autoComplete="organization" />
        </FormField>
      </div>

      <FormField label="Inquiry Type" htmlFor="inquiryType" required error={errors.inquiryType}>
        <select
          id="inquiryType"
          className={fieldClass}
          value={inquiryType}
          onChange={(event) => onInquiryTypeChange(event.target.value as InquiryType)}
        >
          {INQUIRY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </FormField>

      <AnimatePresence mode="wait" initial={false}>
        {showProjectFields && <ProjectFields key="project" values={values} errors={errors} onChange={handleChange} />}
        {showSupportFields && <SupportFields key="support" values={values} errors={errors} onChange={handleChange} />}
        {showCareerFields && <CareerFields key="career" values={values} errors={errors} onChange={handleChange} resumeFile={resume} onResumeChange={setResume} />}
        {showInternshipFields && <InternshipFields key="internship" values={values} errors={errors} onChange={handleChange} resumeFile={resume} onResumeChange={setResume} />}
      </AnimatePresence>

      <FormField label="Subject" htmlFor="subject" required error={errors.subject}>
        <input
          id="subject"
          className={fieldClass}
          value={values.subject}
          onChange={(event) => handleChange("subject", event.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
      </FormField>

      <FormField
        label="Message"
        htmlFor="message"
        required
        error={errors.message}
        hint={`${values.message.length}/${MESSAGE_MAX_LENGTH} characters`}
      >
        <textarea
          id="message"
          rows={5}
          maxLength={MESSAGE_MAX_LENGTH}
          className={fieldClass}
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
        />
      </FormField>

      <FormField label="Preferred Contact Method" htmlFor="preferredContact" error={errors.preferredContact}>
        <div role="radiogroup" aria-label="Preferred Contact Method" className="flex flex-wrap gap-2">
          {PREFERRED_CONTACT_METHODS.map((method) => {
            const isSelected = values.preferredContact === method;
            return (
              <button
                key={method}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleChange("preferredContact", method)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  isSelected
                    ? "border-transparent bg-gradient-to-r from-brand to-accent text-white shadow-md shadow-brand/25"
                    : "border-slate-300 bg-white text-slate-600 hover:border-brand hover:text-brand"
                }`}
              >
                {method}
              </button>
            );
          })}
        </div>
      </FormField>

      <FileUpload
        label="Attachment"
        id="attachment"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
        hint="PDF, DOCX, images, or ZIP — up to 10 MB"
        file={attachment}
        onChange={setAttachment}
      />

      <label htmlFor="consent" className="flex items-start gap-3 text-sm text-slate-600">
        <input
          id="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(event) => handleChange("consent", event.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand focus:ring-brand"
        />
        I agree to be contacted regarding my inquiry.
      </label>
      {errors.consent && <p id="consent-error" role="alert" className="-mt-3 text-xs font-medium text-red-500">{errors.consent}</p>}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={status === "submitting" ? undefined : { scale: 1.02 }}
        whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-deep px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/35 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </motion.button>

      <div aria-live="polite" className="min-h-6">
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-center gap-2 text-sm font-medium text-emerald-600"
            >
              <CheckCircle2 size={16} aria-hidden="true" />
              {feedback}
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-center gap-2 text-sm font-medium text-red-500"
            >
              <AlertCircle size={16} aria-hidden="true" />
              {feedback}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
