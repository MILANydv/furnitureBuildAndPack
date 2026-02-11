'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Save,
    X,
    Upload,
    ImageIcon,
    Link as LinkIcon,
    Layers,
    Type,
    AlignLeft,
    ListOrdered,
    ToggleRight,
    ChevronLeft,
    Trash2,
    ExternalLink,
    Eye,
    Copy
} from 'lucide-react';
import { toast } from 'react-hot-toast';

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
                toast.success(initialData ? 'Banner updated' : 'Banner created');
                router.push('/admin/banners');
                router.refresh();
            } else {
                toast.error('Failed to save banner');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb-style Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-all text-stone-500"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                            {initialData ? initialData.title || 'Edit Banner' : 'New Banner'}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-bold text-stone-500 hover:text-stone-900 transition-all font-sans"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-6 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {isLoading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        {initialData ? 'Save changes' : 'Create banner'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        {/* URL / Image Input */}
                        <div className="p-6 border-b border-stone-100 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <ImageIcon className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-1">
                                <label className="text-[13px] font-bold text-stone-700">Image Asset URL</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full text-[13px] bg-white border border-stone-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-stone-900/5 focus:border-stone-900 outline-none transition-all placeholder:text-stone-300 font-medium"
                                />
                            </div>
                        </div>

                        {/* Title Input */}
                        <div className="p-6 border-b border-stone-100 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <Type className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-1">
                                <label className="text-[13px] font-bold text-stone-700">Display Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Summer Collection 2025"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full text-[13px] bg-white border border-stone-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-stone-900/5 focus:border-stone-900 outline-none transition-all placeholder:text-stone-300 font-medium"
                                />
                            </div>
                        </div>

                        {/* Subtitle Input */}
                        <div className="p-6 border-b border-stone-100 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <AlignLeft className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-1">
                                <label className="text-[13px] font-bold text-stone-700">Subtitle / Description</label>
                                <textarea
                                    rows={3}
                                    placeholder="A brief catchy description..."
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full text-[13px] bg-white border border-stone-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-stone-900/5 focus:border-stone-900 outline-none transition-all placeholder:text-stone-300 font-medium resize-none"
                                />
                            </div>
                        </div>

                        {/* Link URL Input */}
                        <div className="p-6 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <LinkIcon className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-1">
                                <label className="text-[13px] font-bold text-stone-700">Action Link (URL)</label>
                                <input
                                    type="text"
                                    placeholder="/shop/new-arrivals"
                                    value={formData.linkUrl}
                                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                                    className="w-full text-[13px] bg-white border border-stone-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-stone-900/5 focus:border-stone-900 outline-none transition-all placeholder:text-stone-300 font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    {formData.imageUrl && (
                        <div className="bg-stone-100 rounded-xl p-2 border border-stone-200 overflow-hidden group">
                            <div className="relative aspect-[21/9] rounded-lg overflow-hidden border border-stone-200 bg-white">
                                <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                                <div className="absolute inset-x-8 bottom-8">
                                    <h3 className="text-white text-3xl font-black mb-2">{formData.title}</h3>
                                    <p className="text-white/80 font-medium">{formData.subtitle}</p>
                                </div>
                            </div>
                            <div className="p-3 flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Live Preview Prototype</span>
                                <button type="button" className="text-stone-400 hover:text-stone-900"><Eye className="w-4 h-4" /></button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Actions & Secondary Settings */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ToggleRight className="w-4 h-4 text-stone-400" />
                                    <span className="text-[13px] font-bold text-stone-700">Active Status</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                    className={`w-10 h-5.5 rounded-full relative transition-all ${formData.isActive ? 'bg-stone-900' : 'bg-stone-200'}`}
                                >
                                    <div className={`absolute top-0.75 w-4 h-4 bg-white rounded-full transition-all ${formData.isActive ? 'left-5.25' : 'left-0.75'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ListOrdered className="w-4 h-4 text-stone-400" />
                                    <span className="text-[13px] font-bold text-stone-700">Display Order</span>
                                </div>
                                <input
                                    type="number"
                                    value={formData.displayOrder}
                                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                    className="w-16 text-right text-[13px] font-bold text-stone-900 bg-stone-50 border border-stone-200 rounded px-2 py-1 outline-none focus:border-stone-900"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-stone-100 space-y-2">
                            <button type="button" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-stone-500 hover:bg-stone-50 transition-all text-left">
                                <ExternalLink className="w-4 h-4" />
                                Open link in new tab
                            </button>
                            <button type="button" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-stone-500 hover:bg-stone-50 transition-all text-left">
                                <Copy className="w-4 h-4" />
                                Duplicate banner
                            </button>
                            <button type="button" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left">
                                <Trash2 className="w-4 h-4" />
                                Delete banner
                            </button>
                        </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <p className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5" /> Pro Tip
                        </p>
                        <p className="text-[12px] text-amber-900/70 font-medium leading-relaxed">
                            Banners with a sequence 0 will always appear first in the customer portal. Use high-resolution assets for better engagement.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
