'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Edit,
    Trash2,
    ImageIcon,
    ExternalLink,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    Layout,
    Monitor,
    Eye,
    ToggleLeft,
    ToggleRight,
    AlertCircle
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export default function BannerDetailPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const params = useParams();
    const id = params.id as string;

    const { data: banner, isLoading } = useQuery({
        queryKey: ['admin-banner', id],
        queryFn: async () => {
            const res = await fetch(`/api/admin/banners/${id}`);
            if (!res.ok) throw new Error('Not found');
            return res.json();
        }
    });

    const toggleActiveMutation = useMutation({
        mutationFn: async (isActive: boolean) => {
            const res = await fetch(`/api/admin/banners/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive }),
            });
            if (!res.ok) throw new Error('Update failed');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-banner', id] });
            queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
            toast.success(banner?.isActive ? 'Banner deactivated' : 'Banner activated');
        },
        onError: () => toast.error('Update failed')
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
            toast.success('Banner deleted');
            router.push('/admin/banners');
        },
        onError: () => toast.error('Delete failed')
    });

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
        </div>
    );

    if (!banner) return (
        <div className="p-8 text-center text-stone-500 font-bold uppercase tracking-widest text-[11px]">
            Banner not found
        </div>
    );

    return (
        <div className="p-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-all text-stone-500"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center overflow-hidden ${
                            banner.isActive
                                ? 'bg-stone-900 border-stone-900'
                                : 'bg-stone-50 border-stone-200'
                        }`}>
                            {banner.imageUrl ? (
                                <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className={`w-8 h-8 ${banner.isActive ? 'text-white' : 'text-stone-300'}`} />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-stone-900 tracking-tight uppercase">
                                    {banner.title || 'Untitled Banner'}
                                </h1>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                    banner.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-400'
                                }`}>
                                    {banner.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {banner.isActive ? 'Broadcasting' : 'On Hold'}
                                </span>
                            </div>
                            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                                ID: {banner.id.slice(-8).toUpperCase()} • Position #{banner.displayOrder}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => toggleActiveMutation.mutate(!banner.isActive)}
                        disabled={toggleActiveMutation.isPending}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                            banner.isActive
                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                    >
                        {banner.isActive ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                        {banner.isActive ? 'Pause' : 'Activate'}
                    </button>
                    <Link
                        href={`/admin/banners/${banner.id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all shadow-sm"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Banner
                    </Link>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this banner? This action cannot be undone.')) {
                                deleteMutation.mutate();
                            }
                        }}
                        disabled={deleteMutation.isPending}
                        className="p-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-all shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Banner Preview */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30 flex items-center justify-between">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Visual Preview</h3>
                            <span className="text-[11px] font-bold text-stone-900">Display Order: #{banner.displayOrder}</span>
                        </div>
                        <div className="p-6">
                            <div className="aspect-video rounded-lg bg-stone-50 border-2 border-stone-200 overflow-hidden relative group">
                                {banner.imageUrl ? (
                                    <img 
                                        src={banner.imageUrl} 
                                        alt={banner.title || 'Banner'} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <ImageIcon className="w-12 h-12 text-stone-200 mx-auto mb-2" />
                                            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">No Image</p>
                                        </div>
                                    </div>
                                )}
                                {banner.isActive && (
                                    <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500 text-white rounded text-[9px] font-black uppercase tracking-widest shadow-lg">
                                        Live
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Banner Details */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Campaign Information</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Title</label>
                                <p className="text-[13px] font-bold text-stone-900 uppercase tracking-tight">
                                    {banner.title || 'No title provided'}
                                </p>
                            </div>
                            {banner.subtitle && (
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Subtitle</label>
                                    <p className="text-[13px] font-medium text-stone-900 leading-relaxed">
                                        {banner.subtitle}
                                    </p>
                                </div>
                            )}
                            <div>
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Link URL</label>
                                <div className="flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4 text-stone-400" />
                                    {banner.linkUrl ? (
                                        <a
                                            href={banner.linkUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[13px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            {banner.linkUrl}
                                        </a>
                                    ) : (
                                        <p className="text-[13px] font-medium text-stone-400">No link configured</p>
                                    )}
                                </div>
                            </div>
                            {banner.imageUrl && (
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Image URL</label>
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4 text-stone-400" />
                                        <a
                                            href={banner.imageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[13px] font-medium text-blue-600 hover:text-blue-800 hover:underline truncate max-w-md"
                                        >
                                            {banner.imageUrl}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status & Settings */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-stone-100">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Status & Settings</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <Monitor className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Status</p>
                                        <p className={`text-[14px] font-black ${
                                            banner.isActive ? 'text-emerald-600' : 'text-stone-400'
                                        }`}>
                                            {banner.isActive ? 'Broadcasting' : 'On Hold'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <Layout className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Display Order</p>
                                        <p className="text-[14px] font-black text-stone-900">#{banner.displayOrder}</p>
                                    </div>
                                </div>
                            </div>
                            {banner.displayOrder === 0 && (
                                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                    <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest">
                                        Primary Banner
                                    </p>
                                    <p className="text-[9px] text-blue-700 mt-1">
                                        This banner appears first in the carousel
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-stone-100">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Metadata</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-stone-400 uppercase tracking-widest">Created</span>
                                <span className="font-black text-stone-900">
                                    {new Date(banner.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-stone-400 uppercase tracking-widest">Updated</span>
                                <span className="font-black text-stone-900">
                                    {new Date(banner.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-stone-900 rounded-xl p-6 text-white shadow-xl">
                        <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Quick Actions</h4>
                        <div className="space-y-2">
                            <Link
                                href={`/admin/banners/${banner.id}/edit`}
                                className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
                            >
                                <span className="text-[12px] font-bold uppercase tracking-tight">Edit Banner</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </Link>
                            <button
                                onClick={() => toggleActiveMutation.mutate(!banner.isActive)}
                                disabled={toggleActiveMutation.isPending}
                                className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
                            >
                                <span className="text-[12px] font-bold uppercase tracking-tight">
                                    {banner.isActive ? 'Pause Campaign' : 'Activate Campaign'}
                                </span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </button>
                            {banner.linkUrl && (
                                <a
                                    href={banner.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
                                >
                                    <span className="text-[12px] font-bold uppercase tracking-tight">View Link</span>
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
