import { type NextRequest, NextResponse } from 'next/server'
import { bookmarkArticle, unbookmarkArticle } from '@/lib/dal/bookmarks'
import { getCurrentUser } from '@/lib/dal/auth'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'
import { log } from '@/lib/logger'
import { AppError } from '@/lib/errors'

/**
 * POST /api/articles/[id]/bookmark — Bookmark article
 * DELETE /api/articles/[id]/bookmark — Remove bookmark
 */
export async function POST(
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

    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const { rateLimited } = checkRateLimit(`engagement:${ip}`, RATE_LIMITS.engagement)
    if (rateLimited) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
        { status: 429 }
      )
    }

    const { id } = await params
    const result = await bookmarkArticle(id)

    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'BOOKMARK_FAILED', message: result.error } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: { bookmarked: true } })
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: { code: 'ERROR', message: err.message } },
        { status: err.statusCode }
      )
    }
    log.error('Failed to bookmark article', { context: 'POST /api/articles/[id]/bookmark', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to bookmark article' } },
      { status: 500 }
    )
  }
}

export async function DELETE(
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
    const result = await unbookmarkArticle(id)

    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'UNBOOKMARK_FAILED', message: result.error } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: { bookmarked: false } })
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: { code: 'ERROR', message: err.message } },
        { status: err.statusCode }
      )
    }
    log.error('Failed to remove bookmark', { context: 'DELETE /api/articles/[id]/bookmark', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to remove bookmark' } },
      { status: 500 }
    )
  }
}
