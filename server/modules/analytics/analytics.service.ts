import { AnalyticsRepository } from './analytics.repository';

export class AnalyticsService {
    private repository: AnalyticsRepository;

    constructor() {
        this.repository = new AnalyticsRepository();
    }

    async getDashboardStats() {
        const [
            revenueStats,
            orderStats,
            productStats,
            customerStats,
            categoryStats,
            recentOrders,
            growthMetrics,
        ] = await Promise.all([
            this.repository.getRevenueStats(),
            this.repository.getOrderStats(),
            this.repository.getProductStats(),
            this.repository.getCustomerStats(),
            this.repository.getCategoryStats(),
            this.repository.getRecentOrders(8),
            this.repository.getGrowthMetrics(),
        ]);

        return {
            revenue: revenueStats,
            orders: orderStats,
            products: productStats,
            customers: customerStats,
            categories: categoryStats,
            recentOrders: recentOrders.map((order) => ({
                id: order.id,
                customer: order.user.name || order.user.email,
                total: order.total,
                status: order.status.toLowerCase(),
                date: order.createdAt.toISOString().split('T')[0],
            })),
            growth: growthMetrics,
            // Legacy format for backward compatibility
            totalRevenue: revenueStats.total,
            totalOrders: orderStats.total,
            totalCustomers: customerStats.total,
            totalProducts: productStats.total,
            revenueGrowth: `+${growthMetrics.revenueGrowth.toFixed(1)}%`,
            orderGrowth: `+${growthMetrics.orderGrowth.toFixed(1)}%`,
            customerGrowth: `+${growthMetrics.customerGrowth.toFixed(1)}%`,
            productGrowth: `+${growthMetrics.productGrowth.toFixed(1)}%`,
            topProducts: productStats.topSelling.slice(0, 5),
        };
    }

    async getRevenueStats(range?: { start: Date; end: Date }) {
        return this.repository.getRevenueStats(range);
    }

    async getOrderStats(range?: { start: Date; end: Date }) {
        return this.repository.getOrderStats(range);
    }

    async getProductStats() {
        return this.repository.getProductStats();
    }

    async getCustomerStats() {
        return this.repository.getCustomerStats();
    }

    async getCategoryStats() {
        return this.repository.getCategoryStats();
    }

    async getSalesTrends(days: number = 30) {
        return this.repository.getSalesTrends(days);
    }

    async getGrowthMetrics() {
        return this.repository.getGrowthMetrics();
    }
}
