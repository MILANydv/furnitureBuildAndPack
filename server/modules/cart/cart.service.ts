import { CartRepository, CartWithItems } from './cart.repository';
import { Prisma } from '@prisma/client';

export class CartService {
  private repository: CartRepository;

  constructor() {
    this.repository = new CartRepository();
  }

  async getCart(userId?: string, sessionId?: string): Promise<CartWithItems> {
    return this.repository.getOrCreateCart(userId, sessionId);
  }

  async addToCart(
    cartId: string,
    data: {
      productId: string;
      variantId?: string;
      qty: number;
      configuration?: any;
    }
  ): Promise<void> {
    // Check if item already exists
    const cart = await this.repository.findByUserId(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId === data.productId &&
        item.variantId === data.variantId &&
        JSON.stringify(item.configuration) === JSON.stringify(data.configuration)
    );

    if (existingItem) {
      await this.repository.updateItem(existingItem.id, {
        qty: existingItem.qty + data.qty,
      });
    } else {
      await this.repository.addItem(cartId, {
        cart: { connect: { id: cartId } },
        product: { connect: { id: data.productId } },
        ...(data.variantId && { variant: { connect: { id: data.variantId } } }),
        qty: data.qty,
        configuration: data.configuration || null,
      } as Prisma.CartItemCreateInput);
    }
  }

  async updateCartItem(itemId: string, qty: number): Promise<void> {
    if (qty <= 0) {
      await this.repository.removeItem(itemId);
    } else {
      await this.repository.updateItem(itemId, { qty });
    }
  }

  async removeFromCart(itemId: string): Promise<void> {
    await this.repository.removeItem(itemId);
  }

  async clearCart(cartId: string): Promise<void> {
    await this.repository.clearCart(cartId);
  }

  calculateCartTotal(cart: CartWithItems): number {
    return cart.items.reduce((total, item) => {
      const price = item.variant?.price || item.product.basePrice;
      return total + price * item.qty;
    }, 0);
  }
}
