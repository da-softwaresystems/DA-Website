type RateLimitEntry = { count: number; resetAt: number };

/**
 * In-memory, per-instance fixed-window rate limiter. No external store is
 * required, which fits the "no database" constraint, but the counters only
 * live as long as the current server process — they reset on a cold start
 * and aren't shared across multiple instances behind a load balancer. That's
 * an acceptable trade-off for a contact form; if abuse becomes a real
 * problem, swap this module for Upstash Redis or Vercel KV without touching
 * the API route (it only calls `checkRateLimit`).
 */
const hits = new Map<string, RateLimitEntry>();

const MAX_TRACKED_KEYS = 5000;

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export function checkRateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): RateLimitResult {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    if (hits.size >= MAX_TRACKED_KEYS) hits.clear();
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true };
}

export function getClientIdentifier(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
