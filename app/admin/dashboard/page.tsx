'use client';

import Link from 'next/link';
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
  BarChart3
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';

async function fetchStats() {
  const res = await fetch('/api/admin/stats');
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchStats,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
    </div>
  );

  if (error) return (
    <div className="p-12 text-center bg-red-50 rounded-3xl border border-red-100">
      <p className="text-red-600 font-bold mb-2">Error loading dashboard</p>
      <p className="text-red-500 text-sm">Please try refreshing the page or contact support.</p>
    </div>
  );

  const dashboardStats = [
    { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: DollarSign, trend: '+12.5%', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Orders', value: stats.totalOrders.toString(), icon: ShoppingCart, trend: '+8.2%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Products', value: stats.totalProducts.toString(), icon: Box, trend: '+4.1%', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Customers', value: stats.totalCustomers.toString(), icon: Users, trend: '+15.3%', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-10">
      {/* Header with Title and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 leading-none mb-2">Welcome Back, Admin</h1>
          <p className="text-stone-500 font-medium">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products/new" className="px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2 text-sm shadow-lg shadow-stone-900/10 active:scale-95">
            <Package className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold ring-1 ring-inset ring-green-600/10">
                <TrendingUp className="w-3.5 h-3.5" />
                {stat.trend}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-stone-500 font-bold text-xs uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-stone-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm shadow-stone-200/50">
          <div className="p-8 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-stone-400" />
              </div>
              <h2 className="text-xl font-bold text-stone-900">Recent Transactions</h2>
            </div>
            <Link href="/admin/orders" className="text-amber-600 hover:text-amber-700 font-bold text-sm underline-offset-4 hover:underline transition-all">
              View All Orders
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50/50 border-b border-stone-100">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-widest">ID</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-5 font-bold text-stone-900">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="px-8 py-5 text-stone-600 font-medium">{order.customer}</td>
                    <td className="px-8 py-5 font-bold text-stone-900">{formatPrice(order.total)}</td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest leading-none ring-1 ring-inset ${order.status === 'delivered' ? 'bg-green-50 text-green-700 ring-green-600/10' :
                          order.status === 'processing' ? 'bg-blue-50 text-blue-700 ring-blue-600/10' :
                            'bg-stone-100 text-stone-700 ring-stone-600/10'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-stone-400 text-sm font-medium">{order.date}</td>
                  </tr>
                ))}
                {stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-stone-400 italic font-medium bg-stone-50/20">
                      No transactions recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Insights / Actions Card */}
        <div className="space-y-6">
          <div className="bg-amber-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-amber-600/20 group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
            <Tag className="w-12 h-12 text-white/20 mb-6" />
            <h3 className="text-2xl font-black mb-3 leading-tight">Create a new Flash Sale?</h3>
            <p className="text-white/80 text-sm font-medium mb-8 leading-relaxed">Boost your sales by creating a time-limited coupon code for your customers.</p>
            <Link href="/admin/coupons/new" className="px-6 py-3 bg-white text-amber-600 font-black rounded-xl hover:bg-stone-50 transition-all inline-flex items-center gap-2 text-sm shadow-xl shadow-black/5 active:scale-95">
              Generate Coupon
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm relative group overflow-hidden">
            <BarChart3 className="absolute -right-4 -top-4 w-24 h-24 text-stone-50 group-hover:text-stone-100 transition-colors" />
            <div className="relative">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Store Overview</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 text-sm font-medium">Monthly Target</span>
                  <span className="text-stone-900 font-bold text-sm">75%</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[75%] rounded-full shadow-lg shadow-green-500/20"></div>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed font-medium">You are on track to exceed your quarterly goals. Keep it up!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
