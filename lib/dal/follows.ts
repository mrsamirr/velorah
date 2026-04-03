import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'
import type { ProfileDTO } from '@/lib/dal/profiles'

/**
 * Follow a user.
 */
export async function followUser(
  followingId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  if (user.id === followingId) {
    return { success: false, error: 'Cannot follow yourself' }
  }

  const { error } = await supabase
    .from('follows')
    .insert({ follower_id: user.id, following_id: followingId })

  if (error) {
    if (error.code === '23505') return { success: false, error: 'Already following' }
    console.error('Follow failed:', error.message)
    return { success: false, error: 'Failed to follow' }
  }

  supabase.rpc('update_follower_counts', {
    p_follower_id: user.id,
    p_following_id: followingId,
    delta: 1,
  }).then()

  // Notify the followed user
  supabase.rpc('create_notification', {
    p_recipient_id: followingId,
    p_actor_id: user.id,
    p_type: 'follow',
    p_entity_type: 'profile',
    p_entity_id: user.id,
    p_message: 'started following you',
  }).then()

  return { success: true }
}

/**
 * Unfollow a user.
 */
export async function unfollowUser(
  followingId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', user.id)
    .eq('following_id', followingId)

  if (error) {
    console.error('Unfollow failed:', error.message)
    return { success: false, error: 'Failed to unfollow' }
  }

  supabase.rpc('update_follower_counts', {
    p_follower_id: user.id,
    p_following_id: followingId,
    delta: -1,
  }).then()

  return { success: true }
}

/**
 * Check if the current user is following a user.
 */
export async function isFollowing(followingId: string): Promise<boolean> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { count } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', user.id)
    .eq('following_id', followingId)

  return (count || 0) > 0
}

const PROFILE_SELECT = `id, display_name, username, bio, avatar_url, cover_image_url,
  website_url, location, social_links, role, is_verified,
  follower_count, following_count, article_count, created_at`

/**
 * Get followers of a user.
 */
export async function getFollowers(
  userId: string,
  options: { limit?: number; offset?: number } = {}
): Promise<ProfileDTO[]> {
  const { limit = 20, offset = 0 } = options
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('follows')
    .select(`follower_id, profiles!follows_follower_id_fkey(${PROFILE_SELECT})`)
    .eq('following_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error || !data) return []

  return data
    .map((row: Record<string, unknown>) => row.profiles as ProfileDTO | null)
    .filter((p): p is ProfileDTO => p !== null)
}

/**
 * Get users that a user is following.
 */
export async function getFollowing(
  userId: string,
  options: { limit?: number; offset?: number } = {}
): Promise<ProfileDTO[]> {
  const { limit = 20, offset = 0 } = options
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('follows')
    .select(`following_id, profiles!follows_following_id_fkey(${PROFILE_SELECT})`)
    .eq('follower_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error || !data) return []

  return data
    .map((row: Record<string, unknown>) => row.profiles as ProfileDTO | null)
    .filter((p): p is ProfileDTO => p !== null)
}
