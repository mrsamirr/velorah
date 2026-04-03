'use server'

import { markAsRead, markAllAsRead } from '@/lib/dal/notifications'

export async function markNotificationReadAction(
  notificationId: string
): Promise<{ success: boolean; error?: string }> {
  return markAsRead(notificationId)
}

export async function markAllNotificationsReadAction(): Promise<{ success: boolean; error?: string }> {
  return markAllAsRead()
}
