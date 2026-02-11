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

        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                items: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const formattedOrders = orders.map(order => ({
            id: order.id,
            customer: order.user.name,
            email: order.user.email,
            total: order.total,
            status: order.status.toLowerCase(),
            date: order.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            items: order.items.length
        }));

        return NextResponse.json(formattedOrders);
    } catch (error) {
        console.error('Admin Orders Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
