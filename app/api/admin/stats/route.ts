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
            totalRevenueResult
        ] = await Promise.all([
            prisma.product.count(),
            prisma.order.count(),
            prisma.user.count({ where: { role: 'CUSTOMER' } }),
            prisma.order.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { user: true }
            }),
            prisma.order.aggregate({
                _sum: { total: true }
            })
        ]);

        const totalRevenue = totalRevenueResult._sum.total || 0;

        return NextResponse.json({
            totalProducts,
            totalOrders,
            totalCustomers,
            totalRevenue,
            recentOrders: recentOrders.map(order => ({
                id: order.id,
                customer: order.user.name,
                total: order.total,
                status: order.status.toLowerCase(),
                date: order.createdAt.toISOString().split('T')[0]
            }))
        });
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
