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
  ArrowUpRight,
  ChevronDown,
  LayoutGrid,
  List,
  Layers,
  Archive,
  AlertCircle
} from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

async function fetchProducts() {
  const res = await fetch('/api/admin/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
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
      toast.success('Product archived');
    },
    onError: () => toast.error('Purge failed')
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
    </div>
  );

  const filteredProducts = products.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      {/* Sleek Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-8 mt-4">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Product Catalog</h1>
          <div className="flex items-center gap-2 mt-1">
            <Layers className="w-3.5 h-3.5 text-stone-400" />
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{products.length} Active Masterpieces</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-lg text-[13px] font-bold text-stone-600 hover:bg-stone-50 transition-all">
            Registry
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <Link href="/admin/products/new" className="px-5 py-2 bg-stone-900 text-white text-[13px] font-bold rounded-lg hover:bg-stone-800 transition-all flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Logic Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Out of Stock', count: products.filter((p: any) => p.stock <= 0).length, icon: Archive, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Low Inventory', count: products.filter((p: any) => p.stock > 0 && p.stock < 10).length, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Fully Stocked', count: products.filter((p: any) => p.stock >= 10).length, icon: Box, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Total Value', count: formatPrice(products.reduce((acc: number, p: any) => acc + (p.basePrice * p.stock), 0)), icon: Download, color: 'text-stone-400', bg: 'bg-stone-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-stone-200 flex items-center gap-4 hover:border-stone-400 transition-colors group">
            <div className={`p-2.5 rounded-lg ${s.bg} ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
              <p className="text-[14px] font-black text-stone-900 leading-none">{s.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Area */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-stone-200 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-stone-900 transition-all" />
          <input
            type="text"
            placeholder="Find in catalog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none pl-11 pr-4 py-2 text-[13px] font-bold text-stone-900 outline-none placeholder:text-stone-300"
          />
        </div>
        <div className="h-4 w-px bg-stone-100"></div>
        <div className="flex items-center gap-1 p-1 bg-stone-50 rounded-lg">
          <button className="p-1.5 bg-white shadow-sm border border-stone-200 rounded text-stone-900"><List className="w-4 h-4" /></button>
          <button className="p-1.5 text-stone-300 hover:text-stone-600 transition-colors"><LayoutGrid className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Masterpiece</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Segment</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Inventory</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest">Base Pricing</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold text-stone-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredProducts.map((product: any) => (
                <tr key={product.id} className="hover:bg-stone-50/30 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-stone-50 border border-stone-200 overflow-hidden flex-shrink-0">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-200"><Box className="w-5 h-5" /></div>
                        )}
                      </div>
                      <Link href={`/admin/products/${product.id}/edit`} className="font-bold text-[13px] text-stone-900 hover:text-blue-600 transition-colors uppercase tracking-tight truncate max-w-[200px]">
                        {product.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{product.category?.name || 'Modular'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                      <span className="text-[13px] font-black text-stone-900">{product.stock} units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-black text-stone-900 tracking-tighter">{formatPrice(product.basePrice)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                      <Link href={`/shop/products/${product.slug}`} target="_blank" className="p-2 text-stone-300 hover:text-stone-900 transition-colors" title="View in Store">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="p-2 text-stone-300 hover:text-blue-600 transition-colors" title="Edit Masterpiece">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => { if (confirm('Purge this record?')) deleteMutation.mutate(product.id) }}
                        className="p-2 text-stone-300 hover:text-red-600 transition-colors"
                        title="Purge Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">No matching artifacts found in the vault.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
