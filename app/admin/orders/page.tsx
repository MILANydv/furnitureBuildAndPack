import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { OrderService } from '@/server/modules/orders/order.service';
import Link from 'next/link';

const orderService = new OrderService();

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const { orders } = await orderService.getAllOrders({ limit: 50 });

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Orders</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Order ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Total</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
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
                <td className="py-3 px-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-amber-600 hover:text-amber-700 text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
