import { PrismaClient, Prisma, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

export interface RevenueStats {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    previousPeriod: number;
    growth: number;
}

export interface OrderStats {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    averageOrderValue: number;
}

export interface ProductStats {
    total: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
    topSelling: Array<{
        id: string;
        name: string;
        sold: number;
        revenue: number;
        orders: number;
    }>;
}

export interface CustomerStats {
    total: number;
    active: number;
    blocked: number;
    newThisMonth: number;
    newThisWeek: number;
    topCustomers: Array<{
        id: string;
        name: string;
        email: string;
        orders: number;
        totalSpent: number;
    }>;
}

export interface CategoryStats {
    id: string;
    name: string;
    productCount: number;
    revenue: number;
    orders: number;
    percentage: number;
}

export interface SalesTrend {
    date: string;
    revenue: number;
    orders: number;
    customers: number;
}

export interface TimeRange {
    start: Date;
    end: Date;
}

export class AnalyticsRepository {
    /**
     * Get revenue statistics with time-based breakdowns
     */
    async getRevenueStats(range?: TimeRange): Promise<RevenueStats> {
        const now = new Date();
        const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const thisWeekDate = new Date(todayDate);
        thisWeekDate.setDate(todayDate.getDate() - todayDate.getDay());
        const thisMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisYearDate = new Date(now.getFullYear(), 0, 1);
        
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

        const where: Prisma.OrderWhereInput = range
            ? { createdAt: { gte: range.start, lte: range.end } }
            : {};

        const [
            totalResult,
            todayResult,
            weekResult,
            monthResult,
            yearResult,
            previousMonthResult,
        ] = await Promise.all([
            prisma.order.aggregate({
                where: { ...where, status: { not: 'CANCELLED' } },
                _sum: { total: true },
            }),
            prisma.order.aggregate({
                where: {
                    ...where,
                    createdAt: { gte: todayDate },
                    status: { not: 'CANCELLED' },
                },
                _sum: { total: true },
            }),
            prisma.order.aggregate({
                where: {
                    ...where,
                    createdAt: { gte: thisWeekDate },
                    status: { not: 'CANCELLED' },
                },
                _sum: { total: true },
            }),
            prisma.order.aggregate({
                where: {
                    ...where,
                    createdAt: { gte: thisMonthDate },
                    status: { not: 'CANCELLED' },
                },
                _sum: { total: true },
            }),
            prisma.order.aggregate({
                where: {
                    ...where,
                    createdAt: { gte: thisYearDate },
                    status: { not: 'CANCELLED' },
                },
                _sum: { total: true },
            }),
            prisma.order.aggregate({
                where: {
                    createdAt: { gte: lastMonth, lte: lastMonthEnd },
                    status: { not: 'CANCELLED' },
                },
                _sum: { total: true },
            }),
        ]);

        const total = totalResult._sum.total || 0;
        const today = todayResult._sum.total || 0;
        const thisWeek = weekResult._sum.total || 0;
        const thisMonth = monthResult._sum.total || 0;
        const thisYear = yearResult._sum.total || 0;
        const previousPeriod = previousMonthResult._sum.total || 0;

        const growth = previousPeriod > 0
            ? ((thisMonth - previousPeriod) / previousPeriod) * 100
            : 0;

        return {
            total,
            today,
            thisWeek,
            thisMonth,
            thisYear,
            previousPeriod,
            growth: Math.round(growth * 100) / 100,
        };
    }

    /**
     * Get order statistics
     */
    async getOrderStats(range?: TimeRange): Promise<OrderStats> {
        const now = new Date();
        const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const thisWeekDate = new Date(todayDate);
        thisWeekDate.setDate(todayDate.getDate() - todayDate.getDay());
        const thisMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);

        const where: Prisma.OrderWhereInput = range
            ? { createdAt: { gte: range.start, lte: range.end } }
            : {};

        const [
            total,
            pending,
            processing,
            shipped,
            delivered,
            cancelled,
            todayCount,
            weekCount,
            monthCount,
            orders,
        ] = await Promise.all([
            prisma.order.count({ where }),
            prisma.order.count({ where: { ...where, status: 'PENDING' } }),
            prisma.order.count({ where: { ...where, status: 'PROCESSING' } }),
            prisma.order.count({ where: { ...where, status: 'SHIPPED' } }),
            prisma.order.count({ where: { ...where, status: 'DELIVERED' } }),
            prisma.order.count({ where: { ...where, status: 'CANCELLED' } }),
            prisma.order.count({
                where: { ...where, createdAt: { gte: todayDate } },
            }),
            prisma.order.count({
                where: { ...where, createdAt: { gte: thisWeekDate } },
            }),
            prisma.order.count({
                where: { ...where, createdAt: { gte: thisMonthDate } },
            }),
            prisma.order.findMany({
                where: { ...where, status: { not: 'CANCELLED' } },
                select: { total: true },
            }),
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

        return {
            total,
            pending,
            processing,
            shipped,
            delivered,
            cancelled,
            today: todayCount,
            thisWeek: weekCount,
            thisMonth: monthCount,
            averageOrderValue: Math.round(averageOrderValue * 100) / 100,
        };
    }

    /**
     * Get product statistics
     */
    async getProductStats(): Promise<ProductStats> {
        const [total, inStock, lowStock, outOfStock, topSellingData] = await Promise.all([
            prisma.product.count(),
            prisma.product.count({ where: { stock: { gt: 10 } } }),
            prisma.product.count({ where: { stock: { gt: 0, lte: 10 } } }),
            prisma.product.count({ where: { stock: { lte: 0 } } }),
            prisma.orderItem.groupBy({
                by: ['productId'],
                _sum: { qty: true },
                _count: { id: true },
                orderBy: { _sum: { qty: 'desc' } },
                take: 10,
            }),
        ]);

        const topSelling = await Promise.all(
            topSellingData.map(async (item) => {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId },
                    select: { name: true, basePrice: true },
                });

                const sold = item._sum.qty || 0;
                const revenue = sold * (product?.basePrice || 0);

                return {
                    id: item.productId,
                    name: product?.name || 'Unknown',
                    sold,
                    revenue: Math.round(revenue * 100) / 100,
                    orders: item._count.id,
                };
            })
        );

        return {
            total,
            inStock,
            lowStock,
            outOfStock,
            topSelling,
        };
    }

    /**
     * Get customer statistics
     */
    async getCustomerStats(): Promise<CustomerStats> {
        const now = new Date();
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisWeek = new Date(now);
        thisWeek.setDate(now.getDate() - now.getDay());

        const [total, active, blocked, newThisMonth, newThisWeek, topCustomersData] = await Promise.all([
            prisma.user.count({ where: { role: 'CUSTOMER' } }),
            prisma.user.count({ where: { role: 'CUSTOMER', isBlocked: false } }),
            prisma.user.count({ where: { role: 'CUSTOMER', isBlocked: true } }),
            prisma.user.count({
                where: {
                    role: 'CUSTOMER',
                    createdAt: { gte: thisMonth },
                },
            }),
            prisma.user.count({
                where: {
                    role: 'CUSTOMER',
                    createdAt: { gte: thisWeek },
                },
            }),
            prisma.order.groupBy({
                by: ['userId'],
                _sum: { total: true },
                _count: { id: true },
                orderBy: { _sum: { total: 'desc' } },
                take: 10,
            }),
        ]);

        const topCustomers = await Promise.all(
            topCustomersData.map(async (item) => {
                const user = await prisma.user.findUnique({
                    where: { id: item.userId },
                    select: { name: true, email: true },
                });

                return {
                    id: item.userId,
                    name: user?.name || 'Unknown',
                    email: user?.email || '',
                    orders: item._count.id,
                    totalSpent: Math.round((item._sum.total || 0) * 100) / 100,
                };
            })
        );

        return {
            total,
            active,
            blocked,
            newThisMonth,
            newThisWeek,
            topCustomers,
        };
    }

    /**
     * Get category statistics with revenue
     */
    async getCategoryStats(): Promise<CategoryStats[]> {
        const categories = await prisma.category.findMany({
            include: {
                products: {
                    include: {
                        orderItems: {
                            include: {
                                order: {
                                    select: { status: true },
                                },
                            },
                        },
                    },
                },
            },
        });

        const totalProducts = await prisma.product.count();
        const totalRevenue = await prisma.order.aggregate({
            where: { status: { not: 'CANCELLED' } },
            _sum: { total: true },
        });

        return categories.map((category) => {
            const revenue = category.products.reduce((sum, product) => {
                const productRevenue = product.orderItems
                    .filter((item) => item.order.status !== 'CANCELLED')
                    .reduce((itemSum, item) => itemSum + item.price * item.qty, 0);
                return sum + productRevenue;
            }, 0);

            const orders = new Set(
                category.products.flatMap((p) =>
                    p.orderItems.map((item) => item.orderId)
                )
            ).size;

            return {
                id: category.id,
                name: category.name,
                productCount: category.products.length,
                revenue: Math.round(revenue * 100) / 100,
                orders,
                percentage: totalProducts > 0
                    ? Math.round((category.products.length / totalProducts) * 100)
                    : 0,
            };
        });
    }

    /**
     * Get sales trends over time
     */
    async getSalesTrends(days: number = 30): Promise<SalesTrend[]> {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - days);

        const orders = await prisma.order.findMany({
            where: {
                createdAt: { gte: start, lte: end },
                status: { not: 'CANCELLED' },
            },
            include: {
                user: true,
            },
            orderBy: { createdAt: 'asc' },
        });

        // Group by date
        const trendsMap = new Map<string, { revenue: number; orders: number; customers: Set<string> }>();

        orders.forEach((order) => {
            const date = order.createdAt.toISOString().split('T')[0];
            const existing = trendsMap.get(date) || {
                revenue: 0,
                orders: 0,
                customers: new Set<string>(),
            };

            existing.revenue += order.total;
            existing.orders += 1;
            existing.customers.add(order.userId);

            trendsMap.set(date, existing);
        });

        // Fill in missing dates
        const trends: SalesTrend[] = [];
        for (let i = 0; i < days; i++) {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];

            const data = trendsMap.get(dateStr) || {
                revenue: 0,
                orders: 0,
                customers: new Set<string>(),
            };

            trends.push({
                date: dateStr,
                revenue: Math.round(data.revenue * 100) / 100,
                orders: data.orders,
                customers: data.customers.size,
            });
        }

        return trends;
    }

    /**
     * Get recent orders for dashboard
     */
    async getRecentOrders(limit: number = 10) {
        return prisma.order.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { name: true, email: true },
                },
            },
        });
    }

    /**
     * Calculate growth percentages
     */
    async getGrowthMetrics(): Promise<{
        revenueGrowth: number;
        orderGrowth: number;
        customerGrowth: number;
        productGrowth: number;
    }> {
        const now = new Date();
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

        const [
            thisMonthRevenue,
            lastMonthRevenue,
            thisMonthOrders,
            lastMonthOrders,
            thisMonthCustomers,
            lastMonthCustomers,
            thisMonthProducts,
            lastMonthProducts,
        ] = await Promise.all([
            prisma.order.aggregate({
                where: {
                    createdAt: { gte: thisMonth },
                    status: { not: 'CANCELLED' },
                },
                _sum: { total: true },
            }),
            prisma.order.aggregate({
                where: {
                    createdAt: { gte: lastMonth, lte: lastMonthEnd },
                    status: { not: 'CANCELLED' },
                },
                _sum: { total: true },
            }),
            prisma.order.count({
                where: { createdAt: { gte: thisMonth } },
            }),
            prisma.order.count({
                where: {
                    createdAt: { gte: lastMonth, lte: lastMonthEnd },
                },
            }),
            prisma.user.count({
                where: {
                    role: 'CUSTOMER',
                    createdAt: { gte: thisMonth },
                },
            }),
            prisma.user.count({
                where: {
                    role: 'CUSTOMER',
                    createdAt: { gte: lastMonth, lte: lastMonthEnd },
                },
            }),
            prisma.product.count({
                where: { createdAt: { gte: thisMonth } },
            }),
            prisma.product.count({
                where: {
                    createdAt: { gte: lastMonth, lte: lastMonthEnd },
                },
            }),
        ]);

        const calculateGrowth = (current: number, previous: number) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return Math.round(((current - previous) / previous) * 100 * 100) / 100;
        };

        return {
            revenueGrowth: calculateGrowth(
                thisMonthRevenue._sum.total || 0,
                lastMonthRevenue._sum.total || 0
            ),
            orderGrowth: calculateGrowth(thisMonthOrders, lastMonthOrders),
            customerGrowth: calculateGrowth(thisMonthCustomers, lastMonthCustomers),
            productGrowth: calculateGrowth(thisMonthProducts, lastMonthProducts),
        };
    }
}
