import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();

        const product = await prisma.product.update({
            where: { id },
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description,
                basePrice: body.basePrice,
                stock: body.stock,
                imageUrl: body.imageUrl,
                categoryId: body.categoryId,
                isConfigurable: body.isConfigurable,
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Update Product Error:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Delete Product Error:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
