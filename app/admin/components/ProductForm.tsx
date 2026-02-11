'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Save,
    X,
    Upload,
    ChevronRight,
    Box,
    Layers,
    Tag as TagIcon,
    IndianRupee,
    Info,
    CheckCircle2
} from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';

interface ProductFormProps {
    initialData?: any;
    categories: any[];
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
        basePrice: initialData?.basePrice || 0,
        stock: initialData?.stock || 0,
        categoryId: initialData?.categoryId || '',
        imageUrl: initialData?.imageUrl || '',
        isConfigurable: initialData?.isConfigurable || false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = initialData
                ? `/api/admin/products/${initialData.id}`
                : '/api/admin/products';
            const method = initialData ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/products');
                router.refresh();
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10 pb-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-stone-100">
                <div>
                    <h1 className="text-2xl font-black text-stone-900 uppercase tracking-tight">
                        {initialData ? 'Edit Masterpiece' : 'Craft New Product'}
                    </h1>
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mt-1">
                        Defining the essence of ModuLiving
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-white border border-stone-200 rounded-[10px] text-stone-600 font-bold hover:bg-stone-50 transition-all text-xs uppercase tracking-widest active:scale-95"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-stone-900 text-white font-black rounded-[10px] hover:bg-stone-800 transition-all text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {initialData ? 'Update Core' : 'Publish to Store'}
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Column - Core Info */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-10 rounded-[10px] border border-stone-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <Info className="w-5 h-5 text-amber-500" />
                            <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest">General Identity</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Product Designation</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                        setFormData({ ...formData, name, slug });
                                    }}
                                    placeholder="e.g. Sovereign Velvet Sectional"
                                    className="w-full px-6 py-4 bg-stone-50 border border-transparent rounded-[10px] focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all outline-none font-bold text-stone-900"
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Unique Slug</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-6 py-4 bg-stone-50 border border-transparent rounded-[10px] focus:bg-white focus:border-amber-500 transition-all outline-none font-bold text-stone-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Category Classification</label>
                                    <select
                                        required
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full px-6 py-4 bg-stone-50 border border-transparent rounded-[10px] focus:bg-white focus:border-amber-500 transition-all outline-none font-bold text-stone-900 appearance-none"
                                    >
                                        <option value="">Select Segment</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Narrative Description</label>
                                <textarea
                                    rows={6}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-6 py-4 bg-stone-50 border border-transparent rounded-[10px] focus:bg-white focus:border-amber-500 transition-all outline-none font-bold text-stone-900 resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[10px] border border-stone-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <IndianRupee className="w-5 h-5 text-amber-500" />
                            <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest">Financials & Inventory</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Base Price (NPR)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.basePrice}
                                    onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                                    className="w-full px-6 py-4 bg-stone-50 border border-transparent rounded-[10px] focus:bg-white focus:border-amber-500 transition-all outline-none font-black text-stone-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Current Stock Units</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                    className="w-full px-6 py-4 bg-stone-50 border border-transparent rounded-[10px] focus:bg-white focus:border-amber-500 transition-all outline-none font-black text-stone-900"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column - Media & Config */}
                <div className="space-y-8">
                    <section className="bg-white p-10 rounded-[10px] border border-stone-100 shadow-sm space-y-8">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <Upload className="w-5 h-5 text-amber-500" />
                                <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest">Media Asset</h2>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="relative aspect-square rounded-[10px] bg-stone-50 border-2 border-dashed border-stone-200 overflow-hidden flex flex-col items-center justify-center text-center p-6 group">
                                {formData.imageUrl ? (
                                    <>
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                className="p-4 bg-white rounded-full text-red-600 shadow-xl"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-white rounded-[10px] flex items-center justify-center text-stone-300 mb-4 shadow-sm">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest leading-relaxed">External Asset Link Required</p>
                                    </>
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="Enter image URL..."
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-6 py-4 bg-stone-50 border border-transparent rounded-[10px] focus:bg-white focus:border-amber-500 transition-all outline-none font-bold text-xs"
                            />
                        </div>
                    </section>

                    <section className="bg-stone-900 p-10 rounded-[10px] text-white shadow-2xl space-y-8">
                        <div className="flex items-center gap-3">
                            <Layers className="w-5 h-5 text-amber-500" />
                            <h2 className="text-sm font-black uppercase tracking-widest">Configuration</h2>
                        </div>

                        <div className="flex items-center justify-between p-6 bg-white/5 rounded-[10px] border border-white/5">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest">Modular System</p>
                                <p className="text-[11px] font-bold text-stone-500 mt-1">Enable multi-variant behavior?</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isConfigurable: !formData.isConfigurable })}
                                className={`w-14 h-8 rounded-full transition-all relative ${formData.isConfigurable ? 'bg-amber-500' : 'bg-stone-700'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.isConfigurable ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="bg-white/5 p-6 rounded-[10px] border border-dashed border-white/10 text-center">
                            <CheckCircle2 className="w-8 h-8 text-white/20 mx-auto mb-4" />
                            <p className="text-[11px] font-bold text-stone-500 leading-relaxed uppercase tracking-widest">Advanced variants (colors, materials) can be managed after publication</p>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
