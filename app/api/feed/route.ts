import { type NextRequest, NextResponse } from 'next/server'
import { getPublishedArticles } from '@/lib/dal/articles'
import { getCurrentUser } from '@/lib/dal/auth'

/**
 * GET /api/feed — Personalized feed for authenticated users,
 * falls back to recent articles for anonymous users.
 */
export async function GET(request: NextRequest) {
  try {
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
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch feed' } },
      { status: 500 }
    )
  }
}
