import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Refreshes the Supabase auth session on every request via middleware.
 * This ensures expired sessions are renewed before reaching Server Components.
 *
 * SECURITY: Never modify the auth cookie here — only refresh and pass through.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do NOT use supabase.auth.getSession() here.
  // It reads from storage without validating the JWT — insecure for middleware.
  // Use getUser() which validates the token with the Supabase Auth server.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define protected route patterns
  const protectedPaths = ['/author', '/publish']
  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  // Redirect unauthenticated users away from protected routes
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/signin'
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from signin
  if (user && request.nextUrl.pathname === '/signin') {
    const redirectTo = request.nextUrl.searchParams.get('redirectTo') || '/author'
    const url = request.nextUrl.clone()
    url.pathname = redirectTo
    url.search = ''
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
