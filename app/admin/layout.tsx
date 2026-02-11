'use client';

import { Navbar } from '@/app/components/layout/Navbar';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';

function AdminSidebar() {
  return (
    <div className="w-64 bg-white border-r border-stone-200 min-h-screen p-6">
      <h2 className="text-xl font-bold text-stone-900 mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        <Link
          href="/admin/dashboard"
          className="block px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/products"
          className="block px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
        >
          Products
        </Link>
        <Link
          href="/admin/orders"
          className="block px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
        >
          Orders
        </Link>
        <Link
          href="/admin/customers"
          className="block px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
        >
          Customers
        </Link>
        <Link
          href="/admin/coupons"
          className="block px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
        >
          Coupons
        </Link>
        <Link
          href="/admin/banners"
          className="block px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
        >
          Banners
        </Link>
      </nav>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
