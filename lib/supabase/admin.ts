import 'server-only'

import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase admin client using the service role key.
 *
 * ⚠️  SECURITY: This client BYPASSES Row Level Security.
 * Only use in server-side code where you explicitly need admin access
 * (e.g., creating profiles on signup, admin operations).
 *
 * NEVER expose this client to client components.
 */
export async function createAdminClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
