'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useCategories } from '@/hooks/useCategories';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { data: categories = [] } = useCategories();

  // ... (rest of the component logic)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100">
      {/* Top Bar */}
      <div className="bg-stone-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>🚚 Free delivery in Kathmandu Valley on orders over NPR 10,000 | 🛠️ Easy assembly included</p>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-stone-900">
              Modu<span className="text-amber-600">Living</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-stone-600 hover:text-stone-900 transition-colors">
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-stone-600 hover:text-stone-900 transition-colors">
                Categories
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pt-2">
                <div className="border border-stone-200 rounded-lg overflow-hidden">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products/category/${category.slug}`}
                      className="block px-4 py-2 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                  {categories.length === 0 && (
                    <span className="block px-4 py-2 text-stone-400 italic">No categories</span>
                  )}
                </div>
              </div>
            </div>

            <Link href="/shop/build-your-own" className="text-amber-600 hover:text-amber-700 transition-colors font-medium">
              Build Your Own
            </Link>
            <Link href="/about" className="text-stone-600 hover:text-stone-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-stone-600 hover:text-stone-900 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/shop/wishlist"
              className="hidden sm:flex p-2 text-stone-600 hover:text-stone-900 transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/shop/cart"
              className="flex items-center gap-2 p-2 text-stone-600 hover:text-stone-900 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
              <span className="hidden sm:inline font-medium">
                NPR {cart.total.toLocaleString()}
              </span>
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="hidden sm:flex p-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-stone-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-stone-200 py-4">
          <div className="max-w-2xl mx-auto px-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search for furniture..."
                className="w-full pl-12 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block py-2 text-stone-600 hover:text-stone-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <p className="py-2 text-sm font-medium text-stone-400">Categories</p>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/category/${category.slug}`}
                className="block py-2 pl-4 text-stone-600 hover:text-stone-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/shop/build-your-own"
              className="block py-2 text-amber-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Build Your Own
            </Link>
            <Link
              href="/shop/wishlist"
              className="block py-2 text-stone-600 hover:text-stone-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist ({wishlist.length})
            </Link>
            <Link
              href="/about"
              className="block py-2 text-stone-600 hover:text-stone-900"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-stone-600 hover:text-stone-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
