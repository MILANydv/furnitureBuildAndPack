'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Edit,
    Trash2,
    Eye,
    Package,
    Tag,
    DollarSign,
    Database,
    Box,
    Layers,
    ExternalLink,
    AlertCircle,
    CheckCircle2,
    XCircle,
    ImageIcon,
    Settings2,
    Plus,
    ArrowUpRight
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils/currency';
import { toast } from 'react-hot-toast';
import { safeJsonParse } from '@/lib/utils/json';

export default function ProductDetailPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const params = useParams();
    const id = params.id as string;

    const { data: product, isLoading } = useQuery({
        queryKey: ['admin-product', id],
        queryFn: async () => {
            const res = await fetch(`/api/admin/products/${id}`);
            if (!res.ok) throw new Error('Not found');
            return res.json();
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
            toast.success('Product deleted');
            router.push('/admin/products');
        },
        onError: () => toast.error('Delete failed')
    });

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
        </div>
    );

    if (!product) return (
        <div className="p-8 text-center text-stone-500 font-bold uppercase tracking-widest text-[11px]">
            Product not found
        </div>
    );

    const images = safeJsonParse<string[]>(product.images, []);
    const dimensions = safeJsonParse<any>(product.dimensions, null);
    const stockStatus = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';

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
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-stone-900 tracking-tight uppercase">
                                {product.name}
                            </h1>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                stockStatus === 'in-stock' ? 'bg-emerald-50 text-emerald-600' :
                                stockStatus === 'low-stock' ? 'bg-amber-50 text-amber-600' :
                                'bg-red-50 text-red-600'
                            }`}>
                                {stockStatus === 'in-stock' ? <CheckCircle2 className="w-3 h-3" /> :
                                 stockStatus === 'low-stock' ? <AlertCircle className="w-3 h-3" /> :
                                 <XCircle className="w-3 h-3" />}
                                {stockStatus === 'in-stock' ? 'In Stock' :
                                 stockStatus === 'low-stock' ? 'Low Stock' :
                                 'Out of Stock'}
                            </span>
                        </div>
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                            ID: {product.id.slice(-8).toUpperCase()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        href={`/shop/products/${product.slug}`}
                        target="_blank"
                        className="p-2 border border-stone-200 rounded-lg text-stone-500 hover:text-stone-900 transition-all shadow-sm flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-tight">View in Store</span>
                    </Link>
                    <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all shadow-sm"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Product
                    </Link>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
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
                    {/* Product Image */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30 flex items-center justify-between">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Visual Assets</h3>
                            <span className="text-[11px] font-bold text-stone-900">{images.length + (product.imageUrl ? 1 : 0)} images</span>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                {product.imageUrl && (
                                    <div className="col-span-2 aspect-video rounded-lg bg-stone-50 border border-stone-200 overflow-hidden">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                {images.slice(0, 4).map((img: string, idx: number) => (
                                    <div key={idx} className="aspect-video rounded-lg bg-stone-50 border border-stone-200 overflow-hidden">
                                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/30">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Product Information</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Description</label>
                                <p className="text-[13px] font-medium text-stone-900 leading-relaxed">
                                    {product.description || 'No description provided.'}
                                </p>
                            </div>
                            {dimensions && (
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Dimensions</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {dimensions.width && (
                                            <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                                                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Width</p>
                                                <p className="text-[13px] font-black text-stone-900">{dimensions.width}</p>
                                            </div>
                                        )}
                                        {dimensions.height && (
                                            <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                                                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Height</p>
                                                <p className="text-[13px] font-black text-stone-900">{dimensions.height}</p>
                                            </div>
                                        )}
                                        {dimensions.depth && (
                                            <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                                                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Depth</p>
                                                <p className="text-[13px] font-black text-stone-900">{dimensions.depth}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-stone-100">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Quick Stats</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <DollarSign className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Base Price</p>
                                        <p className="text-[14px] font-black text-stone-900">{formatPrice(product.basePrice)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <Database className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Stock</p>
                                        <p className="text-[14px] font-black text-stone-900">{product.stock} units</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <Tag className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Category</p>
                                        <p className="text-[14px] font-black text-stone-900 uppercase">{product.category?.name || 'Uncategorized'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-stone-50 rounded-lg">
                                        <Settings2 className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Configurable</p>
                                        <p className="text-[14px] font-black text-stone-900">
                                            {product.isConfigurable ? 'Yes' : 'No'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Metadata */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-stone-100">
                            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Metadata</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-stone-400 uppercase tracking-widest">Slug</span>
                                <span className="font-black text-stone-900 font-mono">{product.slug}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-stone-400 uppercase tracking-widest">Created</span>
                                <span className="font-black text-stone-900">
                                    {new Date(product.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-stone-400 uppercase tracking-widest">Updated</span>
                                <span className="font-black text-stone-900">
                                    {new Date(product.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-stone-900 rounded-xl p-6 text-white shadow-xl">
                        <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Quick Actions</h4>
                        <div className="space-y-2">
                            <Link
                                href={`/admin/products/${product.id}/edit`}
                                className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
                            >
                                <span className="text-[12px] font-bold uppercase tracking-tight">Edit Product</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </Link>
                            <Link
                                href={`/shop/products/${product.slug}`}
                                target="_blank"
                                className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
                            >
                                <span className="text-[12px] font-bold uppercase tracking-tight">View in Store</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
