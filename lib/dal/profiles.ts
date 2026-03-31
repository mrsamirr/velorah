import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth, type AuthUser } from '@/lib/dal/auth'

/**
 * Data Access Layer — Profiles
 *
 * All profile CRUD goes through here.
 * Each function performs its own auth/authorization checks.
 *
 * SECURITY:
 * - Never returns raw DB rows to client — always maps to DTOs
 * - Checks ownership on mutations (IDOR prevention)
 * - Uses parameterized queries (Supabase SDK handles SQL injection)
 */

export type ProfileDTO = {
  id: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  role: string
  created_at: string
}

export type ProfileStats = {
  total_articles: number
  published_articles: number
  total_likes: number
  total_views: number
}

/**
 * Get a user's public profile by ID.
 * No auth required — public data.
 */
export async function getProfileById(userId: string): Promise<ProfileDTO | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, bio, avatar_url, role, created_at')
    .eq('id', userId)
    .single()

  if (error || !data) return null

  return data as ProfileDTO
}

/**
 * Get the current user's own profile.
 * Requires authentication.
 */
export async function getMyProfile(): Promise<ProfileDTO | null> {
  const user = await requireAuth()
  return getProfileById(user.id)
}

/**
 * Update the current user's profile.
 * Only allows updating own profile (authorization via RLS + code check).
 */
export async function updateProfile(
  updates: { display_name?: string; bio?: string; avatar_url?: string }
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) {
    console.error('Profile update failed:', error.message)
    return { success: false, error: 'Failed to update profile' }
  }

  return { success: true }
}

/**
 * Create a profile for a new user.
 * Uses admin client to bypass RLS (needed during signup flow).
 */
export async function createProfile(
  userId: string,
  email: string,
  displayName: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createAdminClient()

  const { error } = await supabase.from('profiles').insert({
    id: userId,
    email,
    display_name: displayName,
    role: 'author',
    bio: null,
    avatar_url: null,
  })

  if (error) {
    console.error('Profile creation failed:', error.message)
    return { success: false, error: 'Failed to create profile' }
  }

  return { success: true }
}

/**
 * Get profile stats for the current user.
 * Calls separate count queries to avoid leaking data.
 */
export async function getMyProfileStats(): Promise<ProfileStats> {
  const user = await requireAuth()
  const supabase = await createClient()

  const [articlesResult, publishedResult, likesResult, viewsResult] =
    await Promise.all([
      supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', user.id),
      supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', user.id)
        .eq('status', 'published'),
      supabase
        .from('articles')
        .select('like_count')
        .eq('author_id', user.id),
      supabase
        .from('articles')
        .select('view_count')
        .eq('author_id', user.id),
    ])

  const totalLikes = (likesResult.data || []).reduce(
    (sum, a) => sum + (a.like_count || 0),
    0
  )
  const totalViews = (viewsResult.data || []).reduce(
    (sum, a) => sum + (a.view_count || 0),
    0
  )

  return {
    total_articles: articlesResult.count || 0,
    published_articles: publishedResult.count || 0,
    total_likes: totalLikes,
    total_views: totalViews,
  }
}
