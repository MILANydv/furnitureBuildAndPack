import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { OrderService } from '@/server/modules/orders/order.service';
import { CartService } from '@/server/modules/cart/cart.service';
import { z } from 'zod';
import { cookies } from 'next/headers';

const orderService = new OrderService();
const cartService = new CartService();

const createOrderSchema = z.object({
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    phone: z.string(),
  }),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as any;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const isAdmin = session.user.role === 'ADMIN';
    const result = isAdmin
      ? await orderService.getAllOrders({ status, page, limit })
      : await orderService.getOrdersByUserId(session.user.id, { status, page, limit });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = createOrderSchema.parse(body);

    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    // Get cart items
    const cart = await cartService.getCart(session.user.id, sessionId);
    if (!cart.items || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate total
    const total = cartService.calculateCartTotal(cart);

    // Create order with items
    const order = await orderService.createOrder({
      user: { connect: { id: session.user.id } },
      total,
      status: 'PENDING',
      shippingAddress: validated.shippingAddress,
      items: {
        create: cart.items.map((item) => ({
          product: { connect: { id: item.productId } },
          ...(item.variantId && { variant: { connect: { id: item.variantId } } }),
          qty: item.qty,
          price: item.variant?.price || item.product.basePrice,
          configuration: item.configuration,
        })),
      },
    });

    // Clear cart
    await cartService.clearCart(cart.id);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
