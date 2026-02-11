import { ShoppingBag, Heart, Package, Clock } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/currency';

export default function AccountOverview() {
    // Mock data for overview - later replace with real API call
    const stats = [
        { label: 'Total Orders', value: '3', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Waitlist Items', value: '12', icon: Heart, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Delivered', value: '2', icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    const recentOrders = [
        { id: 'ORD-2024-001', date: 'Feb 10, 2024', status: 'Delivered', total: 45000 },
        { id: 'ORD-2024-003', date: 'Feb 12, 2024', status: 'In Transit', total: 12000 },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-stone-900 mb-8">Account Overview</h1>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <div key={index} className="p-6 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold text-stone-900">{stat.value}</div>
                        <div className="text-sm text-stone-500 font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-stone-900">Recent Orders</h2>
                        <Link href="/account/orders" className="text-sm text-amber-600 hover:underline font-semibold">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="p-4 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between group hover:bg-white hover:border-amber-200 transition-all cursor-pointer">
                                <div>
                                    <p className="font-bold text-stone-900">{order.id}</p>
                                    <p className="text-sm text-stone-500">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-stone-900">{formatPrice(order.total)}</p>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Profile Summary */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-stone-900">Default Shipping Address</h2>
                    <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 relative group">
                        <button className="absolute top-6 right-6 text-sm text-amber-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center text-stone-500">
                                <MapPinIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-stone-900">Milan Shrestha</p>
                                <p className="text-stone-600 text-sm mt-1">
                                    123 Furniture Street<br />
                                    Patan, Lalitpur<br />
                                    Nepal, 44600
                                </p>
                                <p className="text-stone-500 text-sm mt-2 font-medium">+977-98XXXXXXXX</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <Link href="/account/profile" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            Manage all addresses and payment methods
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MapPinIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}
