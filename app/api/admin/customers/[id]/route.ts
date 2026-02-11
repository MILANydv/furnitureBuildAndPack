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

        const { id } = params;
        const body = await req.json();

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...body
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.error('Customer Update Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
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

        // Note: You might want to handle orders etc before deleting a user
        // For simplicity we use onDelete: Cascade if applicable or just delete
        await prisma.user.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        console.error('Customer Delete Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
