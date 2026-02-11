import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import { prisma } from '@/lib/prisma/client';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductDetailClient } from './ProductDetailClient';
import { mapPrismaProduct } from '@/lib/prisma/mappers';
import {
  generateProductMetadata,
  generateProductJsonLd,
  generateBreadcrumbJsonLd
} from '@/lib/seo/metadata';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      configurableParts: true,
      reviews: {
        include: {
          user: true
        }
      }
    },
  });

  if (!product) return null;
  return mapPrismaProduct(product as any);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return generateProductMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products
  const relatedPrismaProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id }
    },
    include: {
      category: true,
      variants: true,
      configurableParts: true,
      reviews: {
        include: {
          user: true
        }
      }
    },
    take: 4
  });

  const relatedProducts = relatedPrismaProducts.map(p => mapPrismaProduct(p as any));

  const productJsonLd = generateProductJsonLd(product);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: product.category.name, url: `/shop/products/category/${product.category.slug}` },
    { name: product.name, url: `/shop/products/${product.slug}` },
  ]);

  return (
    <>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-stone-500">
            <a href="/" className="hover:text-stone-900">Home</a>
            <span>/</span>
            <a href={`/shop/products/category/${product.category.slug}`} className="hover:text-stone-900">
              {product.category.name}
            </a>
            <span>/</span>
            <span className="text-stone-900">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <ProductDetailClient product={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="bg-stone-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
