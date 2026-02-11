'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload, ImageIcon, Link as LinkIcon, Layers } from 'lucide-react';

export function BannerForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        subtitle: initialData?.subtitle || '',
        imageUrl: initialData?.imageUrl || '',
        linkUrl: initialData?.linkUrl || '',
        displayOrder: initialData?.displayOrder || 0,
        isActive: initialData?.isActive ?? true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = initialData
                ? `/api/admin/banners/${initialData.id}`
                : '/api/admin/banners';
            const method = initialData ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/banners');
                router.refresh();
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between pb-8 border-b border-stone-100">
                <h1 className="text-3xl font-black uppercase tracking-tight">{initialData ? 'Update Campaign' : 'New Campaign'}</h1>
                <div className="flex gap-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-white border border-stone-200 rounded-2xl text-stone-600 font-bold hover:bg-stone-50 transition-all text-xs uppercase tracking-widest leading-none">Discard</button>
                    <button type="submit" disabled={isLoading} className="px-8 py-3 bg-stone-900 text-white font-black rounded-2xl hover:bg-stone-800 transition-all text-xs uppercase tracking-widest leading-none flex items-center gap-2 shadow-2xl disabled:opacity-50">
                        {isLoading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        <Save className="w-4 h-4" />
                        Save Banner
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <ImageIcon className="w-5 h-5 text-amber-500" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-stone-900">Visual Settings</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="aspect-video bg-stone-50 rounded-[1.5rem] border-2 border-dashed border-stone-200 overflow-hidden relative group">
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-stone-300 gap-2">
                                        <Upload className="w-8 h-8" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Media</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="Media URL (direct link)..."
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-5 py-3.5 bg-stone-50 rounded-xl text-xs font-bold border-transparent focus:bg-white focus:border-amber-500 transition-all outline-none"
                            />
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <Layers className="w-5 h-5 text-amber-500" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-stone-900">Execution</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Campaign Status</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                    className={`w-12 h-6 rounded-full relative transition-all ${formData.isActive ? 'bg-amber-500' : 'bg-stone-300'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isActive ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Sequence Priority</label>
                                <input
                                    type="number"
                                    value={formData.displayOrder}
                                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                    className="w-full px-5 py-3.5 bg-stone-50 rounded-xl text-sm font-bold"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-6">
                        <h2 className="text-sm font-black uppercase tracking-widest text-stone-900 border-b pb-4">Content Metadata</h2>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Hero Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Winter Luxury Collection"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-stone-50 rounded-xl text-sm font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Sub-Narrative</label>
                                <textarea
                                    rows={4}
                                    placeholder="Brief description of the campaign..."
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-stone-50 rounded-xl text-sm font-bold resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1 leading-relaxed">Destination URL</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
                                    <input
                                        type="text"
                                        placeholder="/shop/new-arrivals"
                                        value={formData.linkUrl}
                                        onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                                        className="w-full pl-12 pr-5 py-3.5 bg-stone-50 rounded-xl text-xs font-bold"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
