import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import Link from 'next/link';
import { Tag, Plus, Search, Filter, Calendar, Zap, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

export default async function AdminCouponsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 leading-none mb-2">Promotions & Coupons</h1>
          <p className="text-stone-500 font-medium">Create and manage marketing discounts and codes.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/coupons/new" className="px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2 text-sm shadow-xl shadow-stone-900/10 active:scale-95">
            <Plus className="w-4 h-4" />
            New Coupon Code
          </Link>
        </div>
      </div>

      {/* Grid for Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Total Coupons</p>
          <p className="text-2xl font-black text-stone-900">{coupons.length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-green-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Active Now</p>
          <p className="text-2xl font-black">{coupons.filter(c => c.isActive).length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-blue-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Redemptions</p>
          <p className="text-2xl font-black">{coupons.reduce((sum, c) => sum + (c.usedCount || 0), 0)}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-amber-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Top Performer</p>
          <p className="text-2xl font-black">SAVE20</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by code or description..."
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-amber-500 focus:ring-0 transition-all font-medium text-stone-900"
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-6 py-3 bg-stone-50 border border-transparent rounded-2xl flex items-center justify-center gap-2 font-bold text-stone-600 hover:bg-stone-100 transition-all text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-stone-200 overflow-hidden shadow-stone-200/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/80 border-b border-stone-100">
              <tr>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Coupon Code</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Discount</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Usage Limit</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Expiry</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-right text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-amber-50/20 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 border border-amber-100">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="font-black text-stone-900 tracking-wider text-sm">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-lg font-black text-stone-900 leading-none">
                      {coupon.discountType === 'PERCENTAGE'
                        ? `${coupon.discountValue}%`
                        : `NPR ${coupon.discountValue}`}
                    </span>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">OFF TOTAL ORDER</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[100px] h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: coupon.maxUses ? `${(coupon.usedCount / coupon.maxUses) * 100}%` : '5%' }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-stone-500">{coupon.usedCount} / {coupon.maxUses || '∞'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-stone-600">
                      <Calendar className="w-3.5 h-3.5 text-stone-300" />
                      <span className="text-sm font-bold">{new Date(coupon.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${coupon.isActive
                        ? 'bg-green-50 text-green-700 ring-green-600/10'
                        : 'bg-stone-50 text-stone-500 ring-stone-600/10'
                      }`}>
                      {coupon.isActive ? 'Live' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Edit className="w-4.5 h-4.5" />
                      </button>
                      <button className="p-2.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                      <button className="p-2.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                        <MoreHorizontal className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-stone-400 font-medium italic">No promotion codes created yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
