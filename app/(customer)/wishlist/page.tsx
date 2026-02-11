'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { ProductCard } from '@/app/components/product/ProductCard';

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    imageUrl: string | null;
    category: { name: string };
    isConfigurable: boolean;
  };
}

export default function WishlistPage() {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist');
      if (response.ok) {
        const data = await response.json();
        setWishlist(data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id: string) => {
    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setWishlist(wishlist.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg mb-4">Please sign in to view your wishlist</p>
            <Link
              href="/auth/signin"
              className="inline-block px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-stone-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-stone-900 mb-8">My Wishlist</h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
                <ProductCard
                  id={item.product.id}
                  name={item.product.name}
                  slug={item.product.slug}
                  basePrice={item.product.basePrice}
                  imageUrl={item.product.imageUrl}
                  category={item.product.category}
                  isConfigurable={item.product.isConfigurable}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-stone-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Your wishlist is empty</h2>
            <p className="text-stone-600 mb-4">Start adding products you love!</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
