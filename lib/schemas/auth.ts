import * as z from 'zod'

/**
 * Auth validation schemas.
 * Used by Server Actions to validate input BEFORE touching the database.
 */

export const SignUpSchema = z.object({
  displayName: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters.' })
    .max(50, { error: 'Name must be under 50 characters.' })
    .trim(),
  email: z
    .string()
    .email({ error: 'Please enter a valid email address.' })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { error: 'Password must be at least 8 characters.' })
    .regex(/[a-zA-Z]/, { error: 'Password must contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Password must contain at least one special character.',
    }),
})

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ error: 'Please enter a valid email address.' })
    .trim()
    .toLowerCase(),
  password: z.string().min(1, { error: 'Password is required.' }),
})

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ error: 'Please enter a valid email address.' })
    .trim()
    .toLowerCase(),
})

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: 'Password must be at least 8 characters.' })
      .regex(/[a-zA-Z]/, { error: 'Password must contain at least one letter.' })
      .regex(/[0-9]/, { error: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        error: 'Password must contain at least one special character.',
      }),
    confirmPassword: z.string().min(1, { error: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type ForgotPasswordFormState =
  | {
      errors?: { email?: string[] }
      message?: string
      success?: boolean
    }
  | undefined

export type ResetPasswordFormState =
  | {
      errors?: {
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
    }
  | undefined

export type SignUpFormState =
  | {
      errors?: {
        displayName?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SignInFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
