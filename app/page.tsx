import Link from 'next/link';
import { ArrowRight, Star, Truck, Shield, Clock, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice } from '@/lib/utils/currency';
import { prisma } from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let featuredProducts: Array<{
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    imageUrl: string | null;
    category: { id: string; name: string; slug: string };
  }> = [];
  let bestSellers: Array<{
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    imageUrl: string | null;
    category: { id: string; name: string; slug: string };
  }> = [];
  let categories: Array<{
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
  }> = [];
  let error: string | null = null;

  try {
    // Exclude JSON fields that might have invalid data to avoid parsing errors
    featuredProducts = await prisma.product.findMany({
      take: 4,
      select: {
        id: true,
        name: true,
        slug: true,
        basePrice: true,
        imageUrl: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    bestSellers = await prisma.product.findMany({
      take: 4,
      select: {
        id: true,
        name: true,
        slug: true,
        basePrice: true,
        imageUrl: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      // In a real app, you'd sort by sales count or a 'bestseller' flag
      orderBy: {
        stock: 'asc', // Just a placeholder sort
      },
    });

    categories = await prisma.category.findMany({
      take: 4,
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
    });
  } catch (err: any) {
    console.error('Database error:', err);
    error = process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Failed to load products. Please check your database connection.';
  }

  return (
    <div className="min-h-screen">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 m-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
                {process.env.NODE_ENV === 'development' && (
                  <span className="block mt-2 text-xs">
                    Make sure DATABASE_URL is set and database is migrated.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=900&fit=crop"
            alt="Modern living room"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Nepal&apos;s First Modular Furniture Store
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Custom Furniture for{' '}
              <span className="text-amber-400">Every Space</span>
            </h1>
            <p className="text-xl text-stone-300 mb-8">
              IKEA-style modular furniture for Nepal. Easy assembly,
              custom sizes, and affordable prices. Design your perfect
              piece online.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop/build-your-own"
                className="inline-flex items-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
              >
                Build Your Own
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-stone-900 transition-colors"
              >
                Shop Collection
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold text-amber-400">5000+</p>
                <p className="text-stone-400">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400">100%</p>
                <p className="text-stone-400">Customizable</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400">4.9</p>
                <p className="text-stone-400">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Truck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">Free Delivery</h3>
                <p className="text-sm text-stone-600">Orders over NPR 10k</p>
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
                <h3 className="font-semibold text-stone-900">Easy Assembly</h3>
                <p className="text-sm text-stone-600">With instructions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">Top Rated</h3>
                <p className="text-sm text-stone-600">4.9/5 from customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Shop by Category</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Browse our curated collections designed for every room in your home
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.length > 0 ? categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/products/category/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-square"
              >
                <img
                  src={category.imageUrl || '/placeholder.jpg'}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now →
                  </p>
                </div>
              </Link>
            )) : (
              <div className="col-span-4 text-center py-12 text-stone-500">
                No categories available. {process.env.NODE_ENV === 'development' && 'Check your database connection.'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
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
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            )) : (
              <div className="col-span-4 text-center py-12 text-stone-500">
                No featured products available. {process.env.NODE_ENV === 'development' && 'Check your database connection.'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Build Your Own CTA */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-6">
                Custom Furniture Builder
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Design Furniture That Fits Your Space
              </h2>
              <p className="text-stone-300 text-lg mb-8">
                Every home is unique. That&apos;s why we let you customize dimensions,
                materials, and finishes. Create furniture that fits your space perfectly.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Adjust length, width, and height</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Choose from premium materials</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>See real-time 3D preview</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Instant price calculation</span>
                </li>
              </ul>
              <Link
                href="/shop/build-your-own"
                className="inline-flex items-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
              >
                Start Building
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&h=500&fit=crop"
                alt="Custom furniture"
                className="rounded-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-600 p-6 rounded-xl">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm">Customizable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Best Sellers</h2>
              <p className="text-stone-600">Our most loved furniture pieces</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">What Our Customers Say</h2>
            <p className="text-stone-600">Trusted by homeowners across Nepal</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Homeowner, Kathmandu',
                content: 'The custom size option was perfect for my small apartment. The sofa fits exactly where I wanted it!',
                avatar: 'PS',
              },
              {
                name: 'Rajesh Gurung',
                role: 'Interior Designer',
                content: 'I recommend ModuLiving to all my clients. The quality and customization options are unmatched in Nepal.',
                avatar: 'RG',
              },
              {
                name: 'Anita Pradhan',
                role: 'Homeowner, Pokhara',
                content: 'Easy assembly and great quality. The flatpack delivery made it so convenient to transport to Pokhara.',
                avatar: 'AP',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-stone-50 p-6 rounded-2xl">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-600 mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">{testimonial.name}</p>
                    <p className="text-sm text-stone-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-stone-600 mb-8">
            Join thousands of happy customers who have furnished their homes with
            our modular, customizable furniture.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop/build-your-own"
              className="inline-flex items-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Start Building
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 border-2 border-stone-900 text-stone-900 font-semibold rounded-lg hover:bg-stone-900 hover:text-white transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
