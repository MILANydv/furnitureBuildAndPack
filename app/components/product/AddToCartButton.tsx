'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface AddToCartButtonProps {
  productId: string;
  variants?: Array<{ id: string; size?: string; color?: string; material?: string }>;
  configuration?: any;
}

export function AddToCartButton({
  productId,
  variants,
  configuration,
}: AddToCartButtonProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [qty, setQty] = useState(1);

  const handleAddToCart = async () => {
    if (!session) {
      window.location.href = '/auth/signin';
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          variantId: selectedVariant || undefined,
          qty,
          configuration,
        }),
      });

      if (response.ok) {
        alert('Added to cart!');
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {variants && variants.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Select Variant
          </label>
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Default</option>
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {[variant.size, variant.color, variant.material]
                  .filter(Boolean)
                  .join(' - ')}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-stone-700">Quantity:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 border border-stone-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          <ShoppingCart className="w-5 h-5" />
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
