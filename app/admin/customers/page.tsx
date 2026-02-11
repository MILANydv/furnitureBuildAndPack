'use client';

import {
  Search,
  Mail,
  UserPlus,
  Filter,
  MoreHorizontal,
  ShoppingBag,
  MapPin
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

async function fetchCustomers() {
  const res = await fetch('/api/admin/customers');
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
}

export default function AdminCustomersPage() {
  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['admin-customers'],
    queryFn: fetchCustomers,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
    </div>
  );

  if (error) return (
    <div className="p-12 text-center bg-red-50 rounded-3xl border border-red-100">
      <p className="text-red-600 font-bold mb-2">Error loading customers</p>
      <p className="text-red-500 text-sm">Please try refreshing the page.</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 leading-none mb-2">Customer Base</h1>
          <p className="text-stone-500 font-medium">Manage your relationships and view customer history.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2 text-sm shadow-xl shadow-stone-900/10 active:scale-95">
            <UserPlus className="w-4 h-4" />
            Add Prospect
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Total Customers</p>
          <p className="text-2xl font-black text-stone-900">{customers.length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-green-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">New This Month</p>
          <p className="text-2xl font-black">0</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-amber-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Avg. Orders</p>
          <p className="text-2xl font-black">
            {customers.length > 0
              ? (customers.reduce((acc: number, c: any) => acc + c.orderCount, 0) / customers.length).toFixed(1)
              : 0}
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-purple-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Active Shoppers</p>
          <p className="text-2xl font-black">{customers.filter((c: any) => c.orderCount > 0).length}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, email or location..."
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-amber-500 focus:ring-0 transition-all font-medium text-stone-900"
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-6 py-3 bg-stone-50 border border-transparent rounded-2xl flex items-center justify-center gap-2 font-bold text-stone-600 hover:bg-stone-100 transition-all text-sm">
            <Filter className="w-4 h-4" />
            Segments
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-stone-200 overflow-hidden shadow-stone-200/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/80 border-b border-stone-100">
              <tr>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Customer Profile</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Contact</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Activity</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Joined Date</th>
                <th className="px-8 py-5 text-right text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {customers.map((user: any) => (
                <tr key={user.id} className="hover:bg-amber-50/20 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-400 font-black border border-stone-200 group-hover:scale-110 transition-transform uppercase">
                        {user.name?.charAt(0) || user.email.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 group-hover:text-amber-600 transition-colors">{user.name || 'Anonymous'}</p>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
                          <MapPin className="w-3 h-3" />
                          Location N/A
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-stone-600 group-hover:text-stone-900 transition-colors">
                      <Mail className="w-4 h-4 text-stone-300" />
                      <span className="text-sm font-medium">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 bg-stone-50 px-2 py-1 rounded-lg">
                        <ShoppingBag className="w-3 h-3 text-stone-400" />
                        {user.orderCount} Orders
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-stone-900">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                        <Mail className="w-4.5 h-4.5" />
                      </button>
                      <button className="p-2.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                        <MoreHorizontal className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-stone-400 italic">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
