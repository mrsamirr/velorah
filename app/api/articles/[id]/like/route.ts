import { type NextRequest, NextResponse } from 'next/server'
import { likeArticle, unlikeArticle } from '@/lib/dal/likes'
import { getCurrentUser } from '@/lib/dal/auth'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

/**
 * POST /api/articles/[id]/like — Like article
 * DELETE /api/articles/[id]/like — Unlike article
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
    const result = await likeArticle(id)

    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'LIKE_FAILED', message: result.error } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: { liked: true } })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to like article' } },
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
    const result = await unlikeArticle(id)

    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'UNLIKE_FAILED', message: result.error } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: { liked: false } })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to unlike article' } },
      { status: 500 }
    )
  }
}
