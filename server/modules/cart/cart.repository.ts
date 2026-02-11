import { prisma } from '@/lib/prisma/client';
import { Cart, CartItem, Prisma } from '@prisma/client';

export type CartWithItems = Cart & {
  items: (CartItem & {
    product: {
      id: string;
      name: string;
      slug: string;
      imageUrl: string | null;
      basePrice: number;
      isConfigurable: boolean;
    };
    variant: {
      id: string;
      size: string | null;
      color: string | null;
      material: string | null;
      price: number;
    } | null;
  })[];
};

export class CartRepository {
  async findByUserId(userId: string): Promise<CartWithItems | null> {
    return prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
                basePrice: true,
                isConfigurable: true,
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                material: true,
                price: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async findBySessionId(sessionId: string): Promise<CartWithItems | null> {
    return prisma.cart.findFirst({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
                basePrice: true,
                isConfigurable: true,
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                material: true,
                price: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async create(data: Prisma.CartCreateInput): Promise<CartWithItems> {
    return prisma.cart.create({
      data,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
                basePrice: true,
                isConfigurable: true,
              },
            },
            variant: {
              select: {
                id: true,
                size: true,
                color: true,
                material: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async addItem(cartId: string, data: Prisma.CartItemCreateInput): Promise<CartItem> {
    return prisma.cartItem.create({
      data: {
        ...data,
        cart: { connect: { id: cartId } },
      },
    });
  }

  async updateItem(id: string, data: Prisma.CartItemUpdateInput): Promise<CartItem> {
    return prisma.cartItem.update({
      where: { id },
      data,
    });
  }

  async removeItem(id: string): Promise<void> {
    await prisma.cartItem.delete({
      where: { id },
    });
  }

  async clearCart(cartId: string): Promise<void> {
    await prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }

  async getOrCreateCart(userId?: string, sessionId?: string): Promise<CartWithItems> {
    let cart: CartWithItems | null = null;

    if (userId) {
      cart = await this.findByUserId(userId);
    }

    if (!cart && sessionId) {
      cart = await this.findBySessionId(sessionId);
    }

    if (!cart) {
      cart = await this.create({
        ...(userId && { user: { connect: { id: userId } } }),
        ...(sessionId && { sessionId }),
      });
    }

    return cart;
  }
}
