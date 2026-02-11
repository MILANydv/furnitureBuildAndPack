'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: string;
  qty: number;
  product: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    basePrice: number;
  };
  variant: {
    price: number;
  } | null;
}

export default function CartPage() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<{ items: CartItem[]; total: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, [session]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, qty: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty }),
      });
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-stone-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-stone-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Your cart is empty</h2>
            <Link
              href="/products"
              className="inline-block mt-4 px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-stone-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              const price = item.variant?.price || item.product.basePrice;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-6 flex gap-6 items-center"
                >
                  {item.product.imageUrl && (
                    <Link href={`/products/${item.product.slug}`}>
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-stone-100">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="flex-1">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-semibold text-stone-900 hover:text-amber-600">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-stone-600">${price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="w-8 h-8 border border-stone-300 rounded hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="w-8 h-8 border border-stone-300 rounded hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-stone-900 w-24 text-right">
                      ${(price * item.qty).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-stone-900 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between text-lg font-bold text-stone-900">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
