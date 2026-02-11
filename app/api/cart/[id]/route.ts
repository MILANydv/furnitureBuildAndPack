import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { CartService } from '@/server/modules/cart/cart.service';
import { cookies } from 'next/headers';

const cartService = new CartService();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    const { id } = await params;
    const body = await request.json();
    const { qty } = body;

    if (typeof qty !== 'number' || qty < 0) {
      return NextResponse.json(
        { error: 'Invalid quantity' },
        { status: 400 }
      );
    }

    await cartService.updateCartItem(id, qty);

    const cart = await cartService.getCart(session?.user?.id, sessionId);
    const total = cartService.calculateCartTotal(cart);

    return NextResponse.json({
      ...cart,
      total,
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    const { id } = await params;
    await cartService.removeFromCart(id);

    const cart = await cartService.getCart(session?.user?.id, sessionId);
    const total = cartService.calculateCartTotal(cart);

    return NextResponse.json({
      ...cart,
      total,
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { error: 'Failed to remove cart item' },
      { status: 500 }
    );
  }
}
