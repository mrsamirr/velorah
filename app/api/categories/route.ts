import { NextResponse } from 'next/server'
import { getAllCategories } from '@/lib/dal/categories'

/**
 * GET /api/categories — List all categories
 */
export async function GET() {
  try {
    const categories = await getAllCategories()
    return NextResponse.json({ data: categories })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch categories' } },
      { status: 500 }
    )
  }
}
