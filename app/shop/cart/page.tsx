'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils/currency';

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-stone-400" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Your Cart is Empty</h1>
          <p className="text-stone-600 mb-8">
            Looks like you haven&apos;t added any furniture to your cart yet. 
            Browse our collection to find the perfect pieces for your home.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-4 p-4 bg-stone-50 rounded-xl"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                  <Image
                    src={item.product.images[0]?.url || '/placeholder.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/products/${item.product.slug}`}
                    className="font-semibold text-stone-900 hover:text-amber-600 transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  
                  {/* Variant/Configuration Info */}
                  <div className="text-sm text-stone-500 mt-1">
                    {item.variant && (
                      <p>{item.variant.size}{item.variant.color ? ` - ${item.variant.color}` : ''}</p>
                    )}
                    {item.configuration && (
                      <div className="mt-1 space-x-2">
                        {item.configuration.frame && <span>{item.configuration.frame}</span>}
                        {item.configuration.legType && <span>• {item.configuration.legType}</span>}
                        {item.configuration.finish && <span>• {item.configuration.finish}</span>}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <p className="font-medium text-stone-900 mt-2">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center border border-stone-300 rounded-lg">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="p-2 hover:bg-stone-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-2 font-medium min-w-[3rem] text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="p-2 hover:bg-stone-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/"
              className="inline-flex items-center text-amber-600 font-medium hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-stone-50 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-stone-900">Order Summary</h2>

              <div className="space-y-2 pt-4 border-t border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-stone-900 pt-4 border-t border-stone-200">
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>

              {/* Coupon Code */}
              <div className="pt-4">
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button className="px-4 py-2 bg-stone-200 text-stone-700 font-medium rounded-lg hover:bg-stone-300 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="flex items-center justify-center w-full px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                <div className="flex items-center gap-2 text-stone-600">
                  <Package className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Package className="w-4 h-4" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
