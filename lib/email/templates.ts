import { INQUIRY_TYPES } from "@/components/contact/form-options";
import type { ContactSubmission, ContactSubmissionMeta } from "@/types/contact";
import { escapeHtml, sanitizeHeaderValue, textToHtmlParagraphs } from "@/lib/security/sanitize";

const BRAND = {
  name: "DA Software Systems",
  tagline: "One Step Ahead...",
  primary: "#1173b7",
  primaryDeep: "#07578f",
  ink: "#12233b",
  mist: "#f4f8fc",
};

function inquiryLabel(inquiryType: string): string {
  return INQUIRY_TYPES.find((type) => type.value === inquiryType)?.label ?? inquiryType;
}

function renderShell(bodyHtml: string, preheader: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${BRAND.name}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND.mist};font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none;font-size:1px;color:${BRAND.mist};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.mist};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,${BRAND.primary},${BRAND.primaryDeep});padding:28px 32px;">
                <span style="color:#ffffff;font-size:20px;font-weight:bold;">${BRAND.name}</span>
                <div style="color:#dbeeff;font-size:12px;margin-top:4px;letter-spacing:0.04em;">${BRAND.tagline}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">${bodyHtml}</td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:${BRAND.mist};color:#64748b;font-size:12px;text-align:center;">
                ${BRAND.name} · Pune, Maharashtra, India
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 0;color:#64748b;font-size:13px;font-weight:600;width:170px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:${BRAND.ink};font-size:14px;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

export function buildCompanyNotificationEmail(
  data: ContactSubmission,
  meta: ContactSubmissionMeta,
): { subject: string; html: string; text: string } {
  const label = inquiryLabel(data.inquiryType);
  const subject = sanitizeHeaderValue(`New Website Inquiry - ${label}`);

  const rows = [
    fieldRow("Full Name", data.name),
    fieldRow("Email", data.email),
    fieldRow("Phone", data.phone),
    fieldRow("Company", data.company),
    fieldRow("Inquiry Type", label),
    fieldRow("Subject", data.subject),
    fieldRow("Preferred Contact Method", data.preferredContact),
    fieldRow("Budget", data.budget),
    fieldRow("Timeline", data.timeline),
    fieldRow("Submission Date", meta.submittedAt),
    fieldRow("User Agent", meta.userAgent ?? ""),
  ].join("");

  const body = `
    <h1 style="margin:0 0 4px;color:${BRAND.ink};font-size:20px;">New website inquiry</h1>
    <p style="margin:0 0 20px;color:#64748b;font-size:14px;">A visitor submitted the contact form.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
    <div style="margin-top:20px;padding:16px;background-color:${BRAND.mist};border-radius:10px;">
      <p style="margin:0 0 6px;color:#64748b;font-size:13px;font-weight:600;">Message</p>
      <p style="margin:0;color:${BRAND.ink};font-size:14px;line-height:1.6;">${textToHtmlParagraphs(data.message)}</p>
    </div>
  `;

  const text = [
    `New website inquiry - ${label}`,
    "",
    `Full Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.company && `Company: ${data.company}`,
    `Inquiry Type: ${label}`,
    `Subject: ${data.subject}`,
    data.preferredContact && `Preferred Contact Method: ${data.preferredContact}`,
    data.budget && `Budget: ${data.budget}`,
    data.timeline && `Timeline: ${data.timeline}`,
    `Submission Date: ${meta.submittedAt}`,
    meta.userAgent && `User Agent: ${meta.userAgent}`,
    "",
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html: renderShell(body, `New ${label} inquiry from ${data.name}`), text };
}

export function buildAutoReplyEmail(name: string): { subject: string; html: string; text: string } {
  const subject = "Thank You for Contacting DA Software Systems";
  const safeName = escapeHtml(name);

  const body = `
    <h1 style="margin:0 0 16px;color:${BRAND.ink};font-size:20px;">Hello ${safeName},</h1>
    <p style="margin:0 0 14px;color:${BRAND.ink};font-size:14px;line-height:1.7;">Thank you for contacting DA Software Systems. We have successfully received your inquiry.</p>
    <p style="margin:0 0 14px;color:${BRAND.ink};font-size:14px;line-height:1.7;">Our team will review your request carefully and respond within one business day.</p>
    <p style="margin:0 0 20px;color:${BRAND.ink};font-size:14px;line-height:1.7;">If your inquiry is related to a project, internship, partnership, or AI consultation, the appropriate team member will contact you shortly.</p>
    <p style="margin:0 0 4px;color:${BRAND.ink};font-size:14px;line-height:1.7;">Thank you for choosing DA Software Systems.</p>
    <p style="margin:0 0 20px;color:${BRAND.primary};font-size:14px;font-weight:600;">${BRAND.tagline}</p>
    <p style="margin:0;color:${BRAND.ink};font-size:14px;line-height:1.7;">Regards,<br />${BRAND.name}</p>
  `;

  const text = [
    `Hello ${name},`,
    "",
    "Thank you for contacting DA Software Systems.",
    "",
    "We have successfully received your inquiry.",
    "",
    "Our team will review your request carefully and respond within one business day.",
    "",
    "If your inquiry is related to a project, internship, partnership, or AI consultation, the appropriate team member will contact you shortly.",
    "",
    "Thank you for choosing DA Software Systems.",
    "",
    BRAND.tagline,
    "",
    "Regards,",
    BRAND.name,
  ].join("\n");

  return { subject, html: renderShell(body, "We've received your inquiry — thank you for reaching out."), text };
}
