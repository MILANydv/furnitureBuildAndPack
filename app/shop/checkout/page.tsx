'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, MapPin, Shield, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils/currency';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Your Cart is Empty</h1>
          <a 
            href="/" 
            className="text-amber-600 hover:underline"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {(['shipping', 'payment', 'review'] as const).map((s, index) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step === s 
                  ? 'bg-amber-600 text-white' 
                  : index < ['shipping', 'payment', 'review'].indexOf(step)
                    ? 'bg-green-500 text-white'
                    : 'bg-stone-200 text-stone-600'
              }`}>
                {index < ['shipping', 'payment', 'review'].indexOf(step) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`ml-2 mr-8 capitalize ${
                step === s ? 'text-stone-900 font-medium' : 'text-stone-500'
              }`}>
                {s}
              </span>
              {index < 2 && <div className="w-16 h-0.5 bg-stone-200 mr-8" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 'shipping' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  Shipping Information
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Phone *
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="+977"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Street Address *
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      City *
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Postal Code
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setStep('payment')}
                  className="w-full mt-6 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border-2 border-amber-500 bg-amber-50 rounded-lg cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-amber-600" />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-stone-600">Pay when you receive your order</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-stone-200 rounded-lg cursor-pointer opacity-50">
                    <input type="radio" name="payment" disabled className="w-5 h-5" />
                    <div>
                      <p className="font-medium">eSewa</p>
                      <p className="text-sm text-stone-600">Coming soon</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-stone-200 rounded-lg cursor-pointer opacity-50">
                    <input type="radio" name="payment" disabled className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Khalti</p>
                      <p className="text-sm text-stone-600">Coming soon</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 mt-6">
                  <button 
                    onClick={() => setStep('shipping')}
                    className="px-6 py-3 border border-stone-300 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep('review')}
                    className="flex-1 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-900 mb-6">Review Your Order</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-stone-200">
                      <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden">
                        <img 
                          src={item.product.images[0]?.url} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        {item.configuration && (
                          <p className="text-sm text-stone-500">
                            {item.configuration.frame}, {item.configuration.legType}, {item.configuration.finish}
                          </p>
                        )}
                        <p className="text-sm text-stone-500">Qty: {item.qty}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.qty)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep('payment')}
                    className="px-6 py-3 border border-stone-300 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-stone-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-600">{item.product.name} × {item.qty}</span>
                    <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-xl font-bold text-stone-900 pt-4 border-t border-stone-200">
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-200">
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Shield className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
