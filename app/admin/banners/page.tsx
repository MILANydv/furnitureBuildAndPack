import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import Link from 'next/link';
import { ImageIcon, Plus, Layout, ArrowRight, ToggleLeft, Edit, Trash2 } from 'lucide-react';

export default async function AdminBannersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const banners = await prisma.campaignBanner.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 leading-none mb-2">Campaign & Hero Banners</h1>
          <p className="text-stone-500 font-medium">Capture attention with high-impact visual banners on the homepage.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/banners/new" className="px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2 text-sm shadow-xl shadow-stone-900/10 active:scale-95">
            <Plus className="w-4 h-4" />
            Add New Banner
          </Link>
        </div>
      </div>

      {banners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {banners.map((banner: any) => (
            <div key={banner.id} className="group bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              {/* Image Preview */}
              <div className="relative h-56 w-full bg-stone-100 overflow-hidden">
                {banner.imageUrl ? (
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-4 ring-white shadow-lg ${banner.isActive ? 'bg-green-500 text-white' : 'bg-stone-500 text-white'
                    }`}>
                    {banner.isActive ? 'Live' : 'Draft'}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1.5">
                    <button className="p-2 bg-white/90 backdrop-blur-sm text-stone-600 rounded-xl hover:bg-white hover:text-blue-600 transition-all shadow-xl">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-sm text-stone-600 rounded-xl hover:bg-white hover:text-red-600 transition-all shadow-xl">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Layout className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Order Position: {banner.displayOrder}</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 mb-2 truncate group-hover:text-amber-600 transition-colors uppercase tracking-tight">{banner.title}</h3>
                <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed mb-6 font-medium">{banner.subtitle || 'No subtitle provided for this campaign.'}</p>

                <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <ToggleLeft className={`w-5 h-5 ${banner.isActive ? 'text-green-500' : 'text-stone-300'}`} />
                    <span className="text-xs font-bold text-stone-500 tracking-wide uppercase">Toggle Visibility</span>
                  </div>
                  <Link href={banner.buttonLink || '#'} className="inline-flex items-center gap-1.5 text-stone-900 hover:text-amber-600 font-black text-xs uppercase tracking-widest transition-all">
                    Preview Link
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200">
          <ImageIcon className="w-20 h-20 text-stone-200 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-stone-900 mb-2 tracking-tight uppercase">No banners found</h2>
          <p className="text-stone-500 mb-10 max-w-sm mx-auto font-medium">Your homepage looks empty! Add a visual banner to highlight your new collection or sales.</p>
          <Link href="/admin/banners/new" className="inline-block px-10 py-4 bg-amber-600 text-white font-black rounded-2xl hover:bg-amber-700 transition-all shadow-2xl shadow-amber-600/30 uppercase tracking-widest text-sm active:scale-95">
            Craft First Banner
          </Link>
        </div>
      )}
    </div>
  );
}
