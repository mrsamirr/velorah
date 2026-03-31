import { type NextRequest, NextResponse } from 'next/server'
import { getPublishedArticles } from '@/lib/dal/articles'

/**
 * Public Articles API.
 *
 * GET /api/articles?limit=20&offset=0&category=Philosophy
 *
 * Returns published articles. No authentication required.
 * Supports pagination and category filtering.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50)
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0)
    const category = searchParams.get('category') || undefined

    const articles = await getPublishedArticles({ limit, offset, category })

    return NextResponse.json({
      data: articles,
      pagination: {
        limit,
        offset,
        count: articles.length,
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
