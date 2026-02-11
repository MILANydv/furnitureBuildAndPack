import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { CartService } from '@/server/modules/cart/cart.service';
import { z } from 'zod';
import { cookies } from 'next/headers';

const cartService = new CartService();

const addToCartSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  qty: z.number().int().positive(),
  configuration: z.any().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value || 
                      (session ? undefined : `guest_${Date.now()}`);

    const cart = await cartService.getCart(session?.user?.id, sessionId);
    const total = cartService.calculateCartTotal(cart);

    return NextResponse.json({
      ...cart,
      total,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId && !session) {
      sessionId = `guest_${Date.now()}`;
      cookieStore.set('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    const body = await request.json();
    const validated = addToCartSchema.parse(body);

    const cart = await cartService.getCart(session?.user?.id, sessionId);
    await cartService.addToCart(cart.id, {
      productId: validated.productId,
      variantId: validated.variantId,
      qty: validated.qty,
      configuration: validated.configuration,
    });

    const updatedCart = await cartService.getCart(session?.user?.id, sessionId);
    const total = cartService.calculateCartTotal(updatedCart);

    return NextResponse.json({
      ...updatedCart,
      total,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}
