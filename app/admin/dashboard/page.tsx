'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Tag, 
  Image as ImageIcon, 
  BarChart3,
  TrendingUp,
  DollarSign,
  Box,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils/currency';

// Mock data for analytics
const mockOrders = [
  { id: 'ORD-001', customer: 'Priya Sharma', total: 45000, status: 'delivered', date: '2025-02-10' },
  { id: 'ORD-002', customer: 'Rajesh Gurung', total: 78000, status: 'processing', date: '2025-02-09' },
  { id: 'ORD-003', customer: 'Anita Pradhan', total: 23000, status: 'pending', date: '2025-02-09' },
  { id: 'ORD-004', customer: 'Kumar Shrestha', total: 125000, status: 'shipped', date: '2025-02-08' },
  { id: 'ORD-005', customer: 'Sita Rai', total: 34000, status: 'delivered', date: '2025-02-07' },
];

const stats = [
  { 
    label: 'Total Revenue', 
    value: 'NPR 2,45,000', 
    change: '+12.5%', 
    trend: 'up',
    icon: DollarSign 
  },
  { 
    label: 'Total Orders', 
    value: '156', 
    change: '+8.2%', 
    trend: 'up',
    icon: ShoppingCart 
  },
  { 
    label: 'Total Products', 
    value: products.length.toString(), 
    change: '+3', 
    trend: 'up',
    icon: Box 
  },
  { 
    label: 'Active Customers', 
    value: '89', 
    change: '+15.3%', 
    trend: 'up',
    icon: Users 
  },
];

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/coupons', label: 'Coupons', icon: Tag },
  { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function AdminDashboard() {
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-stone-600">Welcome, Admin</span>
              <Link 
                href="/" 
                className="text-sm text-amber-600 hover:underline"
              >
                View Store
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-amber-50 text-amber-700' 
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <h1 className="text-2xl font-bold text-stone-900 mb-6">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <stat.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-sm text-stone-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b border-stone-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-900">Recent Orders</h2>
                <Link 
                  href="/admin/orders" 
                  className="text-amber-600 hover:underline text-sm"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50">
                        <td className="px-6 py-4 font-medium text-stone-900">{order.id}</td>
                        <td className="px-6 py-4 text-stone-600">{order.customer}</td>
                        <td className="px-6 py-4 font-medium">{formatPrice(order.total)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                            'bg-stone-100 text-stone-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-stone-600">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/admin/products/new"
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <Package className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">Add New Product</h3>
                    <p className="text-sm text-stone-600">Create a new furniture listing</p>
                  </div>
                </div>
              </Link>
              <Link 
                href="/admin/coupons/new"
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Tag className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">Create Coupon</h3>
                    <p className="text-sm text-stone-600">Set up a discount code</p>
                  </div>
                </div>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
