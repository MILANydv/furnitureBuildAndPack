import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const banner = await prisma.campaignBanner.findUnique({
            where: { id }
        });

        if (!banner) {
            return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
        }

        return NextResponse.json(banner);
    } catch (error) {
        console.error('Get Banner Error:', error);
        return NextResponse.json({ error: 'Failed to fetch banner' }, { status: 500 });
    }
}

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
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        await prisma.campaignBanner.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Banner deleted' });
    } catch (error) {
        console.error('Delete Banner Error:', error);
        return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
    }
}
