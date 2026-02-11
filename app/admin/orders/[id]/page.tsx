'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronLeft,
    Package,
    User,
    CreditCard,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    Printer,
    Mail,
    Phone,
    MapPin,
    ArrowUpRight,
    ExternalLink,
    AlertCircle,
    Info,
    Calendar,
    ChevronDown,
    MoreHorizontal
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';
import { toast } from 'react-hot-toast';

const statusFlow = [
    { value: 'PENDING', label: 'Placed', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { value: 'PROCESSING', label: 'Processing', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { value: 'SHIPPED', label: 'Shipped', icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50' },
    { value: 'DELIVERED', label: 'Delivered', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { value: 'CANCELLED', label: 'Cancelled', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' }
];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { id } = params;

    const { data: order, isLoading } = useQuery({
        queryKey: ['admin-orders', id],
        queryFn: async () => {
            const res = await fetch(`/api/admin/orders/${id}`);
            if (!res.ok) throw new Error('Not found');
            return res.json();
        }
    });

    const updateStatus = useMutation({
        mutationFn: async (status: string) => {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (!res.ok) throw new Error('Update failed');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders', id] });
            toast.success('Order status refined');
        },
        onError: () => toast.error('Failed to update status')
    });

    if (isLoading) return <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
    </div>;

    if (!order) return <div className="p-8 text-center text-stone-500 font-bold uppercase tracking-widest text-[11px]">Nexus Out of Sync: Order missing</div>;

    const currentStatus = statusFlow.find(s => s.value === order.status) || statusFlow[0];

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Minimal Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-all text-stone-500"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-stone-900 tracking-tight">#{order.id.slice(-8).toUpperCase()}</h1>
                            <span className={`px-2 py-0.5 rounded cursor-default text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${currentStatus.bg} ${currentStatus.color}`}>
                                <currentStatus.icon className="w-3 h-3" />
                                {currentStatus.label}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 border border-stone-200 rounded-lg text-stone-500 hover:text-stone-900 transition-all shadow-sm">
                        <Printer className="w-4 h-4" />
                    </button>
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all shadow-sm">
                            Manage Status
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 overflow-hidden">
                            {statusFlow.map((s) => (
                                <button
                                    key={s.value}
                                    onClick={() => updateStatus.mutate(s.value)}
                                    className={`w-full px-4 py-2.5 text-left text-[12px] font-bold uppercase tracking-tight flex items-center justify-between hover:bg-stone-50 transition-colors ${order.status === s.value ? 'bg-stone-50 text-stone-900' : 'text-stone-400'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <s.icon className={`w-3.5 h-3.5 ${order.status === s.value ? 'text-stone-900' : 'text-stone-300'}`} />
                                        {s.label}
                                    </div>
                                    {order.status === s.value && <div className="w-1.5 h-1.5 rounded-full bg-stone-900"></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Items Section */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30 flex items-center justify-between">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Inventory Stack</h3>
                            <span className="text-[11px] font-bold text-stone-900">{order.items.length} positions</span>
                        </div>
                        <div className="divide-y divide-stone-50">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-stone-50/30 transition-colors">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-stone-50 rounded-lg border border-stone-200 overflow-hidden flex-shrink-0">
                                            <img src={item.product?.imageUrl} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight leading-none mb-1">{item.product?.name}</p>
                                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">UNIT: {formatPrice(item.price)} × {item.qty}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-stone-900">{formatPrice(item.price * item.qty)}</p>
                                        <button className="text-[10px] font-bold text-stone-300 hover:text-stone-900 transition-colors uppercase tracking-widest mt-1">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-8 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Economics</p>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-stone-400" />
                                    <p className="text-sm font-black text-stone-900 uppercase tracking-tight">Offline Payment / COD</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest mb-1">Grand Total</p>
                                <p className="text-3xl font-black text-stone-900 tracking-tighter">{formatPrice(order.total)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-6 border border-amber-100 flex items-start gap-4">
                        <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-[13px] font-bold text-amber-900 uppercase mb-1">Logistics Notice</h4>
                            <p className="text-[12px] text-amber-900/60 leading-relaxed font-medium">
                                This order is currently in the <span className="font-bold">{order.status}</span> stage. Deployment to the logistics partner is pending manual authorization if in production.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Context */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Client Identity</h3>
                            <button className="p-1 hover:bg-stone-50 rounded transition-colors text-stone-400"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-center text-stone-900 font-black text-xs">
                                    {order.user?.name?.charAt(0) || <User className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight">{order.user?.name || 'Anonymous'}</p>
                                    <div className="flex items-center gap-1.5 mt-0.5 text-stone-400">
                                        <Mail className="w-3 h-3" />
                                        <span className="text-[10px] font-bold truncate max-w-[120px]">{order.user?.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-stone-50 space-y-4">
                                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                                    <span className="text-stone-400">Join Date</span>
                                    <span className="text-stone-900">{new Date(order.createdAt).getFullYear()}</span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                                    <span className="text-stone-400">Orders</span>
                                    <span className="text-stone-900">1 Total</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-stone-50 border-t border-stone-100">
                            <button className="w-full flex items-center justify-center gap-2 py-2 text-[11px] font-black uppercase tracking-widest text-stone-900 bg-white border border-stone-200 rounded-lg hover:bg-stone-100 transition-all">
                                Open Profile <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Deployment</h3>
                            <div className="p-1 text-emerald-600 bg-emerald-50 rounded"><Truck className="w-3.5 h-3.5" /></div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                                    <MapPin className="w-3.5 h-3.5" /> Arrival Coordinate
                                </div>
                                <p className="text-[14px] font-bold text-stone-900 leading-snug tracking-tight">
                                    {order.address || 'Deployment coordinate not mapped.'}
                                </p>
                            </div>
                            <div className="pt-6 border-t border-stone-50">
                                <button className="w-full flex items-center justify-center gap-2 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10">
                                    Coordinate Dispatch <ExternalLink className="w-3.5 h-3.5 ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
