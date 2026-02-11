'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/currency';

interface ProductCardProps {
  product: Product;
  isInWishlist?: boolean;
  onToggleWishlist?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({ 
  product, 
  isInWishlist = false, 
  onToggleWishlist,
  onAddToCart 
}: ProductCardProps) {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const minPrice = Math.min(...product.variants.map(v => v.price));
  const maxPrice = Math.max(...product.variants.map(v => v.price));
  const priceDisplay = minPrice === maxPrice 
    ? formatPrice(minPrice)
    : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={primaryImage?.url || '/placeholder.jpg'}
            alt={primaryImage?.alt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tags.includes('bestseller') && (
            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded">
              Best Seller
            </span>
          )}
          {product.tags.includes('new') && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
              New
            </span>
          )}
          {product.tags.includes('sale') && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
              Sale
            </span>
          )}
          {product.configurable && (
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
              onToggleWishlist();
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
        <Link href={`/products/${product.slug}`}>
          <p className="text-sm text-stone-500 mb-1">{product.category.name}</p>
          <h3 className="font-semibold text-stone-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm text-stone-600 ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-stone-400">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <p className="text-lg font-bold text-stone-900">{priceDisplay}</p>
          
          {product.configurable && (
            <p className="text-xs text-stone-500 mt-1">Custom sizes available</p>
          )}
        </Link>
      </div>
    </div>
  );
}
