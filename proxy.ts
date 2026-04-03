import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Security headers applied to all responses.
 */
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co; frame-ancestors 'none';",
}

/**
 * Routes that require authentication.
 * If unauthenticated, user is redirected to /signin.
 */
const PROTECTED_PATTERNS = [
  '/author',
  '/publish',
  '/settings',
  '/notifications',
  '/admin',
]

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PATTERNS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
}

export async function proxy(request: NextRequest) {
  // Refresh the auth session
  const response = await updateSession(request)

  // Add security headers
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value)
  }

  // Check protected routes
  if (isProtectedRoute(request.nextUrl.pathname)) {
    // updateSession already handles cookie refresh.
    // If no session, the supabase middleware returns the response as-is.
    // We check for the absence of a user cookie to redirect.
    const hasSession = request.cookies.getAll().some(
      (c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    )

    if (!hasSession) {
      const signinUrl = new URL('/signin', request.url)
      signinUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(signinUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     * - Public assets (svg, png, jpg, jpeg, gif, webp)
     *
     * This ensures the auth session is refreshed on every page navigation
     * while avoiding unnecessary work on static asset requests.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
