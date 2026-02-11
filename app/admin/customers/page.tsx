'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  User,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  ArrowUpRight,
  Shield
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

async function fetchCustomers() {
  const res = await fetch('/api/admin/customers');
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
}

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['admin-customers'],
    queryFn: fetchCustomers,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
    </div>
  );

  const filteredCustomers = customers.filter((c: any) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tight leading-none">Client Registry</h1>
          <p className="text-stone-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Management of the ModuLiving community</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white border border-stone-100 rounded-[10px] flex items-center gap-3">
            <Shield className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black text-stone-900 uppercase tracking-widest">KYC Compliant</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[10px] p-4 shadow-sm border border-stone-100 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-amber-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by verified email, user name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-4 bg-stone-50 border-transparent rounded-[10px] focus:bg-white focus:border-amber-500/10 transition-all outline-none font-bold text-stone-900 text-sm"
          />
        </div>
        <button className="px-8 py-4 bg-white border border-stone-100 text-stone-400 font-bold rounded-[10px] hover:text-stone-900 transition-all text-xs uppercase tracking-widest">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCustomers.map((customer: any) => (
          <div key={customer.id} className="bg-white rounded-[10px] border border-stone-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
            <div className="p-10 pb-8 flex items-center gap-6">
              <div className="w-16 h-16 bg-amber-50 rounded-[10px] border border-amber-500/10 flex items-center justify-center text-amber-600 font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                {customer.name?.charAt(0) || <User className="w-8 h-8" />}
              </div>
              <div>
                <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">{customer.name || 'Anonymous'}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">{customer.role}</p>
                </div>
              </div>
            </div>

            <div className="px-10 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-[10px] border border-transparent group-hover:border-stone-100 transition-all">
                <Mail className="w-4.5 h-4.5 text-stone-300" />
                <span className="text-xs font-bold text-stone-500 truncate">{customer.email}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-[10px] border border-transparent group-hover:border-stone-100 transition-all">
                <ShoppingBag className="w-4.5 h-4.5 text-stone-300" />
                <span className="text-xs font-bold text-stone-500">{customer._count?.orders || 0} Total Transactions</span>
              </div>
            </div>

            <div className="p-10 flex items-center justify-between border-t border-stone-50 mt-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-stone-300" />
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Member Since {new Date(customer.createdAt).getFullYear()}</span>
              </div>
              <button className="p-4 bg-stone-50 text-stone-300 rounded-[10px] group-hover:bg-stone-900 group-hover:text-white transition-all shadow-sm">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
