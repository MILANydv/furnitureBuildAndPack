import Link from 'next/link';
import { User, ShoppingBag, Heart, LogOut, Settings, LayoutDashboard } from 'lucide-react';

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const menuItems = [
        { label: 'Overview', href: '/account', icon: LayoutDashboard },
        { label: 'My Orders', href: '/account/orders', icon: ShoppingBag },
        { label: 'Wishlist', href: '/shop/wishlist', icon: Heart },
        { label: 'Profile Settings', href: '/account/profile', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                            <div className="p-6 border-b border-stone-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                    M
                                </div>
                                <div>
                                    <h2 className="font-bold text-stone-900 line-clamp-1">My Account</h2>
                                    <p className="text-sm text-stone-500">Member since 2024</p>
                                </div>
                            </div>
                            <nav className="p-4 space-y-1">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-50 hover:text-amber-600 rounded-xl transition-all font-medium"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                ))}
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium mt-4">
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 min-h-[600px]">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
