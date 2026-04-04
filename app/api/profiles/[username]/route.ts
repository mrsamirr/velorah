import { NextResponse } from 'next/server'
import { getProfileByUsername } from '@/lib/dal/profiles'
import { log } from '@/lib/logger'
import { AppError } from '@/lib/errors'

/**
 * GET /api/profiles/[username] — Public profile
 */
export async function GET(
  request: Request,
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

    return NextResponse.json({ data: profile })
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: { code: 'ERROR', message: err.message } },
        { status: err.statusCode }
      )
    }
    log.error('Failed to fetch profile', { context: 'GET /api/profiles/[username]', error: err })
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch profile' } },
      { status: 500 }
    )
  }
}
