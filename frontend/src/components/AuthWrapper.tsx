'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';
import { Icon } from '@iconify/react';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !isLoginPage) {
        router.push('/login');
      } else if (isAuthenticated && isLoginPage) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, isLoginPage, router]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#FF5E00] to-[#FF8040] flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Icon icon="solar:spinner-bold" className="text-white animate-spin" width={24} />
          </div>
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Login page - render without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Protected routes - render with sidebar if authenticated
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Sidebar />
      <div id="main-wrapper" className="flex flex-1 pl-[72px] transition-all duration-300 h-screen">
        {children}
      </div>
    </>
  );
}
