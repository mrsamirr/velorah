import { type NextRequest, NextResponse } from 'next/server'
import { searchTags } from '@/lib/dal/tags'

/**
 * GET /api/tags?q=search — List/search tags
 */
export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get('q') || ''
    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '20', 10), 50)

    const tags = await searchTags(q, limit)
    return NextResponse.json({ data: tags })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch tags' } },
      { status: 500 }
    )
  }
}
