/**
 * Centralized error handling utilities.
 *
 * SECURITY:
 * - Never expose internal error details to clients
 * - Log full errors server-side for debugging
 * - Return generic messages to users
 */

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(message, 404)
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400)
  }
}

export class RateLimitError extends AppError {
  public readonly retryAfter: number

  constructor(retryAfter: number, message = 'Too many requests') {
    super(message, 429)
    this.retryAfter = retryAfter
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409)
  }
}

/**
 * Safely extract a user-facing message from any error.
 * Never exposes stack traces or internal details.
 */
export function getClientErrorMessage(error: unknown): string {
  if (error instanceof AppError && error.isOperational) {
    return error.message
  }
  return 'An unexpected error occurred. Please try again.'
}

/**
 * Log an error server-side with context.
 * In production, this would integrate with your error tracking service.
 */
export function logError(error: unknown, context?: string): void {
  const prefix = context ? `[${context}]` : '[Error]'

  if (error instanceof Error) {
    console.error(`${prefix} ${error.message}`, {
      stack: error.stack,
      name: error.name,
    })
  } else {
    console.error(`${prefix} Unknown error:`, error)
  }
}
