'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count (simplified - in real app, use context or state management)
  // useEffect(() => {
  //   fetch('/api/cart').then(res => res.json()).then(data => {
  //     setCartCount(data.items?.length || 0);
  //   });
  // }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-stone-900 tracking-tight">
              Luxe<span className="text-amber-600">Living</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-stone-600 hover:text-stone-900 transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-stone-600 hover:text-stone-900 transition-colors">
              Categories
            </Link>
            {session?.user.role === 'ADMIN' && (
              <Link href="/admin/dashboard" className="text-stone-600 hover:text-stone-900 transition-colors">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/wishlist" className="p-2 text-stone-600 hover:text-stone-900 transition-colors">
                  <User className="w-6 h-6" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className="text-stone-600 hover:text-stone-900 transition-colors">
                Sign In
              </Link>
            )}
            <Link href="/cart" className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-stone-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100">
            <div className="px-4 py-4 space-y-3">
              <Link href="/products" className="block text-stone-600 hover:text-stone-900 py-2">
                Products
              </Link>
              <Link href="/categories" className="block text-stone-600 hover:text-stone-900 py-2">
                Categories
              </Link>
              {session?.user.role === 'ADMIN' && (
                <Link href="/admin/dashboard" className="block text-stone-600 hover:text-stone-900 py-2">
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
