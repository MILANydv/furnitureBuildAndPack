'use client';

import Link from 'next/link';
import { Search, Eye, Package, CheckCircle, XCircle, Filter, Download, MoreVertical, Calendar } from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';
import { useQuery } from '@tanstack/react-query';

async function fetchOrders() {
  const res = await fetch('/api/admin/orders');
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-50 text-amber-700 ring-amber-600/10', icon: Package },
  processing: { label: 'Processing', color: 'bg-blue-50 text-blue-700 ring-blue-600/10', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-purple-50 text-purple-700 ring-purple-600/10', icon: Package },
  delivered: { label: 'Delivered', color: 'bg-green-50 text-green-700 ring-green-600/10', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 ring-red-600/10', icon: XCircle },
};

export default function AdminOrders() {
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: fetchOrders,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
    </div>
  );

  if (error) return (
    <div className="p-12 text-center bg-red-50 rounded-3xl border border-red-100">
      <p className="text-red-600 font-bold mb-2">Error loading orders</p>
      <p className="text-red-500 text-sm">Please try refreshing the page.</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 leading-none mb-2">Orders Management</h1>
          <p className="text-stone-500 font-medium">Track and process your customer orders efficiently.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-stone-200 text-stone-600 font-bold rounded-xl hover:bg-stone-50 transition-all flex items-center gap-2 text-sm shadow-sm active:scale-95">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2 text-sm shadow-xl shadow-stone-900/10 active:scale-95">
            <Calendar className="w-4 h-4" />
            Schedule Pickup
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Total Orders</p>
          <p className="text-2xl font-black text-stone-900">{orders.length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-blue-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Processing</p>
          <p className="text-2xl font-black">{orders.filter((o: any) => o.status === 'processing').length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-amber-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Pending</p>
          <p className="text-2xl font-black">{orders.filter((o: any) => o.status === 'pending').length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-green-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Delivered</p>
          <p className="text-2xl font-black">{orders.filter((o: any) => o.status === 'delivered').length}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by Order ID, customer or email..."
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-amber-500 focus:ring-0 transition-all font-medium text-stone-900"
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-6 py-3 bg-stone-50 border border-transparent rounded-2xl flex items-center justify-center gap-2 font-bold text-stone-600 hover:bg-stone-100 transition-all text-sm">
            <Filter className="w-4 h-4" />
            Status
          </button>
          <button className="flex-1 lg:flex-none px-6 py-3 bg-stone-50 border border-transparent rounded-2xl flex items-center justify-center gap-2 font-bold text-stone-600 hover:bg-stone-100 transition-all text-sm">
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-stone-200 overflow-hidden shadow-stone-200/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/80 border-b border-stone-100">
              <tr>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Order ID</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Items</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-right text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map((order: any) => {
                const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <tr key={order.id} className="hover:bg-amber-50/20 transition-all group">
                    <td className="px-8 py-5 font-black text-stone-900">
                      #{order.id.slice(-6).toUpperCase()}
                      <p className="text-[10px] font-bold text-stone-400 mt-0.5">{order.date}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 font-bold border border-stone-200">
                          {order.customer?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-stone-900">{order.customer || 'Guest'}</p>
                          <p className="text-[10px] font-medium text-stone-400">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-stone-600">{order.items} items</td>
                    <td className="px-8 py-5 font-black text-stone-900">{formatPrice(order.total)}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${status.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/orders/${order.id}`} className="p-2.5 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                          <Eye className="w-4.5 h-4.5" />
                        </Link>
                        <button className="p-2.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                          <MoreVertical className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-stone-400 italic">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
