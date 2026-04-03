import { type NextRequest, NextResponse } from 'next/server'
import { getMyNotifications } from '@/lib/dal/notifications'
import { getCurrentUser } from '@/lib/dal/auth'

/**
 * GET /api/notifications — User notifications (authenticated)
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '30', 10), 50)
    const offset = Math.max(parseInt(request.nextUrl.searchParams.get('offset') || '0', 10), 0)
    const unreadOnly = request.nextUrl.searchParams.get('unread') === 'true'

    const notifications = await getMyNotifications({ limit, offset, unreadOnly })

    return NextResponse.json({
      data: notifications,
      pagination: { limit, offset, count: notifications.length },
    })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch notifications' } },
      { status: 500 }
    )
  }
}
