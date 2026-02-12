'use client';

import {
  ImageIcon,
  Plus,
  Layout,
  ArrowRight,
  ToggleLeft,
  Edit,
  Trash2,
  Eye,
  Layers,
  ChevronDown,
  Monitor,
  ExternalLink,
  MoveUp,
  MoveDown
} from 'lucide-react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

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
      toast.success('Visual asset removed');
    },
    onError: () => toast.error('Removal failed')
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Sleek Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-8 mt-4">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Campaign Gallery</h1>
          <div className="flex items-center gap-2 mt-1">
            <Monitor className="w-3.5 h-3.5 text-stone-400" />
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{banners.length} Active Hooks</p>
          </div>
        </div>
        <Link href="/admin/banners/new" className="px-5 py-2 bg-stone-900 text-white text-[13px] font-bold rounded-lg hover:bg-stone-800 transition-all flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          New Campaign
        </Link>
      </div>

      {/* Banners List (Cal.com Style) */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden divide-y divide-stone-50">
        {banners.map((banner: any) => (
          <div key={banner.id} className="p-6 flex items-center justify-between hover:bg-stone-50/30 transition-all group">
            <div className="flex items-center gap-6 flex-1 min-w-0">
              <div className="w-24 h-14 rounded-lg bg-stone-50 border border-stone-200 overflow-hidden flex-shrink-0 relative group-hover:border-stone-400 transition-all">
                {banner.imageUrl ? (
                  <img src={banner.imageUrl} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-200"><ImageIcon className="w-4 h-4" /></div>
                )}
                <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-white/90 backdrop-blur rounded text-[9px] font-black uppercase text-stone-900 shadow-sm">
                  #{banner.displayOrder}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <Link href={`/admin/banners/${banner.id}`} className="text-[14px] font-bold text-stone-900 uppercase tracking-tight hover:text-blue-600 transition-colors truncate">
                    {banner.title || 'Draft Campaign'}
                  </Link>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${banner.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-400'}`}>
                    {banner.isActive ? 'Broadcasting' : 'Hold'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-none truncate max-w-[300px]">{banner.subtitle || 'No subtext'}</p>
                  <div className="w-1 h-1 rounded-full bg-stone-200 flex-shrink-0"></div>
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-none truncate flex items-center gap-1.5"><ExternalLink className="w-3 h-3" /> {banner.linkUrl}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-6">
              <div className="flex items-center gap-1 p-1 bg-stone-50 rounded-lg group-hover:bg-white transition-colors border border-transparent group-hover:border-stone-200">
                <button className="p-1.5 text-stone-300 hover:text-stone-900 transition-colors" title="Move Up"><MoveUp className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 text-stone-300 hover:text-stone-900 transition-colors" title="Move Down"><MoveDown className="w-3.5 h-3.5" /></button>
              </div>
              <div className="h-4 w-px bg-stone-100 mx-1"></div>
              <Link href={`/admin/banners/${banner.id}`} className="p-2 text-stone-300 hover:text-blue-600 transition-colors" title="View Details"><Eye className="w-4 h-4" /></Link>
              <Link href={`/admin/banners/${banner.id}/edit`} className="p-2 text-stone-300 hover:text-stone-900 transition-colors"><Edit className="w-4 h-4" /></Link>
              <button
                onClick={() => { if (confirm('Cease this campaign?')) deleteMutation.mutate(banner.id) }}
                className="p-2 text-stone-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {banners.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">The visual horizon is currently empty.</p>
          </div>
        )}
      </div>

      <div className="p-8 bg-stone-900 rounded-xl text-white shadow-xl flex items-center justify-between overflow-hidden relative group">
        <div className="relative z-10 flex-1">
          <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Strategic Placement</h4>
          <p className="text-sm font-medium text-stone-300 leading-relaxed max-w-lg">
            Sequential order affects the visual hierarchy on the landing interface. Banners with Position #0 are the primary focal points of the store experience.
          </p>
        </div>
        <div className="text-7xl font-black text-white/5 absolute -right-4 -bottom-4 group-hover:text-white/10 transition-all select-none rotate-12">VISUALS</div>
      </div>
    </div>
  );
}
