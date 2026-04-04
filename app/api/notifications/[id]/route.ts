import { type NextRequest, NextResponse } from 'next/server'
import { markAsRead } from '@/lib/dal/notifications'
import { getCurrentUser } from '@/lib/dal/auth'
import { log } from '@/lib/logger'
import { AppError } from '@/lib/errors'

/**
 * PATCH /api/notifications/[id] — Mark notification as read
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const { id } = await params
    const result = await markAsRead(id)

    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'UPDATE_FAILED', message: result.error } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: { success: true } })
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: { code: 'ERROR', message: err.message } },
        { status: err.statusCode }
      )
    }
    log.error('Failed to update notification', { context: 'PATCH /api/notifications/[id]', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to update notification' } },
      { status: 500 }
    )
  }
}
