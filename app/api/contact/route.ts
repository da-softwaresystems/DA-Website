import { NextResponse } from "next/server";
import { parseContactFormData, validateAttachment } from "@/lib/validation/contact.schema";
import { checkRateLimit, getClientIdentifier } from "@/lib/security/rate-limit";
import { verifyCaptcha } from "@/lib/security/captcha";
import { sendAutoReply, sendContactNotification } from "@/lib/email/service";
import type { ContactApiResponse, EmailAttachment } from "@/types/contact";

export const runtime = "nodejs";

const ALLOWED_ORIGIN = process.env.SITE_URL ?? "*";

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, { status, headers: corsHeaders() });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: Request) {
  const clientId = getClientIdentifier(request.headers);
  const rateLimit = checkRateLimit(clientId, 5, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return json(
      { ok: false, message: `Too many requests. Please try again in ${rateLimit.retryAfterSeconds} seconds.` },
      429,
    );
  }

  // Extension point for Cloudflare Turnstile / reCAPTCHA — currently a no-op.
  const captchaOk = await verifyCaptcha(null);
  if (!captchaOk) {
    return json({ ok: false, message: "Captcha verification failed. Please try again." }, 400);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, message: "Invalid form submission." }, 400);
  }

  const parsed = parseContactFormData(formData);
  if (!parsed.success) {
    return json({ ok: false, message: "Please fix the highlighted fields and try again.", errors: parsed.errors }, 400);
  }

  const attachmentField = formData.get("attachment");
  const rawAttachment = attachmentField instanceof File ? attachmentField : null;
  const attachmentCheck = validateAttachment(rawAttachment);
  if (!attachmentCheck.valid) {
    return json({ ok: false, message: attachmentCheck.error, errors: { message: attachmentCheck.error } }, 400);
  }

  const attachments: EmailAttachment[] = [];
  if (attachmentCheck.file) {
    const buffer = Buffer.from(await attachmentCheck.file.arrayBuffer());
    attachments.push({
      filename: attachmentCheck.file.name,
      content: buffer,
      contentType: attachmentCheck.file.type || "application/octet-stream",
    });
  }

  const meta = {
    submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }),
    userAgent: request.headers.get("user-agent"),
  };

  try {
    await sendContactNotification(parsed.data, meta, attachments);
  } catch (error) {
    console.error("[contact-api] Failed to send notification email:", error);
    return json({ ok: false, message: "We couldn't send your message right now. Please try again shortly." }, 500);
  }

  try {
    await sendAutoReply(parsed.data);
  } catch (error) {
    // The inquiry was already delivered to the business inbox — a failed
    // auto-reply shouldn't fail the whole request from the visitor's view.
    console.error("[contact-api] Failed to send auto-reply email:", error);
  }

  return json({ ok: true, message: "Your message has been sent. We'll be in touch within one business day." }, 200);
}
