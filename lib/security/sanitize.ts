const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes text before interpolating it into an HTML email template. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/**
 * Strips CR/LF from a value before it's used in an email header (Subject,
 * From, Reply-To). Without this, a message containing "\r\nBcc: attacker@x"
 * could inject extra headers into the outgoing email (header injection).
 */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Converts a plain-text value into safe, line-broken HTML for email bodies. */
export function textToHtmlParagraphs(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}
