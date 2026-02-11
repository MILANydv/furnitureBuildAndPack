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
  Ticket
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
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchStats,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
    </div>
  );

  const dashboardStats = [
    { label: 'Revenue', value: formatPrice(stats.totalRevenue), icon: DollarSign, trend: stats.revenueGrowth, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Orders', value: stats.totalOrders.toString(), icon: ShoppingBag, trend: stats.orderGrowth, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Products', value: stats.totalProducts.toString(), icon: Box, trend: stats.productGrowth, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Customers', value: stats.totalCustomers.toString(), icon: Users, trend: stats.customerGrowth, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  function ShoppingBag(props: any) {
    return <ShoppingCart {...props} />
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Dynamic Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tight leading-none">Command Center</h1>
          <p className="text-stone-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Real-time synchronization of store heartbeat</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/products/new" className="px-8 py-3.5 bg-stone-900 text-white font-black rounded-[10px] hover:bg-stone-800 transition-all flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] shadow-2xl active:scale-95">
            <Package className="w-4 h-4" />
            Forge Product
          </Link>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-[10px] p-8 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} -mr-12 -mt-12 rounded-full opacity-40 transition-transform duration-700 group-hover:scale-150`}></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-[10px] flex items-center justify-center transition-transform group-hover:rotate-12`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-stone-400 font-black text-[10px] uppercase tracking-[0.3em] leading-none mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-stone-900 leading-none">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Transaction Stream */}
        <div className="lg:col-span-2 bg-white rounded-[10px] border border-stone-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-50 rounded-[10px] flex items-center justify-center text-stone-900 border border-stone-100 shadow-inner">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Post-Transaction Log</h2>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Live order acquisitions</p>
              </div>
            </div>
            <Link href="/admin/orders" className="p-3 bg-stone-50 text-stone-400 hover:text-stone-900 rounded-[10px] transition-all border border-transparent hover:border-stone-100">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full">
              <thead className="bg-stone-50/30 border-b border-stone-50">
                <tr>
                  <th className="px-10 py-5 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">Token</th>
                  <th className="px-10 py-5 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">Entity</th>
                  <th className="px-10 py-5 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">Value</th>
                  <th className="px-10 py-5 text-right text-[10px] font-black text-stone-400 uppercase tracking-widest">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-amber-50/20 transition-all group cursor-pointer" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                    <td className="px-10 py-6 font-black text-stone-900 uppercase tracking-tight">#{order.id.slice(-6)}</td>
                    <td className="px-10 py-6">
                      <p className="text-sm font-black text-stone-900 uppercase tracking-tight">{order.customer}</p>
                      <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1">{order.date}</p>
                    </td>
                    <td className="px-10 py-6 font-black text-stone-900 tabular-nums">{formatPrice(order.total)}</td>
                    <td className="px-10 py-6 text-right">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700' :
                        order.status === 'processing' ? 'bg-blue-50 text-blue-700' :
                          'bg-stone-50 text-stone-500'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Center Sidebar */}
        <div className="space-y-10">
          <div className="bg-stone-900 rounded-[10px] p-10 text-white relative overflow-hidden shadow-2xl group border border-white/5">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-1000"></div>
            <div className="relative">
              <div className="w-14 h-14 bg-white/10 rounded-[10px] flex items-center justify-center text-amber-500 mb-8 backdrop-blur-sm border border-white/10">
                <Ticket className="w-7 h-7 rotate-12" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight leading-none">Execute Promotion</h3>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-10 leading-relaxed">Injection of new discount tokens into the market can boost quarterly acquisitions by up to 15%.</p>
              <Link href="/admin/coupons/new" className="w-full py-4 bg-white text-stone-900 font-black rounded-[10px] hover:bg-amber-500 hover:text-white transition-all inline-flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95">
                Generate Token
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-[10px] p-10 border border-stone-100 shadow-sm relative group overflow-hidden">
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest">Growth Velocity</h3>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">Monthly Target</span>
                    <span className="text-sm font-black text-stone-900 leading-none">82%</span>
                  </div>
                  <div className="w-full bg-stone-50 h-3 rounded-full overflow-hidden border border-stone-100">
                    <div className="bg-amber-500 h-full w-[82%] rounded-full shadow-lg shadow-amber-500/30 transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="p-6 bg-stone-50 rounded-[10px] border border-stone-100">
                  <p className="text-[10px] font-bold text-stone-500 leading-relaxed uppercase tracking-widest">The engine predicts a high-volume surge in the &apos;Living Room&apos; category based on current cart activity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
