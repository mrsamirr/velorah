import { NextResponse } from 'next/server'
import { getArticleById, getArticleBySlug } from '@/lib/dal/articles'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * GET /api/articles/[id] — Single article by ID or slug.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const article = UUID_REGEX.test(id)
      ? await getArticleById(id)
      : await getArticleBySlug(id)

    if (!article) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Article not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: article })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch article' } },
      { status: 500 }
    )
  }
}
