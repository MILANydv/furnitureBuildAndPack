import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  imageUrl: string | null;
  category?: { name: string } | null;
  isConfigurable?: boolean | null;
}

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (id: string) => void;
  isInWishlist?: boolean;
}

export function ProductCard({
  product,
  onWishlistToggle,
  isInWishlist,
}: ProductCardProps) {
  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 mb-4">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400">
              No Image
            </div>
          )}
          {product.isConfigurable && (
            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white">
              Customizable
            </span>
          )}
          {onWishlistToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onWishlistToggle(product.id);
              }}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <Heart
                className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-stone-600'}`}
              />
            </button>
          )}
        </div>
      </Link>
      <div>
        {product.category && (
          <p className="text-sm text-stone-500 mb-1">{product.category.name}</p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-stone-900 mb-1 hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-lg font-bold text-stone-900">${product.basePrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
