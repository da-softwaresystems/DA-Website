import nodemailer, { type Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable "${name}". Set it in .env.local — see .env.local.example.`);
  }
  return value;
}

/**
 * Lazily creates and caches a single Nodemailer transporter for the
 * lifetime of the server process, authenticated with a Gmail App Password
 * (never the account's real password).
 */
export function getGmailTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: requireEnv("GMAIL_EMAIL"),
      pass: requireEnv("GMAIL_APP_PASSWORD"),
    },
  });

  return cachedTransporter;
}
