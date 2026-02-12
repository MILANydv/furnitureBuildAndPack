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
        const start = searchParams.get('start');
        const end = searchParams.get('end');

        const range = start && end
            ? { start: new Date(start), end: new Date(end) }
            : undefined;

        const revenueStats = await analyticsService.getRevenueStats(range);

        return NextResponse.json(revenueStats);
    } catch (error) {
        console.error('Revenue analytics error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch revenue analytics' },
            { status: 500 }
        );
    }
}
