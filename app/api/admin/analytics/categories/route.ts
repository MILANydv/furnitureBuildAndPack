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

        const categoryStats = await analyticsService.getCategoryStats();

        return NextResponse.json(categoryStats);
    } catch (error) {
        console.error('Category analytics error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch category analytics' },
            { status: 500 }
        );
    }
}
