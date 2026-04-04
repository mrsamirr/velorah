import { type NextRequest, NextResponse } from 'next/server'
import { getPublishedArticles } from '@/lib/dal/articles'
import { getCurrentUser } from '@/lib/dal/auth'
import { checkRateLimit } from '@/lib/rate-limit'
import { log } from '@/lib/logger'
import { AppError } from '@/lib/errors'

/**
 * GET /api/feed — Personalized feed for authenticated users,
 * falls back to recent articles for anonymous users.
 */
export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const { rateLimited } = checkRateLimit(`api-read:${ip}`, { limit: 120, windowSeconds: 60 })
    if (rateLimited) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
        { status: 429 }
      )
    }

    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '20', 10), 50)
    const offset = Math.max(parseInt(request.nextUrl.searchParams.get('offset') || '0', 10), 0)

    const user = await getCurrentUser()

    // For authenticated users, we could filter by followed authors
    // For now, return recent articles sorted by recency
    const articles = await getPublishedArticles({
      limit,
      offset,
      sort: 'recent',
    })

    return NextResponse.json({
      data: articles,
      pagination: { limit, offset, count: articles.length },
      authenticated: !!user,
    })
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: { code: 'ERROR', message: err.message } },
        { status: err.statusCode }
      )
    }
    log.error('Failed to fetch feed', { context: 'GET /api/feed', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch feed' } },
      { status: 500 }
    )
  }
}
