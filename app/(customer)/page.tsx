import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Shield, Clock } from 'lucide-react';
import { ProductCard } from '@/app/components/product/ProductCard';
import { prisma } from '@/lib/prisma/client';

export const metadata: Metadata = {
  title: 'Luxe Living | Premium Modular Furniture for Nepal',
  description: 'IKEA-style modular furniture for Nepal — easy assembly + online customization. Transform your space with timeless design.',
  keywords: 'furniture, Nepal, modular furniture, custom furniture, online furniture',
  openGraph: {
    title: 'Luxe Living | Premium Modular Furniture',
    description: 'IKEA-style modular furniture for Nepal — easy assembly + online customization',
    type: 'website',
  },
};

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 8,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      take: 4,
      orderBy: { name: 'asc' },
    });
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getBanners() {
  try {
    const banners = await prisma.campaignBanner.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      take: 1,
    });
    return banners;
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
}

export default async function HomePage() {
  const [products, categories, banners] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getBanners(),
  ]);

  const heroBanner = banners[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[600px]">
            <div className="px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-6">
                New Collection 2025
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-6">
                Transform Your Space With <span className="text-amber-600">Timeless</span> Design
              </h1>
              <p className="text-lg text-stone-600 mb-8 max-w-lg">
                IKEA-style modular furniture for Nepal — easy assembly + online customization. 
                Discover curated furniture pieces that blend comfort, style, and quality craftsmanship.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/build-your-own"
                  className="inline-flex items-center px-6 py-3 border-2 border-stone-900 text-stone-900 font-medium rounded-lg hover:bg-stone-900 hover:text-white transition-colors"
                >
                  Build Your Own
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[600px]">
              {heroBanner?.imageUrl ? (
                <Image
                  src={heroBanner.imageUrl}
                  alt={heroBanner.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=1000&fit=crop"
                  alt="Modern living room"
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Truck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">Free Shipping</h3>
                <p className="text-sm text-stone-600">On orders over $500</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">5-Year Warranty</h3>
                <p className="text-sm text-stone-600">Quality guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">24/7 Support</h3>
                <p className="text-sm text-stone-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Shop by Category</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Explore our curated collections designed for every room in your home
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-square"
                >
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop Now →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      {products.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-stone-900 mb-2">Featured Products</h2>
                <p className="text-stone-600">Handpicked favorites from our collection</p>
              </div>
              <Link
                href="/products"
                className="mt-4 sm:mt-0 inline-flex items-center text-amber-600 font-medium hover:text-amber-700"
              >
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </div>
        </section>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Luxe Living',
            description: 'IKEA-style modular furniture for Nepal',
            url: 'https://luxeliving.com',
            logo: 'https://luxeliving.com/logo.png',
          }),
        }}
      />
    </div>
  );
}
