import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import Link from 'next/link';

export default async function AdminCouponsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Coupons</h1>
        <Link
          href="/admin/coupons/new"
          className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
        >
          Create Coupon
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Code</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Discount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Valid From</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Valid Until</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Used</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon: any) => (
              <tr key={coupon.id} className="border-b border-stone-100">
                <td className="py-3 px-4 text-sm font-medium text-stone-900">{coupon.code}</td>
                <td className="py-3 px-4 text-sm text-stone-600">
                  {coupon.discountType === 'PERCENTAGE'
                    ? `${coupon.discountValue}%`
                    : `$${coupon.discountValue}`}
                </td>
                <td className="py-3 px-4 text-sm text-stone-600">
                  {new Date(coupon.validFrom).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-sm text-stone-600">
                  {new Date(coupon.validUntil).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-sm text-stone-600">
                  {coupon.usedCount} / {coupon.maxUses || '∞'}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
