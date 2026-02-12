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

        const productStats = await analyticsService.getProductStats();

        return NextResponse.json(productStats);
    } catch (error) {
        console.error('Product analytics error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch product analytics' },
            { status: 500 }
        );
    }
}
