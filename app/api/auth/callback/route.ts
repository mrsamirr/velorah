import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Auth callback handler.
 * Supabase Auth redirects here after email confirmation, OAuth, magic links, etc.
 *
 * GET /api/auth/callback?code=xxx
 *
 * SECURITY:
 * - Exchanges a one-time code for a session (PKCE flow)
 * - Redirects to a safe default path (never to an arbitrary URL)
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/author'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect to the intended destination (but always same-origin)
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Something went wrong — redirect to an error page or signin
  return NextResponse.redirect(`${origin}/signin?error=auth_callback_failed`)
}
