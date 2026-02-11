import { Metadata } from 'next';
import { ProductCard } from '@/components/product/ProductCard';
import { prisma } from '@/lib/prisma/client';
import { Suspense } from 'react';
import { mapPrismaProduct } from '@/lib/prisma/mappers';
import Script from 'next/script';
import {
    generateProductsMetadata,
    generateBreadcrumbJsonLd
} from '@/lib/seo/metadata';

export const metadata: Metadata = generateProductsMetadata();

export const dynamic = 'force-dynamic';

async function getProducts(searchParams: { category?: string; search?: string; page?: string }) {
    const page = parseInt(searchParams.page || '1');
    const limit = 12;
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
            include: {
                category: true,
                variants: true,
                reviews: true
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.product.count({ where }),
    ]);

    return {
        products: products.map(p => mapPrismaProduct(p as any)),
        total,
        page,
        limit
    };
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
    const resolvedParams = await searchParams;
    const { products, total, page, limit } = await getProducts(resolvedParams);
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    const totalPages = Math.ceil(total / limit);

    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Products', url: '/shop/products' },
    ]);

    return (
        <>
            <Script
                id="breadcrumb-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div className="min-h-screen bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-stone-900 mb-2">All Furniture</h1>
                            <p className="text-stone-600">Discover modular pieces designed for modern living.</p>
                        </div>
                        <div className="text-sm text-stone-500">
                            Showing {products.length} of {total} products
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="bg-stone-50 rounded-xl p-6 sticky top-24">
                                <h2 className="text-lg font-semibold text-stone-900 mb-4">Categories</h2>
                                <div className="space-y-1">
                                    <a
                                        href="/shop/products"
                                        className={`block py-2 px-3 rounded-lg transition-colors ${!resolvedParams.category
                                            ? 'bg-amber-600 text-white font-medium shadow-sm'
                                            : 'text-stone-600 hover:bg-stone-200'
                                            }`}
                                    >
                                        All Products
                                    </a>
                                    {categories.map((category) => (
                                        <a
                                            key={category.id}
                                            href={`/shop/products/category/${category.slug}`}
                                            className={`block py-2 px-3 rounded-lg transition-colors ${resolvedParams.category === category.slug
                                                ? 'bg-amber-100 text-amber-900 font-medium'
                                                : 'text-stone-600 hover:bg-stone-200'
                                                }`}
                                        >
                                            {category.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <main className="lg:col-span-3">
                            {products.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                        {products.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product as any}
                                            />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-2">
                                            {page > 1 && (
                                                <a
                                                    href={`/shop/products?page=${page - 1}${resolvedParams.category ? `&category=${resolvedParams.category}` : ''}`}
                                                    className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                                                >
                                                    Previous
                                                </a>
                                            )}
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                                    <a
                                                        key={p}
                                                        href={`/shop/products?page=${p}${resolvedParams.category ? `&category=${resolvedParams.category}` : ''}`}
                                                        className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${p === page
                                                            ? 'bg-stone-900 text-white border-stone-900 font-medium'
                                                            : 'border-stone-200 hover:bg-stone-50'
                                                            }`}
                                                    >
                                                        {p}
                                                    </a>
                                                ))}
                                            </div>
                                            {page < totalPages && (
                                                <a
                                                    href={`/shop/products?page=${page + 1}${resolvedParams.category ? `&category=${resolvedParams.category}` : ''}`}
                                                    className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                                                >
                                                    Next
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-20 bg-stone-50 rounded-2xl">
                                    <p className="text-stone-500 text-lg">No products found in this selection.</p>
                                    <a href="/shop/products" className="text-amber-600 hover:underline mt-2 inline-block">
                                        View all products
                                    </a>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
