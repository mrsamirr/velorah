import { type NextRequest, NextResponse } from 'next/server'
import { getProfileByUsername } from '@/lib/dal/profiles'
import { followUser, unfollowUser } from '@/lib/dal/follows'
import { getCurrentUser } from '@/lib/dal/auth'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

/**
 * POST /api/profiles/[username]/follow — Follow user
 * DELETE /api/profiles/[username]/follow — Unfollow user
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
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
    const { rateLimited } = checkRateLimit(`engagement:${ip}`, RATE_LIMITS.engagement)
    if (rateLimited) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
        { status: 429 }
      )
    }

    const { username } = await params
    const profile = await getProfileByUsername(username)
    if (!profile) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    const result = await followUser(profile.id)

    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'FOLLOW_FAILED', message: result.error } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: { following: true } })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to follow user' } },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const { username } = await params
    const profile = await getProfileByUsername(username)
    if (!profile) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    const result = await unfollowUser(profile.id)

    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'UNFOLLOW_FAILED', message: result.error } },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: { following: false } })
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to unfollow user' } },
      { status: 500 }
    )
  }
}
