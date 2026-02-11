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

        const customers = await prisma.user.findMany({
            where: {
                role: 'CUSTOMER'
            },
            include: {
                _count: {
                    select: {
                        orders: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const formattedCustomers = customers.map(customer => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            isBlocked: customer.isBlocked,
            orderCount: customer._count.orders,
            createdAt: customer.createdAt.toISOString(),
        }));

        return NextResponse.json(formattedCustomers);
    } catch (error) {
        console.error('Admin Customers Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}
