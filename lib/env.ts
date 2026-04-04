import * as z from 'zod'

/**
 * Validate all required environment variables at startup.
 * Fails fast with a clear message if any are missing.
 *
 * SECURITY: SUPABASE_SERVICE_ROLE_KEY is server-only and must never
 * appear in NEXT_PUBLIC_* or the `env` block of next.config.ts.
 */

const envSchema = z.object({
  SUPABASE_URL: z.string().url({ message: 'SUPABASE_URL must be a valid URL' }),
  SUPABASE_ANON_KEY: z.string().min(1, { message: 'SUPABASE_ANON_KEY is required' }),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, { message: 'SUPABASE_SERVICE_ROLE_KEY is required' }),
})

function validateEnv() {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n')
    throw new Error(`Missing or invalid environment variables:\n${formatted}`)
  }

  return result.data
}

export const env = validateEnv()
