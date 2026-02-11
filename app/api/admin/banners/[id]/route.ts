import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { id } = params;

        const banner = await prisma.campaignBanner.update({
            where: { id },
            data: {
                title: body.title,
                subtitle: body.subtitle,
                imageUrl: body.imageUrl,
                linkUrl: body.linkUrl,
                displayOrder: body.displayOrder,
                isActive: body.isActive,
            }
        });

        return NextResponse.json(banner);
    } catch (error) {
        console.error('Update Banner Error:', error);
        return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        await prisma.campaignBanner.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Banner deleted' });
    } catch (error) {
        console.error('Delete Banner Error:', error);
        return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
    }
}
