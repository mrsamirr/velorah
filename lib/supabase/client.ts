import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for Client Components.
 * Uses the NEXT_PUBLIC_ prefixed env vars so they're available in the browser.
 *
 * Note: We use SUPABASE_URL and SUPABASE_ANON_KEY as env var names since
 * the browser client needs them inlined — we expose them via NEXT_PUBLIC_ aliases
 * in next.config.ts.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
