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
  Calendar
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';

async function fetchOrders() {
  const res = await fetch('/api/admin/orders');
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

const statusConfig: any = {
  PENDING: { color: 'bg-amber-100 text-amber-900 border-amber-200', icon: Clock },
  PROCESSING: { color: 'bg-blue-100 text-blue-900 border-blue-200', icon: ShoppingBag },
  SHIPPED: { color: 'bg-purple-100 text-purple-900 border-purple-200', icon: Truck },
  DELIVERED: { color: 'bg-emerald-100 text-emerald-900 border-emerald-200', icon: CheckCircle2 },
  CANCELLED: { color: 'bg-red-100 text-red-900 border-red-200', icon: XCircle },
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
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
    </div>
  );

  const filteredOrders = orders.filter((o: any) =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900 uppercase tracking-tight leading-none">Commerce Flow</h1>
          <p className="text-stone-500 font-bold mt-2 uppercase tracking-widest text-[11px]">Real-time transaction & fulfillment stream</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white border border-stone-100 rounded-[10px] flex items-center gap-3">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-black text-stone-900 uppercase tracking-widest">Archive 2024</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[10px] p-4 shadow-sm border border-stone-100 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-amber-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by Order ID or Client pseudonym..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-4 bg-stone-50 border-transparent rounded-[10px] focus:bg-white focus:border-amber-500/10 transition-all outline-none font-bold text-stone-900 text-sm"
          />
        </div>
        <button className="px-8 py-4 bg-white border border-stone-100 text-stone-400 font-bold rounded-[10px] hover:text-stone-900 transition-all text-xs uppercase tracking-widest flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Segment
        </button>
      </div>

      <div className="bg-white rounded-[10px] border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/50 border-b border-stone-100">
              <tr>
                <th className="px-10 py-6 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Transaction</th>
                <th className="px-10 py-6 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Customer Identity</th>
                <th className="px-10 py-6 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Deployment</th>
                <th className="px-10 py-6 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Order Value</th>
                <th className="px-10 py-6 text-right text-[11px] font-bold text-stone-400 uppercase tracking-widest">Lifecycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((order: any) => {
                const StatusIcon = statusConfig[order.status]?.icon || Clock;
                return (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition-all group cursor-pointer" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-stone-50 rounded-[10px] flex items-center justify-center text-stone-900 border border-stone-200/50 group-hover:border-amber-500/20 transition-all">
                          <span className="text-[10px] font-black">#{order.id.slice(-4).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-black text-stone-900 uppercase tracking-tight">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mt-1">Ref ID: {order.id.slice(-12).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-stone-900 uppercase tracking-tight">{order.user?.name}</span>
                        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mt-1">{order.user?.email}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border ${statusConfig[order.status]?.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-lg font-black text-stone-900 tabular-nums">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="inline-flex p-3 bg-stone-50 text-stone-300 rounded-[10px] group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
