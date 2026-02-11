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

        const banners = await prisma.campaignBanner.findMany({
            orderBy: { displayOrder: 'asc' }
        });

        return NextResponse.json(banners);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const banner = await prisma.campaignBanner.create({
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
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
