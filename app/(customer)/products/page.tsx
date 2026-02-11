import { Metadata } from 'next';
import { ProductCard } from '@/app/components/product/ProductCard';
import { prisma } from '@/lib/prisma/client';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Products | Luxe Living',
  description: 'Browse our complete collection of premium furniture pieces',
};

async function getProducts(searchParams: { category?: string; search?: string; page?: string }) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (searchParams.category) {
    const category = await prisma.category.findUnique({
      where: { slug: searchParams.category },
    });
    if (category) {
      where.categoryId = category.id;
    }
  }
  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: 'insensitive' } },
      { description: { contains: searchParams.search, mode: 'insensitive' } },
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page, limit };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; page?: string };
}) {
  const { products, total, page, limit } = await getProducts(searchParams);
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-stone-900 mb-8">All Products</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">Categories</h2>
              <div className="space-y-2">
                <a
                  href="/products"
                  className={`block py-2 px-3 rounded ${
                    !searchParams.category
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  All Products
                </a>
                {categories.map((category: any) => (
                  <a
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className={`block py-2 px-3 rounded ${
                      searchParams.category === category.slug
                        ? 'bg-amber-100 text-amber-900'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {products.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      slug={product.slug}
                      basePrice={product.basePrice}
                      imageUrl={product.imageUrl}
                      category={product.category}
                      isConfigurable={product.isConfigurable}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    {page > 1 && (
                      <a
                        href={`/products?page=${page - 1}${searchParams.category ? `&category=${searchParams.category}` : ''}`}
                        className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-100"
                      >
                        Previous
                      </a>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <a
                        key={p}
                        href={`/products?page=${p}${searchParams.category ? `&category=${searchParams.category}` : ''}`}
                        className={`px-4 py-2 border rounded-lg ${
                          p === page
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {p}
                      </a>
                    ))}
                    {page < totalPages && (
                      <a
                        href={`/products?page=${page + 1}${searchParams.category ? `&category=${searchParams.category}` : ''}`}
                        className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-100"
                      >
                        Next
                      </a>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-stone-600 text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
