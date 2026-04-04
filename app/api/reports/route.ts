import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/dal/auth'
import { ReportSchema } from '@/lib/schemas/engagement'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'
import { log } from '@/lib/logger'
import { AppError } from '@/lib/errors'

/**
 * POST /api/reports — Submit a report (authenticated)
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
    const { rateLimited, resetIn } = checkRateLimit(`report:${ip}`, RATE_LIMITS.report)
    if (rateLimited) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
        { status: 429, headers: { 'Retry-After': String(resetIn) } }
      )
    }

    const body = await request.json()
    const validatedFields = ReportSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid report data', details: validatedFields.error.flatten().fieldErrors } },
        { status: 422 }
      )
    }

    const supabase = await createClient()
    const { error } = await supabase.from('reports').insert({
      reporter_id: user.id,
      ...validatedFields.data,
    })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: { code: 'CONFLICT', message: 'Already reported' } },
          { status: 409 }
        )
      }
      log.error('Report failed', { context: 'POST /api/reports', errorMessage: error.message })
      return NextResponse.json(
        { error: { code: 'CREATE_FAILED', message: 'Failed to submit report' } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: { success: true } }, { status: 201 })
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: { code: 'ERROR', message: err.message } },
        { status: err.statusCode }
      )
    }
    log.error('Failed to submit report', { context: 'POST /api/reports', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to submit report' } },
      { status: 500 }
    )
  }
}
