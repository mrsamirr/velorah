import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/dal/auth'
import type { NotificationType, EntityType } from '@/lib/types/database'

export type NotificationDTO = {
  id: string
  recipient_id: string
  actor_id: string | null
  actor_name: string | null
  actor_avatar: string | null
  actor_username: string | null
  type: NotificationType
  entity_type: EntityType | null
  entity_id: string | null
  message: string | null
  is_read: boolean
  created_at: string
}

const NOTIFICATION_SELECT = `
  id, recipient_id, actor_id, type, entity_type, entity_id,
  message, is_read, created_at,
  profiles!notifications_actor_id_fkey(display_name, avatar_url, username)
`

function mapNotificationRow(row: Record<string, unknown>): NotificationDTO {
  const actor = row.profiles as { display_name: string; avatar_url: string | null; username: string } | null
  return {
    id: row.id as string,
    recipient_id: row.recipient_id as string,
    actor_id: row.actor_id as string | null,
    actor_name: actor?.display_name || null,
    actor_avatar: actor?.avatar_url || null,
    actor_username: actor?.username || null,
    type: row.type as NotificationType,
    entity_type: row.entity_type as EntityType | null,
    entity_id: row.entity_id as string | null,
    message: row.message as string | null,
    is_read: row.is_read as boolean,
    created_at: row.created_at as string,
  }
}

/**
 * Get notifications for the current user.
 */
export async function getMyNotifications(
  options: { limit?: number; offset?: number; unreadOnly?: boolean } = {}
): Promise<NotificationDTO[]> {
  const { limit = 30, offset = 0, unreadOnly = false } = options
  const user = await requireAuth()
  const supabase = await createClient()

  let query = supabase
    .from('notifications')
    .select(NOTIFICATION_SELECT)
    .eq('recipient_id', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (unreadOnly) query = query.eq('is_read', false)

  const { data, error } = await query

  if (error || !data) return []
  return data.map((row: Record<string, unknown>) => mapNotificationRow(row))
}

/**
 * Get unread notification count for the current user.
 */
export async function getUnreadCount(): Promise<number> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { count } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('recipient_id', user.id)
    .eq('is_read', false)

  return count || 0
}

/**
 * Mark a single notification as read.
 */
export async function markAsRead(
  notificationId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .eq('recipient_id', user.id)

  if (error) {
    console.error('Mark read failed:', error.message)
    return { success: false, error: 'Failed to mark notification as read' }
  }

  return { success: true }
}

/**
 * Mark all notifications as read for the current user.
 */
export async function markAllAsRead(): Promise<{ success: boolean; error?: string }> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('recipient_id', user.id)
    .eq('is_read', false)

  if (error) {
    console.error('Mark all read failed:', error.message)
    return { success: false, error: 'Failed to mark notifications as read' }
  }

  return { success: true }
}
