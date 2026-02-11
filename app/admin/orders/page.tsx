'use client';

import Link from 'next/link';
import { Search, Eye, Package, CheckCircle, XCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';

// Mock orders data
const orders = [
  { 
    id: 'ORD-001', 
    customer: 'Priya Sharma', 
    email: 'priya@example.com',
    total: 45000, 
    status: 'delivered', 
    date: '2025-02-10',
    items: 2 
  },
  { 
    id: 'ORD-002', 
    customer: 'Rajesh Gurung', 
    email: 'rajesh@example.com',
    total: 78000, 
    status: 'processing', 
    date: '2025-02-09',
    items: 3 
  },
  { 
    id: 'ORD-003', 
    customer: 'Anita Pradhan', 
    email: 'anita@example.com',
    total: 23000, 
    status: 'pending', 
    date: '2025-02-09',
    items: 1 
  },
  { 
    id: 'ORD-004', 
    customer: 'Kumar Shrestha', 
    email: 'kumar@example.com',
    total: 125000, 
    status: 'shipped', 
    date: '2025-02-08',
    items: 5 
  },
  { 
    id: 'ORD-005', 
    customer: 'Sita Rai', 
    email: 'sita@example.com',
    total: 34000, 
    status: 'delivered', 
    date: '2025-02-07',
    items: 1 
  },
  { 
    id: 'ORD-006', 
    customer: 'Bikash Tamang', 
    email: 'bikash@example.com',
    total: 56000, 
    status: 'cancelled', 
    date: '2025-02-06',
    items: 2 
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800', icon: Package },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: Package },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function AdminOrders() {
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
                { href: '/admin/products', label: 'Products' },
                { href: '/admin/orders', label: 'Orders', active: true },
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
              <h1 className="text-2xl font-bold text-stone-900">Orders</h1>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-12 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {orders.map((order) => {
                      const status = statusConfig[order.status as keyof typeof statusConfig];
                      const StatusIcon = status.icon;
                      
                      return (
                        <tr key={order.id} className="hover:bg-stone-50">
                          <td className="px-6 py-4 font-medium text-stone-900">{order.id}</td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-stone-900">{order.customer}</p>
                              <p className="text-sm text-stone-500">{order.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-stone-600">{order.items} items</td>
                          <td className="px-6 py-4 font-medium">{formatPrice(order.total)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-stone-600">{order.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-stone-400 hover:text-amber-600 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-stone-600">
                Showing 1 to {orders.length} of {orders.length} orders
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-4 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-50 disabled:opacity-50" disabled>
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
