import type { ContactSubmission, ContactValidationErrors } from "@/lib/validation/contact.schema";

export type { ContactSubmission, ContactValidationErrors };

export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

/**
 * Abstraction every email provider (Gmail/Nodemailer, Resend, SendGrid, Firebase
 * Extensions, ...) implements. Swapping providers means writing a new class
 * against this interface and changing one line in lib/email/service.ts —
 * nothing in the API route or frontend needs to change.
 */
export interface EmailProvider {
  send(message: EmailMessage): Promise<void>;
}

export type ContactSubmissionMeta = {
  submittedAt: string;
  userAgent: string | null;
};

export type ContactApiResponse =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: ContactValidationErrors };
