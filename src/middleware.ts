import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ACTIVE_PATH_COOKIE_NAME = 'active-path'

export async function middleware(request: NextRequest) {
  console.log('middleware:start')

  const pathname = request.nextUrl.pathname
  console.log('pathname', pathname)

  const requestHeaders = new Headers(request.headers)

  // Prepare the response. We'll pass the modified request headers to it.
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Handle 'active-path' cookie
  if (request.cookies.has(ACTIVE_PATH_COOKIE_NAME)) {
    const existingActivePath = request.cookies.get(ACTIVE_PATH_COOKIE_NAME)?.value
    console.log(`middleware: Found 'active-path' cookie: ${existingActivePath}`)
    // Optionally, update it if it differs from current pathname, or just leave it.
    // For now, if it exists, we do nothing to it based on original logic intent.
  } else {
    // Set 'active-path' cookie on the response if it doesn't exist
    console.log(`middleware: Setting 'active-path' cookie to: ${pathname}`)
    response.cookies.set(ACTIVE_PATH_COOKIE_NAME, pathname, {
      path: '/', // Set path to make it accessible across the site
      // Consider adding other attributes like maxAge or expires, httpOnly, secure, sameSite
    })
  }

  console.log('middleware:end')
  return response
}

// Match specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (used for storing images)
     * - api/ (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
}