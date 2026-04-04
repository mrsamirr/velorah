import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { log } from '@/lib/logger'
import { AppError } from '@/lib/errors'

/**
 * POST /api/articles/[id]/view — Increment view count
 * Rate limited to prevent view count inflation.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Rate limit per IP+article: 1 view per article per 5 minutes
    const { rateLimited } = checkRateLimit(`view:${ip}:${id}`, { limit: 1, windowSeconds: 300 })
    if (rateLimited) {
      return NextResponse.json({ data: { success: true } }) // Silent success — don't reveal rate limiting
    }

    const supabase = await createClient()
    await supabase.rpc('increment_view_count', { article_id: id })

    return NextResponse.json({ data: { success: true } })
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: { code: 'ERROR', message: err.message } },
        { status: err.statusCode }
      )
    }
    log.error('Failed to record view', { context: 'POST /api/articles/[id]/view', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to record view' } },
      { status: 500 }
    )
  }
}
