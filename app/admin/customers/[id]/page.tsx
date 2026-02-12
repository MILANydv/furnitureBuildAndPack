'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Edit,
    Trash2,
    User,
    Mail,
    Calendar,
    ShoppingBag,
    Shield,
    Ban,
    CheckCircle,
    ArrowUpRight,
    Package,
    DollarSign,
    Clock,
    CheckCircle2,
    XCircle,
    Truck,
    CreditCard
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';
import { toast } from 'react-hot-toast';

const statusConfig: any = {
    PENDING: { color: 'text-amber-500', bg: 'bg-amber-50', label: 'Pending', icon: Clock },
    PROCESSING: { color: 'text-blue-500', bg: 'bg-blue-50', label: 'Processing', icon: Package },
    SHIPPED: { color: 'text-purple-500', bg: 'bg-purple-50', label: 'Shipped', icon: Truck },
    DELIVERED: { color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Delivered', icon: CheckCircle2 },
    CANCELLED: { color: 'text-red-500', bg: 'bg-red-50', label: 'Cancelled', icon: XCircle },
};

export default function CustomerDetailPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const params = useParams();
    const id = params.id as string;

    const { data: customer, isLoading } = useQuery({
        queryKey: ['admin-customer', id],
        queryFn: async () => {
            const res = await fetch(`/api/admin/customers/${id}`);
            if (!res.ok) throw new Error('Not found');
            return res.json();
        }
    });

    const toggleBlockMutation = useMutation({
        mutationFn: async (isBlocked: boolean) => {
            const res = await fetch(`/api/admin/customers/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isBlocked }),
            });
            if (!res.ok) throw new Error('Update failed');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-customer', id] });
            queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
            toast.success(customer?.isBlocked ? 'Customer unblocked' : 'Customer blocked');
        },
        onError: () => toast.error('Update failed')
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/admin/customers/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
            toast.success('Customer deleted');
            router.push('/admin/customers');
        },
        onError: () => toast.error('Delete failed')
    });

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
        </div>
    );

    if (!customer) return (
        <div className="p-8 text-center text-stone-500 font-bold uppercase tracking-widest text-[11px]">
            Customer not found
        </div>
    );

    const totalSpent = customer.orders?.reduce((acc: number, order: any) => acc + (order.total || 0), 0) || 0;
    const orderCount = customer._count?.orders || customer.orders?.length || 0;

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
                        <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center font-black text-xl ${
                            customer.isBlocked ? 'bg-stone-50 text-stone-300 border-stone-200' : 'bg-stone-900 text-white border-stone-900'
                        }`}>
                            {customer.name?.charAt(0) || <User className="w-8 h-8" />}
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-stone-900 tracking-tight uppercase">
                                    {customer.name || 'Anonymous'}
                                </h1>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                    customer.isBlocked ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                    {customer.isBlocked ? <Ban className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                    {customer.isBlocked ? 'Blocked' : 'Active'}
                                </span>
                            </div>
                            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                                ID: {customer.id.slice(-8).toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => toggleBlockMutation.mutate(!customer.isBlocked)}
                        disabled={toggleBlockMutation.isPending}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                            customer.isBlocked
                                ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                                : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                        }`}
                    >
                        {customer.isBlocked ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                        {customer.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
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
                    {/* Customer Info */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Customer Information</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Email</label>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-stone-400" />
                                        <p className="text-[13px] font-bold text-stone-900">{customer.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Role</label>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-stone-400" />
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                                            customer.role === 'ADMIN' ? 'bg-purple-50 text-purple-600' : 'bg-stone-50 text-stone-600'
                                        }`}>
                                            {customer.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Member Since</label>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-stone-400" />
                                        <p className="text-[13px] font-bold text-stone-900">
                                            {new Date(customer.createdAt).toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Last Updated</label>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-stone-400" />
                                        <p className="text-[13px] font-bold text-stone-900">
                                            {new Date(customer.updatedAt).toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30 flex items-center justify-between">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Order History</h3>
                            <span className="text-[11px] font-bold text-stone-900">{orderCount} orders</span>
                        </div>
                        <div className="divide-y divide-stone-50">
                            {customer.orders && customer.orders.length > 0 ? (
                                customer.orders.map((order: any) => {
                                    const status = statusConfig[order.status] || statusConfig.PENDING;
                                    return (
                                        <Link
                                            key={order.id}
                                            href={`/admin/orders/${order.id}`}
                                            className="p-6 flex items-center justify-between hover:bg-stone-50/30 transition-colors group"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`p-2 rounded-lg ${status.bg}`}>
                                                    <status.icon className={`w-5 h-5 ${status.color}`} />
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight leading-none mb-1">
                                                        Order #{order.id.slice(-8).toUpperCase()}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-stone-900">{formatPrice(order.total)}</p>
                                                <p className="text-[10px] font-bold text-stone-300 hover:text-stone-900 transition-colors uppercase tracking-widest mt-1 group-hover:underline">
                                                    View Details →
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="p-12 text-center">
                                    <ShoppingBag className="w-12 h-12 text-stone-200 mx-auto mb-3" />
                                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">No orders yet</p>
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
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Statistics</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <ShoppingBag className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Orders</p>
                                        <p className="text-[14px] font-black text-stone-900">{orderCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <DollarSign className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Spent</p>
                                        <p className="text-[14px] font-black text-stone-900">{formatPrice(totalSpent)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-stone-900 rounded-xl p-6 text-white shadow-xl">
                        <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Quick Actions</h4>
                        <div className="space-y-2">
                            <button
                                onClick={() => toggleBlockMutation.mutate(!customer.isBlocked)}
                                disabled={toggleBlockMutation.isPending}
                                className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
                            >
                                <span className="text-[12px] font-bold uppercase tracking-tight">
                                    {customer.isBlocked ? 'Unblock Customer' : 'Block Customer'}
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
