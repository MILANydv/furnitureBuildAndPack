'use client';

import { useState } from 'react';
import { Star, Truck, Shield, Clock, Heart, Share2, Check } from 'lucide-react';
import { Product, Configuration, ProductVariant } from '@/types';
import { formatPrice } from '@/lib/utils/currency';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { FurnitureConfigurator } from '@/components/configurator/FurnitureConfigurator';
import { Product3DPreview } from '@/components/3d/Product3DPreview';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants[0] || null
  );
  const [configuration, setConfiguration] = useState<Configuration | null>(null);
  const [customPrice, setCustomPrice] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const currentPrice = customPrice || selectedVariant?.price || product.basePrice;
  
  const handleConfigurationChange = (config: Configuration, price: number) => {
    setConfiguration(config);
    setCustomPrice(price);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, configuration, qty);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription || product.description.slice(0, 100),
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-stone-500 mb-2">{product.category.name}</p>
        <h1 className="text-3xl font-bold text-stone-900 mb-4">{product.name}</h1>
        
        {/* Rating */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
              />
            ))}
            <span className="ml-2 text-stone-600">{product.rating}</span>
          </div>
          <span className="text-stone-400">|</span>
          <a href="#reviews" className="text-amber-600 hover:underline">
            {product.reviewCount} reviews
          </a>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-stone-900">{formatPrice(currentPrice)}</span>
        {customPrice && customPrice !== product.basePrice && (
          <span className="text-lg text-stone-400 line-through">
            {formatPrice(product.basePrice)}
          </span>
        )}
      </div>

      {/* Short Description */}
      <p className="text-stone-600">{product.shortDescription || product.description}</p>

      {/* Variant Selection */}
      {product.variants.length > 0 && !product.configurable && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-3">Select Variant</label>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  selectedVariant?.id === variant.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="block text-sm font-medium">{variant.size}</span>
                {variant.color && (
                  <span className="text-xs text-stone-500">{variant.color}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Configurator or 3D Preview */}
      {product.configurable && (
        <div className="grid md:grid-cols-2 gap-6">
          <FurnitureConfigurator 
            product={product} 
            onConfigurationChange={handleConfigurationChange}
          />
          <Product3DPreview 
            productName={product.name}
            configuration={configuration}
            dimensions={configuration?.dimensions || product.dimensions}
          />
        </div>
      )}

      {/* Quantity and Actions */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-stone-200">
        {/* Quantity */}
        <div className="flex items-center border border-stone-300 rounded-lg">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-4 py-2 hover:bg-stone-100 transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-4 py-2 hover:bg-stone-100 transition-colors"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="flex-1 min-w-[200px] px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
        >
          Add to Cart - {formatPrice(currentPrice * qty)}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="p-3 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
        >
          <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-stone-600'}`} />
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="p-3 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
        >
          <Share2 className="w-6 h-6 text-stone-600" />
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-stone-200">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-amber-600" />
          <span className="text-sm text-stone-600">Free Delivery</span>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-amber-600" />
          <span className="text-sm text-stone-600">5-Year Warranty</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600" />
          <span className="text-sm text-stone-600">Easy Assembly</span>
        </div>
      </div>

      {/* Dimensions */}
      {product.dimensions && (
        <div>
          <h3 className="font-medium text-stone-900 mb-2">Dimensions</h3>
          <p className="text-stone-600">
            {product.dimensions.length} {product.dimensions.unit} × {product.dimensions.width} {product.dimensions.unit} × {product.dimensions.height} {product.dimensions.unit}
          </p>
        </div>
      )}

      {/* Material */}
      {product.material && (
        <div>
          <h3 className="font-medium text-stone-900 mb-2">Material</h3>
          <p className="text-stone-600">{product.material}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-t border-stone-200 pt-8">
        <div className="flex gap-8 border-b border-stone-200">
          {(['description', 'reviews', 'shipping'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium capitalize transition-colors relative ${
                activeTab === tab ? 'text-amber-600' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600" />
              )}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose prose-stone max-w-none">
              <p>{product.description}</p>
              
              {product.configurable && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Customization Options:</h4>
                  <ul className="space-y-2">
                    {product.configurableParts?.frame && product.configurableParts.frame.length > 0 && (
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        Multiple frame types available
                      </li>
                    )}
                    {product.configurableParts?.legType && product.configurableParts.legType.length > 0 && (
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        Choice of leg styles
                      </li>
                    )}
                    {product.configurableParts?.finish && product.configurableParts.finish.length > 0 && (
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        Various finish options
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Custom dimensions available
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div id="reviews">
              {product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-stone-200 pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center">
                          {review.user.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{review.user.name}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        {review.isVerified && (
                          <span className="ml-auto text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium mb-2">{review.title}</h4>
                      <p className="text-stone-600">{review.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-stone-500">No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Delivery Information</h4>
                <ul className="space-y-2 text-stone-600">
                  <li>• Free delivery within Kathmandu Valley for orders over NPR 10,000</li>
                  <li>• Delivery to major cities: 3-5 business days</li>
                  <li>• Other locations: 7-10 business days</li>
                  <li>• Flatpack packaging for easy transport</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Assembly</h4>
                <p className="text-stone-600">
                  All our furniture comes with easy-to-follow assembly instructions. 
                  Most items can be assembled in 30-60 minutes with basic tools. 
                  Assembly service available for an additional fee.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
