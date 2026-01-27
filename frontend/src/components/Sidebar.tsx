'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/', icon: 'solar:widget-linear', label: 'Dashboard' },
  { href: '/submissions', icon: 'solar:folder-with-files-linear', label: 'Submissions' },
  { href: '/config', icon: 'solar:settings-linear', label: 'Config' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    document.body.classList.toggle('has-expanded-sidebar');
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Get initials from username
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <nav
      className="fixed z-50 flex flex-col bg-white/80 w-[72px] border-neutral-100/80 border-r pt-6 pb-6 top-0 bottom-0 left-0 backdrop-blur-xl justify-between"
      id="sidebar"
    >
      <div className="flex flex-col items-center gap-6 w-full">
        {/* Sidebar Header */}
        <div
          id="sidebar-header"
          className="flex items-center justify-center w-full px-2 min-h-[40px] relative"
        >
          <div
            id="logo-wrapper"
            className="relative flex items-center justify-center w-10 h-10 shrink-0 rounded-xl cursor-pointer bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 shadow-sm"
          >
            <div className="text-[#FF5E00]">
              <Icon icon="solar:document-add-linear" width={24} height={24} />
            </div>
            <button
              onClick={toggleSidebar}
              id="expand-trigger"
              className="absolute inset-0 flex items-center justify-center rounded-xl text-neutral-400 transition-all backdrop-blur-sm"
            >
              <Icon icon="solar:sidebar-minimalistic-linear" width={20} height={20} />
            </button>
          </div>
          <button
            id="collapse-trigger"
            onClick={toggleSidebar}
            className="text-neutral-400 hover:text-neutral-600 transition-colors p-1"
          >
            <Icon icon="solar:double-alt-arrow-left-linear" width={20} height={20} />
          </button>
        </div>

        <div className="w-8 h-[1px] bg-neutral-100"></div>

        {/* Nav Items */}
        <div className="flex flex-col gap-2 w-full px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item group relative flex items-center justify-center p-2.5 rounded-lg transition-all ${
                isActive(item.href)
                  ? 'text-[#FF5E00] bg-[#FF5E00]/5'
                  : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Icon
                icon={item.icon}
                width={24}
                height={24}
                className={isActive(item.href) ? 'text-[#FF5E00]' : ''}
              />
              <span className="nav-label absolute left-14 px-2 py-1 bg-neutral-900 text-white font-normal rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 shadow-lg transition-opacity duration-300 text-xs">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3 w-full px-2" id="sidebar-bottom-actions">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="group relative flex items-center justify-center p-2.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all"
          title="Logout"
        >
          <Icon icon="solar:logout-2-linear" width={22} height={22} />
          <span className="nav-label absolute left-14 px-2 py-1 bg-neutral-900 text-white font-normal rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 shadow-lg transition-opacity duration-300 text-xs">
            Logout
          </span>
        </button>

        {/* Profile */}
        <div
          className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#FF5E00]/20 transition-all shrink-0 bg-linear-to-br from-[#FF5E00] to-[#FF8040] flex items-center justify-center cursor-pointer group"
          id="sidebar-user-profile"
          title={user?.username || 'User'}
        >
          <span className="text-white text-xs font-semibold">
            {user ? getInitials(user.username) : 'U'}
          </span>
          <span className="nav-label absolute left-14 px-2 py-1 bg-neutral-900 text-white font-normal rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 shadow-lg transition-opacity duration-300 text-xs">
            {user?.username || 'User'}
          </span>
        </div>
      </div>
    </nav>
  );
}
