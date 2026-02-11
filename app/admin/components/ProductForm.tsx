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
    CheckCircle2,
    ChevronLeft,
    Type,
    FileText,
    LayoutGrid,
    Database,
    ImageIcon,
    Settings2,
    ExternalLink,
    Trash2,
    ChevronDown
} from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';
import { toast } from 'react-hot-toast';

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
                toast.success(initialData ? 'Product updated' : 'Product published');
                router.push('/admin/products');
                router.refresh();
            } else {
                toast.error('Submission failed');
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
            {/* Breadcrumb Header */}
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
                            {initialData ? initialData.name : 'Release New Product'}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-bold text-stone-500 hover:text-stone-900 transition-all font-sans"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-6 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {isLoading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        {initialData ? 'Commit changes' : 'Publish to store'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* General Identity */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-stone-100 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <Type className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-1">
                                <label className="text-[13px] font-bold text-stone-700">Display Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Scandi Minimalist Bed"
                                    value={formData.name}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                        setFormData({ ...formData, name, slug });
                                    }}
                                    className="w-full text-[13px] font-bold bg-white border border-stone-200 rounded-md px-3 py-2 focus:border-stone-900 outline-none transition-all placeholder:text-stone-200"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-b border-stone-100 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <FileText className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-1">
                                <label className="text-[13px] font-bold text-stone-700">Detailed Description</label>
                                <textarea
                                    rows={5}
                                    placeholder="The narrative of the piece..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full text-[13px] font-medium bg-white border border-stone-200 rounded-md px-3 py-2 focus:border-stone-900 outline-none transition-all placeholder:text-stone-200 resize-none"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-b border-stone-100 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <LayoutGrid className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-1">
                                <label className="text-[13px] font-bold text-stone-700">Product Category</label>
                                <div className="relative">
                                    <select
                                        required
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full text-[13px] font-medium bg-white border border-stone-200 rounded-md px-3 py-2 appearance-none focus:border-stone-900 outline-none"
                                    >
                                        <option value="">Choose a segment</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <Database className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-stone-700">Base Price</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={formData.basePrice}
                                            onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                                            className="w-full text-[13px] font-bold bg-white border border-stone-200 rounded-md px-3 py-2 pl-10 outline-none focus:border-stone-900"
                                        />
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-stone-400">NPR</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-stone-700">Inventory Units</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                        className="w-full text-[13px] font-bold bg-white border border-stone-200 rounded-md px-3 py-2 outline-none focus:border-stone-900"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Media Assets */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="p-6 flex items-start gap-4">
                            <ImageIcon className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-stone-700">Primary Product Image</label>
                                    <input
                                        type="text"
                                        placeholder="External asset URL link..."
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full text-[13px] font-medium bg-white border border-stone-200 rounded-md px-3 py-2 focus:border-stone-900 outline-none placeholder:text-stone-200"
                                    />
                                </div>
                                {formData.imageUrl && (
                                    <div className="aspect-square w-48 bg-stone-50 rounded-lg border border-stone-200 overflow-hidden relative group">
                                        <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Product" />
                                        <button
                                            onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                            className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                        >
                                            <Trash2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Settings2 className="w-4 h-4 text-stone-400" />
                                    <span className="text-[13px] font-bold text-stone-700">Configurable</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isConfigurable: !formData.isConfigurable })}
                                    className={`w-10 h-5.5 rounded-full relative transition-all ${formData.isConfigurable ? 'bg-stone-900' : 'bg-stone-200'}`}
                                >
                                    <div className={`absolute top-0.75 w-4 h-4 bg-white rounded-full transition-all ${formData.isConfigurable ? 'left-5.25' : 'left-0.75'}`}></div>
                                </button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-stone-100 space-y-2">
                            <div className="space-y-1 px-3">
                                <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">URL Slug</label>
                                <p className="text-[12px] font-mono font-medium text-stone-500 break-all">/product/{formData.slug || '...'}</p>
                            </div>
                            <div className="pt-4 space-y-2">
                                <button type="button" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-stone-500 hover:bg-stone-50 transition-all text-left">
                                    <ExternalLink className="w-4 h-4" />
                                    Preview live page
                                </button>
                                <button type="button" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left">
                                    <Trash2 className="w-4 h-4" />
                                    Archive product
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 bg-stone-900 rounded-xl text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/50 mb-3">Modular Logic</h4>
                            <p className="text-[13px] font-medium text-white/80 leading-relaxed">
                                {formData.isConfigurable
                                    ? "This product is set as a masterpiece. Customers will be able to select custom materials and dimensions."
                                    : "This is a standalone SKU. Inventory will be tracked as a single unit without variations."
                                }
                            </p>
                        </div>
                        <Box className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12" />
                    </div>
                </div>
            </div>
        </div>
    );
}
