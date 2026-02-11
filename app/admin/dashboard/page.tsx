'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  ShoppingCart,
  Users,
  Tag,
  DollarSign,
  Box,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ArrowRight,
  BarChart3,
  Activity,
  Zap,
  Ticket,
  ChevronRight,
  Layers,
  Search,
  LayoutGrid
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';

async function fetchStats() {
  const res = await fetch('/api/admin/stats');
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export default function AdminDashboard() {
  const router = useRouter();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchStats,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
    </div>
  );

  const dashboardStats = [
    { label: 'Net Revenue', value: formatPrice(stats.totalRevenue), icon: DollarSign, trend: stats.revenueGrowth, trendIcon: TrendingUp, color: 'text-emerald-600' },
    { label: 'Transaction Count', value: stats.totalOrders.toString(), icon: ShoppingBag, trend: stats.orderGrowth, trendIcon: Activity, color: 'text-blue-600' },
    { label: 'Artifact Collection', value: stats.totalProducts.toString(), icon: Package, trend: stats.productGrowth, trendIcon: Box, color: 'text-amber-600' },
    { label: 'Verified Base', value: stats.totalCustomers.toString(), icon: Users, trend: stats.customerGrowth, trendIcon: Zap, color: 'text-stone-900' },
  ];

  function ShoppingBag(props: any) {
    return <ShoppingCart {...props} />
  }

  return (
    <div className="p-6 space-y-8">
      {/* Sleek Dashboard Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-8 mt-4">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Command Center</h1>
          <div className="flex items-center gap-2 mt-1">
            <LayoutGrid className="w-3.5 h-3.5 text-stone-400" />
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Global store synchronization active</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300 group-focus-within:text-stone-900 transition-all" />
            <input
              type="text"
              placeholder="Search nexus..."
              className="bg-white border border-stone-200 rounded-lg pl-9 pr-4 py-1.5 text-xs font-bold text-stone-900 outline-none w-48 focus:w-64 focus:border-stone-900 transition-all placeholder:text-stone-300"
            />
          </div>
          <Link href="/admin/products/new" className="px-5 py-2 bg-stone-900 text-white text-[13px] font-bold rounded-lg hover:bg-stone-800 transition-all flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            New SKU
          </Link>
        </div>
      </div>

      {/* Metric Ribbons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:border-stone-400 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-stone-300 group-hover:text-stone-900 transition-colors" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-black text-stone-900 tracking-tighter">{stat.value}</span>
              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 mb-1">
                <stat.trendIcon className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Core Stream */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30 flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Recent Transactions</h3>
              <Link href="/admin/orders" className="text-[10px] font-bold text-stone-900 uppercase tracking-widest hover:underline flex items-center gap-1">
                View Matrix <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-stone-50">
              {stats.recentOrders.map((order: any, i: number) => (
                <div
                  key={i}
                  onClick={() => router.push(`/admin/orders/${order.id}`)}
                  className="px-6 py-4 flex items-center justify-between hover:bg-stone-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-stone-50 border border-stone-100 rounded text-[10px] font-mono font-black text-stone-400 uppercase">
                      #{order.id.slice(-4).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight truncate max-w-[150px]">{order.customer}</p>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-black text-stone-900 tabular-nums">{formatPrice(order.total)}</span>
                    <div className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-emerald-500' : order.status === 'processing' ? 'bg-blue-500' : 'bg-stone-300'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-stone-400 uppercase tracking-widest text-[10px] font-bold">
                <Zap className="w-3.5 h-3.5" /> Promotion Engine active
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Launch New Campaign</h4>
              <p className="text-sm font-medium text-stone-400 leading-relaxed max-w-md mb-8">
                Deploying visual hooks and discount tokens can accelerate user conversion by up to 18% in the current market climate.
              </p>
              <div className="flex gap-4">
                <Link href="/admin/banners/new" className="px-6 py-2.5 bg-white text-stone-900 text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-stone-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5">
                  Banner Hook
                </Link>
                <Link href="/admin/coupons/new" className="px-6 py-2.5 bg-stone-800 text-white text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-stone-700 transition-all border border-white/5 shadow-lg">
                  Mint Coupon
                </Link>
              </div>
            </div>
            <Layers className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 overflow-hidden relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Growth Velocity</h3>
              <Activity className="w-4 h-4 text-stone-900" />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Fiscal Target</span>
                  <span className="text-[12px] font-black text-stone-900 uppercase">82%</span>
                </div>
                <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-stone-900 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
                <p className="text-[11px] text-stone-500 font-medium leading-relaxed uppercase tracking-widest mb-1 opacity-60">Insight Buffer</p>
                <p className="text-[12px] text-stone-900 font-bold leading-relaxed tracking-tight">
                  The core category "Living Room" is currently experiencing a high-volume surge in active carts.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-stone-50 rounded-lg text-stone-900 border border-stone-100"><BarChart3 className="w-4 h-4" /></div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest leading-none">Market Analytics</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-stone-50">
                <span className="text-[12px] font-bold text-stone-900 uppercase tracking-tight">Conversion</span>
                <span className="text-[12px] font-black text-emerald-600 uppercase">3.4%</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-50">
                <span className="text-[12px] font-bold text-stone-900 uppercase tracking-tight">Acquisition</span>
                <span className="text-[12px] font-black text-stone-900 uppercase">1.2k</span>
              </div>
              <button className="w-full py-2.5 text-[11px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-all rounded-lg border border-dashed border-stone-200">
                Expand Dataset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
  )
}
