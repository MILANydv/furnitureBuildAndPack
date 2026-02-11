import { OrderRepository, OrderWithRelations } from './order.repository';
import { Prisma, OrderStatus } from '@prisma/client';

export class OrderService {
  private repository: OrderRepository;

  constructor() {
    this.repository = new OrderRepository();
  }

  async getOrderById(id: string): Promise<OrderWithRelations | null> {
    return this.repository.findById(id);
  }

  async getOrdersByUserId(userId: string, filters?: {
    status?: OrderStatus;
    page?: number;
    limit?: number;
  }): Promise<{ orders: OrderWithRelations[]; total: number; page: number; limit: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.repository.findByUserId(userId, {
        status: filters?.status,
        skip,
        take: limit,
      }),
      this.repository.count({
        userId,
        status: filters?.status,
      }),
    ]);

    return {
      orders,
      total,
      page,
      limit,
    };
  }

  async getAllOrders(filters?: {
    status?: OrderStatus;
    userId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ orders: OrderWithRelations[]; total: number; page: number; limit: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.repository.findAll({
        status: filters?.status,
        userId: filters?.userId,
        skip,
        take: limit,
      }),
      this.repository.count({
        status: filters?.status,
        userId: filters?.userId,
      }),
    ]);

    return {
      orders,
      total,
      page,
      limit,
    };
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<OrderWithRelations> {
    return this.repository.create(data);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<OrderWithRelations> {
    return this.repository.update(id, { status });
  }

  async getOrderStats(userId?: string) {
    return this.repository.getOrderStats(userId);
  }
}
