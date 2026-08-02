import { getGmailTransporter } from "@/lib/email/transporter";
import { buildAutoReplyEmail, buildCompanyNotificationEmail } from "@/lib/email/templates";
import { sanitizeHeaderValue } from "@/lib/security/sanitize";
import type { ContactSubmission, ContactSubmissionMeta, EmailAttachment, EmailMessage, EmailProvider } from "@/types/contact";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable "${name}". Set it in .env.local — see .env.local.example.`);
  }
  return value;
}

/**
 * Concrete EmailProvider backed by Nodemailer + a Gmail App Password. This is
 * the only class that knows about Nodemailer — everything else in the app
 * talks to the `EmailProvider` interface. Adding Resend or SendGrid later
 * means writing a sibling class here and switching the export below.
 */
class NodemailerGmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<void> {
    const transporter = getGmailTransporter();
    const fromAddress = requireEnv("GMAIL_EMAIL");

    await transporter.sendMail({
      from: `"DA Software Systems" <${fromAddress}>`,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
      attachments: message.attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });
  }
}

export const emailProvider: EmailProvider = new NodemailerGmailProvider();

function getBusinessInbox(): string {
  return process.env.CONTACT_TO_EMAIL || requireEnv("GMAIL_EMAIL");
}

export async function sendContactNotification(
  data: ContactSubmission,
  meta: ContactSubmissionMeta,
  attachments: EmailAttachment[] = [],
): Promise<void> {
  const { subject, html, text } = buildCompanyNotificationEmail(data, meta);

  await emailProvider.send({
    to: getBusinessInbox(),
    subject,
    html,
    text,
    replyTo: sanitizeHeaderValue(data.email),
    attachments,
  });
}

export async function sendAutoReply(data: ContactSubmission): Promise<void> {
  const { subject, html, text } = buildAutoReplyEmail(data.name);

  await emailProvider.send({
    to: data.email,
    subject,
    html,
    text,
  });
}
