'use client';

import { useState } from 'react';
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
    Info,
    Package,
    Tag
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart as RechartsPieChart,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const COLORS = ['#1c1917', '#78716c', '#a8a29e', '#d6d3d1', '#e7e5e4'];

async function fetchDashboardStats() {
    const res = await fetch('/api/admin/stats');
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return res.json();
}

async function fetchTrends(days: number = 30) {
    const res = await fetch(`/api/admin/analytics/trends?days=${days}`);
    if (!res.ok) throw new Error('Failed to fetch trends');
    return res.json();
}

async function fetchCategoryStats() {
    const res = await fetch('/api/admin/analytics/categories');
    if (!res.ok) throw new Error('Failed to fetch category stats');
    return res.json();
}

export default function AdminAnalytics() {
    const [timeRange, setTimeRange] = useState<number>(30);

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: fetchDashboardStats,
    });

    const { data: trends, isLoading: trendsLoading } = useQuery({
        queryKey: ['admin-trends', timeRange],
        queryFn: () => fetchTrends(timeRange),
    });

    const { data: categoryStats, isLoading: categoriesLoading } = useQuery({
        queryKey: ['admin-category-stats'],
        queryFn: fetchCategoryStats,
    });

    if (statsLoading || trendsLoading || categoriesLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
            </div>
        );
    }

    const formatGrowth = (value: number) => {
        const sign = value >= 0 ? '+' : '';
        return `${sign}${value.toFixed(1)}%`;
    };

    return (
        <div className="p-6 space-y-8">
            {/* Contextual Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-8 mt-4">
                <div>
                    <h1 className="text-xl font-bold text-stone-900 tracking-tight">Analytics Workspace</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Live store performance data</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative group">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(Number(e.target.value))}
                            className="appearance-none flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-lg text-[13px] font-bold text-stone-600 hover:bg-stone-50 transition-all cursor-pointer pr-8"
                        >
                            <option value={7}>Last 7 days</option>
                            <option value={30}>Last 30 days</option>
                            <option value={90}>Last 90 days</option>
                            <option value={365}>Last year</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400" />
                    </div>
                    <button className="p-2 border border-stone-200 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-all">
                        <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-stone-200 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-all">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Compact Metric Ribbons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        label: 'Total Revenue',
                        value: formatPrice(stats?.revenue?.total || 0),
                        trend: formatGrowth(stats?.growth?.revenueGrowth || 0),
                        icon: DollarSign,
                        subValue: `This month: ${formatPrice(stats?.revenue?.thisMonth || 0)}`,
                    },
                    {
                        label: 'Order Volume',
                        value: stats?.orders?.total?.toString() || '0',
                        trend: formatGrowth(stats?.growth?.orderGrowth || 0),
                        icon: ShoppingBag,
                        subValue: `Avg: ${formatPrice(stats?.orders?.averageOrderValue || 0)}`,
                    },
                    {
                        label: 'Active Users',
                        value: stats?.customers?.active?.toString() || '0',
                        trend: formatGrowth(stats?.growth?.customerGrowth || 0),
                        icon: Users,
                        subValue: `Total: ${stats?.customers?.total || 0}`,
                    },
                    {
                        label: 'Catalog Size',
                        value: stats?.products?.total?.toString() || '0',
                        trend: formatGrowth(stats?.growth?.productGrowth || 0),
                        icon: Box,
                        subValue: `In stock: ${stats?.products?.inStock || 0}`,
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between hover:border-stone-400 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{item.label}</span>
                            <item.icon className="w-4 h-4 text-stone-300 group-hover:text-stone-900 transition-colors" />
                        </div>
                        <div>
                            <div className="flex items-end justify-between mb-1">
                                <span className="text-2xl font-black text-stone-900 tracking-tighter">{item.value}</span>
                                <div
                                    className={`flex items-center gap-1 text-[11px] font-black mb-1 ${
                                        parseFloat(item.trend) >= 0 ? 'text-emerald-600' : 'text-red-600'
                                    }`}
                                >
                                    {parseFloat(item.trend) >= 0 ? (
                                        <TrendingUp className="w-3 h-3" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3" />
                                    )}
                                    {item.trend}
                                </div>
                            </div>
                            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{item.subValue}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Secondary Data Blocks */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Revenue Trend Chart */}
                    <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-sm font-bold text-stone-900 uppercase">Revenue Flow</h3>
                                <p className="text-[11px] font-medium text-stone-400 mt-1">Transaction patterns across the timeline</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                                    <span className="text-[10px] font-bold text-stone-500 uppercase">Revenue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-stone-200"></span>
                                    <span className="text-[10px] font-bold text-stone-500 uppercase">Orders</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[280px] w-full">
                            {trends && trends.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trends}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fontSize: 10, fill: '#78716c' }}
                                            tickFormatter={(value) => {
                                                const date = new Date(value);
                                                return `${date.getMonth() + 1}/${date.getDate()}`;
                                            }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 10, fill: '#78716c' }}
                                            tickFormatter={(value) => `$${value}`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e7e5e4',
                                                borderRadius: '8px',
                                                fontSize: '11px',
                                            }}
                                            formatter={(value: any) => [
                                                typeof value === 'number' ? formatPrice(value) : value,
                                                '',
                                            ]}
                                        />
                                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#1c1917"
                                            strokeWidth={2}
                                            dot={false}
                                            name="Revenue"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="orders"
                                            stroke="#78716c"
                                            strokeWidth={2}
                                            dot={false}
                                            name="Orders"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <Activity className="w-12 h-12 text-stone-200" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Top Performing Products */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-stone-900 uppercase">Strategic Inventory</h3>
                            <button className="text-[11px] font-bold text-stone-400 hover:text-stone-900 uppercase">View All</button>
                        </div>
                        <div className="divide-y divide-stone-50">
                            {stats?.products?.topSelling?.map((p: any, i: number) => (
                                <div
                                    key={i}
                                    className="px-8 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-black text-stone-300">#{i + 1}</span>
                                        <div>
                                            <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight">{p.name}</p>
                                            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">
                                                {p.sold} Units Moved • {p.orders} Orders
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-stone-900">{formatPrice(p.revenue)}</p>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-1">
                                            <TrendingUp className="w-2.5 h-2.5" />
                                            Top Seller
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Status Breakdown */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-stone-100">
                            <h3 className="text-sm font-bold text-stone-900 uppercase">Order Status Breakdown</h3>
                        </div>
                        <div className="p-8">
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[
                                            { name: 'Pending', value: stats?.orders?.pending || 0 },
                                            { name: 'Processing', value: stats?.orders?.processing || 0 },
                                            { name: 'Shipped', value: stats?.orders?.shipped || 0 },
                                            { name: 'Delivered', value: stats?.orders?.delivered || 0 },
                                            { name: 'Cancelled', value: stats?.orders?.cancelled || 0 },
                                        ]}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#78716c' }} />
                                        <YAxis tick={{ fontSize: 10, fill: '#78716c' }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e7e5e4',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {[
                                                { name: 'Pending', value: stats?.orders?.pending || 0 },
                                                { name: 'Processing', value: stats?.orders?.processing || 0 },
                                                { name: 'Shipped', value: stats?.orders?.shipped || 0 },
                                                { name: 'Delivered', value: stats?.orders?.delivered || 0 },
                                                { name: 'Cancelled', value: stats?.orders?.cancelled || 0 },
                                            ].map((entry, index) => {
                                                const colors = ['#f59e0b', '#3b82f6', '#a855f7', '#10b981', '#ef4444'];
                                                return <Cell key={`cell-${index}`} fill={colors[index] || '#78716c'} />;
                                            })}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Context */}
                <div className="space-y-8">
                    {/* Category Distribution */}
                    <div className="bg-stone-900 rounded-xl p-8 text-white shadow-xl">
                        <PieChart className="w-6 h-6 text-stone-400 mb-6" />
                        <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-6">Segment Mix</h3>
                        <div className="space-y-6">
                            {categoryStats?.slice(0, 5).map((c: any, i: number) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">{c.name}</span>
                                        <span className="text-[10px] font-bold text-white/50">{c.productCount} items</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white rounded-full opacity-80"
                                            style={{ width: `${c.percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-[9px] text-stone-400">
                                        <span>{formatPrice(c.revenue)} revenue</span>
                                        <span>{c.orders} orders</span>
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
                                    Inventory efficiency is operating at peak performance. Top category represents{' '}
                                    {categoryStats?.[0]?.percentage || 0}% of total catalog.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Top Customers */}
                    <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
                        <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Top Customers
                        </h4>
                        <div className="space-y-4">
                            {stats?.customers?.topCustomers?.slice(0, 5).map((customer: any, i: number) => (
                                <div key={i} className="flex items-center justify-between pb-3 border-b border-stone-50 last:border-0">
                                    <div>
                                        <p className="text-[12px] font-bold text-stone-900 tracking-tight">{customer.name}</p>
                                        <p className="text-[10px] text-stone-400">{customer.orders} orders</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[12px] font-black text-stone-900">{formatPrice(customer.totalSpent)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm border-dashed">
                        <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Pulse Intelligence</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <p className="text-[12px] font-bold text-stone-900 tracking-tight">Real-time Analytics Active</p>
                            </div>
                            <div className="space-y-2 text-[11px] text-stone-500">
                                <div className="flex justify-between">
                                    <span>Today Revenue:</span>
                                    <span className="font-bold text-stone-900">{formatPrice(stats?.revenue?.today || 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>This Week:</span>
                                    <span className="font-bold text-stone-900">{formatPrice(stats?.revenue?.thisWeek || 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>This Month:</span>
                                    <span className="font-bold text-stone-900">{formatPrice(stats?.revenue?.thisMonth || 0)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
