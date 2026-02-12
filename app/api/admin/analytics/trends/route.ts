import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { AnalyticsService } from '@/server/modules/analytics/analytics.service';

const analyticsService = new AnalyticsService();

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const days = parseInt(searchParams.get('days') || '30', 10);

        const trends = await analyticsService.getSalesTrends(days);

        return NextResponse.json(trends);
    } catch (error) {
        console.error('Trends analytics error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch trends analytics' },
            { status: 500 }
        );
    }
}
