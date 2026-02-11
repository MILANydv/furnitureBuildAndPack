import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const [
            totalProducts,
            totalOrders,
            totalCustomers,
            recentOrders,
            totalRevenueResult,
            categoryStats,
            productInsights
        ] = await Promise.all([
            prisma.product.count(),
            prisma.order.count(),
            prisma.user.count({ where: { role: 'CUSTOMER' } }),
            prisma.order.findMany({
                take: 8,
                orderBy: { createdAt: 'desc' },
                include: { user: true }
            }),
            prisma.order.aggregate({
                _sum: { total: true }
            }),
            prisma.category.findMany({
                include: {
                    _count: {
                        select: { products: true }
                    }
                }
            }),
            prisma.orderItem.groupBy({
                by: ['productId'],
                _sum: { qty: true },
                _count: { id: true },
                orderBy: {
                    _sum: {
                        qty: 'desc'
                    }
                },
                take: 5
            })
        ]);

        // Get product details for top selling
        const topSellingProducts = await Promise.all(
            productInsights.map(async (insight) => {
                const product = await prisma.product.findUnique({
                    where: { id: insight.productId },
                    select: { name: true, basePrice: true }
                });
                return {
                    name: product?.name || 'Unknown',
                    sold: insight._sum.qty || 0,
                    revenue: (insight._sum.qty || 0) * (product?.basePrice || 0)
                };
            })
        );

        const totalRevenue = totalRevenueResult._sum.total || 0;

        // Mocking growth data for UI (In real project, fetch prev month)
        const stats = {
            totalProducts,
            totalOrders,
            totalCustomers,
            totalRevenue,
            revenueGrowth: '+12.5%',
            orderGrowth: '+8.2%',
            customerGrowth: '+15.3%',
            productGrowth: '+4.1%',
            recentOrders: recentOrders.map(order => ({
                id: order.id,
                customer: order.user.name,
                total: order.total,
                status: order.status.toLowerCase(),
                date: order.createdAt.toISOString().split('T')[0]
            })),
            categories: categoryStats.map(cat => ({
                name: cat.name,
                count: cat._count.products
            })),
            topProducts: topSellingProducts
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
