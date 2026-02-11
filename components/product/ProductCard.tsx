'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils/currency';

// Define a simpler interface that works with Prisma output
export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  imageUrl: string | null;
  category?: { name: string } | null;
  isConfigurable?: boolean | null;
  stock?: number | null;
  rating?: number; // Optional as it might not be in the basic query
  reviewCount?: number;
}

interface ProductCardProps {
  product: ProductSummary;
  isInWishlist?: boolean;
  onToggleWishlist?: (id: string) => void;
  onAddToCart?: () => void;
}

export function ProductCard({
  product,
  isInWishlist = false,
  onToggleWishlist,
  onAddToCart
}: ProductCardProps) {

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <Link href={`/shop/products/${product.slug}`}>
          <Image
            src={product.imageUrl || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.stock === 0 && (
            <span className="px-2 py-1 bg-stone-500 text-white text-xs font-semibold rounded">
              Out of Stock
            </span>
          )}
          {product.isConfigurable && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
              Customizable
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
          >
            <Heart
              className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-stone-600'}`}
            />
          </button>
        )}

        {/* Quick Add Button */}
        {onAddToCart && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart();
            }}
            className="absolute bottom-0 left-0 right-0 py-3 bg-stone-900 text-white font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-full group-hover:translate-y-0 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/shop/products/${product.slug}`}>
          {product.category && (
            <p className="text-sm text-stone-500 mb-1">{product.category.name}</p>
          )}
          <h3 className="font-semibold text-stone-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <p className="text-lg font-bold text-stone-900">{formatPrice(product.basePrice)}</p>

          {product.isConfigurable && (
            <p className="text-xs text-stone-500 mt-1">Custom sizes available</p>
          )}
        </Link>
      </div>
    </div>
  );
}
