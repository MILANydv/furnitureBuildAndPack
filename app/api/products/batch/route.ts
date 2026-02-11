import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function POST(request: NextRequest) {
    try {
        const { ids } = await request.json();

        if (!Array.isArray(ids)) {
            return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
        }

        const products = await prisma.product.findMany({
            where: {
                id: { in: ids }
            },
            include: {
                category: true,
                variants: true
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Batch fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
