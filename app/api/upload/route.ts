import { type NextRequest, NextResponse } from 'next/server'
import { uploadFile } from '@/lib/dal/media'
import { getCurrentUser } from '@/lib/dal/auth'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'
import { log } from '@/lib/logger'
import { AppError } from '@/lib/errors'

/**
 * POST /api/upload — File upload (authenticated)
 * Expects multipart form data with `file` and `bucket` fields.
 */
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
    const { rateLimited, resetIn } = checkRateLimit(`upload:${ip}`, RATE_LIMITS.upload)
    if (rateLimited) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
        { status: 429, headers: { 'Retry-After': String(resetIn) } }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')
    const bucket = formData.get('bucket') as string

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'File is required' } },
        { status: 422 }
      )
    }

    const validBuckets = ['avatars', 'covers', 'article-media'] as const
    if (!bucket || !validBuckets.includes(bucket as typeof validBuckets[number])) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid bucket. Use: avatars, covers, or article-media' } },
        { status: 422 }
      )
    }

    const result = await uploadFile(bucket as typeof validBuckets[number], file)

    if ('error' in result) {
      return NextResponse.json(
        { error: { code: 'UPLOAD_FAILED', message: result.error } },
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
    log.error('Upload failed', { context: 'POST /api/upload', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Upload failed' } },
      { status: 500 }
    )
  }
}
