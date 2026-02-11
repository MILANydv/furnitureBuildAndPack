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
    Layers
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-stone-900 leading-tight uppercase tracking-tight">Analytics Center</h1>
                    <p className="text-stone-500 font-bold mt-2 uppercase tracking-[0.1em] text-xs">Deep scan of store performance metrics</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 bg-white border border-stone-200 rounded-[1.5rem] flex items-center gap-3">
                        <Target className="w-5 h-5 text-amber-500" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-stone-400 uppercase leading-none mb-1">Store Target</span>
                            <span className="text-sm font-black text-stone-900 leading-none">84.2% Reached</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Primary Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Net Revenue', value: formatPrice(stats.totalRevenue), icon: DollarSign, trend: stats.revenueGrowth, up: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Order Volume', value: stats.totalOrders.toString(), icon: ShoppingBag, trend: stats.orderGrowth, up: true, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Customer Base', value: stats.totalCustomers.toString(), icon: Users, trend: stats.customerGrowth, up: true, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Catalog Size', value: stats.totalProducts.toString(), icon: Box, trend: stats.productGrowth, up: true, color: 'text-amber-600', bg: 'bg-amber-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} -mr-16 -mt-16 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700`}></div>
                        <div className="relative">
                            <div className="flex justify-between items-start mb-8">
                                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                    <stat.icon className="w-7 h-7" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                                <div className="flex items-end gap-3">
                                    <p className="text-3xl font-black text-stone-900 leading-none">{stat.value}</p>
                                    <div className={`flex items-center gap-1 text-[11px] font-black ${stat.up ? 'text-emerald-600' : 'text-red-600'} pb-1`}>
                                        {stat.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                        {stat.trend}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Top Products */}
                <div className="lg:col-span-3 bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-900 border border-stone-100">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Best Sellers</h2>
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Based on recent sales volume</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-stone-50 rounded-xl text-xs font-bold text-stone-600 border border-stone-100 uppercase tracking-widest">Global</div>
                    </div>

                    <div className="space-y-6">
                        {stats.topProducts.map((product: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-2xl transition-colors group">
                                <div className="flex items-center gap-6">
                                    <span className="w-8 text-sm font-black text-stone-300">#{i + 1}</span>
                                    <div>
                                        <p className="font-black text-stone-900 group-hover:text-amber-600 transition-colors uppercase tracking-tight">{product.name}</p>
                                        <p className="text-xs font-bold text-stone-400 mt-1 uppercase tracking-widest">{product.sold} Units Sold</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-stone-900">{formatPrice(product.revenue)}</p>
                                    <div className="w-24 h-1.5 bg-stone-100 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (product.revenue / stats.totalRevenue) * 500)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="lg:col-span-2 bg-[#1A1C1E] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 -mr-32 -mt-32 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-125"></div>

                    <div className="relative">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-500 backdrop-blur-sm border border-white/5">
                                <PieChart className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-white uppercase tracking-tight">Segments</h2>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Product distribution</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {stats.categories.map((cat: any, i: number) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-black uppercase tracking-widest">{cat.name}</span>
                                        <span className="text-xs font-bold text-white/40">{cat.count} Items</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 rounded-full shadow-lg shadow-amber-500/50" style={{ width: `${(cat.count / stats.totalProducts) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-8 border-t border-white/10 mt-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/30">
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] leading-relaxed">Inventory Utilization is currently at 89% capacity</p>
                                </div>
                                <button className="w-full py-4 bg-white text-stone-900 font-black rounded-2xl hover:bg-amber-500 hover:text-white transition-all text-xs uppercase tracking-widest active:scale-95 shadow-xl shadow-white/5">
                                    Expand Catalog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Insights Placeholder */}
            <div className="bg-white p-12 rounded-[3.5rem] border border-stone-200 min-h-[500px] flex flex-col items-center justify-center text-center space-y-8 shadow-sm">
                <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-600 shadow-xl shadow-amber-500/5 animate-bounce-slow">
                    <BarChart3 className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tight">Behavioral Intelligence</h2>
                    <p className="text-stone-500 max-w-xl font-bold uppercase tracking-widest text-[10px] leading-relaxed">Predictive engine is currently indexing past transaction patterns to provide revenue forecasting.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-10 py-4 bg-stone-900 text-white font-black rounded-2xl hover:bg-stone-800 transition-all text-xs uppercase tracking-widest shadow-2xl active:scale-95">
                        Download Full Dataset
                    </button>
                    <button className="px-10 py-4 bg-white border border-stone-200 text-stone-900 font-black rounded-2xl hover:bg-stone-50 transition-all text-xs uppercase tracking-widest active:scale-95">
                        Schedule Report
                    </button>
                </div>
            </div>
            <style jsx global>{`
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
