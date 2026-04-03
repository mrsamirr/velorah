import { type NextRequest, NextResponse } from 'next/server'
import { searchArticles } from '@/lib/dal/search'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

/**
 * GET /api/search?q=query&limit=20&offset=0 — Full-text search
 */
export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get('q')
    if (!q || q.trim().length < 2) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Search query must be at least 2 characters' } },
        { status: 422 }
      )
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const { rateLimited, resetIn } = checkRateLimit(`search:${ip}`, RATE_LIMITS.search)
    if (rateLimited) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
        { status: 429, headers: { 'Retry-After': String(resetIn) } }
      )
    }

    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '20', 10), 50)
    const offset = Math.max(parseInt(request.nextUrl.searchParams.get('offset') || '0', 10), 0)

    const articles = await searchArticles(q.trim(), { limit, offset })

    return NextResponse.json({
      data: articles,
      pagination: { limit, offset, count: articles.length },
    })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Search failed' } },
      { status: 500 }
    )
  }
}
