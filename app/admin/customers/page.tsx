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
  Save
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

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
      toast.success('Registry updated successfully');
      setEditingCustomer(null);
    },
    onError: () => toast.error('Failed to update registry')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/customers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
      toast.success('User removed from registry');
    },
    onError: () => toast.error('Failed to remove user')
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
          <h1 className="text-3xl font-black text-stone-900 uppercase tracking-tight leading-none">Client Registry</h1>
          <p className="text-stone-500 font-bold mt-2 uppercase tracking-widest text-[11px]">Management of the ModuLiving community</p>
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
        <button className="px-8 py-4 bg-white border border-stone-100 text-stone-400 font-bold rounded-[10px] hover:text-stone-900 transition-all text-xs uppercase tracking-widest flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Advanced Scan
        </button>
      </div>

      <div className="bg-white rounded-[10px] border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-100 text-left">
                <th className="px-10 py-6 text-[11px] font-black text-stone-400 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-10 py-6 text-[11px] font-black text-stone-400 uppercase tracking-[0.2em]">Join Date</th>
                <th className="px-10 py-6 text-[11px] font-black text-stone-400 uppercase tracking-[0.2em]">Activity</th>
                <th className="px-10 py-6 text-[11px] font-black text-stone-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredCustomers.map((customer: any) => (
                <tr key={customer.id} className="group hover:bg-stone-50/50 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-[10px] border ${customer.isBlocked ? 'bg-stone-100 border-stone-200 text-stone-400' : 'bg-amber-50 border-amber-500/10 text-amber-600'} flex items-center justify-center font-black text-lg shadow-inner group-hover:scale-110 transition-transform`}>
                        {customer.name?.charAt(0) || <User className="w-6 h-6" />}
                      </div>
                      <div>
                        <p className={`font-black uppercase tracking-tight text-lg leading-none ${customer.isBlocked ? 'text-stone-400 line-through' : 'text-stone-900 group-hover:text-amber-600'} transition-colors`}>
                          {customer.name || 'Anonymous User'}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Mail className="w-3.5 h-3.5 text-stone-300" />
                          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{customer.email}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                      <p className="text-sm font-black text-stone-900">{new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Registry Entry</p>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-stone-50 rounded-[10px] border border-stone-100">
                        <ShoppingBag className="w-5 h-5 text-stone-400" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-stone-900 leading-none">{customer.orderCount || 0}</p>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Orders</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${customer.isBlocked ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                      {customer.isBlocked ? (
                        <>
                          <Ban className="w-3.5 h-3.5" />
                          Restricted
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          Authorized
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingCustomer(customer)}
                        className="p-3 bg-stone-50 text-stone-400 border border-transparent rounded-[10px] hover:bg-stone-900 hover:text-white transition-all shadow-sm"
                        title="Edit Identity"
                      >
                        <Edit className="w-4.5 h-4.5" />
                      </button>
                      <button
                        onClick={() => updateMutation.mutate({ id: customer.id, isBlocked: !customer.isBlocked })}
                        className={`p-3 rounded-[10px] border transition-all ${customer.isBlocked ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600' : 'bg-stone-50 text-stone-400 border-transparent hover:bg-red-500 hover:text-white hover:border-red-500'}`}
                        title={customer.isBlocked ? "Restore Access" : "Restrict Access"}
                      >
                        {customer.isBlocked ? <CheckCircle className="w-4.5 h-4.5" /> : <Ban className="w-4.5 h-4.5" />}
                      </button>
                      <button
                        onClick={() => { if (confirm('Terminate this account connection permanently?')) deleteMutation.mutate(customer.id) }}
                        className="p-3 bg-stone-50 text-stone-400 border border-transparent rounded-[10px] hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Permanently Delete"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Refine Identity</h2>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Updating ID: {editingCustomer.id}</p>
              </div>
              <button onClick={() => setEditingCustomer(null)} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400"><X /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Full Designation</label>
                <input
                  type="text"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="w-full px-6 py-4 bg-stone-50 border border-transparent rounded-[12px] focus:bg-white focus:border-amber-500 transition-all outline-none font-bold text-stone-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Contact Email</label>
                <input
                  type="email"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                  className="w-full px-6 py-4 bg-stone-50 border border-transparent rounded-[12px] focus:bg-white focus:border-amber-500 transition-all outline-none font-bold text-stone-900"
                />
              </div>
            </div>
            <div className="p-8 bg-stone-50 border-t border-stone-100 flex gap-4">
              <button
                onClick={() => setEditingCustomer(null)}
                className="flex-1 py-4 bg-white border border-stone-200 text-stone-600 font-bold rounded-[12px] hover:bg-stone-100 transition-all uppercase tracking-widest text-xs"
              >
                Discard
              </button>
              <button
                onClick={() => updateMutation.mutate(editingCustomer)}
                disabled={updateMutation.isPending}
                className="flex-1 py-4 bg-stone-900 text-white font-black rounded-[12px] hover:bg-stone-800 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl"
              >
                {updateMutation.isPending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save className="w-4 h-4" />}
                Commit Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
