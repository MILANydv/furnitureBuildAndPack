import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminBannersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const banners = await prisma.campaignBanner.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Campaign Banners</h1>
        <Link
          href="/admin/banners/new"
          className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
        >
          Create Banner
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner: any) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {banner.imageUrl && (
              <div className="relative h-48">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-stone-900 mb-2">{banner.title}</h3>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    banner.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {banner.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="text-sm text-stone-600">Order: {banner.displayOrder}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
