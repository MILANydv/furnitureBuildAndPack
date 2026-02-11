'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  ImageIcon,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Store
} from 'lucide-react';
import { SessionProvider } from 'next-auth/react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/coupons', label: 'Coupons', icon: Tag },
  { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <div className="min-h-screen bg-stone-50 flex">
        {/* Sidebar */}
        <aside className="w-72 bg-stone-900 text-stone-400 fixed inset-y-0 left-0 z-50 hidden lg:flex flex-col">
          <div className="p-8 border-b border-white/10">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-amber-500/30">
                M
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Modu<span className="text-amber-500">Living</span>
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Store Management</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                      : 'hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10 mt-auto">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium mb-2"
            >
              <Store className="w-5 h-5" />
              Visit Store
            </Link>
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40 px-8 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-stone-500 capitalize tracking-wide">
                Internal Dashboard / <span className="text-stone-900 font-bold">{pathname.split('/').pop()}</span>
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-stone-900">Administrator</span>
                <span className="text-xs text-stone-500">Super User</span>
              </div>
              <div className="w-10 h-10 bg-stone-100 rounded-full border border-stone-200 overflow-hidden flex items-center justify-center">
                <Users className="w-5 h-5 text-stone-400" />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-8 pb-16">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
