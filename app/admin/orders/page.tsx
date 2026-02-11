'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ArrowUpRight,
  Eye,
  Calendar,
  ChevronDown,
  ArrowRight,
  User,
  CreditCard,
  Download
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';

async function fetchOrders() {
  const res = await fetch('/api/admin/orders');
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

const statusConfig: any = {
  PENDING: { color: 'text-amber-500', bg: 'bg-amber-50', icon: Clock, label: 'Placed' },
  PROCESSING: { color: 'text-blue-500', bg: 'bg-blue-50', icon: ShoppingBag, label: 'Active' },
  SHIPPED: { color: 'text-purple-500', bg: 'bg-purple-50', icon: Truck, label: 'En Route' },
  DELIVERED: { color: 'text-emerald-500', bg: 'bg-emerald-50', icon: CheckCircle2, label: 'Fulfilled' },
  CANCELLED: { color: 'text-red-500', bg: 'bg-red-50', icon: XCircle, label: 'Terminated' },
};

export default function AdminOrders() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: fetchOrders,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
    </div>
  );

  const filteredOrders = orders.filter((o: any) =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      {/* Sleek Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-8 mt-4">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Commerce Stream</h1>
          <div className="flex items-center gap-2 mt-1">
            <ShoppingBag className="w-3.5 h-3.5 text-stone-400" />
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{orders.length} Logged Transactions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-lg text-[13px] font-bold text-stone-600 hover:bg-stone-50 transition-all">
            Manifests
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="p-2 border border-stone-200 rounded-lg text-stone-500 hover:text-stone-900 transition-all shadow-sm">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logic Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Unfulfilled', count: orders.filter((o: any) => o.status === 'PENDING').length, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'In Production', count: orders.filter((o: any) => o.status === 'PROCESSING').length, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'En Route', count: orders.filter((o: any) => o.status === 'SHIPPED').length, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Complete', count: orders.filter((o: any) => o.status === 'DELIVERED').length, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between hover:border-stone-400 transition-colors group">
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
              <p className="text-[16px] font-black text-stone-900 leading-none">{s.count}</p>
            </div>
            <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Area */}
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm flex items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-stone-900 transition-all" />
          <input
            type="text"
            placeholder="Locate transaction or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none pl-11 pr-4 py-2 text-[13px] font-bold text-stone-900 outline-none placeholder:text-stone-300"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-stone-400 hover:text-stone-900 transition-colors text-[12px] font-bold uppercase tracking-tight">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Transaction Ref</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Customer Details</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Deployment Status</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest text-right">Settlement</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold text-stone-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredOrders.map((order: any) => {
                const status = statusConfig[order.status] || statusConfig.PENDING;
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-stone-50/30 transition-all group cursor-pointer"
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-stone-50 border border-stone-100 rounded text-stone-900 font-mono text-[10px] font-black">
                          {order.id.slice(-6).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight leading-none mb-1">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Nexus ID: {order.id.slice(-10).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 text-[10px] font-black uppercase">
                          {order.user?.name?.charAt(0) || <User className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight leading-none mb-0.5">{order.user?.name}</p>
                          <p className="text-[10px] text-stone-400 font-medium truncate max-w-[150px]">{order.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.color}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></div>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[14px] font-black text-stone-900 tabular-nums tracking-tighter">{formatPrice(order.total)}</span>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] font-bold text-stone-300 uppercase tracking-widest">
                        <CreditCard className="w-2.5 h-2.5" /> COD
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex p-2 bg-stone-100 text-stone-400 rounded-lg group-hover:bg-stone-900 group-hover:text-white transition-all shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-12 text-center text-[11px] font-bold text-stone-400 uppercase tracking-widest">
              Safe Channel: No transactions detected in this scan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
