import { type NextRequest, NextResponse } from 'next/server'
import { getProfileByUsername } from '@/lib/dal/profiles'
import { getPublishedArticles } from '@/lib/dal/articles'

/**
 * GET /api/profiles/[username]/articles — Author's published articles
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params
    const profile = await getProfileByUsername(username)

    if (!profile) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Profile not found' } },
        { status: 404 }
      )
    }

    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '20', 10), 50)
    const offset = Math.max(parseInt(request.nextUrl.searchParams.get('offset') || '0', 10), 0)
    const sort = (request.nextUrl.searchParams.get('sort') || 'recent') as 'recent' | 'popular' | 'most_liked'

    const articles = await getPublishedArticles({
      limit, offset, author_id: profile.id, sort,
    })

    return NextResponse.json({
      data: articles,
      pagination: { limit, offset, count: articles.length },
    })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch articles' } },
      { status: 500 }
    )
  }
}
