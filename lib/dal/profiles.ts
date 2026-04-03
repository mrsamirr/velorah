import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth } from '@/lib/dal/auth'
import type { Json } from '@/lib/types/database'

/**
 * Data Access Layer — Profiles
 *
 * All profile CRUD goes through here.
 * SECURITY: Never returns raw DB rows — always maps to DTOs.
 */

export type ProfileDTO = {
  id: string
  display_name: string
  username: string
  bio: string | null
  avatar_url: string | null
  cover_image_url: string | null
  website_url: string | null
  location: string | null
  social_links: Json
  role: string
  is_verified: boolean
  follower_count: number
  following_count: number
  article_count: number
  created_at: string
}

export type ProfileStats = {
  total_articles: number
  published_articles: number
  total_likes: number
  total_views: number
}

const PROFILE_SELECT = `
  id, display_name, username, bio, avatar_url, cover_image_url,
  website_url, location, social_links, role, is_verified,
  follower_count, following_count, article_count, created_at
`

/**
 * Get a user's public profile by ID.
 */
export async function getProfileById(userId: string): Promise<ProfileDTO | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select(PROFILE_SELECT)
    .eq('id', userId)
    .single()

  if (error || !data) return null
  return data as ProfileDTO
}

/**
 * Get a user's public profile by username.
 */
export async function getProfileByUsername(username: string): Promise<ProfileDTO | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select(PROFILE_SELECT)
    .eq('username', username)
    .single()

  if (error || !data) return null
  return data as ProfileDTO
}

/**
 * Check if a username is available.
 */
export async function isUsernameAvailable(username: string, excludeUserId?: string): Promise<boolean> {
  const supabase = await createClient()

  let query = supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('username', username)

  if (excludeUserId) {
    query = query.neq('id', excludeUserId)
  }

  const { count } = await query
  return count === 0
}

/**
 * Get the current user's own profile.
 */
export async function getMyProfile(): Promise<ProfileDTO | null> {
  const user = await requireAuth()
  return getProfileById(user.id)
}

/**
 * Update the current user's profile.
 */
export async function updateProfile(
  updates: {
    display_name?: string
    username?: string
    bio?: string
    avatar_url?: string
    cover_image_url?: string
    website_url?: string
    location?: string
    social_links?: Record<string, string>
    email_notifications?: boolean
  }
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  // If username is being changed, verify uniqueness
  if (updates.username) {
    const available = await isUsernameAvailable(updates.username, user.id)
    if (!available) {
      return { success: false, error: 'Username is already taken' }
    }
  }

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
 * Uses admin client to bypass RLS (needed during signup).
 */
export async function createProfile(
  userId: string,
  email: string,
  displayName: string,
  username: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createAdminClient()

  const { error } = await supabase.from('profiles').insert({
    id: userId,
    email,
    display_name: displayName,
    username,
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
    (sum: number, a: { like_count: number }) => sum + (a.like_count || 0),
    0
  )
  const totalViews = (viewsResult.data || []).reduce(
    (sum: number, a: { view_count: number }) => sum + (a.view_count || 0),
    0
  )

  return {
    total_articles: articlesResult.count || 0,
    published_articles: publishedResult.count || 0,
    total_likes: totalLikes,
    total_views: totalViews,
  }
}