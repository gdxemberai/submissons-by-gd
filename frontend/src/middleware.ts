import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  parseAuthToken,
  buildLoginRedirectUrl,
  isDevelopment,
} from '@/lib/auth';

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/_next',
  '/favicon.ico',
  '/api/health', // Example public API route
];

// Check if a path is public
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

// Check if a path is an API route
function isApiRoute(pathname: string): boolean {
  return pathname.startsWith('/api');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth if NEXT_PUBLIC_SKIP_AUTH=true
  if (isDevelopment()) {
    return NextResponse.next();
  }

  // Skip public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Get the auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  const token = parseAuthToken(authCookie?.value);

  // If no valid token, handle based on route type
  if (!token) {
    // For API routes, return 401 Unauthorized
    if (isApiRoute(pathname)) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Valid authentication required' },
        { status: 401 }
      );
    }

    // For page routes, redirect to login
    const currentUrl = request.url;
    const redirectUrl = buildLoginRedirectUrl(currentUrl);
    return NextResponse.redirect(redirectUrl);
  }

  // Token is valid, allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
