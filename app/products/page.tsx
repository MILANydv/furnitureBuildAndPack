import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryFilter } from '../shop/products/category/[slug]/CategoryFilter';

export const metadata = {
  title: 'All Products | ModuLiving Nepal',
  description: 'Browse our complete collection of modular, customizable furniture. Find the perfect pieces for your home with custom sizes and easy assembly.',
};

export default function ProductsPage() {
  // Get all unique materials
  const allMaterials = Array.from(new Set(
    products.map(p => p.material).filter(Boolean)
  ));

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-stone-300 max-w-2xl">
            Browse our complete collection of modular, customizable furniture. 
            Custom sizes available for every piece.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <CategoryFilter materials={allMaterials as string[]} />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-stone-600">
                Showing {products.length} products
              </p>
              <select className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
