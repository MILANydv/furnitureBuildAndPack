import { ShoppingBag, Search, ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';
import Link from 'next/link';

export default function OrdersPage() {
    // Mock logic: Empty state or orders list
    const orders = [
        {
            id: 'ORD-2024-001',
            date: 'Feb 10, 2024',
            total: 45000,
            status: 'Delivered',
            items: [
                { name: 'Modular Sofa Sectional', qty: 1, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
                { name: 'Marble Top Coffee Table', qty: 1, image: 'https://images.unsplash.com/photo-1577145900570-4c0567ec3792?w=100&h=100&fit=crop' }
            ]
        },
        {
            id: 'ORD-2024-003',
            date: 'Feb 12, 2024',
            total: 12000,
            status: 'In Transit',
            items: [
                { name: 'Oak Side Table', qty: 2, image: 'https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?w=100&h=100&fit=crop' }
            ]
        }
    ];

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
                                        <p className="text-sm font-semibold text-stone-800">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Total</p>
                                        <p className="text-sm font-semibold text-stone-800">{formatPrice(order.total)}</p>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">Order ID</p>
                                        <p className="text-sm font-semibold text-stone-800">{order.id}</p>
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
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'
                                        }`}></span>
                                    <p className="font-bold text-stone-900">{order.status}</p>
                                </div>

                                <div className="space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200">
                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-stone-900 line-clamp-1">{item.name}</p>
                                                <p className="text-sm text-stone-500">Quantity: {item.qty}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-stone-50 px-6 py-3 flex gap-4 border-t border-stone-100">
                                <button className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-widest">Write a Review</button>
                                <button className="text-xs font-bold text-stone-500 hover:text-stone-700 transition-colors uppercase tracking-widest">Buy Again</button>
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
