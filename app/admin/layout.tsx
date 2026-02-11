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
  Store,
  Bell,
  Search,
  Plus,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';

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
      <div className="min-h-screen bg-[#F5F5F5] flex font-sans text-stone-900">
        {/* Sleek Compact Sidebar */}
        <aside className="w-[240px] bg-white fixed inset-y-0 left-0 z-50 hidden lg:flex flex-col border-r border-stone-200">
          <div className="p-6 flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center text-white text-sm font-black">
                M
              </div>
              <span className="text-sm font-black tracking-tight uppercase">ModuLiving</span>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${isActive
                    ? 'bg-stone-100 text-stone-900'
                    : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                >
                  <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-stone-900' : 'text-stone-400 group-hover:text-stone-900'}`} />
                  <span className="font-bold text-[13px]">{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-6 pb-2">
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Support</p>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-500 hover:bg-stone-50 hover:text-stone-900 transition-all"
              >
                <ExternalLink className="w-4 h-4 text-stone-400" />
                <span className="font-bold text-[13px]">Live Store</span>
              </Link>
              <button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-stone-500 hover:bg-stone-50 hover:text-stone-900 transition-all text-left"
              >
                <HelpCircle className="w-4 h-4 text-stone-400" />
                <span className="font-bold text-[13px]">Help Center</span>
              </button>
            </div>
          </nav>

          <div className="p-4 border-t border-stone-100">
            <AdminUserInfo />
          </div>
        </aside>

        {/* Main Workspace Area */}
        <div className="flex-1 lg:ml-[240px] flex flex-col min-h-screen">
          {/* Minimal Header */}
          <header className="h-14 bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                System / <span className="text-stone-900">{pathname.split('/').filter(Boolean).slice(-1)[0] || 'Dashboard'}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-stone-400 hover:text-stone-900 transition-all">
                <Bell className="w-4.5 h-4.5" />
              </button>
              <div className="h-4 w-px bg-stone-200"></div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="p-2 text-stone-400 hover:text-red-500 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          </header>

          {/* Fluid Viewport */}
          <main className="w-full">
            {children}
          </main>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </SessionProvider>
  );
}

function AdminUserInfo() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-3 p-1">
      <div className="w-8 h-8 bg-stone-100 rounded-lg border border-stone-200 flex items-center justify-center text-stone-900 font-black text-xs">
        {session?.user?.name?.charAt(0) || 'A'}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-xs font-bold text-stone-900 truncate">{session?.user?.name || 'Administrator'}</span>
        <span className="text-[10px] text-stone-400 truncate tracking-tight">{session?.user?.email || 'admin@moduliving.com'}</span>
      </div>
    </div>
  )
}
