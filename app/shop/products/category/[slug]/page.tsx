import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma/client';
import { generateCategoryMetadata, generateBreadcrumbJsonLd } from '@/lib/seo/metadata';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryFilter } from './CategoryFilter';
import Script from 'next/script';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  // Helper for metadata generation
  return {
    title: `${category.name} | Luxe Living`,
    description: category.description || `Browse ${category.name} furniture collection`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  const categoryProducts = await prisma.product.findMany({
    where: { categoryId: category.id },
    include: { category: true },
  });

  // Get all materials for filter - this might need adjustment based on how materials are stored
  // For now, let's just get distinct materials if we had a way, but since they are in variants, 
  // we might skip this complex query for now or do a simpler one.
  // Let's simplified assuming we might build a filter later or fetch from variants.
  const allMaterials: string[] = [];

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: category.name, url: `/products/category/${category.slug}` },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Category Hero */}
        <div className="relative bg-stone-900 text-white">
          <div className="absolute inset-0 overflow-hidden">
            {category.imageUrl && (
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover opacity-40"
              />
            )}
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <nav className="flex items-center gap-2 text-sm text-stone-300 mb-4">
              <a href="/" className="hover:text-white">Home</a>
              <span>/</span>
              <span className="text-white">{category.name}</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">{category.name} Furniture</h1>
            <p className="text-lg text-stone-300 max-w-2xl">{category.description}</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <CategoryFilter materials={allMaterials} />
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-stone-600">
                  Showing {categoryProducts.length} products
                </p>
                <select className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="featured">Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-stone-500">No products found in this category.</p>
                  <a
                    href="/products"
                    className="inline-block mt-4 text-amber-600 hover:underline"
                  >
                    View all products
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
