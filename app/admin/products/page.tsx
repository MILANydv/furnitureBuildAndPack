'use client';

import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils/currency';

export default function AdminProducts() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-stone-900">
                Modu<span className="text-amber-600">Living</span>
              </span>
              <span className="text-stone-400">|</span>
              <span className="text-stone-600">Admin Panel</span>
            </div>
            <Link 
              href="/" 
              className="text-sm text-amber-600 hover:underline"
            >
              View Store
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm p-4 space-y-1">
              {[
                { href: '/admin/dashboard', label: 'Dashboard' },
                { href: '/admin/products', label: 'Products', active: true },
                { href: '/admin/orders', label: 'Orders' },
                { href: '/admin/customers', label: 'Customers' },
                { href: '/admin/coupons', label: 'Coupons' },
                { href: '/admin/banners', label: 'Banners' },
                { href: '/admin/analytics', label: 'Analytics' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-amber-50 text-amber-700 font-medium' 
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-stone-900">Products</h1>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-stone-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.images[0]?.url} 
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-stone-900">{product.name}</p>
                              <p className="text-sm text-stone-500">{product.variants.length} variants</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-stone-600">{product.category.name}</td>
                        <td className="px-6 py-4">{formatPrice(product.basePrice)}</td>
                        <td className="px-6 py-4">
                          {product.variants.reduce((sum, v) => sum + v.stock, 0)} units
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-stone-100 text-stone-800'
                          }`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-stone-400 hover:text-amber-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-stone-400 hover:text-blue-600 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-stone-400 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
