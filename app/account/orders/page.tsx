import { ShoppingBag, Search, ExternalLink, Package } from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/prisma/client';
import { redirect } from 'next/navigation';
import { OrderStatus } from '@prisma/client';

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/auth/signin');
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900">My Orders</h1>
                    <p className="text-stone-500 text-sm">Track, manage and download your orders</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Search order ID..."
                        className="pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                </div>
            </div>

            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-stone-200 rounded-2xl overflow-hidden bg-white hover:border-amber-200 transition-colors">
                            <div className="bg-stone-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-stone-100">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Order Placed</p>
                                        <p className="text-sm font-semibold text-stone-800">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Total</p>
                                        <p className="text-sm font-semibold text-stone-800">{formatPrice(order.total)}</p>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Order ID</p>
                                        <p className="text-sm font-semibold text-stone-800 uppercase">#ORD-{order.id.slice(-8)}</p>
                                    </div>
                                </div>
                                <div>
                                    <Link href={`/account/orders/${order.id}`} className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-600 transition-colors font-bold text-sm">
                                        View Details
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className={`w-2.5 h-2.5 rounded-full ${order.status === OrderStatus.DELIVERED ? 'bg-green-500' :
                                        order.status === OrderStatus.CANCELLED ? 'bg-red-500' : 'bg-blue-500 animate-pulse'
                                        }`}></span>
                                    <p className="font-black text-stone-900 uppercase tracking-widest text-xs">{order.status}</p>
                                </div>

                                <div className="space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200">
                                                {item.product.images?.split(',')[0] ? (
                                                    <img src={item.product.images.split(',')[0]} alt={item.product.name} className="object-cover w-full h-full text-[10px]" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                        <Package className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-stone-900 line-clamp-1">{item.product.name}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <p className="text-xs font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">Qty: {item.qty}</p>
                                                    <p className="text-xs font-bold text-stone-500">{formatPrice(item.price)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-stone-50 px-6 py-3 flex gap-6 border-t border-stone-100">
                                {order.status === OrderStatus.DELIVERED && (
                                    <button className="text-[10px] font-black text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-widest">Write a Review</button>
                                )}
                                <Link
                                    href="/shop/products"
                                    className="text-[10px] font-black text-stone-500 hover:text-stone-700 transition-colors uppercase tracking-widest"
                                >
                                    Shop More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                    <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-8 h-8 text-stone-400" />
                    </div>
                    <h2 className="text-xl font-bold text-stone-900 mb-2">No orders found</h2>
                    <p className="text-stone-500 mb-6 max-w-sm mx-auto">Looks like you haven&apos;t placed any orders yet. Explore our collection to find something you love!</p>
                    <Link href="/shop/products" className="inline-block px-8 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors">
                        Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}
