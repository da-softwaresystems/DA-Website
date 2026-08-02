import { z } from "zod";
import { INQUIRY_TYPES, MESSAGE_MAX_LENGTH } from "@/components/contact/form-options";

const INQUIRY_TYPE_VALUES = INQUIRY_TYPES.map((type) => type.value) as [string, ...string[]];
const PHONE_PATTERN = /^[+]?[\d\s-]{7,15}$/;

function optionalTrimmed(max: number) {
  return z.string().trim().max(max).optional().default("");
}

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120, "Name is too long."),
  email: z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .default("")
    .refine((value) => value === "" || PHONE_PATTERN.test(value), "Please enter a valid phone number."),
  company: optionalTrimmed(150),
  inquiryType: z.enum(INQUIRY_TYPE_VALUES, { message: "Please select a valid inquiry type." }),
  subject: z.string().trim().min(1, "Please add a subject.").max(150, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(MESSAGE_MAX_LENGTH, `Message must be under ${MESSAGE_MAX_LENGTH} characters.`),
  preferredContact: optionalTrimmed(40),
  budget: optionalTrimmed(60),
  timeline: optionalTrimmed(60),
  consent: z.string().refine((value) => value === "true", "Please confirm you're okay being contacted."),
});

export type ContactSubmission = z.infer<typeof contactFormSchema>;

export type ContactValidationErrors = Partial<Record<keyof ContactSubmission, string>>;

export type ContactParseResult =
  | { success: true; data: ContactSubmission }
  | { success: false; errors: ContactValidationErrors };

export function parseContactFormData(formData: FormData): ContactParseResult {
  const raw = {
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    company: formData.get("company") ?? "",
    inquiryType: formData.get("inquiryType") ?? "",
    subject: formData.get("subject") ?? "",
    message: formData.get("message") ?? "",
    preferredContact: formData.get("preferredContact") ?? "",
    budget: formData.get("budget") ?? "",
    timeline: formData.get("timeline") ?? "",
    consent: formData.get("consent") ?? "",
  };

  const result = contactFormSchema.safeParse(raw);
  if (result.success) return { success: true, data: result.data };

  const errors: ContactValidationErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ContactSubmission;
    if (!errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors };
}

export const ALLOWED_ATTACHMENT_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"] as const;
export const ALLOWED_ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
] as const;
export const MAX_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024;

export type AttachmentValidationResult = { valid: true; file: File | null } | { valid: false; error: string };

export function validateAttachment(file: File | null): AttachmentValidationResult {
  if (!file || file.size === 0) return { valid: true, file: null };

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const hasAllowedExtension = (ALLOWED_ATTACHMENT_EXTENSIONS as readonly string[]).includes(extension);
  const hasAllowedType = (ALLOWED_ATTACHMENT_MIME_TYPES as readonly string[]).includes(file.type);

  if (!hasAllowedExtension && !hasAllowedType) {
    return { valid: false, error: "Attachment must be a PDF, DOC, DOCX, JPG, JPEG, or PNG file." };
  }
  if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
    return { valid: false, error: "Attachment must be 5 MB or smaller." };
  }
  return { valid: true, file };
}
