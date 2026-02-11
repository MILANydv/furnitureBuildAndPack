import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { OrderService } from '@/server/modules/orders/order.service';
import { prisma } from '@/lib/prisma/client';

const orderService = new OrderService();

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const stats = await orderService.getOrderStats();
  const [totalProducts, totalCustomers, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    orderService.getAllOrders({ limit: 5 }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-stone-600 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-stone-900">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-stone-600 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-stone-900">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-stone-600 mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-stone-900">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-stone-600 mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-stone-900">{totalCustomers}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Total</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.orders.map((order: any) => (
                <tr key={order.id} className="border-b border-stone-100">
                  <td className="py-3 px-4 text-sm text-stone-600">{order.id.slice(0, 8)}...</td>
                  <td className="py-3 px-4 text-sm text-stone-900">{order.user.name}</td>
                  <td className="py-3 px-4 text-sm text-stone-900">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'DELIVERED'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-stone-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
