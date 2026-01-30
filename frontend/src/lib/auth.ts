import { AuthToken, AuthUser } from '@/types/auth';

export const AUTH_COOKIE_NAME = 'gd_auth_token';
export const AUTH_COOKIE_DOMAIN = '.ember.new';
export const AUTH_REDIRECT_URL = 'https://gibson.ember.new';

/**
 * Check if auth should be skipped
 * Set NEXT_PUBLIC_SKIP_AUTH=true in .env.local to skip auth
 * Default: auth is enforced (returns false)
 */
export function isDevelopment(): boolean {
  return process.env.NEXT_PUBLIC_SKIP_AUTH === 'true';
}

/**
 * Mock user for development mode
 */
export const DEV_USER: AuthUser = {
  username: 'dev_user',
  name: 'Development User',
  email: 'dev@example.com',
  apps: ['submissions'],
};

/**
 * Mock token for development mode
 */
export function getDevToken(): AuthToken {
  return {
    user: DEV_USER,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    iat: Date.now(),
    iss: 'development',
  };
}

/**
 * Decodes a Base64url-encoded string
 */
function base64UrlDecode(str: string): string {
  // Replace Base64url characters with standard Base64 characters
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  // Pad with '=' if necessary
  const padding = base64.length % 4;
  if (padding) {
    base64 += '='.repeat(4 - padding);
  }

  // Decode using atob (browser) or Buffer (Node.js)
  if (typeof atob !== 'undefined') {
    return atob(base64);
  } else {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }
}

/**
 * Parses and validates the auth token from cookie value
 * Returns null if invalid or expired
 */
export function parseAuthToken(cookieValue: string | undefined): AuthToken | null {
  if (!cookieValue) {
    return null;
  }

  try {
    const decoded = base64UrlDecode(cookieValue);
    const token: AuthToken = JSON.parse(decoded);

    // Validate required fields
    if (!token.user || !token.exp) {
      return null;
    }

    // Check expiry (exp is in milliseconds)
    if (Date.now() > token.exp) {
      return null;
    }

    return token;
  } catch {
    return null;
  }
}

/**
 * Extracts user info from a valid auth token
 */
export function getUserFromToken(token: AuthToken | null): AuthUser | null {
  if (!token) {
    return null;
  }
  return token.user;
}

/**
 * Builds the redirect URL for unauthenticated users
 */
export function buildLoginRedirectUrl(returnUrl: string): string {
  const encodedReturnUrl = encodeURIComponent(returnUrl);
  return `${AUTH_REDIRECT_URL}?returnUrl=${encodedReturnUrl}`;
}

/**
 * Client-side: Get the auth cookie value
 */
export function getAuthCookie(): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === AUTH_COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }
  return undefined;
}

/**
 * Client-side: Clear the auth cookie (for logout)
 */
export function clearAuthCookie(): void {
  if (typeof document === 'undefined') {
    return;
  }

  // Clear cookie by setting expiry in the past
  // Must use the same domain to properly clear cross-domain cookie
  document.cookie = `${AUTH_COOKIE_NAME}=; domain=${AUTH_COOKIE_DOMAIN}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
