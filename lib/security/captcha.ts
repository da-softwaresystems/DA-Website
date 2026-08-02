/**
 * Extension point for Cloudflare Turnstile or Google reCAPTCHA. Today this is
 * a no-op so the contact form works without a captcha provider configured.
 * To turn it on later: implement the verification call against the
 * provider's API (reading a `TURNSTILE_SECRET_KEY` / `RECAPTCHA_SECRET_KEY`
 * env var), then call `verifyCaptcha(token)` from the API route before
 * processing the submission — no other file needs to change.
 */
export async function verifyCaptcha(token: string | null): Promise<boolean> {
  void token;
  return true;
}
