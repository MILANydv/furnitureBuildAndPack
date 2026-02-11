import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import { ProductCard } from '@/app/components/product/ProductCard';

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} | Luxe Living`,
    description: category.description || `Browse ${category.name} furniture collection`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-stone-600 mb-8">{category.description}</p>
        )}

        {category.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.products.map((product: any) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg">No products in this category yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
