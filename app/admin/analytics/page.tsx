'use client';

import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingBag,
    Users,
    Box,
    ArrowUpRight,
    Target,
    Activity,
    PieChart,
    Layers,
    ChevronDown,
    Calendar,
    Download,
    Filter,
    Info
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';

async function fetchStats() {
    const res = await fetch('/api/admin/stats');
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
}

export default function AdminAnalytics() {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: fetchStats,
    });

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
        </div>
    );

    return (
        <div className="p-6 space-y-8">
            {/* Contextual Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-8 mt-4">
                <div>
                    <h1 className="text-xl font-bold text-stone-900 tracking-tight">Analytics Workspace</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Live store performance data</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-lg text-[13px] font-bold text-stone-600 hover:bg-stone-50 transition-all">
                        <Calendar className="w-4 h-4" />
                        Last 30 days
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 border border-stone-200 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-50">
                        <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-stone-200 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-50">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Compact Metric Ribbons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), trend: stats.revenueGrowth, icon: DollarSign },
                    { label: 'Order Volume', value: stats.totalOrders.toString(), trend: stats.orderGrowth, icon: ShoppingBag },
                    { label: 'Active Users', value: stats.totalCustomers.toString(), trend: stats.customerGrowth, icon: Users },
                    { label: 'Catalog Size', value: stats.totalProducts.toString(), trend: stats.productGrowth, icon: Box }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between hover:border-stone-400 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{item.label}</span>
                            <item.icon className="w-4 h-4 text-stone-300 group-hover:text-stone-900 transition-colors" />
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-2xl font-black text-stone-900 tracking-tighter">{item.value}</span>
                            <div className="flex items-center gap-1 text-[11px] font-black text-emerald-600 mb-1">
                                <TrendingUp className="w-3 h-3" />
                                {item.trend}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Secondary Data Blocks */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Performance Graph Placeholder */}
                    <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-sm font-bold text-stone-900 uppercase">Revenue Flow</h3>
                                <p className="text-[11px] font-medium text-stone-400 mt-1">Transaction patterns across the timeline</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                                    <span className="text-[10px] font-bold text-stone-500 uppercase">Current</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-stone-200"></span>
                                    <span className="text-[10px] font-bold text-stone-500 uppercase">Previous</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[280px] w-full bg-stone-50 rounded-lg flex items-center justify-center border border-dashed border-stone-200 relative overflow-hidden">
                            <Activity className="w-12 h-12 text-stone-200" />
                            <div className="absolute inset-0 flex items-end px-4 py-8 pointer-events-none opacity-20">
                                <div className="w-full h-1/2 bg-gradient-to-t from-stone-900 to-transparent rounded-t-xl"></div>
                            </div>
                            <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest absolute bottom-4">Real-time Visualization Module</span>
                        </div>
                    </div>

                    {/* Top Performing List */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-stone-900 uppercase">Strategic Inventory</h3>
                            <button className="text-[11px] font-bold text-stone-400 hover:text-stone-900 uppercase">View All</button>
                        </div>
                        <div className="divide-y divide-stone-50">
                            {stats.topProducts.map((p: any, i: number) => (
                                <div key={i} className="px-8 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-black text-stone-300">#{i + 1}</span>
                                        <div>
                                            <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight">{p.name}</p>
                                            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">{p.sold} Units Moved</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-stone-900">{formatPrice(p.revenue)}</p>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-1">
                                            <TrendingUp className="w-2.5 h-2.5" />
                                            +12%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Context */}
                <div className="space-y-8">
                    <div className="bg-stone-900 rounded-xl p-8 text-white shadow-xl">
                        <PieChart className="w-6 h-6 text-stone-400 mb-6" />
                        <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-6">Segment Mix</h3>
                        <div className="space-y-6">
                            {stats.categories.map((c: any, i: number) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">{c.name}</span>
                                        <span className="text-[10px] font-bold text-white/50">{c.count} items</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-white rounded-full opacity-80" style={{ width: `${(c.count / stats.totalProducts) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                    <Info className="w-4 h-4 text-stone-400" />
                                </div>
                                <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                                    Inventory efficiency is operating at peak performance. Core category 'Living Room' represents 42% of total capital.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm border-dashed">
                        <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Pulse Intelligence</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <p className="text-[12px] font-bold text-stone-900 tracking-tight">AI Insights indexing...</p>
                            </div>
                            <p className="text-[11px] text-stone-500 leading-relaxed font-medium">
                                Predicting a 14% surge in 'Bedroom' segment interest for the upcoming fiscal quarter based on current search trends.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
