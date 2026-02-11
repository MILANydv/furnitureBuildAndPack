'use client';

import Link from 'next/link';
import { CheckCircle, Package, Mail, Phone } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-stone-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-stone-600 mb-8">
          Thank you for your order. We&apos;ve sent a confirmation email with 
          your order details. Our team will contact you shortly to confirm 
          delivery details.
        </p>

        <div className="bg-stone-50 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-stone-900 mb-4">What&apos;s Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-stone-900">Order Confirmation</p>
                <p className="text-sm text-stone-600">
                  Check your email for order details
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-stone-900">Confirmation Call</p>
                <p className="text-sm text-stone-600">
                  We&apos;ll call you within 24 hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-stone-900">Delivery</p>
                <p className="text-sm text-stone-600">
                  3-7 business days for standard items
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/contact"
            className="flex-1 px-6 py-3 border border-stone-300 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
