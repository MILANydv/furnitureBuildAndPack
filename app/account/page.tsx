import { ShoppingBag, Heart, Package, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/currency';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/prisma/client';
import { redirect } from 'next/navigation';
import { Order, OrderStatus } from '@prisma/client';

export default async function AccountOverview() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/auth/signin');
    }

    const [orders, wishlistCount] = await Promise.all([
        prisma.order.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
            take: 3,
        }),
        prisma.wishlist.count({
            where: { userId: session.user.id }
        })
    ]);

    const stats = [
        {
            label: 'Total Orders',
            value: orders.length.toString(),
            icon: ShoppingBag,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            label: 'Wishlist Items',
            value: wishlistCount.toString(),
            icon: Heart,
            color: 'text-amber-600',
            bg: 'bg-amber-50'
        },
        {
            label: 'Completed',
            value: orders.filter((o: Order) => o.status === OrderStatus.DELIVERED).length.toString(),
            icon: Package,
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
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
                        {orders.length > 0 ? orders.map((order: Order) => (
                            <Link
                                key={order.id}
                                href={`/account/orders/${order.id}`}
                                className="p-4 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between group hover:bg-white hover:border-amber-200 transition-all"
                            >
                                <div>
                                    <p className="font-bold text-stone-900 uppercase">#ORD-{order.id.slice(-6)}</p>
                                    <p className="text-sm text-stone-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-stone-900">{formatPrice(order.total)}</p>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-700' :
                                            order.status === OrderStatus.CANCELLED ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </Link>
                        )) : (
                            <div className="py-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-200">
                                <p className="text-stone-400 text-sm font-medium">No recent orders found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Summary */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-stone-900">Account Details</h2>
                    <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 relative group">
                        <Link href="/account/profile" className="absolute top-6 right-6 text-sm text-amber-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Edit</Link>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                <Package className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-stone-900">{session.user.name}</p>
                                <p className="text-stone-600 text-sm mt-1">{session.user.email}</p>
                                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-4">Security Status</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-xs font-bold text-stone-600">Account Protected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <Link href="/account/profile" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            View login history and security logs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
