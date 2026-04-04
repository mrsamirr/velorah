import 'server-only'

/**
 * Server-only structured logger.
 *
 * - Dev: human-readable console output
 * - Prod: structured JSON for log aggregation
 *
 * SECURITY: Never log passwords, tokens, session cookies, or PII.
 */

type LogLevel = 'info' | 'warn' | 'error'

type LogPayload = {
  message: string
  context?: string
  [key: string]: unknown
}

const SENSITIVE_KEYS = new Set([
  'password', 'token', 'secret', 'authorization', 'cookie',
  'session', 'key', 'credential', 'api_key', 'apikey',
  'access_token', 'refresh_token', 'service_role',
])

function redactSensitive(obj: Record<string, unknown>): Record<string, unknown> {
  const redacted: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      redacted[key] = '[REDACTED]'
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      redacted[key] = redactSensitive(value as Record<string, unknown>)
    } else {
      redacted[key] = value
    }
  }
  return redacted
}

function emit(level: LogLevel, payload: LogPayload) {
  const { message, context, ...extra } = payload
  const safeExtra = redactSensitive(extra)

  if (process.env.NODE_ENV === 'production') {
    const entry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      ...safeExtra,
    }
    const line = JSON.stringify(entry)
    if (level === 'error') {
      console.error(line)
    } else if (level === 'warn') {
      console.warn(line)
    } else {
      console.log(line)
    }
  } else {
    const prefix = context ? `[${context}]` : ''
    const extraStr = Object.keys(safeExtra).length > 0 ? ` ${JSON.stringify(safeExtra)}` : ''
    const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
    fn(`${level.toUpperCase()} ${prefix} ${message}${extraStr}`)
  }
}

export const log = {
  info(message: string, extra: Omit<LogPayload, 'message'> = {}) {
    emit('info', { message, ...extra })
  },
  warn(message: string, extra: Omit<LogPayload, 'message'> = {}) {
    emit('warn', { message, ...extra })
  },
  error(message: string, extra: Omit<LogPayload, 'message'> & { error?: unknown } = {}) {
    const { error: err, ...rest } = extra
    const errorInfo: Record<string, unknown> = { ...rest }
    if (err instanceof Error) {
      errorInfo.errorName = err.name
      errorInfo.errorMessage = err.message
      if (process.env.NODE_ENV !== 'production') {
        errorInfo.stack = err.stack
      }
    }
    emit('error', { message, ...errorInfo })
  },
}
