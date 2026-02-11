'use client';

import {
  ImageIcon,
  Plus,
  Layout,
  ArrowRight,
  ToggleLeft,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchBanners() {
  const res = await fetch('/api/admin/banners');
  if (!res.ok) throw new Error('Failed to fetch banners');
  return res.json();
}

export default function AdminBannersPage() {
  const queryClient = useQueryClient();
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ['admin-banners'],
    queryFn: fetchBanners,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
    }
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tight">Hero Campaigns</h1>
          <p className="text-stone-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Visual hooks of the landing interface</p>
        </div>
        <Link href="/admin/banners/new" className="px-10 py-4 bg-stone-900 text-white font-black rounded-2xl hover:bg-stone-800 transition-all flex items-center gap-2 text-xs uppercase tracking-widest shadow-2xl active:scale-95">
          <Plus className="w-4 h-4" />
          Deploy Banner
        </Link>
      </div>

      {banners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {banners.map((banner: any) => (
            <div key={banner.id} className="group bg-white rounded-[3rem] shadow-sm border border-stone-100 overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 flex flex-col">
              <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                {banner.imageUrl ? (
                  <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300"><ImageIcon className="w-12 h-12" /></div>
                )}

                <div className="absolute top-6 left-6 flex gap-2">
                  <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ring-4 ring-white shadow-2xl ${banner.isActive ? 'bg-emerald-500 text-white' : 'bg-stone-500 text-white'}`}>
                    {banner.isActive ? 'Live' : 'Off-Air'}
                  </span>
                  <span className="px-5 py-2 rounded-full text-[10px] font-black bg-stone-900 text-white uppercase tracking-widest ring-4 ring-white shadow-2xl">
                    Pos #{banner.displayOrder}
                  </span>
                </div>
              </div>

              <div className="p-10 flex-1">
                <h3 className="text-2xl font-black text-stone-900 mb-2 truncate group-hover:text-amber-600 transition-colors uppercase tracking-tight leading-none">{banner.title}</h3>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-10 pb-6 border-b border-stone-50">Visual Campaign Asset</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Link href={`/admin/banners/${banner.id}/edit`} className="p-4 bg-stone-50 text-stone-400 rounded-2xl hover:bg-stone-900 hover:text-white transition-all shadow-sm">
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => { if (confirm('Cease this campaign?')) deleteMutation.mutate(banner.id) }}
                      className="p-4 bg-stone-50 text-stone-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <Link href={banner.linkUrl || '#'} className="bg-amber-500 text-white p-4 rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 group/link">
                    <ArrowRight className="w-6 h-6 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-stone-50 rounded-[4rem] border-4 border-dashed border-stone-200">
          <ImageIcon className="w-24 h-24 text-stone-200 mx-auto mb-8" />
          <h2 className="text-3xl font-black text-stone-900 mb-2 tracking-tight uppercase">Empty Gallery</h2>
          <p className="text-stone-500 mb-12 max-w-sm mx-auto font-bold uppercase tracking-widest text-[10px]">Your storefront is missing its visual pulse.</p>
          <Link href="/admin/banners/new" className="inline-block px-12 py-5 bg-amber-600 text-white font-black rounded-[2rem] hover:bg-amber-700 transition-all shadow-2xl shadow-amber-600/30 uppercase tracking-[0.2em] text-xs active:scale-95">
            Initialize Content
          </Link>
        </div>
      )}
    </div>
  );
}
