import { NextResponse } from 'next/server'
import { getProfileByUsername } from '@/lib/dal/profiles'

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
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch profile' } },
      { status: 500 }
    )
  }
}
