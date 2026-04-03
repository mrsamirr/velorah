import { type NextRequest, NextResponse } from 'next/server'
import { getPublishedArticles, createArticle } from '@/lib/dal/articles'
import { getAllCategories } from '@/lib/dal/categories'
import { CreateArticleSchema } from '@/lib/schemas/content'
import { getCurrentUser } from '@/lib/dal/auth'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

/**
 * Public Articles API.
 *
 * GET /api/articles?limit=20&offset=0&category_id=...&tag_id=...&author_id=...&sort=recent&featured=true
 * GET /api/articles?categories=true — list all categories
 * POST /api/articles — create article (authenticated)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // If categories=true, return categories list
    if (searchParams.get('categories') === 'true') {
      const categories = await getAllCategories()
      return NextResponse.json({ categories })
    }

    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50)
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0)
    const category_id = searchParams.get('category_id') || undefined
    const tag_id = searchParams.get('tag_id') || undefined
    const author_id = searchParams.get('author_id') || undefined
    const sort = (searchParams.get('sort') || 'recent') as 'recent' | 'popular' | 'most_liked'
    const featuredParam = searchParams.get('featured')
    const featured = featuredParam === 'true' ? true : featuredParam === 'false' ? false : undefined

    const articles = await getPublishedArticles({
      limit, offset, category_id, tag_id, author_id, sort, featured,
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

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const { rateLimited, resetIn } = checkRateLimit(`create-article:${ip}`, RATE_LIMITS.createArticle)
    if (rateLimited) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
        { status: 429, headers: { 'Retry-After': String(resetIn) } }
      )
    }

    const body = await request.json()
    const validatedFields = CreateArticleSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: validatedFields.error.flatten().fieldErrors } },
        { status: 422 }
      )
    }

    const result = await createArticle(validatedFields.data)

    if ('error' in result) {
      return NextResponse.json(
        { error: { code: 'CREATE_FAILED', message: result.error } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: result }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to create article' } },
      { status: 500 }
    )
  }
}
