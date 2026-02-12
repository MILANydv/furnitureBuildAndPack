'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Edit,
    Trash2,
    Tag,
    Calendar,
    Percent,
    TrendingDown,
    Zap,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    Ticket,
    DollarSign,
    Users,
    Clock,
    AlertCircle
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';
import { toast } from 'react-hot-toast';

export default function CouponDetailPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const params = useParams();
    const id = params.id as string;

    const { data: coupon, isLoading } = useQuery({
        queryKey: ['admin-coupon', id],
        queryFn: async () => {
            const res = await fetch(`/api/admin/coupons/${id}`);
            if (!res.ok) throw new Error('Not found');
            return res.json();
        }
    });

    const toggleActiveMutation = useMutation({
        mutationFn: async (isActive: boolean) => {
            const res = await fetch(`/api/admin/coupons/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive }),
            });
            if (!res.ok) throw new Error('Update failed');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-coupon', id] });
            queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
            toast.success(coupon?.isActive ? 'Coupon deactivated' : 'Coupon activated');
        },
        onError: () => toast.error('Update failed')
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
            toast.success('Coupon deleted');
            router.push('/admin/coupons');
        },
        onError: () => toast.error('Delete failed')
    });

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
        </div>
    );

    if (!coupon) return (
        <div className="p-8 text-center text-stone-500 font-bold uppercase tracking-widest text-[11px]">
            Coupon not found
        </div>
    );

    const isExpired = new Date(coupon.validUntil) < new Date();
    const usedCount = coupon._count?.orders || coupon.usedCount || 0;
    const remainingUses = coupon.maxUses ? coupon.maxUses - usedCount : 'Unlimited';
    const isFullyUsed = coupon.maxUses && usedCount >= coupon.maxUses;

    return (
        <div className="p-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-all text-stone-500"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center ${
                            coupon.isActive && !isExpired && !isFullyUsed
                                ? 'bg-stone-900 text-white border-stone-900'
                                : 'bg-stone-50 text-stone-300 border-stone-200'
                        }`}>
                            <Zap className="w-8 h-8" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-stone-900 tracking-tight uppercase font-mono">
                                    {coupon.code}
                                </h1>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                    coupon.isActive && !isExpired && !isFullyUsed
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'bg-red-50 text-red-600'
                                }`}>
                                    {coupon.isActive && !isExpired && !isFullyUsed ? (
                                        <CheckCircle2 className="w-3 h-3" />
                                    ) : (
                                        <XCircle className="w-3 h-3" />
                                    )}
                                    {coupon.isActive && !isExpired && !isFullyUsed ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                                ID: {coupon.id.slice(-8).toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => toggleActiveMutation.mutate(!coupon.isActive)}
                        disabled={toggleActiveMutation.isPending}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                            coupon.isActive
                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                    >
                        {coupon.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        {coupon.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <Link
                        href={`/admin/coupons/${coupon.id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all shadow-sm"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Coupon
                    </Link>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this coupon? This action cannot be undone.')) {
                                deleteMutation.mutate();
                            }
                        }}
                        disabled={deleteMutation.isPending}
                        className="p-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-all shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Coupon Details */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Coupon Information</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Discount Type</label>
                                    <div className="flex items-center gap-2">
                                        {coupon.discountType === 'PERCENTAGE' ? (
                                            <Percent className="w-4 h-4 text-stone-400" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-stone-400" />
                                        )}
                                        <span className="text-[13px] font-bold text-stone-900 uppercase">
                                            {coupon.discountType === 'PERCENTAGE' ? 'Percentage' : 'Fixed Amount'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Discount Value</label>
                                    <p className="text-[13px] font-black text-stone-900">
                                        {coupon.discountType === 'PERCENTAGE' 
                                            ? `${coupon.discountValue}%` 
                                            : formatPrice(coupon.discountValue)}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Minimum Order</label>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-stone-400" />
                                        <p className="text-[13px] font-bold text-stone-900">
                                            {coupon.minOrderAmount ? formatPrice(coupon.minOrderAmount) : 'No minimum'}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Maximum Uses</label>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-stone-400" />
                                        <p className="text-[13px] font-bold text-stone-900">
                                            {coupon.maxUses || 'Unlimited'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Validity Period */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Validity Period</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Valid From</label>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-stone-400" />
                                        <p className="text-[13px] font-bold text-stone-900">
                                            {new Date(coupon.validFrom).toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Valid Until</label>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-stone-400" />
                                        <p className={`text-[13px] font-bold ${
                                            isExpired ? 'text-red-600' : 'text-stone-900'
                                        }`}>
                                            {new Date(coupon.validUntil).toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {isExpired && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-bold text-red-900 uppercase tracking-tight mb-1">Expired</p>
                                        <p className="text-[11px] text-red-700">This coupon has expired and is no longer valid.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Stats */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-stone-100">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Usage Statistics</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <Ticket className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Times Used</p>
                                        <p className="text-[14px] font-black text-stone-900">{usedCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <Users className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Remaining Uses</p>
                                        <p className="text-[14px] font-black text-stone-900">
                                            {typeof remainingUses === 'number' ? remainingUses : '∞'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {isFullyUsed && (
                                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                                    <p className="text-[10px] font-bold text-amber-900 uppercase tracking-widest">
                                        Maximum uses reached
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-stone-900 rounded-xl p-6 text-white shadow-xl">
                        <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Quick Actions</h4>
                        <div className="space-y-2">
                            <Link
                                href={`/admin/coupons/${coupon.id}/edit`}
                                className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
                            >
                                <span className="text-[12px] font-bold uppercase tracking-tight">Edit Coupon</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </Link>
                            <button
                                onClick={() => toggleActiveMutation.mutate(!coupon.isActive)}
                                disabled={toggleActiveMutation.isPending}
                                className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
                            >
                                <span className="text-[12px] font-bold uppercase tracking-tight">
                                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                                </span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
