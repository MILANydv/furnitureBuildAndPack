import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductService } from '@/server/modules/products/product.service';
import { prisma } from '@/lib/prisma/client';
import { Star, Heart, ShoppingCart, Ruler } from 'lucide-react';
import { AddToCartButton } from '@/app/components/product/AddToCartButton';
import { ReviewSection } from '@/app/components/product/ReviewSection';

const productService = new ProductService();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Luxe Living`,
    description: product.description || `Buy ${product.name} - Premium furniture from Luxe Living`,
    openGraph: {
      title: product.name,
      description: product.description || '',
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await prisma.review.findMany({
    where: { productId: product.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
      : 0;

  const dimensions = product.dimensions as
    | { length?: number; width?: number; height?: number }
    | null;

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl || product.images[0],
    brand: {
      '@type': 'Brand',
      name: 'Luxe Living',
    },
    offers: {
      '@type': 'Offer',
      price: product.basePrice,
      priceCurrency: 'USD',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    aggregateRating: reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: reviews.length,
    } : undefined,
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-stone-600">
          <Link href="/" className="hover:text-stone-900">
            Home
          </Link>
          {' / '}
          <Link href="/products" className="hover:text-stone-900">
            Products
          </Link>
          {' / '}
          <span className="text-stone-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            {product.imageUrl ? (
              <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-square rounded-xl bg-stone-100 flex items-center justify-center">
                <span className="text-stone-400">No Image</span>
              </div>
            )}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {product.images.slice(0, 4).map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-stone-100">
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-stone-900 mb-4">{product.name}</h1>

            {averageRating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-stone-600">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
            )}

            <p className="text-3xl font-bold text-stone-900 mb-6">${product.basePrice.toFixed(2)}</p>

            {product.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-stone-900 mb-2">Description</h2>
                <p className="text-stone-600 whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {dimensions && (
              <div className="mb-6 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-stone-600" />
                <span className="text-stone-600">
                  {dimensions.length && dimensions.width && dimensions.height
                    ? `${dimensions.length}cm × ${dimensions.width}cm × ${dimensions.height}cm`
                    : 'Dimensions available'}
                </span>
              </div>
            )}

            {product.isConfigurable && (
              <Link
                href={`/build-your-own/${product.slug}`}
                className="block mb-6 px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors text-center"
              >
                Customize This Product
              </Link>
            )}

            <AddToCartButton productId={product.id} variants={product.variants} />

            <div className="mt-8 pt-8 border-t border-stone-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-stone-900 mb-1">Category</p>
                  <Link
                    href={`/categories/${product.category.slug}`}
                    className="text-amber-600 hover:text-amber-700"
                  >
                    {product.category.name}
                  </Link>
                </div>
                <div>
                  <p className="font-semibold text-stone-900 mb-1">Stock</p>
                  <p className="text-stone-600">
                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection productId={product.id} reviews={reviews} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </div>
    </div>
  );
}
