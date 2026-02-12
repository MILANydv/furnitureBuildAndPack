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
  Shield,
  Trash2,
  Ban,
  CheckCircle,
  Edit,
  History,
  X,
  Save,
  Users,
  ChevronDown,
  Activity,
  Eye
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

async function fetchCustomers() {
  const res = await fetch('/api/admin/customers');
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
}

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['admin-customers'],
    queryFn: fetchCustomers,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const res = await fetch(`/api/admin/customers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Update failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
      toast.success('Registry updated');
      setEditingCustomer(null);
    },
    onError: () => toast.error('Update failed')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/customers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
      toast.success('Client base refined');
    },
    onError: () => toast.error('Purge failed')
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
    </div>
  );

  const filteredCustomers = customers.filter((c: any) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      {/* Sleek Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-8 mt-4">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Access Registry</h1>
          <div className="flex items-center gap-2 mt-1">
            <Users className="w-3.5 h-3.5 text-stone-400" />
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{customers.length} Verified Identities</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-emerald-600">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">KYC Secure</span>
          </div>
        </div>
      </div>

      {/* Search Area */}
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm flex items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-stone-900 transition-all" />
          <input
            type="text"
            placeholder="Lookup identity by name or digital address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none pl-11 pr-4 py-2 text-[13px] font-bold text-stone-900 outline-none placeholder:text-stone-300"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-stone-400 hover:text-stone-900 transition-colors text-[12px] font-bold uppercase tracking-tight">
          <Filter className="w-4 h-4" />
          Scan Filters
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Client Identity</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Access State</th>
                <th className="px-6 py-4 text-center text-[11px] font-bold text-stone-400 uppercase tracking-widest">Order Hist.</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold text-stone-400 uppercase tracking-widest">Registry Date</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold text-stone-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredCustomers.map((customer: any) => (
                <tr key={customer.id} className="hover:bg-stone-50/30 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg border border-stone-100 flex items-center justify-center font-black text-xs ${customer.isBlocked ? 'bg-stone-50 text-stone-300' : 'bg-stone-900 text-white'}`}>
                        {customer.name?.charAt(0) || <User className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight leading-none mb-1">{customer.name || 'Anonymous'}</p>
                        <p className="text-[10px] text-stone-400 font-medium truncate max-w-[150px]">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${customer.isBlocked ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                      {customer.isBlocked ? 'Restricted' : 'Authorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[13px] font-black text-stone-900">{customer.orderCount || 0}</span>
                    <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">Trans.</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-[12px] font-bold text-stone-900 uppercase tracking-tight">{new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Vintage</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="p-2 text-stone-300 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setEditingCustomer(customer)}
                        className="p-2 text-stone-300 hover:text-stone-900 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateMutation.mutate({ id: customer.id, isBlocked: !customer.isBlocked })}
                        className={`p-2 transition-colors ${customer.isBlocked ? 'text-emerald-500 hover:text-emerald-600' : 'text-stone-300 hover:text-red-500'}`}
                      >
                        {customer.isBlocked ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => { if (confirm('Purge this record?')) deleteMutation.mutate(customer.id) }}
                        className="p-2 text-stone-300 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="p-16 text-center text-[11px] font-bold text-stone-400 uppercase tracking-widest">Registry scan complete: No matching identities.</div>
          )}
        </div>
      </div>

      {/* Edit Modal (Sleek Overlay) */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-stone-900 uppercase">Refine Identity</h2>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Registry Patch Protocol</p>
              </div>
              <button onClick={() => setEditingCustomer(null)} className="p-2 hover:bg-stone-50 rounded-lg text-stone-400 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Name</label>
                <input
                  type="text"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-[13px] font-bold outline-none focus:border-stone-900 transition-all font-sans"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-[13px] font-bold outline-none focus:border-stone-900 transition-all font-sans"
                />
              </div>
            </div>
            <div className="p-6 bg-stone-50 border-t border-stone-100 flex gap-3">
              <button
                onClick={() => setEditingCustomer(null)}
                className="flex-1 py-2 text-[11px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
              >
                Discard
              </button>
              <button
                onClick={() => updateMutation.mutate(editingCustomer)}
                disabled={updateMutation.isPending}
                className="flex-1 py-2 bg-stone-900 text-white text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
              >
                {updateMutation.isPending ? 'Syncing...' : 'Commit changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
