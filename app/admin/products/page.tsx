import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye, Filter, MoreHorizontal, Download } from 'lucide-react';
import { prisma } from '@/lib/prisma/client';
import { formatPrice } from '@/lib/utils/currency';

export const dynamic = 'force-dynamic';

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      variants: true
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 leading-none mb-2">Product Catalog</h1>
          <p className="text-stone-500 font-medium">Manage your furniture collection and inventory.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-stone-200 text-stone-600 font-bold rounded-xl hover:bg-stone-50 transition-all flex items-center gap-2 text-sm shadow-sm active:scale-95">
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link href="/admin/products/new" className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all flex items-center gap-2 text-sm shadow-lg shadow-amber-600/20 active:scale-95">
            <Plus className="w-4 h-4" />
            Add New Product
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, SKU or category..."
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-amber-500 focus:ring-0 transition-all font-medium text-stone-900"
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-6 py-3 bg-stone-50 border border-transparent rounded-2xl flex items-center justify-center gap-2 font-bold text-stone-600 hover:bg-stone-100 transition-all text-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <select className="flex-1 lg:flex-none px-6 py-3 bg-stone-50 border border-transparent rounded-2xl font-bold text-stone-600 hover:bg-stone-100 transition-all text-sm focus:ring-0 cursor-pointer">
            <option>All Categories</option>
            <option>Sofas</option>
            <option>Tables</option>
            <option>Beds</option>
          </select>
        </div>
      </div>

      {/* Grid for Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Total Items</p>
          <p className="text-2xl font-black text-stone-900">{products.length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-green-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Available</p>
          <p className="text-2xl font-black">{products.filter(p => !p.isConfigurable || p.stock > 0).length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-amber-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Configurable</p>
          <p className="text-2xl font-black">{products.filter(p => p.isConfigurable).length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-red-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Low Stock</p>
          <p className="text-2xl font-black">0</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-stone-200 overflow-hidden shadow-stone-200/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/80 border-b border-stone-100">
              <tr>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Product Info</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Inventory</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Pricing</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-right text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-amber-50/20 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0 relative">
                        <img
                          src={product.imageUrl || '/placeholder.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        {product.isConfigurable && (
                          <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 group-hover:text-amber-600 transition-colors">{product.name}</p>
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-0.5">{product.category.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <p className="text-sm font-black text-stone-900">{product.variants.reduce((sum, v) => sum + v.stock, 0)} Units</p>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{product.variants.length} Variants</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-lg font-black text-stone-900">{formatPrice(product.basePrice)}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${product.stock > 0
                        ? 'bg-green-50 text-green-700 ring-green-600/10'
                        : 'bg-stone-50 text-stone-500 ring-stone-600/10'
                      }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/shop/products/${product.slug}`} target="_blank" className="p-2.5 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                        <Eye className="w-4.5 h-4.5" />
                      </Link>
                      <button className="p-2.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Edit className="w-4.5 h-4.5" />
                      </button>
                      <button className="p-2.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                      <button className="p-2.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                        <MoreHorizontal className="w-4.5 h-4.5" />
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
