'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthUser } from '@/types/auth';
import {
  getAuthCookie,
  parseAuthToken,
  clearAuthCookie,
  AUTH_REDIRECT_URL,
  isDevelopment,
  DEV_USER,
} from '@/lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  logout: () => void;
  isLoading: boolean;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get initial auth state (runs once during component init)
function getInitialAuthState(): { isAuthenticated: boolean; user: AuthUser | null } {
  // In development mode, use mock user
  if (isDevelopment()) {
    return { isAuthenticated: true, user: DEV_USER };
  }

  // On server-side, return unauthenticated (will be checked client-side)
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null };
  }

  const cookieValue = getAuthCookie();
  const token = parseAuthToken(cookieValue);

  if (token) {
    return { isAuthenticated: true, user: token.user };
  }

  return { isAuthenticated: false, user: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState(() => getInitialAuthState());
  const [isLoading, setIsLoading] = useState(() => {
    // In development or if we already have auth state, don't show loading
    if (isDevelopment()) return false;
    // On client-side, check if we need to show loading
    if (typeof window === 'undefined') return true;
    return false;
  });

  const { isAuthenticated, user } = authState;

  // Function to refresh auth status from cookie
  const checkAuth = useCallback(() => {
    // In development mode, use mock user
    if (isDevelopment()) {
      setAuthState({ isAuthenticated: true, user: DEV_USER });
      setIsLoading(false);
      return;
    }

    const cookieValue = getAuthCookie();
    const token = parseAuthToken(cookieValue);

    if (token) {
      setAuthState({ isAuthenticated: true, user: token.user });
    } else {
      setAuthState({ isAuthenticated: false, user: null });
    }
    setIsLoading(false);
  }, []);

  // Periodically check for token expiry (every minute) - skip in development
  useEffect(() => {
    // Skip periodic check in development mode
    if (isDevelopment()) {
      return;
    }

    const interval = setInterval(() => {
      const cookieValue = getAuthCookie();
      const token = parseAuthToken(cookieValue);

      if (!token && isAuthenticated) {
        // Token expired or was cleared
        setAuthState({ isAuthenticated: false, user: null });
        // Redirect to login
        window.location.href = AUTH_REDIRECT_URL;
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const logout = useCallback(() => {
    // In development mode, just reset state (no actual logout)
    if (isDevelopment()) {
      console.log('[Dev Mode] Logout called - no redirect in development');
      return;
    }

    // Clear the cross-domain cookie
    clearAuthCookie();
    setAuthState({ isAuthenticated: false, user: null });
    // Redirect to the main auth site
    window.location.href = AUTH_REDIRECT_URL;
  }, []);

  const refreshAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout, isLoading, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
