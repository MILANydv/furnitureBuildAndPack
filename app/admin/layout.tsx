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
  Plus
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
      <div className="min-h-screen bg-[#F8F9FA] flex font-sans">
        {/* Sidebar */}
        <aside className="w-[280px] bg-[#1A1C1E] text-stone-400 fixed inset-y-0 left-0 z-50 hidden lg:flex flex-col border-r border-white/5 shadow-2xl">
          <div className="p-8">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-[10px] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-amber-500/30 ring-2 ring-white/10">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-tight leading-none">
                  MODU<span className="text-amber-500">LIVING</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mt-1">Management</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
            <div className="mb-8">
              <p className="px-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">Core Management</p>
              {navItems.slice(0, 4).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-5 py-3 rounded-[10px] transition-all group ${isActive
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-500/5'
                      : 'hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-amber-500' : 'group-hover:text-white'}`} />
                      <span className="font-bold tracking-tight text-sm">{item.label}</span>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"></div>}
                  </Link>
                );
              })}
            </div>

            <div className="mb-8">
              <p className="px-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">Marketing & Visuals</p>
              {navItems.slice(4).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-5 py-3 rounded-[10px] transition-all group ${isActive
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-amber-500' : 'group-hover:text-white'}`} />
                      <span className="font-bold tracking-tight text-sm">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="p-6 space-y-3 bg-black/20 m-4 rounded-[10px] border border-white/5">
            <Link
              href="/"
              className="flex items-center gap-4 px-5 py-3 text-stone-400 hover:text-white hover:bg-white/5 rounded-[10px] transition-all font-bold text-sm"
            >
              <Store className="w-4.5 h-4.5" />
              Visit Store
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-4 px-5 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-[10px] transition-all font-bold text-sm"
            >
              <LogOut className="w-4.5 h-4.5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-[280px] flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-stone-200 sticky top-0 z-40 px-10 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="relative group hidden xl:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search dashboard..."
                  className="bg-stone-50 border border-stone-200 rounded-[10px] pl-12 pr-6 py-2.5 w-80 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all"
                />
              </div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest hidden sm:block">
                Internal System / <span className="text-stone-900">{pathname.split('/').pop()}</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <button className="relative p-3 bg-stone-50 rounded-[10px] border border-stone-200 text-stone-400 hover:text-amber-500 hover:border-amber-500/20 transition-all group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
              </button>

              <div className="h-10 w-px bg-stone-200"></div>

              <AdminUserInfo />
            </div>
          </header>

          {/* Content */}
          <main className="p-10 max-w-[1600px] mx-auto w-full">
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
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </SessionProvider>
  );
}

function AdminUserInfo() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <span className="text-sm font-black text-stone-900 uppercase tracking-tight">{session?.user?.name || 'Admin'}</span>
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Management Space</span>
      </div>
      <div className="w-12 h-12 bg-amber-100 rounded-[10px] border border-amber-500/20 overflow-hidden flex items-center justify-center text-amber-600 font-black shadow-lg shadow-amber-500/5 overflow-hidden">
        {session?.user?.name?.charAt(0) || <Users className="w-6 h-6" />}
      </div>
    </div>
  )
}
