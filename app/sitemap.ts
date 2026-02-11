import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://moduliving.np';

  // Static pages
  const staticPages = [
    '',
    '/shop/cart',
    '/shop/wishlist',
    '/shop/build-your-own',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/assembly',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Product pages
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true }
  });

  const productPages = products.map((product) => ({
    url: `${baseUrl}/shop/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Category pages
  const categories = await prisma.category.findMany({
    select: { slug: true, updatedAt: true }
  });

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/shop/products/category/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}
