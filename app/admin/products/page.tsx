'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreHorizontal,
  Download,
  Box,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchProducts() {
  const res = await fetch('/api/admin/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['admin-products'],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    }
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
    </div>
  );

  const filteredProducts = products.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-stone-900 leading-none uppercase tracking-tight">Product Catalog</h1>
          <p className="text-stone-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Registry of all crafted inventory</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/products/new" className="px-10 py-4 bg-stone-900 text-white font-black rounded-2xl hover:bg-stone-800 transition-all flex items-center gap-2 text-xs uppercase tracking-widest shadow-2xl active:scale-95">
            <Plus className="w-4 h-4" />
            New Masterpiece
          </Link>
        </div>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Inventory Size', value: products.length, color: 'text-stone-900' },
          { label: 'Available', value: products.filter((p: any) => p.stock > 0).length, color: 'text-emerald-600' },
          { label: 'Low Stock', value: products.filter((p: any) => p.stock > 0 && p.stock < 10).length, color: 'text-amber-600' },
          { label: 'Archived', value: products.filter((p: any) => p.stock <= 0).length, color: 'text-red-600' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-2">{s.label}</p>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Utility */}
      <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-stone-100 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-amber-600 transition-colors" />
          <input
            type="text"
            placeholder="Scan catalog by name, category or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-4 bg-stone-50 border-transparent rounded-[1.5rem] focus:bg-white focus:border-amber-500/20 transition-all outline-none font-bold text-stone-900 text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-white border border-stone-100 text-stone-400 font-bold rounded-2xl hover:text-stone-900 transition-all text-xs uppercase tracking-widest">
          <Filter className="w-4 h-4" />
          Advanced
        </button>
      </div>

      {/* Modern Table */}
      <div className="bg-white rounded-[3rem] border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/50 border-b border-stone-100">
              <tr>
                <th className="px-10 py-6 text-left text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Product Info</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Inventory</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Price Set</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Lifecycle</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product: any) => (
                <tr key={product.id} className="hover:bg-stone-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-stone-100 border border-stone-200 overflow-hidden relative group-hover:scale-105 transition-transform">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-300"><Box className="w-8 h-8" /></div>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-stone-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">{product.name}</p>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">{product.category?.name || 'Modular'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-stone-900">{product.stock} Units</span>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">{product.variants?.length || 0} variants</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <p className="text-xl font-black text-stone-900 tracking-tighter">{formatPrice(product.basePrice)}</p>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'}`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <Link href={`/shop/products/${product.slug}`} target="_blank" className="p-3 text-stone-400 hover:text-stone-900 hover:bg-white rounded-xl shadow-sm transition-all border border-transparent hover:border-stone-100">
                        <Eye className="w-4.5 h-4.5" />
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="p-3 text-stone-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm transition-all border border-transparent hover:border-stone-100">
                        <Edit className="w-4.5 h-4.5" />
                      </Link>
                      <button
                        onClick={() => { if (confirm('Purge this product?')) deleteMutation.mutate(product.id) }}
                        className="p-3 text-stone-400 hover:text-red-600 hover:bg-white rounded-xl shadow-sm transition-all border border-transparent hover:border-stone-100"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
