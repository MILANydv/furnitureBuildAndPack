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

        const body = await req.json();
        const { id } = await params;

        const coupon = await prisma.coupon.update({
            where: { id },
            data: {
                code: body.code,
                discountType: body.discountType,
                discountValue: body.discountValue,
                minOrderAmount: body.minOrderAmount,
                maxUses: body.maxUses,
                validFrom: new Date(body.validFrom),
                validUntil: new Date(body.validUntil),
                isActive: body.isActive,
            }
        });

        return NextResponse.json(coupon);
    } catch (error) {
        console.error('Update Coupon Error:', error);
        return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
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

        await prisma.coupon.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Coupon deleted' });
    } catch (error) {
        console.error('Delete Coupon Error:', error);
        return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
    }
}
