import 'server-only'

import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { UserRole } from '@/lib/types/database'

/**
 * Data Access Layer — Auth
 *
 * Cached, server-only functions for reading the current user's auth state.
 * Uses React's cache() to deduplicate calls within a single request.
 *
 * SECURITY:
 * - Always uses getUser() (validates JWT with Supabase Auth server)
 * - Never uses getSession() (reads from storage without validation)
 * - Returns minimal DTOs — never the full user object
 */

export type AuthUser = {
  id: string
  email: string
}

export type AuthUserWithRole = AuthUser & {
  role: string
}

/**
 * Gets the current authenticated user.
 * Returns null if not authenticated.
 * Cached per-request so it can be called from multiple components cheaply.
 */
export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  // Return a minimal DTO — never the full Supabase user object
  return {
    id: user.id,
    email: user.email!,
  }
})

/**
 * Gets the current user or throws — use in protected server actions.
 * Avoids repeating null checks across every action.
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

/**
 * Gets the current authenticated user with their profile role.
 * Cached per-request to avoid redundant DB queries when requireRole
 * is called from multiple server components or actions in the same request.
 */
export const getCurrentUserWithRole = cache(async (): Promise<AuthUserWithRole | null> => {
  const user = await getCurrentUser()
  if (!user) return null

  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile) return null

  return { ...user, role: profile.role as string }
})

/**
 * Require the current user to have a specific role.
 * Throws if not authenticated or role doesn't match.
 */
export async function requireRole(...roles: UserRole[]): Promise<AuthUser> {
  const userWithRole = await getCurrentUserWithRole()

  if (!userWithRole) {
    throw new Error('Unauthorized')
  }

  if (!roles.includes(userWithRole.role as UserRole)) {
    throw new Error('Forbidden')
  }

  return { id: userWithRole.id, email: userWithRole.email }
}
