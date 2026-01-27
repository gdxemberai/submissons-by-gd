'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(username, password);

    if (success) {
      router.push('/');
    } else {
      setError('Invalid username or password');
      setIsLoading(false);
    }
  };

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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/50 p-8">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#FF5E00] to-[#FF8040] shadow-lg shadow-orange-500/30 mb-4">
              <Icon icon="solar:document-text-bold" className="text-white" width={32} />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Legal Submission Automator
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              Sign in to manage your directory submissions
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Icon icon="solar:user-circle-linear" width={20} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:outline-none focus:border-[#FF5E00] focus:ring-2 focus:ring-[#FF5E00]/10 transition-all placeholder:text-neutral-400"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Icon icon="solar:lock-password-linear" width={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:outline-none focus:border-[#FF5E00] focus:ring-2 focus:ring-[#FF5E00]/10 transition-all placeholder:text-neutral-400"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <Icon
                    icon={showPassword ? 'solar:eye-closed-linear' : 'solar:eye-linear'}
                    width={20}
                  />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                <Icon icon="solar:danger-circle-linear" width={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 text-sm font-medium text-white bg-[#FF5E00] hover:bg-[#e55500] disabled:bg-[#FF5E00]/70 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <Icon icon="solar:spinner-bold" className="animate-spin" width={18} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <Icon
                    icon="solar:arrow-right-linear"
                    className="group-hover:translate-x-0.5 transition-transform"
                    width={18}
                  />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-400">
              Gibson Dunn & Crutcher LLP
            </p>
          </div>
        </div>

        {/* Help Link */}
        <p className="text-center mt-6 text-sm text-neutral-500">
          Need help?{' '}
          <button className="text-[#FF5E00] hover:text-[#e55500] font-medium transition-colors">
            Contact Support
          </button>
        </p>
      </div>
    </div>
  );
}
