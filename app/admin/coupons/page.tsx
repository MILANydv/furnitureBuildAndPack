'use client';

import {
  Tag,
  Plus,
  Search,
  Filter,
  Calendar,
  Zap,
  MoreHorizontal,
  Edit,
  Trash2,
  Ticket,
  Activity,
  History,
  TrendingDown,
  Percent,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

async function fetchCoupons() {
  const res = await fetch('/api/admin/coupons');
  if (!res.ok) throw new Error('Failed to fetch coupons');
  return res.json();
}

export default function AdminCouponsPage() {
  const queryClient = useQueryClient();
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['admin-coupons'],
    queryFn: fetchCoupons,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
      toast.success('Promotion terminated');
    },
    onError: () => toast.error('Revoke failed')
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Sleek Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-8 mt-4">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Voucher Forge</h1>
          <div className="flex items-center gap-2 mt-1">
            <Ticket className="w-3.5 h-3.5 text-stone-400" />
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{coupons.length} Active Codes</p>
          </div>
        </div>
        <Link href="/admin/coupons/new" className="px-5 py-2 bg-stone-900 text-white text-[13px] font-bold rounded-lg hover:bg-stone-800 transition-all flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          Mint New Code
        </Link>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Promotion Token</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Economics</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest text-center">Engagement</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest text-right">Expiration</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold text-stone-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {coupons.map((coupon: any) => (
                <tr key={coupon.id} className="hover:bg-stone-50/30 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-900 text-[10px] font-black group-hover:bg-stone-900 group-hover:text-white transition-all">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-stone-900 tracking-widest leading-none mb-1 uppercase">{coupon.code}</p>
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${coupon.isActive ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                            {coupon.isActive ? 'Authorized' : 'Terminated'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {coupon.discountType === 'PERCENTAGE' ? <Percent className="w-3.5 h-3.5 text-stone-400" /> : <TrendingDown className="w-3.5 h-3.5 text-stone-400" />}
                      <span className="text-[13px] font-black text-stone-900 uppercase tracking-tight">
                        {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}% Off` : `NPR ${coupon.discountValue} Off`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[13px] font-black text-stone-900">{coupon.usedCount || 0}</span>
                    <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">Claims recorded</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight">{new Date(coupon.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">Valid Unit Date</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <Link href={`/admin/coupons/${coupon.id}/edit`} className="p-2 text-stone-300 hover:text-stone-900 transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => { if (confirm('Revoke this code?')) deleteMutation.mutate(coupon.id) }}
                        className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {coupons.length === 0 && (
            <div className="p-16 text-center">
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">No promotion tokens found in the forge.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
