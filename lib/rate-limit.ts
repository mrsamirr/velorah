import 'server-only'

/**
 * Simple in-memory rate limiter.
 *
 * For production, replace with Redis-backed rate limiting (e.g., @upstash/ratelimit).
 * This in-memory version works for single-instance deployments.
 *
 * SECURITY:
 * - Prevents brute-force login attempts
 * - Limits expensive operations (article creation, profile updates)
 * - Uses IP-based tracking (via x-forwarded-for header)
 */

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

type RateLimitConfig = {
  /** Maximum number of requests allowed in the window */
  limit: number
  /** Time window in seconds */
  windowSeconds: number
}

const DEFAULT_CONFIG: RateLimitConfig = {
  limit: 10,
  windowSeconds: 60,
}

/**
 * Check if a request should be rate limited.
 *
 * @param identifier - Unique key (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Object with rateLimited boolean and remaining count
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): { rateLimited: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const windowMs = config.windowSeconds * 1000
  const entry = rateLimitMap.get(identifier)

  // Clean up expired entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return {
      rateLimited: false,
      remaining: config.limit - 1,
      resetIn: config.windowSeconds,
    }
  }

  entry.count++

  if (entry.count > config.limit) {
    return {
      rateLimited: true,
      remaining: 0,
      resetIn: Math.ceil((entry.resetTime - now) / 1000),
    }
  }

  return {
    rateLimited: false,
    remaining: config.limit - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  }
}

/**
 * Preset rate limit configs for common operations.
 */
export const RATE_LIMITS = {
  /** Auth operations: 5 attempts per minute */
  auth: { limit: 5, windowSeconds: 60 } as RateLimitConfig,
  /** Article creation: 10 per hour */
  createArticle: { limit: 10, windowSeconds: 3600 } as RateLimitConfig,
  /** API reads: 60 per minute */
  apiRead: { limit: 60, windowSeconds: 60 } as RateLimitConfig,
} as const
