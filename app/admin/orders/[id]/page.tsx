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
    MapPin
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';

const statusFlow = [
    { value: 'PENDING', label: 'Order Placed', icon: Clock, color: 'text-amber-500' },
    { value: 'PROCESSING', label: 'In Production', icon: Package, color: 'text-blue-500' },
    { value: 'SHIPPED', label: 'En Route', icon: Truck, color: 'text-purple-500' },
    { value: 'DELIVERED', label: 'Handed Over', icon: CheckCircle2, color: 'text-emerald-500' },
    { value: 'CANCELLED', label: 'Terminated', icon: XCircle, color: 'text-red-500' }
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
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders', id] });
        }
    });

    if (isLoading) return <div className="animate-pulse space-y-8">
        <div className="h-20 bg-stone-100 rounded-[10px] w-full"></div>
        <div className="grid grid-cols-3 gap-8">
            <div className="h-96 bg-stone-100 rounded-[10px] col-span-2"></div>
            <div className="h-96 bg-stone-100 rounded-[10px]"></div>
        </div>
    </div>;

    if (!order) return <div>Order not found</div>;

    const currentStatusIdx = statusFlow.findIndex(s => s.value === order.status);

    return (
        <div className="space-y-10 pb-24 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <button onClick={() => router.back()} className="p-4 bg-white border border-stone-100 rounded-[10px] text-stone-900 hover:bg-stone-50 transition-all shadow-sm">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black text-stone-900 uppercase tracking-tight">Order #{order.id.slice(-8).toUpperCase()}</h1>
                            <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-stone-900 text-white`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mt-2">
                            Transaction recorded on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white border border-stone-200 rounded-[10px] text-stone-900 font-bold hover:bg-stone-50 transition-all text-xs uppercase tracking-widest flex items-center gap-2 shadow-sm">
                        <Printer className="w-4 h-4" />
                        Print Manifest
                    </button>
                </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white p-10 rounded-[10px] border border-stone-100 shadow-sm overflow-hidden">
                <div className="flex justify-between relative">
                    <div className="absolute top-7 left-0 w-full h-1 bg-stone-100 -z-10"></div>
                    <div
                        className="absolute top-7 left-0 h-1 bg-amber-500 -z-10 transition-all duration-1000"
                        style={{ width: `${(currentStatusIdx / (statusFlow.length - 1)) * 100}%` }}
                    ></div>

                    {statusFlow.slice(0, 4).map((step, i) => {
                        const isPast = i < currentStatusIdx;
                        const isCurrent = i === currentStatusIdx;
                        return (
                            <div key={step.value} className="flex flex-col items-center gap-4">
                                <div className={`w-14 h-14 rounded-[10px] flex items-center justify-center transition-all duration-500 ring-8 ring-white ${isPast || isCurrent ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/30' : 'bg-stone-100 text-stone-300'}`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <div className="text-center">
                                    <p className={`text-[11px] font-bold uppercase tracking-widest ${isPast || isCurrent ? 'text-stone-900' : 'text-stone-300'}`}>{step.label}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* Order Items */}
                    <section className="bg-white rounded-[10px] border border-stone-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-stone-100 bg-stone-50/50">
                            <h2 className="text-[12px] font-black text-stone-900 uppercase tracking-widest flex items-center gap-3">
                                <Package className="w-5 h-5 text-amber-500" />
                                Component Inventory
                            </h2>
                        </div>
                        <div className="divide-y divide-stone-50">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="p-8 flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-stone-50 rounded-[10px] border border-stone-100 overflow-hidden">
                                            <img src={item.product?.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div>
                                            <p className="font-black text-stone-900 uppercase tracking-tight">{item.product?.name}</p>
                                            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mt-1">Quantity: {item.qty} units</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-stone-900">{formatPrice(item.price * item.qty)}</p>
                                        <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mt-1">{formatPrice(item.price)} / unit</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-10 bg-stone-900 text-white">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-2">Total Value</p>
                                    <p className="text-4xl font-black">{formatPrice(order.total)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-white/50 mb-1">Payment Method</p>
                                    <div className="flex items-center gap-2 justify-end">
                                        <CreditCard className="w-4 h-4 text-amber-500" />
                                        <span className="text-sm font-black uppercase tracking-widest">NPR Offline / COD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Quick Updates */}
                    <section className="bg-white p-10 rounded-[10px] border border-stone-100 shadow-sm">
                        <h2 className="text-[12px] font-black text-stone-900 uppercase tracking-widest mb-8">System Overrides</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {statusFlow.map((s) => (
                                <button
                                    key={s.value}
                                    onClick={() => updateStatus.mutate(s.value)}
                                    disabled={order.status === s.value || updateStatus.isPending}
                                    className={`p-6 rounded-[10px] flex items-center justify-between border transition-all ${order.status === s.value ? 'bg-amber-50 border-amber-500/20 text-amber-900' : 'bg-stone-50 border-transparent hover:border-stone-200 text-stone-600'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <s.icon className={`w-5 h-5 ${order.status === s.value ? 'text-amber-500' : 'text-stone-300'}`} />
                                        <span className="text-[11px] font-bold uppercase tracking-widest">{s.label}</span>
                                    </div>
                                    {order.status === s.value && <CheckCircle2 className="w-4 h-4 text-amber-500" />}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Logistics */}
                <div className="space-y-10">
                    <section className="bg-[#1A1C1E] p-10 rounded-[10px] text-white shadow-2xl space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-[10px] flex items-center justify-center text-amber-500">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-white uppercase tracking-tight">Customer Info</h2>
                                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mt-1">Acquisition Details</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-[10px] flex items-center justify-center text-stone-400">
                                    <Mail className="w-4.5 h-4.5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-1">Email Channel</span>
                                    <span className="text-sm font-bold text-white/80">{order.user?.email}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-[10px] flex items-center justify-center text-stone-400">
                                    <Phone className="w-4.5 h-4.5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-1">Direct Line</span>
                                    <span className="text-sm font-bold text-white/80">{order.user?.phone || '+977 N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[10px] border border-stone-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <MapPin className="w-5 h-5 text-amber-500" />
                            <h2 className="text-[12px] font-black text-stone-900 uppercase tracking-widest">Deployment Address</h2>
                        </div>

                        <div className="bg-stone-50 p-8 rounded-[10px] border border-stone-100">
                            <p className="text-sm font-bold text-stone-900 leading-relaxed uppercase tracking-tight mb-4">
                                {order.address || 'Address information was not captured for this manual order. Please contact customer.'}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest">
                                <Truck className="w-3.5 h-3.5" />
                                Express Priority Delivery
                            </div>
                        </div>

                        <button className="w-full py-4 bg-stone-900 text-white font-black rounded-[10px] hover:bg-stone-800 transition-all text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-stone-900/10">
                            Open in Logistics Engine
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
