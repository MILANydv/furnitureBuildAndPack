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
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
    }
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tight">Voucher Forge</h1>
          <p className="text-stone-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Registry of market discount levers</p>
        </div>
        <Link href="/admin/coupons/new" className="px-10 py-4 bg-amber-600 text-white font-black rounded-2xl hover:bg-amber-700 transition-all flex items-center gap-2 text-xs uppercase tracking-widest shadow-2xl shadow-amber-600/20 active:scale-95">
          <Plus className="w-4 h-4" />
          Mint New Code
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coupons.map((coupon: any) => (
          <div key={coupon.id} className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="p-8 pb-0 flex justify-between items-start">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-500/10">
                <Ticket className="w-7 h-7" />
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${coupon.isActive ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-500'}`}>
                {coupon.isActive ? 'Active' : 'Expired'}
              </span>
            </div>

            <div className="p-10 pt-6">
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] block mb-2">Discount Token</span>
              <h3 className="text-3xl font-black text-stone-900 tracking-widest uppercase mb-6 group-hover:text-amber-600 transition-colors leading-none">{coupon.code}</h3>

              <div className="grid grid-cols-2 gap-6 bg-stone-50 p-6 rounded-[1.5rem] mb-8 border border-stone-100">
                <div>
                  <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Benefit</p>
                  <p className="text-xl font-black text-stone-900 leading-none">
                    {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}%` : `NPR ${coupon.discountValue}`}
                  </p>
                </div>
                <div className="border-l border-stone-200 pl-6">
                  <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Uses</p>
                  <p className="text-xl font-black text-stone-900 leading-none">{coupon.usedCount || 0} hits</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                <div className="flex items-center gap-2 text-stone-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{new Date(coupon.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/coupons/${coupon.id}/edit`} className="p-3 text-stone-400 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all">
                    <Edit className="w-4.5 h-4.5" />
                  </Link>
                  <button
                    onClick={() => { if (confirm('Revoke this code?')) deleteMutation.mutate(coupon.id) }}
                    className="p-3 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {coupons.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-stone-100 rounded-[3rem]">
            <Zap className="w-16 h-16 text-stone-100 mx-auto mb-4" />
            <p className="font-black text-stone-300 uppercase tracking-widest text-xs">No active promotions</p>
          </div>
        )}
      </div>
    </div>
  );
}
