import { NextResponse } from 'next/server'
import { getArticleById } from '@/lib/dal/articles'

/**
 * Single Article API.
 *
 * GET /api/articles/[id]
 *
 * Returns a single published article by ID. No auth required.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const article = await getArticleById(id)

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: article })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}
