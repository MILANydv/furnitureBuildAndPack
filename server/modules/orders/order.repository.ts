import { prisma } from '@/lib/prisma/client';
import { Order, OrderItem, Prisma, OrderStatus } from '@prisma/client';

export type OrderWithRelations = Order & {
  user: { id: string; name: string; email: string };
  items: (OrderItem & {
    product: { id: string; name: string; slug: string; imageUrl: string | null };
    variant: { id: string; size: string | null; color: string | null; material: string | null } | null;
  })[];
};

export class OrderRepository {
  async findById(id: string): Promise<OrderWithRelations | null> {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                material: true,
              },
            },
          },
        },
      },
    });
  }

  async findByUserId(userId: string, filters?: {
    status?: OrderStatus;
    skip?: number;
    take?: number;
  }): Promise<OrderWithRelations[]> {
    const where: Prisma.OrderWhereInput = {
      userId,
    };

    if (filters?.status) {
      where.status = filters.status;
    }

    return prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                material: true,
              },
            },
          },
        },
      },
      skip: filters?.skip,
      take: filters?.take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(filters?: {
    status?: OrderStatus;
    userId?: string;
    skip?: number;
    take?: number;
  }): Promise<OrderWithRelations[]> {
    const where: Prisma.OrderWhereInput = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.userId) {
      where.userId = filters.userId;
    }

    return prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                material: true,
              },
            },
          },
        },
      },
      skip: filters?.skip,
      take: filters?.take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async count(filters?: {
    status?: OrderStatus;
    userId?: string;
  }): Promise<number> {
    const where: Prisma.OrderWhereInput = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.userId) {
      where.userId = filters.userId;
    }

    return prisma.order.count({ where });
  }

  async create(data: Prisma.OrderCreateInput): Promise<OrderWithRelations> {
    return prisma.order.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                material: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.OrderUpdateInput): Promise<OrderWithRelations> {
    return prisma.order.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                material: true,
              },
            },
          },
        },
      },
    });
  }

  async getOrderStats(userId?: string): Promise<{
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    completedOrders: number;
  }> {
    const where: Prisma.OrderWhereInput = userId ? { userId } : {};

    const [totalOrders, orders, pendingOrders, completedOrders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        select: { total: true, status: true },
      }),
      prisma.order.count({
        where: { ...where, status: 'PENDING' },
      }),
      prisma.order.count({
        where: { ...where, status: 'DELIVERED' },
      }),
    ]);

    const totalRevenue = orders
      .filter((o) => o.status === 'DELIVERED')
      .reduce((sum, o) => sum + o.total, 0);

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
    };
  }
}
