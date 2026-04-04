import { type NextRequest, NextResponse } from 'next/server'
import { getCommentsByArticle, createComment } from '@/lib/dal/comments'
import { getCurrentUser } from '@/lib/dal/auth'
import { CreateCommentSchema } from '@/lib/schemas/engagement'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'
import { log } from '@/lib/logger'
import { AppError } from '@/lib/errors'

/**
 * GET /api/articles/[id]/comments — List article comments
 * POST /api/articles/[id]/comments — Create comment (authenticated)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const comments = await getCommentsByArticle(id)
    return NextResponse.json({ data: comments })
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: { code: 'ERROR', message: err.message } },
        { status: err.statusCode }
      )
    }
    log.error('Failed to fetch comments', { context: 'GET /api/articles/[id]/comments', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch comments' } },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const { rateLimited, resetIn } = checkRateLimit(`comment:${ip}`, RATE_LIMITS.comment)
    if (rateLimited) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
        { status: 429, headers: { 'Retry-After': String(resetIn) } }
      )
    }

    const { id } = await params
    const body = await request.json()
    const validatedFields = CreateCommentSchema.safeParse({
      article_id: id,
      ...body,
    })

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: validatedFields.error.flatten().fieldErrors } },
        { status: 422 }
      )
    }

    const result = await createComment(validatedFields.data)

    if ('error' in result) {
      return NextResponse.json(
        { error: { code: 'CREATE_FAILED', message: result.error } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: result }, { status: 201 })
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: { code: 'ERROR', message: err.message } },
        { status: err.statusCode }
      )
    }
    log.error('Failed to create comment', { context: 'POST /api/articles/[id]/comments', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to create comment' } },
      { status: 500 }
    )
  }
}
