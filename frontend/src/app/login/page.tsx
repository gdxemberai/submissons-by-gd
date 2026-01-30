'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { AUTH_REDIRECT_URL, buildLoginRedirectUrl, isDevelopment } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // In development mode, redirect to home (already authenticated with dev user)
    if (isDevelopment()) {
      router.replace('/');
      return;
    }

    // Redirect to the external login page
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const redirectUrl = currentUrl
      ? buildLoginRedirectUrl(currentUrl.replace('/login', '/'))
      : AUTH_REDIRECT_URL;

    window.location.href = redirectUrl;
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF5E00]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF5E00]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Redirect Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/50 p-8">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#FF5E00] to-[#FF8040] shadow-lg shadow-orange-500/30 mb-4">
              <Icon icon="solar:spinner-bold" className="text-white animate-spin" width={32} />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Redirecting to Login
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              Please wait while we redirect you to the login page...
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-400">Gibson Dunn & Crutcher LLP</p>
          </div>
        </div>

        {/* Manual redirect link */}
        <p className="text-center mt-6 text-sm text-neutral-500">
          Not redirecting?{' '}
          <a
            href={AUTH_REDIRECT_URL}
            className="text-[#FF5E00] hover:text-[#e55500] font-medium transition-colors"
          >
            Click here to login
          </a>
        </p>
      </div>
    </div>
  );
}
